import { NextRequest, NextResponse } from "next/server";
import { recordPageview } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { path } = body as Record<string, unknown>;

  if (typeof path !== "string" || path.length === 0 || path.length > 500) {
    return NextResponse.json({ error: "Invalid path." }, { status: 400 });
  }

  try {
    await recordPageview({ path, referrer: req.headers.get("referer") });
  } catch (error) {
    console.error("[api/analytics] failed to record pageview", error);
  }

  return new NextResponse(null, { status: 204 });
}
