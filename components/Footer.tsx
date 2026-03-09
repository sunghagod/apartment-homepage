import Image from "next/image";

export default function Footer({ siteName }: { siteName?: string }) {
  return (
    <footer className="bg-[var(--brand-bg)] border-t border-white/[0.06]">
      {/* Brand name strip */}
      <div className="border-b border-white/[0.06] py-10 px-6">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <Image
            src="/logo-white.svg"
            alt={siteName || "더리브 라포레"}
            width={180}
            height={50}
            className="h-10 w-auto"
          />
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-[var(--brand-gold)]/40" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)]/60 tracking-[3px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Premium Residence
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1320px] mx-auto px-6 py-14">
        <div className="flex flex-col tablet:flex-row justify-between gap-10">
          {/* Company Info */}
          <div className="flex-1 max-w-xs">
            <h4
              className="text-[12px] font-medium text-white/40 tracking-[2px] uppercase mb-5"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              사업지 안내
            </h4>
            <div className="space-y-2 text-[14px] font-light text-[var(--n-400)] leading-relaxed">
              <p>광주광역시 남구 진월동</p>
              <p>
                <a href="tel:062)381-3857" className="text-[var(--brand-gold)] font-medium hover:text-[var(--brand-gold-lt)] transition-colors">
                  062)381-3857
                </a>
              </p>
              <p>이메일: sunghagod@gmail.com</p>
              <p>시행: 진월동지역주택조합 / 시공: SGC E&amp;C</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex-1">
            <h4
              className="text-[12px] font-medium text-white/40 tracking-[2px] uppercase mb-5"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              고객 서비스
            </h4>
            <nav className="space-y-3 text-[14px]">
              <a
                href="#reservation"
                className="block font-light text-[var(--n-300)] transition-colors duration-300 hover:text-white"
              >
                방문상담 예약
              </a>
              <a
                href="#features"
                className="block font-light text-[var(--n-300)] transition-colors duration-300 hover:text-white"
              >
                단지소개
              </a>
              <a
                href="#floorplan"
                className="block font-light text-[var(--n-300)] transition-colors duration-300 hover:text-white"
              >
                평형안내
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex-1">
            <h4
              className="text-[12px] font-medium text-white/40 tracking-[2px] uppercase mb-5"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              약관 및 정책
            </h4>
            <nav className="space-y-3 text-[14px]">
              <a
                href="/privacy"
                className="block font-light text-[var(--n-300)] transition-colors duration-300 hover:text-white"
              >
                개인정보처리방침
              </a>
              <a
                href="/terms"
                className="block font-light text-[var(--n-300)] transition-colors duration-300 hover:text-white"
              >
                이용약관
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/[0.05] py-6 px-6">
        <div className="max-w-[1320px] mx-auto flex flex-col gap-3">
          <div className="space-y-1">
            <p className="text-[12px] font-light text-[var(--n-400)]">
              시행 : 진월동지역주택조합 &nbsp;|&nbsp; 시공 : SGC E&amp;C
            </p>
            <p className="text-[12px] font-light text-[var(--n-400)]">
              사업명 : 진월 더리브 라포레 &nbsp;|&nbsp; 사업지위치 : 광주광역시 남구 진월동 산3번지 일원
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-light text-[var(--n-500)]">
              * 본 홈페이지의 CG, 이미지컷은 소비자의 이해를 돕기 위해 제작된 것으로 실제와 다소 차이가 있을 수 있습니다.
            </p>
            <p className="text-[11px] font-light text-[var(--n-500)]">
              * 본 홈페이지에 명시된 모든 개발계획은 관계기관 혹은 지자체의 사정에 의해 변경 또는 취소될 수 있습니다.
            </p>
          </div>
          <p className="text-[11px] font-light text-[var(--n-600)]">
            &copy; {new Date().getFullYear()} {siteName || "Brand Apartment"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
