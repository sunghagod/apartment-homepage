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
      className={`fixed top-0 w-full h-20 z-50 transition-all duration-500 ${
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
            className="h-8 w-auto"
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
          <button
            onClick={() => goto("reservation")}
            className="text-[13px] font-medium px-5 py-2.5 border border-[var(--brand-gold)] text-[var(--brand-gold)] tracking-[0.3px] uppercase hover:bg-[var(--brand-gold)] hover:text-[var(--brand-bg)] transition-all duration-300"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            예약하기
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
            <button
              onClick={() => goto("reservation")}
              className="text-left text-base font-medium text-[var(--brand-gold)] py-4 hover:text-[var(--brand-gold-lt)] transition-colors"
            >
              상담 예약하기
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
