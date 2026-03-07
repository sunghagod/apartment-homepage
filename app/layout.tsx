import type { Metadata } from "next";
import "./globals.css";
import CopyrightGuard from "@/components/CopyrightGuard";

export const metadata: Metadata = {
  title: "진월 더리브 라포레 | 광주 남구 진월동 300세대 프리미엄 아파트",
  description:
    "광주광역시 남구 진월동, 전용 84~126㎡ 총 300세대. 4Bay 판상형 설계의 프리미엄 주거공간 진월 더리브 라포레. 방문상담 예약 접수 중.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "진월 더리브 라포레 | 광주 남구 진월동 300세대 프리미엄 아파트",
    description:
      "광주광역시 남구 진월동, 전용 84~126㎡ 총 300세대. 4Bay 판상형 설계의 프리미엄 주거공간. 방문상담 예약 접수 중.",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772701113/apartment/hero.png",
        width: 1200,
        height: 630,
        alt: "진월 더리브 라포레 조감도",
      },
    ],
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
      <body>
        <CopyrightGuard />
        {children}
      </body>
    </html>
  );
}
