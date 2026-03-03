import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프리미엄 라이프의 시작 | 아파트 브랜드 상담 예약",
  description:
    "프리미엄 라이프를 위한 첫 걸음. 방문상담을 예약하시고 특별한 혜택을 만나보세요.",
  openGraph: {
    title: "프리미엄 라이프의 시작 | 아파트 브랜드 상담 예약",
    description:
      "프리미엄 라이프를 위한 첫 걸음. 방문상담을 예약하시고 특별한 혜택을 만나보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
