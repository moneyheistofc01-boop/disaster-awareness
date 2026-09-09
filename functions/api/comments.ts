interface AdminSession {
  token: string;
  username: string;
  expires_at: string;
}

interface Comment {
  id: number;
  name: string;
  comment: string;
  status: string;
  created_at: string;
}

interface D1RunResult {
  success: boolean;
}

interface D1AllResult<T> {
  results: T[];
}

interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      run(): Promise<D1RunResult>;
      all<T = unknown>(): Promise<D1AllResult<T>>;
    };
    run(): Promise<D1RunResult>;
  };
}

interface Env {
  DB: D1Database;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

const SESSION_COOKIE = "ecoguard_admin_session";

/*
 * Maximum lengths
 */
const MAX_NAME_LENGTH = 80;
const MAX_COMMENT_LENGTH = 1000;

/*
 * JSON helper
 */
function json(
  data: unknown,
  status = 200,
  headers: HeadersInit = {}
) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

/*
 * Cookie reader
 */
function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie
      .trim()
      .split("=");

    if (key === name) {
      return decodeURIComponent(
        valueParts.join("=")
      );
    }
  }

  return null;
}

/*
 * Check admin session
 */
async function getValidAdminSession(
  DB: D1Database,
  token: string | null
): Promise<AdminSession | null> {
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
    .all<AdminSession>();

  const session = result.results[0];

  if (!session) {
    return null;
  }

  const expiresAt = new Date(
    session.expires_at
  ).getTime();

  if (
    Number.isNaN(expiresAt) ||
    expiresAt <= Date.now()
  ) {
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

/*
 * Check whether request is from logged-in admin
 */
async function requireAdmin(
  request: Request,
  DB: D1Database
): Promise<AdminSession | null> {
  const token = getCookie(
    request,
    SESSION_COOKIE
  );

  return getValidAdminSession(DB, token);
}

/*
 * Clean text
 */
function cleanText(value: unknown): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/*
 * GET
 *
 * Public:
 * Returns ALL live comments.
 *
 * Admin:
 * Also returns all comments.
 */
export async function onRequestGet(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { env } = context;
    const { DB } = env;

    if (!DB) {
      return json(
        {
          success: false,
          message:
            "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    const result = await DB.prepare(`
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      ORDER BY id DESC
    `).all<Comment>();

    return json({
      success: true,
      comments: result.results,
    });
  } catch (error) {
    console.error(
      "Comments GET error:",
      error
    );

    return json(
      {
        success: false,
        message: "Server error.",
      },
      500
    );
  }
}

/*
 * POST
 *
 * Public comment submission.
 *
 * Comment becomes LIVE immediately.
 */
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
          message:
            "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    let body: {
      name?: string;
      comment?: string;
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

    const name = cleanText(body.name);
    const comment = cleanText(body.comment);

    /*
     * Name validation
     */
    if (!name) {
      return json(
        {
          success: false,
          message: "Name is required.",
        },
        400
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return json(
        {
          success: false,
          message:
            `Name must be ${MAX_NAME_LENGTH} characters or less.`,
        },
        400
      );
    }

    /*
     * Comment validation
     */
    if (!comment) {
      return json(
        {
          success: false,
          message: "Comment is required.",
        },
        400
      );
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      return json(
        {
          success: false,
          message:
            `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        },
        400
      );
    }

    /*
     * Insert directly as LIVE.
     *
     * We intentionally do NOT use pending moderation.
     */
    const result = await DB.prepare(`
      INSERT INTO comments (
        name,
        comment,
        status
      )
      VALUES (?, ?, 'approved')
    `)
      .bind(name, comment)
      .run();

    if (!result.success) {
      return json(
        {
          success: false,
          message: "Failed to save comment.",
        },
        500
      );
    }

    /*
     * Get the newly created comment
     */
    const latest = await DB.prepare(`
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      ORDER BY id DESC
      LIMIT 1
    `).all<Comment>();

    return json(
      {
        success: true,
        message: "Comment added successfully.",
        comment: latest.results[0] ?? null,
      },
      201
    );
  } catch (error) {
    console.error(
      "Comments POST error:",
      error
    );

    return json(
      {
        success: false,
        message: "Server error.",
      },
      500
    );
  }
}

/*
 * PUT
 *
 * Admin only.
 *
 * Edit comment.
 */
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
          message:
            "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    /*
     * Admin authentication
     */
    const session = await requireAdmin(
      request,
      DB
    );

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
      name?: string;
      comment?: string;
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
    const name = cleanText(body.name);
    const comment = cleanText(body.comment);

    /*
     * ID validation
     */
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return json(
        {
          success: false,
          message: "Invalid comment ID.",
        },
        400
      );
    }

    /*
     * Name validation
     */
    if (!name) {
      return json(
        {
          success: false,
          message: "Name is required.",
        },
        400
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return json(
        {
          success: false,
          message:
            `Name must be ${MAX_NAME_LENGTH} characters or less.`,
        },
        400
      );
    }

    /*
     * Comment validation
     */
    if (!comment) {
      return json(
        {
          success: false,
          message: "Comment is required.",
        },
        400
      );
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      return json(
        {
          success: false,
          message:
            `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        },
        400
      );
    }

    /*
     * Update
     */
    const result = await DB.prepare(`
      UPDATE comments
      SET
        name = ?,
        comment = ?
      WHERE id = ?
    `)
      .bind(name, comment, id)
      .run();

    if (!result.success) {
      return json(
        {
          success: false,
          message: "Failed to update comment.",
        },
        500
      );
    }

    /*
     * Get updated comment
     */
    const updated = await DB.prepare(`
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      WHERE id = ?
      LIMIT 1
    `)
      .bind(id)
      .all<Comment>();

    if (!updated.results[0]) {
      return json(
        {
          success: false,
          message: "Comment not found.",
        },
        404
      );
    }

    return json({
      success: true,
      message: "Comment updated successfully.",
      comment: updated.results[0],
    });
  } catch (error) {
    console.error(
      "Comments PUT error:",
      error
    );

    return json(
      {
        success: false,
        message: "Server error.",
      },
      500
    );
  }
}

/*
 * DELETE
 *
 * Admin only.
 *
 * Delete comment.
 */
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
          message:
            "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    /*
     * Admin authentication
     */
    const session = await requireAdmin(
      request,
      DB
    );

    if (!session) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    /*
     * Read ID
     *
     * Supports:
     * /api/comments?id=123
     */
    const url = new URL(
      request.url
    );

    const id = Number(
      url.searchParams.get("id")
    );

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return json(
        {
          success: false,
          message: "Invalid comment ID.",
        },
        400
      );
    }

    /*
     * Check comment exists
     */
    const existing = await DB.prepare(`
      SELECT id
      FROM comments
      WHERE id = ?
      LIMIT 1
    `)
      .bind(id)
      .all<{ id: number }>();

    if (!existing.results[0]) {
      return json(
        {
          success: false,
          message: "Comment not found.",
        },
        404
      );
    }

    /*
     * Delete
     */
    const result = await DB.prepare(`
      DELETE FROM comments
      WHERE id = ?
    `)
      .bind(id)
      .run();

    if (!result.success) {
      return json(
        {
          success: false,
          message: "Failed to delete comment.",
        },
        500
      );
    }

    return json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Comments DELETE error:",
      error
    );

    return json(
      {
        success: false,
        message: "Server error.",
      },
      500
    );
  }
}
