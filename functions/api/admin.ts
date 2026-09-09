interface AdminSession {
  token: string;
  username: string;
  expires_at: string;
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

const ADMIN_USERNAME = "ecoguard@srilanka.lk";
const ADMIN_PASSWORD = "ecoguard999";

const SESSION_COOKIE = "ecoguard_admin_session";
const SESSION_DAYS = 7;

function json(data: unknown, status = 200, headers: HeadersInit = {}) {
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

function createSessionCookie(token: string): string {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;

  return [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function clearSessionCookie(): string {
  return [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

async function ensureSessionsTable(DB: D1Database) {
  await DB.prepare(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}

async function getValidSession(
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

    await ensureSessionsTable(DB);

    let body: {
      username?: string;
      password?: string;
      action?: string;
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

    const action = body.action ?? "login";

    /*
     * LOGOUT
     */
    if (action === "logout") {
      const token = getCookie(request, SESSION_COOKIE);

      if (token) {
        await DB.prepare(`
          DELETE FROM admin_sessions
          WHERE token = ?
        `)
          .bind(token)
          .run();
      }

      return json(
        {
          success: true,
          loggedIn: false,
        },
        200,
        {
          "Set-Cookie": clearSessionCookie(),
        }
      );
    }

    /*
     * LOGIN
     */
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return json(
        {
          success: false,
          message: "Username and password are required.",
        },
        400
      );
    }

    if (
      username !== ADMIN_USERNAME ||
      password !== ADMIN_PASSWORD
    ) {
      return json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        401
      );
    }

    // Remove old expired sessions.
    await DB.prepare(`
      DELETE FROM admin_sessions
      WHERE datetime(expires_at) <= datetime('now')
    `).run();

    // Create a random session token.
    const token = crypto.randomUUID();

    const expiresAt = new Date(
      Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    await DB.prepare(`
      INSERT INTO admin_sessions (
        token,
        username,
        expires_at
      )
      VALUES (?, ?, ?)
    `)
      .bind(token, ADMIN_USERNAME, expiresAt)
      .run();

    return json(
      {
        success: true,
        loggedIn: true,
        username: ADMIN_USERNAME,
      },
      200,
      {
        "Set-Cookie": createSessionCookie(token),
      }
    );
  } catch (error) {
    console.error("Admin POST error:", error);

    return json(
      {
        success: false,
        message: "Server error.",
      },
      500
    );
  }
}

export async function onRequestGet(
  context: PagesFunctionContext
): Promise<Response> {
  try {
    const { request, env } = context;
    const { DB } = env;

    if (!DB) {
      return json(
        {
          success: false,
          loggedIn: false,
          message: "D1 database binding 'DB' is not available.",
        },
        500
      );
    }

    await ensureSessionsTable(DB);

    const token = getCookie(request, SESSION_COOKIE);

    const session = await getValidSession(DB, token);

    if (!session) {
      return json({
        success: true,
        loggedIn: false,
      });
    }

    return json({
      success: true,
      loggedIn: true,
      username: session.username,
      expiresAt: session.expires_at,
    });
  } catch (error) {
    console.error("Admin GET error:", error);

    return json(
      {
        success: false,
        loggedIn: false,
        message: "Server error.",
      },
      500
    );
  }
  }
