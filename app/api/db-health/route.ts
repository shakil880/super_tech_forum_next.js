import { prisma } from "@/lib/prisma";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    return Response.json(
      {
        ok: false,
        databaseUrl: "missing",
        error: "DATABASE_URL is not set.",
      },
      { status: 500 }
    );
  }

  const hasValidScheme =
    databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://");

  if (!hasValidScheme) {
    return Response.json(
      {
        ok: false,
        databaseUrl: "invalid_scheme",
        startsWith: databaseUrl.slice(0, 16),
        error: "DATABASE_URL must start with postgresql:// or postgres://.",
      },
      { status: 500 }
    );
  }

  try {
    const postCount = await prisma.post.count();

    return Response.json({
      ok: true,
      databaseUrl: "present",
      postCount,
    });
  } catch (error) {
    console.error("Database health check failed", error);

    return Response.json(
      {
        ok: false,
        databaseUrl: "present",
        error: error instanceof Error ? error.message : "Database connection failed.",
      },
      { status: 500 }
    );
  }
}
