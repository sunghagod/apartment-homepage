"use client";

import { useState, useEffect, useRef } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface FloorPlanContent {
  id: string;
  label: string;
  name: string;
  area: string;
  rooms: string;
  features: string[];
  description: string;
  imageUrl: string;
  units: number;
}

const DEFAULT_FLOOR_PLANS: FloorPlanContent[] = [
  {
    id: "84A",
    label: "84㎡ A",
    name: "84A타입",
    area: "전용 84.8566㎡ / 공급 115.8340㎡",
    rooms: "방 4 / 욕실 2",
    features: ["4Bay 판상형", "대형 드레스룸", "팬트리 수납"],
    description:
      "127세대 공급. 4Bay 판상형 설계로 채광과 통풍을 극대화한 대표 평형.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440059/apartment/floorplan-84A.png",
    units: 127,
  },
  {
    id: "84B",
    label: "84㎡ B",
    name: "84B타입",
    area: "전용 84.9777㎡ / 공급 115.6917㎡",
    rooms: "방 4 / 욕실 2",
    features: ["최상층 특화", "알파룸", "거실 확장형"],
    description:
      "52세대 공급. 최상층 특화 설계가 적용된 프리미엄 타입.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440060/apartment/floorplan-84B.png",
    units: 52,
  },
  {
    id: "84C",
    label: "84㎡ C",
    name: "84C타입",
    area: "전용 84.9703㎡ / 공급 116.1917㎡",
    rooms: "방 4 / 욕실 2",
    features: ["맞통풍 설계", "주방 팬트리", "드레스룸"],
    description:
      "43세대 공급. 맞통풍 설계로 사계절 쾌적한 실내 환경.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440062/apartment/floorplan-84C.png",
    units: 43,
  },
  {
    id: "84D",
    label: "84㎡ D",
    name: "84D타입",
    area: "전용 84.9805㎡ / 공급 116.4486㎡",
    rooms: "방 3 / 욕실 2",
    features: ["와이드 거실", "오픈 주방", "복도 최소화"],
    description:
      "30세대 공급. 와이드 거실과 오픈 주방의 혁신 평면.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440064/apartment/floorplan-84D.png",
    units: 30,
  },
  {
    id: "115",
    label: "115㎡",
    name: "115타입",
    area: "전용 115.9641㎡ / 공급 143.9770㎡",
    rooms: "방 4 / 욕실 2",
    features: ["8Bay 판상형", "초대형 드레스룸", "독립 서재"],
    description:
      "8세대 공급. 독립 서재와 초대형 드레스룸의 프리미엄 중형.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440065/apartment/floorplan-115.png",
    units: 8,
  },
  {
    id: "126",
    label: "126㎡",
    name: "126타입",
    area: "전용 126.7672㎡ / 공급 153.6182㎡",
    rooms: "방 4 / 욕실 2",
    features: ["테라스 특화", "대형 팬트리", "WIC 드레스룸"],
    description:
      "40세대 공급. 단지 최대 평형. 최상의 주거 품격.",
    imageUrl:
      "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440066/apartment/floorplan-126.png",
    units: 40,
  },
];

