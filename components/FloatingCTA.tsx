"use client";

import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToReservation = () => {
    document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-8 right-6 tablet:right-8 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-end gap-2.5">
        {/* Phone button */}
        <a
          href="tel:062)381-3857"
          className="flex items-center gap-2 bg-white/95 text-[var(--brand-bg)] pl-3 pr-4 py-2.5 desktop:pl-4 desktop:pr-5 desktop:py-3 hover:bg-white active:scale-[0.97] transition-all duration-300"
          style={{
            fontFamily: "var(--font-secondary)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
          aria-label="전화 상담"
        >
          <svg className="w-4 h-4 desktop:w-5 desktop:h-5 text-[var(--brand-gold)]" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9c-1.3-.7-2.5-1.9-3.2-3.2l1.3-1.3c.3-.3.4-.7.4-1.2 0-1-.5-2-1.3-2.7L4 1.8C3.6 1.4 3 1.2 2.5 1.2 1.7 1.2 1 1.5.6 2L.3 2.4C-.3 3-.4 4 .1 5.2c1.3 3.3 4.5 6.4 7.7 7.7.5.2 1 .3 1.5.3 1 0 1.8-.4 2.3-.9l.3-.3c.4-.4.6-1 .6-1.5 0-.5-.2-1-.6-1.4l-1.2-1.1z" fill="currentColor" />
          </svg>
          <span className="text-[12px] desktop:text-[14px] font-bold tracking-[-0.3px]">062)381-3857</span>
        </a>

        {/* Gold ring pulse */}
        <div className="relative">
        <div
          className="absolute inset-0 animate-ping bg-[var(--brand-gold)]/20"
          style={{ animationDuration: "2.2s" }}
        />

        {/* Main button */}
        <button
          onClick={scrollToReservation}
          className="group relative flex items-center gap-2 bg-[var(--brand-gold)] text-[var(--brand-bg)] pl-3 pr-4 py-2.5 desktop:pl-4 desktop:pr-6 desktop:py-3.5 hover:bg-[var(--brand-gold-lt)] active:scale-[0.97] transition-all duration-300"
          style={{
            fontFamily: "var(--font-secondary)",
            boxShadow:
              "0 6px 28px rgba(200,168,112,0.35), 0 2px 8px rgba(0,0,0,0.4)",
          }}
          aria-label="방문상담 예약하기"
        >
          {/* Calendar icon wrap */}
          <span className="flex-shrink-0 w-7 h-7 desktop:w-10 desktop:h-10 bg-[var(--brand-bg)]/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--brand-bg)]/15 text-white">
            <svg width="19" height="19" viewBox="0 0 20 20" fill="none">
              <rect
                x="2" y="4" width="16" height="14"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
              <line x1="6.5" y1="2" x2="6.5" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="13.5" y1="2" x2="13.5" y2="6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <line x1="2" y1="8.5" x2="18" y2="8.5" stroke="currentColor" strokeWidth="1.4"/>
              <circle cx="6.5" cy="12.5" r="1.2" fill="currentColor"/>
              <circle cx="10" cy="12.5" r="1.2" fill="currentColor"/>
              <circle cx="13.5" cy="12.5" r="1.2" fill="currentColor"/>
              <circle cx="6.5" cy="16" r="1.2" fill="currentColor"/>
              <circle cx="10" cy="16" r="1.2" fill="currentColor"/>
            </svg>
          </span>

          {/* Text */}
          <div className="text-left">
            <p className="text-[10px] desktop:text-[11px] font-semibold tracking-[2px] uppercase opacity-60 leading-none mb-1">
              방문상담
            </p>
            <p className="text-[13px] desktop:text-[15px] font-bold tracking-[-0.2px] leading-none whitespace-nowrap text-white">
              예약하기 →
            </p>
          </div>

          {/* Arrow */}
          <svg
            className="ml-0.5 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Live badge */}
        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4">
          <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 animate-ping opacity-70" />
          <span className="relative w-3 h-3 rounded-full bg-red-500" />
        </span>
      </div>
      </div>
    </div>
  );
}
