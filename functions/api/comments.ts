interface Env {
  DB: D1Database;
}

type CommentRow = {
  id: number;
  name: string;
  comment: string;
  status: string;
  created_at: string;
};

/*
 * =========================================================
 * JSON RESPONSE HELPER
 * =========================================================
 */
function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

/*
 * =========================================================
 * ENSURE COMMENTS TABLE
 *
 * This makes the API safer against a missing table.
 * If the table already exists, nothing happens.
 * =========================================================
 */
async function ensureCommentsTable(
  db: D1Database
) {
  await db
    .prepare(
      `
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        comment TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'approved',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
      `
    )
    .run();
}

/*
 * =========================================================
 * GET /api/comments
 *
 * Public website only receives approved comments.
 * =========================================================
 */
export const onRequestGet: PagesFunction<Env> = async ({
  env,
}) => {
  try {
    if (!env.DB) {
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
     * Make sure table exists.
     */
    await ensureCommentsTable(env.DB);

    /*
     * Get approved comments.
     */
    const result = await env.DB.prepare(
      `
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      WHERE status = ?
      ORDER BY id DESC
      LIMIT 100
      `
    )
      .bind("approved")
      .all<CommentRow>();

    return json({
      success: true,
      comments: result.results ?? [],
    });
  } catch (error) {
    console.error(
      "GET /api/comments ERROR:",
      error
    );

    /*
     * Temporary diagnostic message.
     * This helps us identify the exact D1 problem
     * if Cloudflare still returns an error.
     */
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return json(
      {
        success: false,
        message: `Could not load comments: ${message}`,
      },
      500
    );
  }
};

/*
 * =========================================================
 * POST /api/comments
 *
 * Adds a new public idea/comment.
 * =========================================================
 */
export const onRequestPost: PagesFunction<Env> = async ({
  request,
  env,
}) => {
  try {
    if (!env.DB) {
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
     * Make sure table exists.
     */
    await ensureCommentsTable(env.DB);

    /*
     * Read JSON body.
     */
    let body: {
      name?: unknown;
      comment?: unknown;
    };

    try {
      body = await request.json();
    } catch {
      return json(
        {
          success: false,
          message: "Invalid request data.",
        },
        400
      );
    }

    /*
     * Clean input.
     */
    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const comment =
      typeof body.comment === "string"
        ? body.comment.trim()
        : "";

    /*
     * Validation
     */
    if (!name) {
      return json(
        {
          success: false,
          message: "Please enter your name.",
        },
        400
      );
    }

    if (!comment) {
      return json(
        {
          success: false,
          message: "Please enter your idea.",
        },
        400
      );
    }

    if (name.length > 80) {
      return json(
        {
          success: false,
          message: "Name is too long.",
        },
        400
      );
    }

    if (comment.length > 1000) {
      return json(
        {
          success: false,
          message: "Comment is too long.",
        },
        400
      );
    }

    /*
     * Insert.
     *
     * We use approved because your current design
     * wants the idea to appear immediately.
     */
    const insertResult = await env.DB.prepare(
      `
      INSERT INTO comments
        (name, comment, status)
      VALUES
        (?, ?, ?)
      `
    )
      .bind(
        name,
        comment,
        "approved"
      )
      .run();

    if (!insertResult.success) {
      throw new Error(
        "D1 could not insert the comment."
      );
    }

    const insertedId =
      insertResult.meta?.last_row_id;

    if (!insertedId) {
      throw new Error(
        "Comment inserted but no ID was returned."
      );
    }

    /*
     * Get newly-created comment.
     */
    const created = await env.DB.prepare(
      `
      SELECT
        id,
        name,
        comment,
        status,
        created_at
      FROM comments
      WHERE id = ?
      LIMIT 1
      `
    )
      .bind(insertedId)
      .first<CommentRow>();

    if (!created) {
      throw new Error(
        "Comment was inserted but could not be loaded."
      );
    }

    return json(
      {
        success: true,
        message: "Comment added successfully.",
        comment: created,
      },
      201
    );
  } catch (error) {
    console.error(
      "POST /api/comments ERROR:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return json(
      {
        success: false,
        message: `Could not submit your idea: ${message}`,
      },
      500
    );
  }
};
