import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge 런타임 호환 HMAC 검증 (Buffer 없이 Web Crypto API만 사용)
async function verifyToken(token: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  // base64url → 원본 payload
  let payload: string;
  try {
    const base64 = b64.replace(/-/g, "+").replace(/_/g, "/");
    payload = atob(base64);
  } catch {
    return false;
  }

  if (!payload.startsWith("admin:")) return false;

  // HMAC-SHA256 검증
  const secret = process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const expected = Array.from(new Uint8Array(sigBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
