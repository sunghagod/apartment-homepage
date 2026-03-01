"use client";

import { useEffect, useRef } from "react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80";

interface HeroContent {
  imageUrl?: string;
  eyebrow?: string;
  lines?: string[];
  description?: string;
  stats?: { val: string; unit: string; label: string }[];
}

export default function Hero({ content }: { content?: HeroContent }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgImage = content?.imageUrl || DEFAULT_IMAGE;
  const eyebrow = content?.eyebrow || "Premium Residence";
  const lines = content?.lines || ["프리미엄", "라이프의", "새로운 시작"];
  const description =
    content?.description ||
    "도심 속 자연과 함께하는 품격 있는 주거 공간.\n당신의 라이프스타일에 맞춘 프리미엄 설계.";
  const stats = content?.stats || [
    { val: "59–84", unit: "㎡", label: "전용 평형" },
    { val: "3", unit: "개 타입", label: "평면 구성" },
    { val: "2026", unit: "년", label: "입주 예정" },
  ];

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!heroRef.current) return;

      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".hero-rule", {
        scaleX: 0,
        duration: 0.9,
        ease: "power3.inOut",
        transformOrigin: "left center",
      })
        .from(".hero-eyebrow", { opacity: 0, x: -16, duration: 0.5 }, "-=0.3")
        .from(
          ".hero-t1",
          { opacity: 0, y: 55, duration: 0.85, ease: "power3.out" },
          "-=0.2"
        )
        .from(
          ".hero-t2",
          { opacity: 0, y: 55, duration: 0.85, ease: "power3.out" },
          "-=0.65"
        )
        .from(
          ".hero-t3",
          { opacity: 0, y: 55, duration: 0.85, ease: "power3.out" },
          "-=0.65"
        )
        .from(".hero-desc", { opacity: 0, y: 24, duration: 0.65 }, "-=0.45")
        .from(".hero-actions", { opacity: 0, y: 24, duration: 0.65 }, "-=0.45")
        .from(".hero-stats", { opacity: 0, y: 18, duration: 0.6 }, "-=0.35");
    };
    init();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-[var(--brand-bg)]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.03]"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-[#09090D]/65 to-[#09090D]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090D]/80 via-[#09090D]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full pt-24 pb-12 desktop:pt-0 desktop:pb-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-5 mb-6 desktop:mb-10">
          <div className="hero-rule h-px w-14 bg-[var(--brand-gold)]" />
          <span
            className="hero-eyebrow text-[15px] font-medium text-[var(--brand-gold)] tracking-[3px] uppercase"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <div className="mb-5 desktop:mb-8 overflow-hidden">
          <h1 className="leading-[1.04]">
            <span className="hero-t1 block text-[40px] tablet:text-[62px] desktop:text-[84px] font-bold text-white tracking-[-2px] desktop:tracking-[-3px]">
              {lines[0]}
            </span>
            <span className="hero-t2 block text-[40px] tablet:text-[62px] desktop:text-[84px] font-bold tracking-[-2px] desktop:tracking-[-3px] text-[var(--brand-gold)]">
              {lines[1]}
            </span>
            <span className="hero-t3 block text-[40px] tablet:text-[62px] desktop:text-[84px] font-bold text-white tracking-[-2px] desktop:tracking-[-3px]">
              {lines[2]}
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="hero-desc text-[14px] font-light text-white/55 leading-relaxed mb-6 desktop:mb-8 max-w-[380px] whitespace-pre-line">
          {description}
        </p>

        {/* CTAs */}
        <div className="hero-actions flex flex-wrap items-center gap-5">
          <button
            onClick={() =>
              document
                .getElementById("reservation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[14px] font-semibold px-8 py-3.5 desktop:px-10 desktop:py-4 tracking-[0.3px] uppercase transition-all duration-300 hover:bg-[var(--brand-gold-lt)] active:scale-[0.98]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            방문상담 예약하기
          </button>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 text-white/50 text-[15px] font-light hover:text-white/80 transition-colors duration-300"
          >
            단지소개
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Stats — 모바일 숨김 */}
        <div className="hero-stats hidden desktop:grid mt-20 pt-7 border-t border-white/[0.08] grid-cols-3 gap-4 max-w-xs">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-xl font-bold text-white leading-none mb-1.5"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {s.val}
                <span className="text-[11px] font-light text-[var(--brand-gold)] ml-1">
                  {s.unit}
                </span>
              </p>
              <p className="text-[11px] font-light text-white/38 tracking-[0.3px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 tablet:right-10 flex flex-col items-center gap-3">
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-white/20" />
        <span
          className="text-white/22 text-[9px] tracking-[3px]"
          style={{
            writingMode: "vertical-rl",
            fontFamily: "var(--font-secondary)",
          }}
        >
          SCROLL
        </span>
      </div>
    </section>
  );
}
