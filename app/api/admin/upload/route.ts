import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

function checkAuth(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  return session?.value === "1";
}

const VALID_SLOTS = [
  "hero",
  "feature-01",
  "feature-02",
  "feature-03",
  "feature-04",
  "sitemap-location",
  "sitemap-layout",
];

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const slot = formData.get("slot") as string | null;

  if (!file || !slot) {
    return NextResponse.json({ error: "파일 또는 슬롯이 없습니다." }, { status: 400 });
  }

  if (!VALID_SLOTS.includes(slot)) {
    return NextResponse.json({ error: "유효하지 않은 슬롯입니다." }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `apartment/${slot}`,
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as { secure_url: string });
      }
    );
    uploadStream.end(buffer);
  });

  const contentPath = path.join(process.cwd(), "data", "content.json");
  const content = JSON.parse(readFileSync(contentPath, "utf-8"));

  if (slot === "hero") {
    content.hero.imageUrl = result.secure_url;
  } else if (slot.startsWith("feature-")) {
    const idx = parseInt(slot.replace("feature-", "")) - 1;
    if (content.features[idx]) {
      content.features[idx].imageUrl = result.secure_url;
    }
  } else if (slot === "sitemap-location") {
    content.sitemap.location.imageUrl = result.secure_url;
  } else if (slot === "sitemap-layout") {
    content.sitemap.layout.imageUrl = result.secure_url;
  }

  writeFileSync(contentPath, JSON.stringify(content, null, 2));

  return NextResponse.json({ url: result.secure_url });
}
