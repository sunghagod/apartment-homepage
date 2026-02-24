"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full h-20 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`text-2xl font-bold tracking-[-1px] transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}
        >
          BRAND APARTMENT
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden tablet:flex items-center gap-10">
          {[
            { label: "단지소개", id: "features" },
            { label: "평형안내", id: "floorplan" },
            { label: "상담예약", id: "reservation" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-base font-light tracking-[-0.5px] transition-colors duration-300 hover:opacity-70 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("reservation")}
            className="bg-[var(--color-accent)] text-white text-sm font-light px-5 py-2.5 tracking-[-0.5px] transition-opacity duration-300 hover:opacity-85"
          >
            예약하기
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="tablet:hidden flex flex-col gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-gray-800" : "bg-white"
            } ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-gray-800" : "bg-white"
            } ${mobileMenuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-gray-800" : "bg-white"
            } ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="tablet:hidden bg-white shadow-md">
          <nav className="flex flex-col px-6 py-4">
            {[
              { label: "단지소개", id: "features" },
              { label: "상담예약", id: "reservation" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-base font-light text-gray-800 py-3 border-b border-gray-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
