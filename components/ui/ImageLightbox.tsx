"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Refs for gesture tracking (no re-render needed)
  const gestureRef = useRef({
    startDist: 0,
    startScale: 1,
    startMid: { x: 0, y: 0 },
    // pan
    isPanning: false,
    panStart: { x: 0, y: 0 },
    panTranslate: { x: 0, y: 0 },
    // double tap
    lastTap: 0,
  });

  const clampTranslate = useCallback(
    (tx: number, ty: number, s: number) => {
      if (s <= 1) return { x: 0, y: 0 };
      const img = imgRef.current;
      if (!img) return { x: tx, y: ty };
      const rect = img.getBoundingClientRect();
      const w = rect.width / s; // original rendered width
      const h = rect.height / s;
      const maxX = (w * (s - 1)) / 2;
      const maxY = (h * (s - 1)) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, tx)),
        y: Math.max(-maxY, Math.min(maxY, ty)),
      };
    },
    []
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Keyboard ESC
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

  // Touch handlers on the container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const g = gestureRef.current;

    const dist = (t1: Touch, t2: Touch) =>
      Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        g.startDist = dist(e.touches[0], e.touches[1]);
        g.startScale = scale;
        g.isPanning = false;
      } else if (e.touches.length === 1) {
        // Double-tap detection
        const now = Date.now();
        if (now - g.lastTap < 300) {
          e.preventDefault();
          if (scale > 1) {
            resetZoom();
          } else {
            setScale(2.5);
          }
          g.lastTap = 0;
          return;
        }
        g.lastTap = now;

        // Start pan if zoomed
        if (scale > 1) {
          e.preventDefault();
          g.isPanning = true;
          g.panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          g.panTranslate = { ...translate };
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const newDist = dist(e.touches[0], e.touches[1]);
        const newScale = Math.max(1, Math.min(5, g.startScale * (newDist / g.startDist)));
        setScale(newScale);
        if (newScale <= 1) setTranslate({ x: 0, y: 0 });
      } else if (e.touches.length === 1 && g.isPanning) {
        e.preventDefault();
        const dx = e.touches[0].clientX - g.panStart.x;
        const dy = e.touches[0].clientY - g.panStart.y;
        const img = imgRef.current;
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const w = rect.width / scale;
        const h = rect.height / scale;
        const maxX = (w * (scale - 1)) / 2;
        const maxY = (h * (scale - 1)) / 2;
        setTranslate({
          x: Math.max(-maxX, Math.min(maxX, g.panTranslate.x + dx)),
          y: Math.max(-maxY, Math.min(maxY, g.panTranslate.y + dy)),
        });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        g.startDist = 0;
      }
      if (e.touches.length === 0) {
        g.isPanning = false;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scale, translate, resetZoom, clampTranslate]);

  // Mouse wheel zoom (desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((prev) => {
        const next = Math.max(1, Math.min(5, prev - e.deltaY * 0.003));
        if (next <= 1) setTranslate({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleBackdropClick = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      onClose();
    }
  };

  const isZoomed = scale > 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 animate-[fadeIn_0.2s_ease]"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        className="absolute top-5 right-5 z-10 text-white/60 hover:text-white transition-colors"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="닫기"
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <line x1="7" y1="7" x2="29" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="7" x2="7" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Zoomable image container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center touch-none select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain shadow-2xl transition-transform duration-100"
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          }}
          draggable={false}
          onClick={() => { if (!isZoomed) handleBackdropClick(); }}
        />
      </div>

      {/* Hint */}
      <p className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-[12px] font-light tracking-wide select-none transition-opacity duration-300 ${isZoomed ? "opacity-0" : "opacity-100"}`}>
        두 손가락으로 확대 · 더블탭 줌 · 배경 클릭으로 닫기
      </p>

      {/* Zoom indicator */}
      {isZoomed && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white/70 text-[12px] font-light" style={{ fontFamily: "var(--font-secondary)" }}>
            {Math.round(scale * 100)}%
          </span>
        </div>
      )}
    </div>
  );
}
