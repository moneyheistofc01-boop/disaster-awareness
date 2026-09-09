interface AnnouncementRow {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  created_at: string;
}

interface SessionRow {
  token: string;
  username: string;
  expires_at: string;
}

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<{ success: boolean }>;
}

interface D1Database {
  prepare(query: string): D1Statement;
}

interface Env {
  DB: D1Database;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

const SESSION_COOKIE = "ecoguard_admin_session";

function json(
  data: unknown,
  status = 200,
  headers: HeadersInit = {}
): Response {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}

async function requireAdmin(
  request: Request,
  DB: D1Database
): Promise<SessionRow | null> {
  const token = getCookie(request, SESSION_COOKIE);

  if (!token) {
    return null;
  }

  const result = await DB.prepare(`
    SELECT token, username, expires_at
    FROM admin_sessions
    WHERE token = ?
    LIMIT 1
  `)
    .bind(token)
    .all<SessionRow>();

  const session = result.results[0];

  if (!session) {
    return null;
  }

  const expiresAt = new Date(session.expires_at).getTime();

  if (Number.isNaN(expiresAt) || expiresAt <= Date.now()) {
    await DB.prepare(`
      DELETE FROM admin_sessions
      WHERE token = ?
    `)
      .bind(token)
      .run();

    return null;
  }

  return session;
}

export async function onRequestGet(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { DB } = context.env;

    if (!DB) {
      return json(
        {
          success: false,
          error: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    const result = await DB.prepare(`
      SELECT
        id,
        title,
        description,
        image_url,
        link_url,
        created_at
      FROM announcements
      ORDER BY datetime(created_at) DESC, id DESC
    `).all<AnnouncementRow>();

    const announcements = result.results.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.image_url,
      linkUrl: item.link_url,
      createdAt: item.created_at,
    }));

    return json(announcements);
  } catch (error) {
    console.error("Announcements GET error:", error);

    return json(
      {
        success: false,
        error: "Failed to load announcements.",
      },
      500
    );
  }
}

export async function onRequestPost(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { request, env } = context;
    const { DB } = env;

    if (!DB) {
      return json(
        {
          success: false,
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    const session = await requireAdmin(request, DB);

    if (!session) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    let body: {
      title?: string;
      description?: string;
      imageUrl?: string;
      linkUrl?: string;
    };

    try {
      body = await request.json();
    } catch {
      return json(
        {
          success: false,
          message: "Invalid JSON request.",
        },
        400
      );
    }

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const imageUrl = String(body.imageUrl ?? "").trim();
    const linkUrl = String(body.linkUrl ?? "").trim();

    if (!title || !imageUrl) {
      return json(
        {
          success: false,
          message: "Title and image URL are required.",
        },
        400
      );
    }

    const result = await DB.prepare(`
      INSERT INTO announcements (
        title,
        description,
        image_url,
        link_url
      )
      VALUES (?, ?, ?, ?)
    `)
      .bind(
        title,
        description || null,
        imageUrl,
        linkUrl || null
      )
      .run();

    return json(
      {
        success: true,
        message: "Announcement created successfully.",
        result,
      },
      201
    );
  } catch (error) {
    console.error("Announcements POST error:", error);

    return json(
      {
        success: false,
        message: "Failed to create announcement.",
      },
      500
    );
  }
}

export async function onRequestPut(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { request, env } = context;
    const { DB } = env;

    if (!DB) {
      return json(
        {
          success: false,
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    const session = await requireAdmin(request, DB);

    if (!session) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    let body: {
      id?: number;
      title?: string;
      description?: string;
      imageUrl?: string;
      linkUrl?: string;
    };

    try {
      body = await request.json();
    } catch {
      return json(
        {
          success: false,
          message: "Invalid JSON request.",
        },
        400
      );
    }

    const id = Number(body.id);
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const imageUrl = String(body.imageUrl ?? "").trim();
    const linkUrl = String(body.linkUrl ?? "").trim();

    if (!Number.isInteger(id) || id <= 0) {
      return json(
        {
          success: false,
          message: "Invalid announcement ID.",
        },
        400
      );
    }

    if (!title || !imageUrl) {
      return json(
        {
          success: false,
          message: "Title and image URL are required.",
        },
        400
      );
    }

    const result = await DB.prepare(`
      UPDATE announcements
      SET
        title = ?,
        description = ?,
        image_url = ?,
        link_url = ?
      WHERE id = ?
    `)
      .bind(
        title,
        description || null,
        imageUrl,
        linkUrl || null,
        id
      )
      .run();

    return json({
      success: true,
      message: "Announcement updated successfully.",
      result,
    });
  } catch (error) {
    console.error("Announcements PUT error:", error);

    return json(
      {
        success: false,
        message: "Failed to update announcement.",
      },
      500
    );
  }
}

export async function onRequestDelete(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { request, env } = context;
    const { DB } = env;

    if (!DB) {
      return json(
        {
          success: false,
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    const session = await requireAdmin(request, DB);

    if (!session) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    let body: {
      id?: number;
    };

    try {
      body = await request.json();
    } catch {
      return json(
        {
          success: false,
          message: "Invalid JSON request.",
        },
        400
      );
    }

    const id = Number(body.id);

    if (!Number.isInteger(id) || id <= 0) {
      return json(
        {
          success: false,
          message: "Invalid announcement ID.",
        },
        400
      );
    }

    const result = await DB.prepare(`
      DELETE FROM announcements
      WHERE id = ?
    `)
      .bind(id)
      .run();

    return json({
      success: true,
      message: "Announcement deleted successfully.",
      result,
    });
  } catch (error) {
    console.error("Announcements DELETE error:", error);

    return json(
      {
        success: false,
        message: "Failed to delete announcement.",
      },
      500
    );
  }
      }
