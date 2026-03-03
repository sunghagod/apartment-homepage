import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, cookieOptions, COOKIE_NAME, loginRateLimit } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!loginRateLimit(req)) {
    return NextResponse.json(
      { error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." },
      { status: 429 }
    );
  }

  const { password } = await req.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, cookieOptions);
  return response;
}
