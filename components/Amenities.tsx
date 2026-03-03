"use client";

import { useEffect, useRef } from "react";

const AMENITIES = [
  {
    id: "golf",
    title: "골프연습장",
    subtitle: "GOLF LOUNGE",
    desc: "스크린 골프 2타석 포함 전용 실내 연습 공간",
    badge: "스크린 포함",
  },
  {
    id: "fitness",
    title: "피트니스센터",
    subtitle: "FITNESS",
    desc: "최신 운동기기와 GX룸, 전용 샤워 시설 완비",
    badge: "GX룸 포함",
  },
  {
    id: "lounge",
    title: "커뮤니티 라운지",
    subtitle: "LOUNGE",
    desc: "입주민 전용 다목적 공용 공간, 591㎡ 규모",
    badge: "총 591㎡",
  },
  {
    id: "park",
    title: "중앙 녹지 광장",
    subtitle: "GREEN PLAZA",
    desc: "제석산 조망과 연결된 단지 중심 공원 및 산책로",
    badge: "제석산 조망",
  },
  {
    id: "parking",
    title: "지하 주차장",
    subtitle: "PARKING",
    desc: "전 세대 지하 직접 연결, 우천 시에도 편리한 동선",
    badge: "세대당 1.2대",
  },
  {
    id: "kids",
    title: "어린이 놀이터",
    subtitle: "KIDS ZONE",
    desc: "안전 인증 시설, 어린이 전용 안심 놀이 공간",
    badge: "안심 설계",
  },
];

function AmenityIcon({ id }: { id: string }) {
  switch (id) {
    case "golf":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="18" y1="9" x2="18" y2="26.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 9L28 4v10L18 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "fitness":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="2" y="16" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="27" y="16" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="12" width="5" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="22" y="12" width="5" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="14" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "lounge":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="7" y="13" width="22" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="20" x2="29" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 24v5M25 24v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="3" y="15" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="28" y="15" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "park":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M18 5C11 5 7 10.5 7 16c0 4.5 3.5 8 7.5 10L13 31h10l-1.5-5C25.5 24 29 20.5 29 16c0-5.5-4-11-11-11z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="18" y1="16" x2="18" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "parking":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="4" width="28" height="28" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M13 26V10h7a7 7 0 010 14h-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "kids":
      return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M11 18l7-7 7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="18" y1="11" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M11 32l4-10h6l4 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".amen-header") as HTMLElement;
      const cards = sectionRef.current.querySelectorAll(".amen-card");
      const grid = sectionRef.current.querySelector(".amen-grid");

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => gsap.to(header, { opacity: 1, y: 0, duration: 0.8 }),
      });

      ScrollTrigger.create({
        trigger: grid,
        start: "top 95%",
        once: true,
        onEnter: () =>
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09, ease: "power2.out" }),
      });

      ScrollTrigger.refresh();
    };
    init();
  }, []);

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="bg-[var(--brand-cream)] py-14 desktop:py-32 rounded-t-[28px] desktop:rounded-none -mt-7 desktop:mt-0 relative z-10"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="amen-header mb-10 desktop:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Amenities
            </span>
          </div>
          <div className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-5">
            <h2 className="text-[36px] tablet:text-[52px] font-bold text-[var(--n-900)] tracking-[-2px]">
              입주민 전용
              <br className="tablet:hidden" /> 커뮤니티
            </h2>
            <div className="flex items-center gap-2 self-start">
              <span
                className="text-[28px] font-bold text-[var(--brand-gold)] leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                591㎡
              </span>
              <span className="text-[var(--n-600)] text-[13px] font-light">
                규모 커뮤니티 시설
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="amen-grid grid grid-cols-2 tablet:grid-cols-3 gap-3 tablet:gap-4">
          {AMENITIES.map((item) => (
            <div
              key={item.id}
              className="amen-card bg-white border border-[var(--n-100)] p-5 tablet:p-7 hover:border-[var(--brand-gold)]/40 hover:shadow-sm transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-[var(--brand-gold)] mb-5">
                <AmenityIcon id={item.id} />
              </div>

              {/* Subtitle */}
              <p
                className="text-[9px] tablet:text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-2"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {item.subtitle}
              </p>

              {/* Title */}
              <h3 className="text-[16px] tablet:text-[19px] font-bold text-[var(--n-900)] tracking-[-0.5px] mb-2 tablet:mb-3">
                {item.title}
              </h3>

              {/* Description — hide on small mobile */}
              <p className="hidden tablet:block text-[13px] font-normal text-[var(--n-600)] leading-relaxed mb-5">
                {item.desc}
              </p>

              {/* Badge */}
              <span className="inline-block text-[11px] font-light text-[var(--brand-gold)] border border-[var(--brand-gold)]/45 px-3 py-1">
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-10 desktop:mt-14 pt-8 border-t border-[var(--n-200)] flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-5">
          <p className="text-[13px] font-normal text-[var(--n-600)] leading-relaxed max-w-md">
            * 커뮤니티 시설 상세 내용 및 이용 안내는 입주 시 별도 공지됩니다.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("reservation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 text-[var(--brand-gold)] text-[14px] font-medium shrink-0 hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            시설 상담 예약
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9.5 4.5L13 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
