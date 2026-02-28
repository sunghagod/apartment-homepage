import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

function checkAuth(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  return session?.value === "1";
}

const contentPath = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  const content = JSON.parse(readFileSync(contentPath, "utf-8"));
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await req.json();
  writeFileSync(contentPath, JSON.stringify(body, null, 2));
  return NextResponse.json({ ok: true });
}
