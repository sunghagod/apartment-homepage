"use client";

import { useEffect, useRef } from "react";

const FEATURED = [
  {
    id: "golf",
    title: "골프연습장",
    subtitle: "GOLF LOUNGE",
    desc: "스크린 골프 2타석 포함 전용 실내 연습 공간. 입주민 예약제로 쾌적하게 이용할 수 있습니다.",
    badge: "스크린 2타석",
    detail: "24시간 예약제 운영",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
  },
  {
    id: "fitness",
    title: "피트니스센터",
    subtitle: "FITNESS CENTER",
    desc: "최신 운동기기와 GX룸, 전용 샤워 시설 완비. 헬스·요가·필라테스까지 한 공간에서.",
    badge: "GX룸 포함",
    detail: "샤워시설·탈의실 완비",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
  },
];

const REGULAR = [
  {
    id: "lounge",
    title: "커뮤니티 라운지",
    subtitle: "LOUNGE",
    desc: "입주민 전용 다목적 공용 공간, 591㎡ 규모",
    badge: "총 591㎡",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    id: "park",
    title: "중앙 녹지 광장",
    subtitle: "GREEN PLAZA",
    desc: "제석산 조망과 연결된 단지 중심 공원 및 산책로",
    badge: "제석산 조망",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
  },
  {
    id: "parking",
    title: "지하 주차장",
    subtitle: "PARKING",
    desc: "전 세대 지하 직접 연결, 우천 시에도 편리한 동선",
    badge: "세대당 1.2대",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
  },
  {
    id: "kids",
    title: "어린이 놀이터",
    subtitle: "KIDS ZONE",
    desc: "안전 인증 시설, 어린이 전용 안심 놀이 공간",
    badge: "안심 설계",
    image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&q=80",
  },
];

const STATS = [
  { val: "6", unit: "가지", label: "전용 시설" },
  { val: "591", unit: "㎡", label: "커뮤니티 규모" },
  { val: "2", unit: "타석", label: "스크린 골프" },
  { val: "1.2", unit: "대", label: "세대당 주차" },
];

function FeaturedIcon({ id }: { id: string }) {
  if (id === "golf") {
    return (
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="30" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="9" x2="18" y2="26.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 9L28 4v10L18 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="2" y="16" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="27" y="16" width="7" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="12" width="5" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="12" width="5" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function RegularIcon({ id }: { id: string }) {
  switch (id) {
    case "lounge":
      return (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <rect x="7" y="13" width="22" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="7" y1="20" x2="29" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 24v5M25 24v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="3" y="15" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="28" y="15" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "park":
      return (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <path d="M18 5C11 5 7 10.5 7 16c0 4.5 3.5 8 7.5 10L13 31h10l-1.5-5C25.5 24 29 20.5 29 16c0-5.5-4-11-11-11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="18" y1="16" x2="18" y2="31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "parking":
      return (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <rect x="4" y="4" width="28" height="28" rx="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 26V10h7a7 7 0 010 14h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "kids":
      return (
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 18l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="18" y1="11" x2="18" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 32l4-10h6l4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      const statsItems = sectionRef.current.querySelectorAll(".amen-stat");
      const featCards = sectionRef.current.querySelectorAll(".amen-feat");
      const regCards = sectionRef.current.querySelectorAll(".amen-reg");

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(statsItems, { opacity: 0, y: 20 });
      gsap.set(featCards, { opacity: 0, y: 28 });
      gsap.set(regCards, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(header, { opacity: 1, y: 0, duration: 0.8 }),
      });
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".amen-stats"),
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(statsItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }),
      });
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".amen-featured"),
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(featCards, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power2.out" }),
      });
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".amen-regular"),
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(regCards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }),
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
        <div className="amen-header mb-8 desktop:mb-12">
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
              <br className="tablet:hidden" /> 프리미엄 커뮤니티
            </h2>
            <p className="text-[15px] font-light text-[var(--n-600)] max-w-sm leading-relaxed self-start tablet:text-right">
              골프연습장부터 피트니스·녹지 광장까지,<br />
              입주민만을 위한 6가지 전용 시설
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="amen-stats grid grid-cols-2 tablet:grid-cols-4 gap-px bg-[var(--n-200)] border border-[var(--n-200)] mb-10 desktop:mb-14">
          {STATS.map((s) => (
            <div key={s.label} className="amen-stat bg-[var(--brand-cream)] px-6 py-5 flex flex-col gap-1">
              <p
                className="text-[26px] desktop:text-[32px] font-bold text-[var(--n-900)] leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {s.val}
                <span className="text-[13px] font-light text-[var(--brand-gold)] ml-1">{s.unit}</span>
              </p>
              <p className="text-[12px] font-normal text-[var(--n-500)] tracking-[0.3px]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Featured: 골프 + 피트니스 — 2-col tall cards */}
        <div className="amen-featured grid grid-cols-1 tablet:grid-cols-2 gap-3 mb-3">
          {FEATURED.map((item) => (
            <div
              key={item.id}
              className="amen-feat relative min-h-[340px] desktop:min-h-[420px] overflow-hidden group"
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full min-h-[340px] desktop:min-h-[420px] p-7 desktop:p-8">
                {/* Icon + subtitle */}
                <div className="flex items-center gap-3 mb-auto">
                  <div className="text-white/70">
                    <FeaturedIcon id={item.id} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2.5px] uppercase"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom content */}
                <div>
                  <h3 className="text-[26px] desktop:text-[30px] font-bold text-white tracking-[-0.8px] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] font-normal text-white/80 leading-relaxed mb-5 max-w-sm">
                    {item.desc}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[12px] font-light text-white border border-white/50 px-3 py-1.5">
                      {item.badge}
                    </span>
                    <span
                      className="text-[12px] font-light text-[var(--brand-gold)]/80"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {item.detail}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular: 4-card grid */}
        <div className="amen-regular grid grid-cols-2 tablet:grid-cols-4 gap-3">
          {REGULAR.map((item) => (
            <div
              key={item.id}
              className="amen-reg relative min-h-[220px] desktop:min-h-[260px] overflow-hidden group"
            >
              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.05]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15" />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full min-h-[220px] desktop:min-h-[260px] p-5">
                <div className="text-white/60 mb-auto">
                  <RegularIcon id={item.id} />
                </div>
                <div>
                  <p
                    className="text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase mb-1.5"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {item.subtitle}
                  </p>
                  <h3 className="text-[16px] tablet:text-[18px] font-bold text-white tracking-[-0.4px] mb-1">
                    {item.title}
                  </h3>
                  <p className="hidden tablet:block text-[12px] font-normal text-white/70 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span className="inline-block text-[11px] font-light text-white border border-white/40 px-2.5 py-1">
                    {item.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 desktop:mt-14 pt-8 border-t border-[var(--n-200)] flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-5">
          <p className="text-[13px] font-normal text-[var(--n-600)] leading-relaxed max-w-lg">
            * 이미지는 연출된 예시이며, 실제 현장 및 시설과는 차이가 있을 수 있습니다.
          </p>
          <button
            onClick={() =>
              document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })
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
