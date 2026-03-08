"use client";

import { useEffect, useRef, useState } from "react";

const SCHEDULE = [
  { label: "특별공급", date: "2026.02.21", status: "done" },
  { label: "1순위 청약", date: "2026.03.05", status: "done" },
  { label: "2순위 청약", date: "2026.03.06", status: "done" },
  { label: "당첨자 발표", date: "2026.03 중", status: "urgent" },
  { label: "계약", date: "2026.03 중", status: "upcoming" },
  { label: "입주 예정", date: "2026 하반기", status: "upcoming" },
];

const TYPES = [
  {
    id: "84A",
    label: "84A",
    area: "84.86㎡",
    supply: "115.83㎡",
    units: 127,
    ratio: 42,
    popular: true,
  },
  {
    id: "84B",
    label: "84B",
    area: "84.98㎡",
    supply: "115.69㎡",
    units: 52,
    ratio: 17,
    popular: false,
  },
  {
    id: "84C",
    label: "84C",
    area: "84.97㎡",
    supply: "116.19㎡",
    units: 43,
    ratio: 14,
    popular: false,
  },
  {
    id: "84D",
    label: "84D",
    area: "84.98㎡",
    supply: "116.45㎡",
    units: 30,
    ratio: 10,
    popular: false,
  },
  {
    id: "115",
    label: "115",
    area: "115.96㎡",
    supply: "143.98㎡",
    units: 8,
    ratio: 3,
    popular: false,
  },
  {
    id: "126",
    label: "126",
    area: "126.77㎡",
    supply: "153.62㎡",
    units: 40,
    ratio: 13,
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [dDay, setDDay] = useState<number | null>(null);

  useEffect(() => {
    // 청약 완료 — D-day 배지 비활성
    setDDay(-1);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector(".price-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
      gsap.from(sectionRef.current.querySelector(".price-schedule"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.from(sectionRef.current.querySelectorAll(".price-card"), {
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".price-grid"),
          start: "top 80%",
        },
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      });
    };
    init();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="bg-[var(--brand-bg)] py-14 desktop:py-32 rounded-t-[28px] desktop:rounded-none -mt-7 desktop:mt-0 relative z-20"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="price-header mb-10 desktop:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Supply
            </span>
          </div>
          <div className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-5">
            <h2 className="text-[36px] tablet:text-[52px] font-bold text-white tracking-[-2px]">
              분양 안내
            </h2>
            {/* D-day urgency badge */}
            {dDay !== null && dDay >= 0 && (
              <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/35 px-5 py-3 self-start">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span
                  className="text-red-400 text-[14px] font-semibold tracking-[-0.3px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  1순위 청약까지 D-{dDay}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Schedule timeline */}
        <div className="price-schedule mb-12 desktop:mb-16 bg-[var(--brand-surface)] border border-white/[0.06] p-6 tablet:p-8">
          <p
            className="text-[10px] font-medium text-[var(--brand-gold)]/60 tracking-[3px] uppercase mb-6"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            청약 일정
          </p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden tablet:block relative">
            <div className="absolute top-[18px] left-0 right-0 h-px bg-white/[0.08]" />
            <div className="flex justify-between">
              {SCHEDULE.map((step) => (
                <div
                  key={step.label}
                  className="flex flex-col items-center gap-0 relative"
                >
                  {/* Circle */}
                  <div
                    className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center mb-4 ${
                      step.status === "done"
                        ? "bg-[var(--brand-gold)] border-[var(--brand-gold)]"
                        : step.status === "urgent"
                        ? "bg-transparent border-red-500"
                        : "bg-transparent border-white/20"
                    }`}
                  >
                    {step.status === "done" ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7l3.5 3.5 5.5-7"
                          stroke="#12121A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : step.status === "urgent" ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    )}
                  </div>
                  {/* Label */}
                  <p
                    className={`text-[13px] font-semibold mb-1 text-center ${
                      step.status === "done"
                        ? "text-[var(--brand-gold)]"
                        : step.status === "urgent"
                        ? "text-red-400"
                        : "text-white/45"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p
                    className={`text-[11px] font-light text-center ${
                      step.status === "done"
                        ? "text-[var(--brand-gold)]/55"
                        : step.status === "urgent"
                        ? "text-red-400/70"
                        : "text-white/25"
                    }`}
                  >
                    {step.date}
                  </p>
                  {step.status === "done" && (
                    <span
                      className="text-[9px] font-medium text-white/20 tracking-[1px] mt-1"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      완료
                    </span>
                  )}
                  {step.status === "urgent" && (
                    <span
                      className="text-[9px] font-medium text-red-400/75 tracking-[1px] mt-1"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      임박
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="tablet:hidden flex flex-col gap-0">
            {SCHEDULE.map((step, i) => (
              <div key={step.label} className="flex gap-4 relative">
                {/* Left: circle + connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                      step.status === "done"
                        ? "bg-[var(--brand-gold)] border-[var(--brand-gold)]"
                        : step.status === "urgent"
                        ? "bg-transparent border-red-500"
                        : "bg-transparent border-white/20"
                    }`}
                  >
                    {step.status === "done" ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7l3.5 3.5 5.5-7"
                          stroke="#12121A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : step.status === "urgent" ? (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    )}
                  </div>
                  {i < SCHEDULE.length - 1 && (
                    <div className="w-px flex-1 bg-white/[0.06] my-1" />
                  )}
                </div>
                {/* Right: text */}
                <div className="pb-5">
                  <p
                    className={`text-[14px] font-semibold mb-0.5 ${
                      step.status === "done"
                        ? "text-[var(--brand-gold)]"
                        : step.status === "urgent"
                        ? "text-red-400"
                        : "text-white/50"
                    }`}
                  >
                    {step.label}
                    {step.status === "urgent" && (
                      <span className="ml-2 text-[10px] font-medium text-red-400/80 tracking-[1px]">
                        임박
                      </span>
                    )}
                  </p>
                  <p
                    className={`text-[12px] font-light ${
                      step.status === "done"
                        ? "text-[var(--brand-gold)]/55"
                        : step.status === "urgent"
                        ? "text-red-400/65"
                        : "text-white/25"
                    }`}
                  >
                    {step.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Type cards */}
        <div className="price-grid grid grid-cols-2 tablet:grid-cols-3 gap-3 mb-10">
          {TYPES.map((type) => (
            <div
              key={type.id}
              className={`price-card relative border p-5 tablet:p-6 transition-colors duration-300 hover:border-[var(--brand-gold)]/35 ${
                type.popular
                  ? "border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/5"
                  : "border-white/[0.07] bg-[var(--brand-surface)]"
              }`}
            >
              {/* Popular badge */}
              {type.popular && (
                <div
                  className="absolute top-0 right-0 bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[9px] font-semibold px-2.5 py-1 tracking-[0.5px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  최다 공급
                </div>
              )}

              {/* Type label */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="text-[30px] tablet:text-[36px] font-bold text-white leading-none tracking-[-1.5px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {type.label}
                </span>
                <span className="text-[13px] font-normal text-white/52">㎡</span>
              </div>

              {/* Area specs */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-normal text-white/52">
                    전용
                  </span>
                  <span className="text-[12px] font-normal text-white/72">
                    {type.area}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-normal text-white/52">
                    공급
                  </span>
                  <span className="text-[12px] font-normal text-white/72">
                    {type.supply}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-normal text-white/52">
                    세대수
                  </span>
                  <span className="text-[12px] font-semibold text-white/70">
                    {type.units}세대
                  </span>
                </div>
              </div>

              {/* Supply ratio bar */}
              <div className="mb-4">
                <div className="h-[2px] bg-white/[0.07] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--brand-gold)]/55 rounded-full"
                    style={{ width: `${type.ratio}%` }}
                  />
                </div>
                <p className="text-[10px] font-medium text-white/45 mt-1.5">
                  전체 공급의 {type.ratio}%
                </p>
              </div>

              {/* Price placeholder */}
              <div className="border-t border-white/[0.06] pt-4">
                <p
                  className="text-[10px] font-medium text-white/45 tracking-[1px] uppercase mb-1.5"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  분양가
                </p>
                <p className="text-[13px] font-normal text-white/60">
                  추후 공개 예정
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary bar + CTA */}
        <div className="border-t border-white/[0.07] pt-8 flex flex-col tablet:flex-row items-start tablet:items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <div>
              <p
                className="text-[10px] font-medium text-white/48 tracking-[1px] uppercase mb-1"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                총 공급
              </p>
              <p
                className="text-[30px] font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                300
                <span className="text-[15px] font-normal text-white/55 ml-1">
                  세대
                </span>
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-medium text-white/48 tracking-[1px] uppercase mb-1"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                규모
              </p>
              <p
                className="text-[30px] font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                9
                <span className="text-[15px] font-normal text-white/55 ml-1">
                  개동
                </span>
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-medium text-white/48 tracking-[1px] uppercase mb-1"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                평형
              </p>
              <p
                className="text-[30px] font-bold text-white leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                6
                <span className="text-[15px] font-normal text-white/55 ml-1">
                  타입
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("reservation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[14px] font-semibold px-8 py-4 tracking-[0.3px] uppercase hover:bg-[var(--brand-gold-lt)] active:scale-[0.98] transition-all duration-300 shrink-0"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            방문상담 예약하기
          </button>
        </div>
      </div>
    </section>
  );
}
