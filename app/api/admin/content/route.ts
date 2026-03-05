import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content-store";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  if (!(await checkAuth(req))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const content = await getContent();
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

  await saveContent(body as Record<string, unknown>);
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
