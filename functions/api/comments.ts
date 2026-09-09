interface Env {
  DB: D1Database;
}

type AdminSession = {
  token: string;
  username: string;
  expires_at: string;
};

type CommentRow = {
  id: number;
  name: string;
  comment: string;
  status: string;
  created_at: string;
};

function json(data: unknown, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        "Cache-Control":
          "no-store",
      },
    }
  );
}

/* =========================================================
   SESSION COOKIE
========================================================= */

const SESSION_COOKIE =
  "ecoguard_admin_session";

/* =========================================================
   MAKE SURE COMMENTS TABLE EXISTS
========================================================= */

async function ensureCommentsTable(
  DB: D1Database
) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      comment TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'approved',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

/* =========================================================
   COOKIE READER
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
   VALID ADMIN SESSION
========================================================= */

async function getValidAdminSession(
  DB: D1Database,
  token: string | null
): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  const result =
    await DB.prepare(`
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
    result.results?.[0];

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

/* =========================================================
   REQUIRE ADMIN
========================================================= */

async function requireAdmin(
  request: Request,
  DB: D1Database
): Promise<AdminSession | null> {
  const token =
    getCookie(
      request,
      SESSION_COOKIE
    );

  return getValidAdminSession(
    DB,
    token
  );
}

/* =========================================================
   CLEAN TEXT
========================================================= */

function cleanText(
  value: unknown
): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   GET /api/comments
========================================================= */

export const onRequestGet: PagesFunction<Env> =
  async ({ env }) => {
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

      await ensureCommentsTable(
        env.DB
      );

      const result =
        await env.DB.prepare(`
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
        `)
          .bind("approved")
          .all<CommentRow>();

      return json({
        success: true,
        comments:
          result.results ?? [],
      });
    } catch (error) {
      console.error(
        "GET /api/comments error:",
        error
      );

      return json(
        {
          success: false,
          message:
            "Could not load comments.",
        },
        500
      );
    }
  };

/* =========================================================
   POST /api/comments
========================================================= */

export const onRequestPost: PagesFunction<Env> =
  async ({ request, env }) => {
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

      await ensureCommentsTable(
        env.DB
      );

      let body: {
        name?: unknown;
        comment?: unknown;
      };

      try {
        body =
          await request.json();
      } catch {
        return json(
          {
            success: false,
            message:
              "Invalid request data.",
          },
          400
        );
      }

      const name =
        cleanText(body.name);

      const comment =
        cleanText(body.comment);

      if (!name) {
        return json(
          {
            success: false,
            message:
              "Please enter your name.",
          },
          400
        );
      }

      if (!comment) {
        return json(
          {
            success: false,
            message:
              "Please enter your idea.",
          },
          400
        );
      }

      if (name.length > 80) {
        return json(
          {
            success: false,
            message:
              "Name is too long.",
          },
          400
        );
      }

      if (comment.length > 1000) {
        return json(
          {
            success: false,
            message:
              "Comment is too long.",
          },
          400
        );
      }

      const insertResult =
        await env.DB.prepare(`
          INSERT INTO comments
            (
              name,
              comment,
              status
            )
          VALUES
            (?, ?, ?)
        `)
          .bind(
            name,
            comment,
            "approved"
          )
          .run();

      if (
        !insertResult ||
        !insertResult.success
      ) {
        throw new Error(
          "D1 insert failed."
        );
      }

      const insertedId =
        insertResult.meta?.last_row_id;

      if (!insertedId) {
        throw new Error(
          "No inserted row ID returned."
        );
      }

      const created =
        await env.DB.prepare(`
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
          .bind(insertedId)
          .first<CommentRow>();

      if (!created) {
        throw new Error(
          "Comment inserted but could not be loaded."
        );
      }

      return json(
        {
          success: true,
          message:
            "Comment added successfully.",
          comment: created,
        },
        201
      );
    } catch (error) {
      console.error(
        "POST /api/comments error:",
        error
      );

      return json(
        {
          success: false,
          message:
            "Could not submit your idea.",
        },
        500
      );
    }
  };

