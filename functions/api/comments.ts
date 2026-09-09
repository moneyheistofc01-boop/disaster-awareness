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
    all<T = unknown>(): Promise<D1AllResult<T>>;
  };
}

interface Env {
  DB: D1Database;
}

interface PagesFunctionContext {
  request: Request;
  env: Env;
}

const SESSION_COOKIE =
  "ecoguard_admin_session";

const MAX_NAME_LENGTH = 80;
const MAX_COMMENT_LENGTH = 1000;

/* =========================================================
   JSON RESPONSE
========================================================= */

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

/* =========================================================
   COOKIE
========================================================= */

function getCookie(
  request: Request,
  name: string
): string | null {
  const cookieHeader =
    request.headers.get("Cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies =
    cookieHeader.split(";");

  for (const cookie of cookies) {
    const [key, ...valueParts] =
      cookie.trim().split("=");

    if (key === name) {
      return decodeURIComponent(
        valueParts.join("=")
      );
    }
  }

  return null;
}

/* =========================================================
   ADMIN SESSION
========================================================= */

async function getValidAdminSession(
  DB: D1Database,
  token: string | null
): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  const result = await DB.prepare(`
    SELECT
      token,
      username,
      expires_at
    FROM admin_sessions
    WHERE token = ?
    LIMIT 1
  `)
    .bind(token)
    .all<AdminSession>();

  const session =
    result.results[0];

  if (!session) {
    return null;
  }

  const expiresAt =
    new Date(
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

async function requireAdmin(
  request: Request,
  DB: D1Database
): Promise<AdminSession | null> {
  const token = getCookie(
    request,
    SESSION_COOKIE
  );

  return getValidAdminSession(
    DB,
    token
  );
}

/* =========================================================
   TEXT CLEANING
========================================================= */

function cleanText(
  value: unknown
): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   GET COMMENTS
========================================================= */

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

    /*
     * All comments are live.
     *
     * Old pending comments are also changed
     * to live automatically here.
     */
    await DB.prepare(`
      UPDATE comments
      SET status = 'approved'
      WHERE status != 'approved'
    `).run();

    const result = await DB.prepare(`
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      WHERE status = 'approved'
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

/* =========================================================
   POST COMMENT
========================================================= */

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
          message:
            "Invalid JSON request.",
        },
        400
      );
    }

    const name = cleanText(
      body.name
    );

    const comment = cleanText(
      body.comment
    );

    /* Name */
    if (!name) {
      return json(
        {
          success: false,
          message:
            "Name is required.",
        },
        400
      );
    }

    if (
      name.length >
      MAX_NAME_LENGTH
    ) {
      return json(
        {
          success: false,
          message:
            `Name must be ${MAX_NAME_LENGTH} characters or less.`,
        },
        400
      );
    }

    /* Comment */
    if (!comment) {
      return json(
        {
          success: false,
          message:
            "Comment is required.",
        },
        400
      );
    }

    if (
      comment.length >
      MAX_COMMENT_LENGTH
    ) {
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
     * Direct LIVE insert.
     */
    const insertResult =
      await DB.prepare(`
        INSERT INTO comments (
          name,
          comment,
          status
        )
        VALUES (?, ?, 'approved')
      `)
        .bind(
          name,
          comment
        )
        .run();

    if (
      !insertResult ||
      insertResult.success !== true
    ) {
      console.error(
        "D1 insert failed:",
        insertResult
      );

      return json(
        {
          success: false,
          message:
            "Failed to save comment.",
        },
        500
      );
    }

    /*
     * Get latest comment.
     */
    const latest =
      await DB.prepare(`
        SELECT
          id,
          name,
          comment,
          status,
          created_at
        FROM comments
        WHERE name = ?
          AND comment = ?
          AND status = 'approved'
        ORDER BY id DESC
        LIMIT 1
      `)
        .bind(
          name,
          comment
        )
        .all<Comment>();

    const savedComment =
      latest.results[0] ?? null;

    return json(
      {
        success: true,
        message:
          "Comment added successfully.",
        comment: savedComment,
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

/* =========================================================
   PUT - ADMIN EDIT
========================================================= */

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

    const admin =
      await requireAdmin(
        request,
        DB
      );

    if (!admin) {
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
          message:
            "Invalid JSON request.",
        },
        400
      );
    }

    const id = Number(
      body.id
    );

    const name = cleanText(
      body.name
    );

    const comment = cleanText(
      body.comment
    );

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return json(
        {
          success: false,
          message:
            "Invalid comment ID.",
        },
        400
      );
    }

    if (!name) {
      return json(
        {
          success: false,
          message:
            "Name is required.",
        },
        400
      );
    }

    if (
      name.length >
      MAX_NAME_LENGTH
    ) {
      return json(
        {
          success: false,
          message:
            `Name must be ${MAX_NAME_LENGTH} characters or less.`,
        },
        400
      );
    }

    if (!comment) {
      return json(
        {
          success: false,
          message:
            "Comment is required.",
        },
        400
      );
    }

    if (
      comment.length >
      MAX_COMMENT_LENGTH
    ) {
      return json(
        {
          success: false,
          message:
            `Comment must be ${MAX_COMMENT_LENGTH} characters or less.`,
        },
        400
      );
    }

    const updateResult =
      await DB.prepare(`
        UPDATE comments
        SET
          name = ?,
          comment = ?,
          status = 'approved'
        WHERE id = ?
      `)
        .bind(
          name,
          comment,
          id
        )
        .run();

    if (
      !updateResult ||
      updateResult.success !== true
    ) {
      return json(
        {
          success: false,
          message:
            "Failed to update comment.",
        },
        500
      );
    }

    const updated =
      await DB.prepare(`
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

    if (
      !updated.results[0]
    ) {
      return json(
        {
          success: false,
          message:
            "Comment not found.",
        },
        404
      );
    }

    return json({
      success: true,
      message:
        "Comment updated successfully.",
      comment:
        updated.results[0],
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

/* =========================================================
   DELETE - ADMIN ONLY
========================================================= */

export async function onRequestDelete(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { request, env } =
      context;

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

    const admin =
      await requireAdmin(
        request,
        DB
      );

    if (!admin) {
      return json(
        {
          success: false,
          message: "Unauthorized.",
        },
        401
      );
    }

    const url = new URL(
      request.url
    );

    const id = Number(
      url.searchParams.get(
        "id"
      )
    );

    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      return json(
        {
          success: false,
          message:
            "Invalid comment ID.",
        },
        400
      );
    }

    const existing =
      await DB.prepare(`
        SELECT id
        FROM comments
        WHERE id = ?
        LIMIT 1
      `)
        .bind(id)
        .all<{
          id: number;
        }>();

    if (
      !existing.results[0]
    ) {
      return json(
        {
          success: false,
          message:
            "Comment not found.",
        },
        404
      );
    }

    const deleteResult =
      await DB.prepare(`
        DELETE FROM comments
        WHERE id = ?
      `)
        .bind(id)
        .run();

    if (
      !deleteResult ||
      deleteResult.success !== true
    ) {
      return json(
        {
          success: false,
          message:
            "Failed to delete comment.",
        },
        500
      );
    }

    return json({
      success: true,
      message:
        "Comment deleted successfully.",
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
