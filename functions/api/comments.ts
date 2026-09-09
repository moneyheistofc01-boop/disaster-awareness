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
 * GET /api/comments
 * Publicly returns approved comments only.
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
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

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
    console.error("GET /api/comments error:", error);

    return json(
      {
        success: false,
        message: "Could not load comments.",
      },
      500
    );
  }
};

/*
 * =========================================================
 * POST /api/comments
 * Public comment submission.
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
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

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

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const comment =
      typeof body.comment === "string"
        ? body.comment.trim()
        : "";

    /*
     * Basic validation
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
     * Insert comment.
     *
     * We use "approved" because the current website
     * is designed to display the submitted idea immediately.
     */
    const insertResult = await env.DB.prepare(
      `
      INSERT INTO comments
        (name, comment, status)
      VALUES
        (?, ?, ?)
      `
    )
      .bind(name, comment, "approved")
      .run();

    if (!insertResult.success) {
      throw new Error("D1 insert failed.");
    }

    const insertedId =
      insertResult.meta?.last_row_id;

    if (!insertedId) {
      throw new Error(
        "Could not determine inserted comment ID."
      );
    }

    /*
     * Fetch the newly-created comment.
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
    console.error("POST /api/comments error:", error);

    return json(
      {
        success: false,
        message: "Could not submit your idea.",
      },
      500
    );
  }
};