/* =========================================================
   PUT /api/comments
   ADMIN EDIT
========================================================= */

export const onRequestPut: PagesFunction<Env> =
  async ({ request, env }) => {
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

      await ensureCommentsTable(
        env.DB
      );

      /*
       * Check admin login.
       */
      const admin =
        await requireAdmin(
          request,
          env.DB
        );

      if (!admin) {
        return json(
          {
            success: false,
            message:
              "Unauthorized.",
          },
          401
        );
      }

      let body: {
        id?: unknown;
        name?: unknown;
        comment?: unknown;
      };

      try {
        body =
          await request.json();
      } catch {
        return json(
          {
            success: false,
            message:
              "Invalid request data.",
          },
          400
        );
      }

      const id =
        Number(body.id);

      const name =
        cleanText(body.name);

      const comment =
        cleanText(body.comment);

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
            message:
              "Invalid comment ID.",
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
            message:
              "Name is required.",
          },
          400
        );
      }

      if (name.length > 80) {
        return json(
          {
            success: false,
            message:
              "Name is too long.",
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
            message:
              "Comment is required.",
          },
          400
        );
      }

      if (comment.length > 1000) {
        return json(
          {
            success: false,
            message:
              "Comment is too long.",
          },
          400
        );
      }

      /*
       * Check existing comment.
       */
      const existing =
        await env.DB.prepare(`
          SELECT
            id
          FROM comments
          WHERE id = ?
          LIMIT 1
        `)
          .bind(id)
          .all<{
            id: number;
          }>();

      if (
        !existing.results?.[0]
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

      /*
       * Update comment.
       */
      const updateResult =
        await env.DB.prepare(`
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
        !updateResult.success
      ) {
        throw new Error(
          "D1 update failed."
        );
      }

      /*
       * Return updated comment.
       */
      const updated =
        await env.DB.prepare(`
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
          .first<CommentRow>();

      if (!updated) {
        throw new Error(
          "Updated comment could not be loaded."
        );
      }

      return json({
        success: true,
        message:
          "Comment updated successfully.",
        comment: updated,
      });
    } catch (error) {
      console.error(
        "PUT /api/comments error:",
        error
      );

      return json(
        {
          success: false,
          message:
            "Could not update comment.",
        },
        500
      );
    }
  };

/* =========================================================
   DELETE /api/comments?id=123
   ADMIN DELETE
========================================================= */

export const onRequestDelete: PagesFunction<Env> =
  async ({ request, env }) => {
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

      await ensureCommentsTable(
        env.DB
      );

      /*
       * Check admin login.
       */
      const admin =
        await requireAdmin(
          request,
          env.DB
        );

      if (!admin) {
        return json(
          {
            success: false,
            message:
              "Unauthorized.",
          },
          401
        );
      }

      const url =
        new URL(
          request.url
        );

      const id =
        Number(
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

      /*
       * Check existence.
       */
      const existing =
        await env.DB.prepare(`
          SELECT
            id
          FROM comments
          WHERE id = ?
          LIMIT 1
        `)
          .bind(id)
          .all<{
            id: number;
          }>();

      if (
        !existing.results?.[0]
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

      /*
       * Delete.
       */
      const deleteResult =
        await env.DB.prepare(`
          DELETE FROM comments
          WHERE id = ?
        `)
          .bind(id)
          .run();

      if (
        !deleteResult ||
        !deleteResult.success
      ) {
        throw new Error(
          "D1 delete failed."
        );
      }

      return json({
        success: true,
        message:
          "Comment deleted successfully.",
      });
    } catch (error) {
      console.error(
        "DELETE /api/comments error:",
        error
      );

      return json(
        {
          success: false,
          message:
            "Could not delete comment.",
        },
        500
      );
    }
  };
