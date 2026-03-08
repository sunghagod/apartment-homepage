"use client";

import { useEffect, useRef } from "react";

const FACILITIES = [
  {
    id: "golf",
    title: "골프연습장",
    subtitle: "GOLF LOUNGE",
    desc: "스크린 골프 2타석 포함 전용 실내 연습 공간. 입주민 예약제로 쾌적하게 이용 가능.",
    tags: ["스크린 2타석", "예약제 운영"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    featured: true,
  },
  {
    id: "fitness",
    title: "피트니스센터",
    subtitle: "FITNESS CENTER",
    desc: "최신 운동기기와 GX룸, 전용 샤워 시설 완비. 헬스·요가·필라테스까지 한 공간에서.",
    tags: ["GX룸 포함", "샤워시설 완비"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    featured: true,
  },
  {
    id: "lounge",
    title: "커뮤니티 라운지",
    subtitle: "LOUNGE",
    desc: "입주민 전용 다목적 공용 공간, 591㎡ 규모",
    tags: ["총 591㎡"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    featured: false,
  },
  {
    id: "park",
    title: "중앙 녹지 광장",
    subtitle: "GREEN PLAZA",
    desc: "제석산 조망과 연결된 단지 중심 공원 및 산책로",
    tags: ["제석산 조망"],
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80",
    featured: false,
  },
  {
    id: "parking",
    title: "지하 주차장",
    subtitle: "PARKING",
    desc: "전 세대 지하 직접 연결, 우천 시에도 편리한 동선",
    tags: ["세대당 1.2대"],
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&q=80",
    featured: false,
  },
  {
    id: "kids",
    title: "어린이 놀이터",
    subtitle: "KIDS ZONE",
    desc: "안전 인증 시설, 어린이 전용 안심 놀이 공간",
    tags: ["안심 설계"],
    image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&q=80",
    featured: false,
  },
];

const STATS = [
  { val: "6", unit: "가지", label: "전용 시설" },
  { val: "591", unit: "㎡", label: "커뮤니티 규모" },
  { val: "2", unit: "타석", label: "스크린 골프" },
  { val: "1.2", unit: "대", label: "세대당 주차" },
];

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      const header = sectionRef.current.querySelector(".amen-header") as HTMLElement;
      const stats = sectionRef.current.querySelectorAll(".amen-stat");
      const cards = sectionRef.current.querySelectorAll(".amen-card");

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(stats, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 28 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.to(header, { opacity: 1, y: 0, duration: 0.8 }),
      });
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".amen-stats"),
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(stats, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }),
      });
      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".amen-grid"),
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }),
      });
      ScrollTrigger.refresh();
    };
    init();
  }, []);

  const featured = FACILITIES.filter((f) => f.featured);
  const regular = FACILITIES.filter((f) => !f.featured);

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative py-14 tablet:py-20 desktop:py-32 bg-[var(--brand-bg)] border-t border-white/[0.06] overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--brand-gold)]/[0.02] rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--brand-gold)]/[0.03] rounded-full blur-[100px] translate-x-1/3" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 tablet:px-6">

        {/* Header */}
        <div className="amen-header mb-8 tablet:mb-12 desktop:mb-14">
          <div className="flex items-center gap-3 tablet:gap-4 mb-4 tablet:mb-6">
            <div className="h-px w-8 tablet:w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[10px] tablet:text-[11px] font-medium text-[var(--brand-gold)] tracking-[3px] tablet:tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Amenities
            </span>
          </div>
          <div className="flex flex-col desktop:flex-row desktop:items-end desktop:justify-between gap-3 desktop:gap-8">
            <h2 className="text-[26px] tablet:text-[38px] desktop:text-[52px] font-bold text-white tracking-[-1.5px] desktop:tracking-[-2px] leading-[1.15]">
              입주민 전용<br className="tablet:hidden" /> 프리미엄 커뮤니티
            </h2>
            <p className="text-[13px] tablet:text-[15px] font-light text-white/45 max-w-sm leading-relaxed desktop:text-right">
              골프연습장부터 피트니스·녹지 광장까지,<br className="hidden desktop:block" />
              입주민만을 위한 6가지 전용 시설
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="amen-stats grid grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] mb-8 tablet:mb-12 desktop:mb-14">
          {STATS.map((s) => (
            <div key={s.label} className="amen-stat bg-[var(--brand-bg)] px-3 py-3.5 tablet:px-6 tablet:py-5 flex flex-col gap-0.5 tablet:gap-1">
              <p
                className="text-[20px] tablet:text-[28px] desktop:text-[32px] font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {s.val}
                <span className="text-[10px] tablet:text-[12px] font-light text-[var(--brand-gold)] ml-0.5">{s.unit}</span>
              </p>
              <p className="text-[10px] tablet:text-[12px] font-normal text-white/40">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Featured — 2열 대형 카드 */}
        <div className="amen-grid grid grid-cols-1 tablet:grid-cols-2 gap-3 tablet:gap-4 mb-3 tablet:mb-4">
          {featured.map((item) => (
            <div
              key={item.id}
              className="amen-card group relative aspect-[4/3] tablet:aspect-[3/4] desktop:aspect-[4/3] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              <div className="absolute inset-0 p-4 tablet:p-6 desktop:p-8 flex flex-col justify-between">
                {/* 상단 */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] tablet:text-[10px] font-medium text-[var(--brand-gold)] tracking-[2px] uppercase"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {item.subtitle}
                  </span>
                </div>

                {/* 하단 */}
                <div>
                  <h3 className="text-[22px] tablet:text-[26px] desktop:text-[30px] font-bold text-white tracking-[-0.5px] mb-1.5 tablet:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[12px] tablet:text-[13px] desktop:text-[14px] font-normal text-white/70 leading-relaxed mb-3 tablet:mb-4 max-w-[90%]">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 tablet:gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tablet:text-[11px] font-normal text-[var(--brand-gold)] border border-[var(--brand-gold)]/30 bg-[var(--brand-gold)]/10 px-2.5 py-1 tablet:px-3 tablet:py-1.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular — 모바일: 2열 / 데스크탑: 4열 */}
        <div className="grid grid-cols-2 desktop:grid-cols-4 gap-2.5 tablet:gap-3 desktop:gap-4">
          {regular.map((item) => (
            <div
              key={item.id}
              className="amen-card group relative aspect-[3/4] tablet:aspect-[3/4] overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

              <div className="absolute inset-0 p-3.5 tablet:p-4 desktop:p-5 flex flex-col justify-between">
                <span
                  className="text-[8px] tablet:text-[9px] desktop:text-[10px] font-medium text-[var(--brand-gold)] tracking-[1.5px] tablet:tracking-[2px] uppercase"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {item.subtitle}
                </span>

                <div>
                  <h3 className="text-[15px] tablet:text-[16px] desktop:text-[18px] font-bold text-white tracking-[-0.3px] mb-0.5 tablet:mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] tablet:text-[11px] desktop:text-[12px] font-normal text-white/60 leading-snug mb-2 tablet:mb-3 line-clamp-2">
                    {item.desc}
                  </p>
                  <span className="inline-block text-[9px] tablet:text-[10px] desktop:text-[11px] font-normal text-white/70 border border-white/25 px-2 py-1">
                    {item.tags[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 tablet:mt-10 desktop:mt-14 pt-6 tablet:pt-8 border-t border-white/[0.06] flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
          <p className="text-[11px] tablet:text-[13px] font-normal text-white/30 leading-relaxed">
            * 이미지는 연출된 예시이며, 실제 현장 및 시설과는 차이가 있을 수 있습니다.
          </p>
          <button
            onClick={() =>
              document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 text-[var(--brand-gold)] text-[13px] tablet:text-[14px] font-medium shrink-0 hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            방문상담 예약하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
