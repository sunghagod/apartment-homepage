import { NextRequest } from "next/server";

export const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7일

// ── HMAC-SHA256 서명 ──────────────────────────────────────────────
async function hmacSign(data: string): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(sig).toString("hex");
}

export async function createSessionToken(): Promise<string> {
  const payload = `admin:${Date.now()}`;
  const sig = await hmacSign(payload);
  const b64 = Buffer.from(payload).toString("base64url");
  return `${b64}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString();
  } catch {
    return false;
  }
  const expected = await hmacSign(payload);
  // timing-safe comparison
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function checkAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

// ── 쿠키 설정 ────────────────────────────────────────────────────
export const cookieOptions = {
  httpOnly: true,
  maxAge: MAX_AGE,
  path: "/",
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

// ── 레이트 리미터 (메모리 기반, 서버 재시작 시 초기화) ──────────
interface RateEntry { count: number; resetAt: number }
const rateLimitMap = new Map<string, RateEntry>();

/** IP당 windowMs 동안 max회 허용. 초과 시 false 반환. */
export function rateLimit(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/** 로그인 레이트 리미터: 1분에 5회 */
export function loginRateLimit(req: NextRequest): boolean {
  const ip = getClientIp(req);
  return rateLimit(`login:${ip}`, 5, 60_000);
}

/** 폼 제출 레이트 리미터: 1분에 5회 */
export function submitRateLimit(req: NextRequest): boolean {
  const ip = getClientIp(req);
  return rateLimit(`submit:${ip}`, 5, 60_000);
}
