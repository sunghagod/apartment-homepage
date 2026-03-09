"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header({ siteName }: { siteName?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navItems = [
    { label: "단지소개", id: "features" },
    { label: "입지안내", id: "location" },
    { label: "커뮤니티", id: "amenities" },
    { label: "평형안내", id: "floorplan" },
  ];

  return (
    <header
      className={`fixed top-0 w-full h-14 tablet:h-20 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--brand-bg)]/90 backdrop-blur-md border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center"
        >
          <Image
            src="/logo-white.svg"
            alt={siteName || "더리브 라포레"}
            width={140}
            height={40}
            className="h-6 tablet:h-8 w-auto"
            priority
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden tablet:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goto(item.id)}
              className="text-sm font-normal text-white/75 tracking-[0px] hover:text-white transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:062)381-3857"
            className="text-[13px] font-medium text-white/75 hover:text-[var(--brand-gold)] transition-colors duration-300 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9c-1.3-.7-2.5-1.9-3.2-3.2l1.3-1.3c.3-.3.4-.7.4-1.2 0-1-.5-2-1.3-2.7L4 1.8C3.6 1.4 3 1.2 2.5 1.2 1.7 1.2 1 1.5.6 2L.3 2.4C-.3 3-.4 4 .1 5.2c1.3 3.3 4.5 6.4 7.7 7.7.5.2 1 .3 1.5.3 1 0 1.8-.4 2.3-.9l.3-.3c.4-.4.6-1 .6-1.5 0-.5-.2-1-.6-1.4l-1.2-1.1z"/></svg>
            062)381-3857
          </a>
          <button
            onClick={() => goto("reservation")}
            className="text-[13px] font-medium px-5 py-2.5 border border-[var(--brand-gold)] text-[var(--brand-gold)] tracking-[0.3px] uppercase hover:bg-[var(--brand-gold)] hover:text-[var(--brand-bg)] transition-all duration-300"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            상담 예약
          </button>
        </nav>

        {/* Hamburger */}
        <button
          className="tablet:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen
                  ? i === 0
                    ? "rotate-45 translate-y-[6.5px]"
                    : i === 1
                    ? "opacity-0"
                    : "-rotate-45 -translate-y-[6.5px]"
                  : ""
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="tablet:hidden bg-[var(--brand-surface)] border-t border-white/[0.06]">
          <nav className="flex flex-col px-6 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goto(item.id)}
                className="text-left text-base font-light text-white/75 py-4 border-b border-white/[0.06] hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
            <a
              href="tel:062)381-3857"
              className="flex items-center gap-2 text-base font-medium text-white py-4 border-b border-white/[0.06]"
            >
              <svg className="w-4 h-4 text-[var(--brand-gold)]" viewBox="0 0 16 16" fill="currentColor"><path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9c-1.3-.7-2.5-1.9-3.2-3.2l1.3-1.3c.3-.3.4-.7.4-1.2 0-1-.5-2-1.3-2.7L4 1.8C3.6 1.4 3 1.2 2.5 1.2 1.7 1.2 1 1.5.6 2L.3 2.4C-.3 3-.4 4 .1 5.2c1.3 3.3 4.5 6.4 7.7 7.7.5.2 1 .3 1.5.3 1 0 1.8-.4 2.3-.9l.3-.3c.4-.4.6-1 .6-1.5 0-.5-.2-1-.6-1.4l-1.2-1.1z"/></svg>
              062)381-3857
            </a>
            <button
              onClick={() => goto("reservation")}
              className="text-left text-base font-medium text-[var(--brand-gold)] py-4 hover:text-[var(--brand-gold-lt)] transition-colors"
            >
              방문상담 예약하기
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
