"use client";

import { useState, useEffect, useRef } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

const DEFAULT_TABS = [
  {
    id: "layout",
    label: "배치도",
    subtitle: "SITE PLAN",
    description: "남향 위주의 동 배치로 채광과 통풍을 극대화하였으며, 단지 내 녹지 공간을 풍부하게 확보하였습니다.",
    badges: ["남향 위주 배치", "중앙 녹지 광장", "지하 주차 연결"],
    imageUrl: "",
  },
  {
    id: "location",
    label: "광역도",
    subtitle: "LOCATION MAP",
    description: "지하철역 도보 5분, 주요 간선도로 인접. 서울 전역으로의 빠른 접근이 가능한 탁월한 입지입니다.",
    badges: ["지하철 도보 5분", "버스 정류장 1분", "IC 10분"],
    imageUrl: "",
  },
];

interface SitemapSection {
  imageUrl: string;
  description: string;
  badges: string[];
}

interface SitemapContent {
  location: SitemapSection;
  layout: SitemapSection;
}

export default function SiteMap({ sitemap }: { sitemap?: SitemapContent }) {
  const [activeTab, setActiveTab] = useState("layout");
  const [lightbox, setLightbox] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = sitemap
    ? [
        { ...DEFAULT_TABS[0], ...sitemap.layout },
        { ...DEFAULT_TABS[1], ...sitemap.location },
      ]
    : DEFAULT_TABS;

  const active = tabs.find((t) => t.id === activeTab)!;

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector(".sitemap-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
      gsap.from(sectionRef.current.querySelector(".sitemap-body"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power2.out",
      });
    };
    init();
  }, []);

  return (
    <>
    <section
      id="sitemap"
      ref={sectionRef}
      className="bg-[var(--brand-bg)] py-14 desktop:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="sitemap-header mb-10 desktop:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Location &amp; Site Plan
            </span>
          </div>
          <h2 className="text-[36px] tablet:text-[52px] font-bold text-white tracking-[-2px]">
            단지 위치 및 배치
          </h2>
        </div>

        {/* Tabs */}
        <div className="sitemap-body">
          <div className="flex gap-0 mb-8 border-b border-white/[0.1]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 tablet:px-10 py-3 text-[15px] tablet:text-[18px] font-normal tracking-[-0.3px] transition-all duration-250 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "text-white font-semibold border-[var(--brand-gold)]"
                    : "text-white/58 border-transparent hover:text-white/80"
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col desktop:flex-row gap-8 items-start">
            {/* Map image / placeholder */}
            <div className="w-full desktop:w-3/5">
              <div
                className={`relative aspect-[16/10] bg-[var(--brand-surface)] border border-white/[0.08] overflow-hidden flex items-center justify-center group${active.imageUrl ? " cursor-zoom-in" : ""}`}
                onClick={() => active.imageUrl && setLightbox(true)}
              >
                {active.imageUrl ? (
                  <>
                    <img
                      src={active.imageUrl}
                      alt={active.subtitle}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="2" />
                          <line x1="18" y1="18" x2="25" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                          <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
                    <div className="text-center">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        className="mx-auto mb-4 opacity-20"
                      >
                        {activeTab === "location" ? (
                          <>
                            <circle cx="24" cy="20" r="8" stroke="currentColor" strokeWidth="2" className="text-[var(--brand-gold)]" />
                            <path d="M24 4C15.163 4 8 11.163 8 20c0 12 16 28 16 28s16-16 16-28c0-8.837-7.163-16-16-16z" stroke="currentColor" strokeWidth="2" fill="none" className="text-[var(--brand-gold)]" />
                            <circle cx="24" cy="20" r="3" fill="currentColor" className="text-[var(--brand-gold)]" />
                          </>
                        ) : (
                          <>
                            <rect x="4" y="4" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="2" className="text-[var(--brand-gold)]" />
                            <rect x="10" y="10" width="12" height="10" stroke="currentColor" strokeWidth="1.5" className="text-[var(--brand-gold)]" />
                            <rect x="26" y="10" width="12" height="10" stroke="currentColor" strokeWidth="1.5" className="text-[var(--brand-gold)]" />
                            <rect x="10" y="28" width="28" height="10" stroke="currentColor" strokeWidth="1.5" className="text-[var(--brand-gold)]" />
                          </>
                        )}
                      </svg>
                      <p className="text-white/30 text-[13px] font-light">
                        {active.subtitle} 이미지 교체 예정
                      </p>
                    </div>
                  </>
                )}

                {/* Tab badge */}
                <div className="absolute top-4 left-4 bg-[var(--brand-gold)] text-[var(--brand-bg)] text-xs font-medium px-3 py-1.5 tracking-[-0.2px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {active.subtitle}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="w-full desktop:w-2/5 desktop:pt-2">
              <p className="text-[15px] font-normal text-white/75 leading-relaxed mb-8">
                {active.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-10">
                {active.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[13px] font-light text-[var(--brand-gold)] border border-[var(--brand-gold)]/50 px-4 py-2"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {!active.imageUrl && (
                <div className="border-t border-white/[0.08] pt-6">
                  <p className="text-[12px] font-normal text-white/48 leading-relaxed">
                    * 실제 {active.label} 이미지는 추후 업데이트 예정입니다.<br />
                    분양 문의 시 상세 자료를 제공해 드립니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

    {lightbox && active.imageUrl && (
      <ImageLightbox
        src={active.imageUrl}
        alt={active.subtitle}
        onClose={() => setLightbox(false)}
      />
    )}
    </>
  );
}
