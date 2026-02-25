"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    num: "01",
    title: "프리미엄 입지",
    subtitle: "PRIME LOCATION",
    description:
      "도심 핵심 지역에 위치하여 생활 인프라와 교통 편의성을 모두 누릴 수 있는 최적의 입지 조건을 갖추었습니다.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    num: "02",
    title: "혁신 설계",
    subtitle: "INNOVATIVE DESIGN",
    description:
      "입주민의 라이프스타일을 세심하게 반영한 평면 설계로, 공간 효율성과 개방감을 극대화한 주거 공간을 제공합니다.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    num: "03",
    title: "커뮤니티 시설",
    subtitle: "COMMUNITY",
    description:
      "피트니스 센터, 독서실, 키즈카페 등 다양한 커뮤니티 시설을 갖춰 입주민의 삶의 질을 한 단계 높여드립니다.",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    num: "04",
    title: "교통 편의",
    subtitle: "TRANSPORTATION",
    description:
      "지하철역 도보 5분 거리, 주요 간선도로와 인접하여 서울 전역으로의 빠른 이동이 가능한 탁월한 교통 환경입니다.",
    image:
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
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
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.2,
        });
      }
    };

    initAnimation();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-[120px] bg-gray-900 overflow-hidden"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 55%, transparent 55%)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-20">
          <span className="text-sm font-light text-[var(--theme-accent)] tracking-[3px] uppercase mb-4 block">
            ABOUT
          </span>
          <h2 className="text-[32px] tablet:text-[42px] font-bold text-white tracking-[-1px] mb-5">
            단지 소개
          </h2>
          <div className="w-12 h-px bg-[var(--theme-accent)] mx-auto mb-5" />
          <p className="text-base font-light text-gray-400 max-w-lg mx-auto leading-relaxed">
            프리미엄 라이프를 완성하는 핵심 가치를 소개합니다
          </p>
        </div>

        {/* Feature Cards Grid - 2x2 */}
        <div className="feature-grid grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative h-[320px] tablet:h-[380px] overflow-hidden cursor-default"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${feature.image}')` }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/50" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 tablet:p-10">
                {/* Number */}
                <span className="absolute top-8 right-8 tablet:top-10 tablet:right-10 text-[56px] tablet:text-[72px] font-bold text-white/[0.07] leading-none select-none">
                  {feature.num}
                </span>

                <span className="text-xs font-light text-[var(--theme-accent)] tracking-[2px] uppercase mb-2">
                  {feature.subtitle}
                </span>
                <h3 className="text-[22px] tablet:text-[26px] font-bold text-white tracking-[-0.5px] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm font-light text-gray-300 leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
