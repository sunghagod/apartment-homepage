import cloudinary from "./cloudinary";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";

const PUBLIC_ID = "apartment/content-data.json";
const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent(): Promise<Record<string, any>> {
  try {
    // Cache-busting timestamp to bypass Cloudinary CDN
    const url = `${CLOUDINARY_BASE}/${PUBLIC_ID}?t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch {
    // fallback below
  }
  // Local fallback (works in dev / cold build)
  try {
    const contentPath = path.join(process.cwd(), "data", "content.json");
    return JSON.parse(readFileSync(contentPath, "utf-8"));
  } catch {
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveContent(data: Record<string, any>): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  const buffer = Buffer.from(json, "utf-8");

  // 1. Cloudinary 업로드
  await new Promise<void>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: PUBLIC_ID,
        resource_type: "raw",
        overwrite: true,
        invalidate: true,
      },
      (err, _result) => {
        if (err) reject(err);
        else resolve();
      }
    );
    stream.end(buffer);
  });

  // 2. 로컬 content.json 동기화 + git push
  try {
    const contentPath = path.join(process.cwd(), "data", "content.json");
    writeFileSync(contentPath, json, "utf-8");

    const cwd = process.cwd();
    execSync("git add data/content.json", { cwd, timeout: 10000 });
    execSync(
      'git commit -m "admin: 콘텐츠 업데이트 (관리자 패널)"',
      { cwd, timeout: 10000 }
    );
    execSync("git push origin main", { cwd, timeout: 30000 });
  } catch {
    // git 실패해도 Cloudinary 저장은 완료된 상태이므로 무시
  }
}
