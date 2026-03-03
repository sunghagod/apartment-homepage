import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import { checkAuth } from "@/lib/auth";

const contentPath = path.join(process.cwd(), "data", "content.json");

export async function GET(req: NextRequest) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const content = JSON.parse(readFileSync(contentPath, "utf-8"));
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "잘못된 데이터 형식입니다." }, { status: 400 });
  }

  writeFileSync(contentPath, JSON.stringify(body, null, 2));
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
