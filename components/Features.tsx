"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_FEATURES = [
  {
    num: "01",
    title: "프리미엄 입지",
    subtitle: "PRIME LOCATION",
    description:
      "도심 핵심 지역에 위치하여 생활 인프라와 교통 편의성을 모두 누릴 수 있는 최적의 입지 조건을 갖추었습니다.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
  {
    num: "02",
    title: "혁신 설계",
    subtitle: "INNOVATIVE DESIGN",
    description:
      "입주민의 라이프스타일을 세심하게 반영한 평면 설계로, 공간 효율성과 개방감을 극대화한 주거 공간을 제공합니다.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  },
  {
    num: "03",
    title: "커뮤니티 시설",
    subtitle: "COMMUNITY",
    description:
      "피트니스 센터, 독서실, 키즈카페 등 다양한 커뮤니티 시설을 갖춰 입주민의 삶의 질을 한 단계 높여드립니다.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
  },
  {
    num: "04",
    title: "교통 편의",
    subtitle: "TRANSPORTATION",
    description:
      "지하철역 도보 5분 거리, 주요 간선도로와 인접하여 서울 전역으로의 빠른 이동이 가능한 탁월한 교통 환경입니다.",
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=900&q=80",
  },
];

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80",
  "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=900&q=80",
];

interface FeatureContent {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
}

