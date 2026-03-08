"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(".ty-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .from(".ty-title", { opacity: 0, y: 24, duration: 0.6 }, "-=0.2")
        .from(".ty-desc", { opacity: 0, y: 18, duration: 0.5 }, "-=0.3")
        .from(".ty-info", { opacity: 0, y: 18, duration: 0.5 }, "-=0.25")
        .from(".ty-actions", { opacity: 0, y: 16, duration: 0.5 }, "-=0.2");
    };
    init();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--brand-bg)] flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="ty-icon mx-auto mb-8 w-20 h-20 rounded-full bg-[var(--brand-gold)]/10 border-2 border-[var(--brand-gold)] flex items-center justify-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              d="M8 18l7 7L28 11"
              stroke="var(--brand-gold)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="ty-title text-[32px] tablet:text-[42px] font-bold text-white tracking-[-1.5px] mb-4">
          예약이 접수되었습니다
        </h1>

        {/* Description */}
        <p className="ty-desc text-[15px] tablet:text-[16px] font-light text-white/60 leading-relaxed mb-10 max-w-sm mx-auto">
          입력하신 연락처로 담당자가 확인 후<br />
          빠른 시일 내에 연락드리겠습니다.
        </p>

        {/* Info card */}
        <div className="ty-info bg-[var(--brand-surface)] border border-white/[0.08] p-6 tablet:p-8 mb-10">
          <p
            className="text-[10px] font-medium text-[var(--brand-gold)]/60 tracking-[3px] uppercase mb-5"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            안내사항
          </p>
          <div className="space-y-3 text-[14px] font-light text-white/55 text-left">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-semibold text-[var(--brand-gold)]">1</span>
              </span>
              <span>접수 확인 후 <span className="text-white/80 font-normal">1~2 영업일 내</span> 연락드립니다.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-semibold text-[var(--brand-gold)]">2</span>
              </span>
              <span>방문상담 시 <span className="text-white/80 font-normal">신분증</span>을 지참해주세요.</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--brand-gold)]/10 flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-semibold text-[var(--brand-gold)]">3</span>
              </span>
              <span>사업지: <span className="text-white/80 font-normal">광주광역시 남구 진월동</span></span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ty-actions flex flex-col tablet:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[14px] font-semibold px-8 py-3.5 tracking-[0.3px] uppercase hover:bg-[var(--brand-gold-lt)] active:scale-[0.98] transition-all duration-300"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/#floorplan"
            className="text-white/50 text-[14px] font-light hover:text-white transition-colors duration-300"
          >
            평형안내 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
