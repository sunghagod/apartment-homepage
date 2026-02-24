"use client";

import { useState, useEffect, useRef } from "react";

const floorPlans = [
  {
    id: "59",
    label: "59㎡",
    name: "59A타입",
    area: "전용 59.99㎡ / 공급 84.98㎡",
    rooms: "방 3 / 욕실 2",
    features: ["맞통풍 설계", "팬트리 수납", "안방 드레스룸"],
    description:
      "실용적인 공간 활용이 돋보이는 컴팩트 설계. 신혼부부 및 1~2인 가구에 최적화된 평면입니다.",
  },
  {
    id: "74",
    label: "74㎡",
    name: "74A타입",
    area: "전용 74.92㎡ / 공급 99.87㎡",
    rooms: "방 3 / 욕실 2",
    features: ["4Bay 판상형", "알파룸", "주방 팬트리"],
    description:
      "넓은 거실과 독립 공간을 갖춘 균형 잡힌 설계. 자녀가 있는 3~4인 가구에 적합합니다.",
  },
  {
    id: "84",
    label: "84㎡",
    name: "84A타입",
    area: "전용 84.97㎡ / 공급 114.82㎡",
    rooms: "방 4 / 욕실 2",
    features: ["4Bay 와이드형", "대형 드레스룸", "거실 확장형"],
    description:
      "넉넉한 수납과 개방감 있는 거실이 특징인 프리미엄 설계. 쾌적한 주거를 원하는 가족에게 추천합니다.",
  },
];

export default function FloorPlan() {
  const [activeTab, setActiveTab] = useState("59");
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const active = floorPlans.find((p) => p.id === activeTab)!;

  useEffect(() => {
    const initAnimation = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelector(".section-header"), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
        });
      }
    };

    initAnimation();
  }, []);

  useEffect(() => {
    const animateContent = async () => {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    };

    animateContent();
  }, [activeTab]);

  return (
    <section
      id="floorplan"
      ref={sectionRef}
      className="py-[100px] bg-white"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <span className="text-sm font-light text-[var(--color-accent)] tracking-[2px] uppercase mb-4 block">
            UNIT PLAN
          </span>
          <h2 className="text-[28px] tablet:text-[36px] font-bold text-gray-900 tracking-[-1px] mb-4">
            평형 안내
          </h2>
          <p className="text-base font-light text-gray-600 max-w-lg mx-auto leading-relaxed">
            라이프스타일에 맞는 다양한 평형을 확인해보세요
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-12 border-b border-gray-300">
          {floorPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(plan.id)}
              className={`px-8 tablet:px-12 py-4 text-[20px] tablet:text-[30px] font-normal tracking-[-0.5px] transition-all duration-200 border-b-[3px] -mb-px ${
                activeTab === plan.id
                  ? "text-gray-800 font-medium border-gray-800"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col desktop:flex-row gap-10 items-start">
          {/* Floor Plan Image */}
          <div className="w-full desktop:w-3/5">
            <div className="relative aspect-[4/3] bg-gray-50 border border-gray-300 flex items-center justify-center overflow-hidden">
              {/* Placeholder floor plan SVG */}
              <div className="text-center p-8">
                <svg
                  width="280"
                  height="220"
                  viewBox="0 0 280 220"
                  fill="none"
                  className="mx-auto mb-6"
                >
                  {/* Outer walls */}
                  <rect
                    x="10"
                    y="10"
                    width="260"
                    height="200"
                    stroke="#bfbfbf"
                    strokeWidth="3"
                    fill="white"
                  />
                  {/* Rooms */}
                  <rect x="10" y="10" width="100" height="90" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  <rect x="110" y="10" width="80" height="90" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  <rect x="190" y="10" width="80" height="90" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  <rect x="10" y="100" width="130" height="110" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  <rect x="140" y="100" width="130" height="60" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  <rect x="140" y="160" width="130" height="50" stroke="#dddddd" strokeWidth="1.5" fill="#f7f7f7" />
                  {/* Room labels */}
                  <text x="45" y="60" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">안방</text>
                  <text x="150" y="60" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">침실2</text>
                  <text x="230" y="60" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">침실3</text>
                  <text x="75" y="160" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">거실</text>
                  <text x="205" y="135" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">주방/식당</text>
                  <text x="205" y="190" textAnchor="middle" fill="#999" fontSize="11" fontWeight="300">욕실</text>
                  {/* Door indicators */}
                  <path d="M60 100 Q60 85 75 85" stroke="#bfbfbf" strokeWidth="1" fill="none" />
                  <path d="M150 100 Q150 85 165 85" stroke="#bfbfbf" strokeWidth="1" fill="none" />
                </svg>
                <p className="text-sm font-light text-gray-500 tracking-[-0.3px]">
                  {active.name} 평면도
                </p>
                <p className="text-xs font-light text-gray-400 mt-1">
                  * 실제 평면도 이미지로 교체 예정
                </p>
              </div>

              {/* Type badge */}
              <div className="absolute top-4 left-4 bg-[var(--color-accent)] text-white text-xs font-normal px-3 py-1.5 tracking-[-0.3px]">
                {active.name}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full desktop:w-2/5 desktop:pt-4">
            <h3 className="text-[24px] tablet:text-[30px] font-bold text-gray-900 tracking-[-1px] mb-2">
              {active.name}
            </h3>
            <p className="text-base font-light text-gray-600 mb-8 leading-relaxed">
              {active.description}
            </p>

            {/* Specs */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base font-normal text-gray-800">면적</span>
                <span className="text-base font-light text-gray-600">{active.area}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-base font-normal text-gray-800">구성</span>
                <span className="text-base font-light text-gray-600">{active.rooms}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-base font-medium text-gray-800 mb-3">특장점</h4>
              <div className="flex flex-wrap gap-2">
                {active.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-sm font-light text-[var(--color-accent)] border border-[var(--color-accent)] px-4 py-2 rounded-[40px]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                const el = document.getElementById("reservation");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[var(--color-accent)] text-white text-lg font-light py-4 tracking-[-0.5px] transition-opacity duration-300 hover:opacity-85"
            >
              이 평형 상담 예약하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
