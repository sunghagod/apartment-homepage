"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      >
        <path d="M24 4L4 18v26h16V30h8v14h16V18L24 4z" />
        <path d="M18 30h12v14H18z" />
      </svg>
    ),
    title: "프리미엄 입지",
    description:
      "도심 핵심 지역에 위치하여 생활 인프라와 교통 편의성을 모두 누릴 수 있는 최적의 입지 조건을 갖추었습니다.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      >
        <rect x="6" y="6" width="36" height="36" rx="2" />
        <path d="M6 18h36M18 6v36" />
      </svg>
    ),
    title: "혁신 설계",
    description:
      "입주민의 라이프스타일을 세심하게 반영한 평면 설계로, 공간 효율성과 개방감을 극대화한 주거 공간을 제공합니다.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      >
        <circle cx="24" cy="24" r="20" />
        <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" />
        <path d="M24 16v8l4 4" />
      </svg>
    ),
    title: "커뮤니티 시설",
    description:
      "피트니스 센터, 독서실, 키즈카페 등 다양한 커뮤니티 시설을 갖춰 입주민의 삶의 질을 한 단계 높여드립니다.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
      >
        <path d="M4 38h40M8 38V20l16-12 16 12v18" />
        <path d="M14 38v-8h8v8M26 38v-8h8v8" />
        <circle cx="24" cy="20" r="3" />
      </svg>
    ),
    title: "교통 편의",
    description:
      "지하철역 도보 5분 거리, 주요 간선도로와 인접하여 서울 전역으로의 빠른 이동이 가능한 탁월한 교통 환경입니다.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

        gsap.from(sectionRef.current.querySelectorAll(".feature-card"), {
          scrollTrigger: {
            trigger: sectionRef.current.querySelector(".feature-grid"),
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.15,
        });
      }
    };

    initAnimation();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-[100px] bg-[var(--gray-50)]"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <span className="text-sm font-light text-[var(--color-accent)] tracking-[2px] uppercase mb-4 block">
            ABOUT
          </span>
          <h2 className="text-[28px] tablet:text-[36px] font-bold text-gray-900 tracking-[-1px] mb-4">
            단지 소개
          </h2>
          <p className="text-base font-light text-gray-600 max-w-lg mx-auto leading-relaxed">
            프리미엄 라이프를 완성하는 핵심 가치를 소개합니다
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="feature-grid grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card border border-gray-300 bg-white p-8 transition-shadow duration-300 hover:shadow-card group"
            >
              <div className="mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 tracking-[-0.5px] mb-3">
                {feature.title}
              </h3>
              <p className="text-base font-light text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
