"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapModule: typeof import("gsap") | null = null;
    let scrollTriggerModule: typeof import("gsap/ScrollTrigger") | null = null;

    const initAnimation = async () => {
      gsapModule = await import("gsap");
      scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        const tl = gsap.timeline();
        tl.from(heroRef.current.querySelector(".hero-badge"), {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.3,
        })
          .from(
            heroRef.current.querySelector(".hero-title"),
            {
              opacity: 0,
              y: 30,
              duration: 0.8,
            },
            "-=0.3"
          )
          .from(
            heroRef.current.querySelector(".hero-subtitle"),
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.4"
          )
          .from(
            heroRef.current.querySelector(".hero-cta"),
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.3"
          );
      }
    };

    initAnimation();
  }, []);

  const scrollToReservation = () => {
    const element = document.getElementById("reservation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 text-center">
        <div className="hero-badge inline-block mb-6">
          <span className="text-sm font-light text-[var(--theme-accent)] tracking-[2px] uppercase border border-[var(--theme-accent)]/40 px-5 py-2">
            PREMIUM RESIDENCE
          </span>
        </div>
        <h1 className="hero-title text-[40px] tablet:text-[56px] desktop:text-[64px] font-medium text-white leading-tight tracking-[-2px] mb-6">
          프리미엄 라이프의
          <br />
          새로운 시작
        </h1>
        <p className="hero-subtitle text-base tablet:text-lg font-light text-white/80 tracking-[-0.5px] mb-10 max-w-xl mx-auto leading-relaxed">
          도심 속 자연과 함께하는 품격 있는 주거 공간.
          <br />
          당신의 라이프스타일에 맞춘 프리미엄 설계를 경험하세요.
        </p>
        <button
          onClick={scrollToReservation}
          className="hero-cta bg-[var(--color-accent)] text-white text-lg font-light px-10 py-4 tracking-[-0.5px] transition-opacity duration-300 hover:opacity-85"
        >
          방문상담 예약하기
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-light tracking-[2px]">
          SCROLL
        </span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
