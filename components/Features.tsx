"use client";

import { useEffect, useRef } from "react";

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
        className="desktop:hidden flex gap-3 overflow-x-auto px-6 pb-8 pt-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {features.map((feat) => (
          <div
            key={feat.num}
            className="relative flex-none w-[72vw] max-w-[280px] aspect-[3/4] snap-start overflow-hidden bg-[var(--brand-surface)] rounded-sm"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${feat.image}')` }}
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
        ))}
        {/* trailing spacer */}
        <div className="flex-none w-3" />
      </div>

      {/* Desktop: alternating rows */}
      <div className="hidden desktop:block border-t border-white/[0.06]">
        {features.map((feat, i) => {
          const isReversed = i % 2 === 1;
          return (
            <div
              key={feat.num}
              className={`feat-row flex ${
                isReversed ? "desktop:flex-row-reverse" : "desktop:flex-row"
              } border-b border-white/[0.06]`}
            >
              {/* Text panel */}
              <div className="feat-text w-full desktop:w-[44%] flex flex-col justify-center px-6 py-7 desktop:px-16 desktop:py-20">
                {/* 숫자 */}
                <span
                  className="text-[88px] font-bold leading-none text-white/[0.07] select-none mb-3 block"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {feat.num}
                </span>
                {/* 콘텐츠 */}
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
              <div className="feat-img-wrap relative w-full desktop:w-[56%] desktop:h-auto desktop:min-h-[340px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.04]"
                  style={{ backgroundImage: `url('${feat.image}')` }}
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