export default function FloorPlan({ floorPlans: floorPlansContent }: { floorPlans?: FloorPlanContent[] }) {
  const floorPlans = floorPlansContent?.length ? floorPlansContent : DEFAULT_FLOOR_PLANS;

  const [activeTab, setActiveTab] = useState(floorPlans[0]?.id || "84A");
  const [lightbox, setLightbox] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const active = floorPlans.find((p) => p.id === activeTab) ?? floorPlans[0];

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector(".section-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
    };
    init();
  }, []);

  useEffect(() => {
    const animateContent = async () => {
      const { default: gsap } = await import("gsap");
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }
    };
    animateContent();
  }, [activeTab]);

  return (
    <>
    <section
      id="floorplan"
      ref={sectionRef}
      className="relative z-20 py-14 desktop:py-32 bg-[var(--brand-bg)] border-t border-white/[0.06]"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="section-header mb-10 desktop:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Unit Plan
            </span>
          </div>
          <h2 className="text-[30px] tablet:text-[56px] font-bold text-white tracking-[-2px] mb-3 tablet:mb-4">
            평형 안내
          </h2>
          <p className="text-[14px] tablet:text-[16px] font-light text-white/55 max-w-lg leading-relaxed">
            총 6개 타입 300세대 — 라이프스타일에 맞는 평형을 선택하세요
          </p>
        </div>

        {/* Tabs — 모바일: 3열×2행 그리드 / 태블릿+: flex-wrap */}
        <div className="grid grid-cols-3 gap-2 tablet:flex tablet:flex-wrap tablet:gap-3 mb-8 tablet:mb-10 desktop:mb-14">
          {floorPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`px-3 py-2.5 tablet:px-6 tablet:py-3 text-[13px] tablet:text-[16px] font-semibold tracking-[-0.3px] transition-all duration-300 ${
                activeTab === plan.id
                  ? "bg-[var(--brand-gold)] text-[var(--brand-bg)]"
                  : "bg-white/[0.06] text-white/50 border border-white/[0.08] hover:bg-white/[0.10] hover:text-white/80"
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="flex flex-col desktop:flex-row gap-6 tablet:gap-8 desktop:gap-14 items-start"
        >
          {/* Floor Plan Image */}
          <div className="w-full desktop:w-[58%]">
            <div
              className="relative aspect-[4/3] bg-white/[0.03] border border-white/[0.08] overflow-hidden group cursor-zoom-in"
              onClick={() => setLightbox(true)}
            >
              <img
                src={active.imageUrl}
                alt={`${active.name} 평면도`}
                className="w-full h-full object-contain"
              />
              {/* Type badge */}
              <div
                className="absolute top-4 left-4 bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[12px] font-semibold px-3.5 py-1.5 tracking-[0.5px]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {active.name}
              </div>
              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="2" />
                    <line x1="18" y1="18" x2="25" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full desktop:w-[42%] desktop:pt-2">
            {/* Type name — large */}
            <h3
              className="text-[26px] tablet:text-[42px] font-bold text-white tracking-[-1.5px] mb-2 tablet:mb-3"
            >
              {active.name}
            </h3>
            <p className="text-[14px] tablet:text-[16px] font-light text-white/55 mb-6 tablet:mb-8 leading-relaxed">
              {active.description}
            </p>

            {/* Specs */}
            <div className="mb-6 tablet:mb-8">
              {/* 면적 — 모바일에서 세로 배치 */}
              <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:items-center py-3 tablet:py-4 border-b border-white/[0.08] gap-1 tablet:gap-0">
                <span className="text-[13px] tablet:text-[15px] font-medium text-white/70">면적</span>
                <span className="text-[13px] tablet:text-[15px] font-normal text-white/90">{active.area}</span>
              </div>
              <div className="flex justify-between items-center py-3 tablet:py-4 border-b border-white/[0.08]">
                <span className="text-[13px] tablet:text-[15px] font-medium text-white/70">구성</span>
                <span className="text-[13px] tablet:text-[15px] font-normal text-white/90">{active.rooms}</span>
              </div>
              <div className="flex justify-between items-center py-3 tablet:py-4 border-b border-white/[0.08]">
                <span className="text-[13px] tablet:text-[15px] font-medium text-white/70">공급 세대</span>
                <span
                  className="text-[18px] tablet:text-[20px] font-bold text-[var(--brand-gold)]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {active.units}
                  <span className="text-[12px] tablet:text-[13px] font-normal text-white/50 ml-1">세대</span>
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8 tablet:mb-10">
              <p
                className="text-[11px] font-medium text-[var(--brand-gold)]/60 tracking-[3px] uppercase mb-3 tablet:mb-4"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                특장점
              </p>
              <div className="flex flex-wrap gap-1.5 tablet:gap-2">
                {active.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-[12px] tablet:text-[13px] font-normal text-[var(--brand-gold)] border border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/5 px-3 py-1.5 tablet:px-4 tablet:py-2"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                document
                  .getElementById("reservation")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[15px] tablet:text-[16px] font-semibold py-4 tablet:py-5 tracking-[0.3px] uppercase transition-all duration-300 hover:bg-[var(--brand-gold-lt)] active:scale-[0.98]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              방문상담 예약하기
            </button>
          </div>
        </div>
      </div>
    </section>

    {lightbox && (
      <ImageLightbox
        src={active.imageUrl}
        alt={`${active.name} 평면도`}
        onClose={() => setLightbox(false)}
      />
    )}
  </>
  );
}
