export default function Footer({ siteName }: { siteName?: string }) {
  return (
    <footer className="bg-[var(--brand-bg)] border-t border-white/[0.06]">
      {/* Brand name strip */}
      <div className="border-b border-white/[0.06] py-10 px-6">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <span
            className="text-[22px] font-bold text-white tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {siteName || "BRAND APARTMENT"}
          </span>
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
              <p>대표전화: 추후 공개 예정</p>
              <p>시행: SGC E&amp;C(주) / 시공: THE LIV</p>
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
        <div className="max-w-[1320px] mx-auto flex flex-col gap-2">
          <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-2">
            <p className="text-[12px] font-light text-[var(--n-400)]">
              &copy; {new Date().getFullYear()} {siteName || "Brand Apartment"}. All rights reserved.
            </p>
            <p className="text-[12px] font-light text-[var(--n-500)]">
              본 사이트의 내용은 분양 관련 참고용이며, 실제 내용과 차이가 있을 수 있습니다.
            </p>
          </div>
          <p className="text-[11px] font-light text-[var(--n-600)]">
            본 사이트의 모든 콘텐츠, 디자인 및 코드는 저작권법의 보호를 받습니다. 무단 복제, 배포, 수정을 금지합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
