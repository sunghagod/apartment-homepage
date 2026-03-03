"use client";

import { useEffect } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
        onClick={onClose}
        aria-label="닫기"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <line x1="7" y1="7" x2="29" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="7" x2="7" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Image — stopPropagation so clicking the image doesn't close */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Hint */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[12px] font-light tracking-wide select-none">
        ESC 또는 배경 클릭으로 닫기
      </p>
    </div>
  );
}
