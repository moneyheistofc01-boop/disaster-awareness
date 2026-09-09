interface AnnouncementRow {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  link_url: string | null;
  created_at: string;
}

interface D1Result<T> {
  results: T[];
}

interface D1Statement {
  all<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1Statement;
}

interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const { DB } = context.env;

    if (!DB) {
      return Response.json(
        {
          success: false,
          error: "D1 database binding 'DB' is not available.",
        },
        { status: 500 }
      );
    }

    const result = await DB.prepare(
      `
        SELECT
          id,
          title,
          description,
          image_url,
          link_url,
          created_at
        FROM announcements
        ORDER BY datetime(created_at) DESC, id DESC
      `
    ).all<AnnouncementRow>();

    const announcements = result.results.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.image_url,
      linkUrl: item.link_url,
      createdAt: item.created_at,
    }));

    return Response.json(announcements, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Announcements API error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to load announcements.",
      },
      { status: 500 }
    );
  }
}