export default function Features({ features: featureContent }: { features?: FeatureContent[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");

  const features = featureContent
    ? featureContent.map((f, i) => ({
        num: f.id,
        title: f.title,
        subtitle: f.subtitle,
        description: f.description,
        image: f.imageUrl || DEFAULT_IMAGES[i] || "",
      }))
    : DEFAULT_FEATURES;

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      // Header animation
      gsap.from(sectionRef.current.querySelector(".feat-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 32,
        duration: 0.9,
      });

      // Per-row animations
      sectionRef.current.querySelectorAll(".feat-row").forEach((row) => {
        gsap.from(row.querySelector(".feat-text"), {
          scrollTrigger: { trigger: row, start: "top 78%" },
          opacity: 0,
          x: -28,
          duration: 0.85,
          ease: "power3.out",
        });
        gsap.from(row.querySelector(".feat-img-wrap"), {
          scrollTrigger: { trigger: row, start: "top 78%" },
          opacity: 0,
          duration: 1.1,
          ease: "power2.out",
        });
      });
    };
    init();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="bg-[var(--brand-bg)]">
      {/* 라이트박스 모달 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt="교통 안내 지도 확대"
            className="max-w-full max-h-full object-contain"
            style={{ maxWidth: "95vw", maxHeight: "95vh" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white text-[28px] leading-none"
            onClick={() => setLightboxOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
      {/* Section Header */}
      <div className="feat-header max-w-[1320px] mx-auto px-6 pt-14 desktop:pt-24 pb-10 desktop:pb-14">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-10 bg-[var(--brand-gold)]" />
          <span
            className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            About
          </span>
        </div>
        <h2 className="text-[36px] tablet:text-[52px] font-bold text-white tracking-[-2px]">
          단지 소개
        </h2>
      </div>

      {/* Mobile: horizontal scroll cards */}
      <div
        className="desktop:hidden flex items-start gap-3 overflow-x-auto px-6 pb-8 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {features.map((feat) => {
          // feature-02: 오른쪽 파란 블록 숨김 → left 정렬
          // feature-03: 두 장면 와이드 이미지 → top 기준으로 잘라서 표시
          const mobileBgPos =
            feat.num === "02" ? "left center" :
            feat.num === "03" ? "center top" : "center";
          return (
          <div
            key={feat.num}
            className="relative flex-none w-[72vw] max-w-[280px] aspect-[3/4] snap-start overflow-hidden bg-[var(--brand-surface)] rounded-sm"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover"
              style={{ backgroundImage: `url('${feat.image}')`, backgroundPosition: mobileBgPos }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            {/* Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="h-px w-5 bg-[var(--brand-gold)]" />
                <span
                  className="text-[9px] font-medium text-[var(--brand-gold)] tracking-[3px] uppercase"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {feat.subtitle}
                </span>
              </div>
              <div>
                <span
                  className="text-[52px] font-bold text-white/8 leading-none block -mb-1"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {feat.num}
                </span>
                <h3 className="text-[20px] font-bold text-white tracking-[-0.5px] mb-2">
                  {feat.title}
                </h3>
                <p className="text-[13px] font-normal text-white/80 leading-relaxed line-clamp-4">
                  {feat.description}
                </p>
              </div>
            </div>
          </div>
          );
        })}
        {/* trailing spacer */}
        <div className="flex-none w-3" />
      </div>

      {/* Desktop: alternating rows */}
      <div className="hidden desktop:block border-t border-white/[0.06]">
        {features.map((feat, i) => {
          const isReversed = i % 2 === 1;
          const desktopBgPos = feat.num === "02" ? "left center" : "center center";
          const isTransport = feat.num === "04";
          return isTransport ? (
              /* ── 04 교통 편의: 입지 스타일 풀-레이아웃 ── */
              <div key={feat.num} className="feat-row border-b border-white/[0.06]">
                {/* 헤더 */}
                <div className="flex items-start justify-between px-6 desktop:px-16 pt-12 pb-8">
                  <div>
                    <span
                      className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[3px] uppercase mb-3 block"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {feat.subtitle}
                    </span>
                    <h3 className="text-[38px] desktop:text-[52px] font-bold text-white tracking-[-2px]">
                      {feat.title}
                    </h3>
                  </div>
                  {/* 뱃지 */}
                  <div className="border border-[var(--brand-gold)]/40 px-5 py-3 text-center shrink-0">
                    <span
                      className="text-[40px] font-bold text-[var(--brand-gold)] leading-none block"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      3분
                    </span>
                    <p className="text-[11px] text-white/55 leading-snug mt-1">
                      지하철 2호선<br />예정역 도보
                    </p>
                  </div>
                </div>

                {/* 본문: 이미지(좌) + 정보(우) */}
                <div className="feat-text flex flex-col desktop:flex-row px-6 desktop:px-16 pb-14 gap-8">
                  {/* 지도 이미지 */}
                  <div
                    className="feat-img-wrap relative w-full desktop:w-[57%] shrink-0 cursor-zoom-in group"
                    onClick={() => { setLightboxSrc(feat.image); setLightboxOpen(true); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feat.image}
                      alt="교통 안내 지도"
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ display: "block" }}
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5">
                      <span className="text-[10px] text-white/70 tracking-[2px] uppercase" style={{ fontFamily: "var(--font-secondary)" }}>
                        TRANSPORT MAP
                      </span>
                    </div>
                    {/* 확대 힌트 */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[10px] text-white/70">🔍 클릭하여 확대</span>
                    </div>
                  </div>

                  {/* 정보 패널 */}
                  <div className="w-full desktop:w-[43%] space-y-8">
                    {/* 교통 접근성 카드 */}
                    <div>
                      <p className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-4" style={{ fontFamily: "var(--font-secondary)" }}>
                        교통 접근성
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "지하철2호선 예정역", value: "도보 3분" },
                          { label: "서울대로", value: "단지 바로 인접" },
                          { label: "제2순환도로", value: "차량 5분" },
                          { label: "광주 시청", value: "차량 15분" },
                        ].map((card, ci) => (
                          <div key={ci} className="border border-white/[0.1] bg-white/[0.03] px-4 py-3">
                            <p className="text-[11px] text-white/45 mb-1.5">{card.label}</p>
                            <p className="text-[17px] font-bold text-white tracking-[-0.5px]">{card.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 광역 접근 */}
                    <div>
                      <p className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-4" style={{ fontFamily: "var(--font-secondary)" }}>
                        광역 접근
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          "나주혁신도시까지 약 20분",
                          "화순군까지 약 20분",
                          "전남도청 인접",
                          "효덕 IC 인근",
                        ].map((item, ii) => (
                          <li key={ii} className="flex items-center gap-3 text-[14px] text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 버스 */}
                    <div>
                      <p className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-2" style={{ fontFamily: "var(--font-secondary)" }}>
                        버스
                      </p>
                      <p className="text-[12px] text-white/40 mb-3">도보 5분 거리 버스정류장 4개소 · 총 18개 노선</p>
                      <ul className="space-y-2.5">
                        {[
                          "진월 07 — 송암공단 ~ 살레시오고",
                          "일곡 28 — 매월동 ~ 살레시오고",
                          "수완 03 — 청단 폭스존 ~ 송원대",
                        ].map((item, ii) => (
                          <li key={ii} className="flex items-center gap-3 text-[14px] text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 지하철 2호선 */}
                    <div>
                      <p className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-4" style={{ fontFamily: "var(--font-secondary)" }}>
                        지하철 2호선
                      </p>
                      <ul className="space-y-2.5">
                        {[
                          { text: "1단계 — 시청 ~ 백운광장 ~ 광주역 ('26년 예정)", highlight: false },
                          { text: "2단계 — 광주역 ~ 첨단 ~ 광주시청 ('29년 예정)", highlight: false },
                          { text: "3단계 — 백운광장 ~ 진월 ~ 효천역 (예비타당성 검토중)", highlight: true },
                        ].map((item, ii) => (
                          <li key={ii} className={`flex items-center gap-3 text-[14px] ${item.highlight ? "text-[var(--brand-gold)]" : "text-white/70"}`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.highlight ? "bg-[var(--brand-gold)]" : "bg-white/30"}`} />
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-[10px] text-white/25 leading-relaxed">
                      * 출처: 네이버지도, 광주광역시버스운행정보, 광주광역시청
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
              key={feat.num}
              className={`feat-row flex desktop:h-[520px] ${
                isReversed ? "desktop:flex-row-reverse" : "desktop:flex-row"
              } border-b border-white/[0.06]`}
            >
              {/* Text panel */}
              <div className="feat-text w-full desktop:w-[44%] flex flex-col justify-center px-6 py-7 desktop:px-16 desktop:py-12 overflow-hidden">
                <span
                  className="text-[88px] font-bold leading-none text-white/[0.07] select-none mb-3 block"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {feat.num}
                </span>
                <span
                  className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[3px] uppercase mb-4 block"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {feat.subtitle}
                </span>
                <h3 className="text-[30px] font-bold text-white tracking-[-1px] mb-5">
                  {feat.title}
                </h3>
                <div className="w-8 h-px bg-[var(--brand-gold)] mb-5" />
                <p className="text-[15px] font-normal text-white/75 leading-relaxed max-w-[380px]">
                  {feat.description}
                </p>
              </div>

              {/* Image panel */}
              <div className="feat-img-wrap relative w-full desktop:w-[56%] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 hover:scale-[1.04]"
                  style={{
                    backgroundImage: `url('${feat.image}')`,
                    backgroundPosition: desktopBgPos,
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
