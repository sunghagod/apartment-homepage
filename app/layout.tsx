import type { Metadata } from "next";
import { Noto_Sans_KR, Manrope } from "next/font/google";
import "./globals.css";
import CopyrightGuard from "@/components/CopyrightGuard";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://jinwol-laforet.vercel.app";
const OG_IMAGE =
  "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772701113/apartment/hero.png";

export const metadata: Metadata = {
  title: "진월 더리브 라포레 | 광주 남구 진월동 300세대 프리미엄 아파트",
  description:
    "광주광역시 남구 진월동, 전용 84~126㎡ 총 300세대. 4Bay 판상형 설계의 프리미엄 주거공간 진월 더리브 라포레. 방문상담 예약 접수 중.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "진월 더리브 라포레 | 광주 남구 진월동 300세대 프리미엄 아파트",
    description:
      "광주광역시 남구 진월동, 전용 84~126㎡ 총 300세대. 4Bay 판상형 설계의 프리미엄 주거공간. 방문상담 예약 접수 중.",
    type: "website",
    url: SITE_URL,
    siteName: "진월 더리브 라포레",
    locale: "ko_KR",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "진월 더리브 라포레 조감도",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "진월 더리브 라포레 | 광주 남구 진월동 300세대 프리미엄 아파트",
    description:
      "광주광역시 남구 진월동, 전용 84~126㎡ 총 300세대. 4Bay 판상형 설계의 프리미엄 주거공간.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${manrope.variable}`}>
      <body>
        <CopyrightGuard />
        {children}
      </body>
    </html>
  );
}
