import { NextResponse } from "next/server";
import { submitToGoogleSheets, type ReservationData } from "@/lib/google-sheets";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body: ReservationData = await request.json();

    // Server-side validation
    if (!body.name || !body.phone || !body.date) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const nameRegex = /^[가-힣a-zA-Z\s]{2,20}$/;
    if (!nameRegex.test(body.name)) {
      return NextResponse.json(
        { error: "이름을 올바르게 입력해주세요." },
        { status: 400 }
      );
    }

    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: "연락처를 올바르게 입력해주세요." },
        { status: 400 }
      );
    }

    const result = await submitToGoogleSheets(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
