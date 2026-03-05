import cloudinary from "./cloudinary";
import { readFileSync } from "fs";
import path from "path";

const PUBLIC_ID = "apartment/content-data";
const CLOUDINARY_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${PUBLIC_ID}.json`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getContent(): Promise<Record<string, any>> {
  try {
    const res = await fetch(CLOUDINARY_URL, { cache: "no-store" });
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
}
