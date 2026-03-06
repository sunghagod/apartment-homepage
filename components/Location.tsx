"use client";

import { useEffect, useRef, useState } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

const DEFAULT_MAP_URL = "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772698792/apartment/transport-map.png";

const SCHOOLS = [
  { name: "진월초등학교", level: "초등", walk: "도보 8분", highlight: false },
  { name: "봉선초등학교", level: "초등", walk: "도보 10분", highlight: false },
  { name: "봉선중학교", level: "중학", walk: "도보 12분", highlight: false },
  { name: "봉선고등학교", level: "고등", walk: "도보 15분", highlight: false },
  { name: "봉선동 학원가", level: "학원가", walk: "도보 10분", highlight: true },
  { name: "광주여자대학교", level: "대학", walk: "차량 5분", highlight: false },
];

const LEVEL_COLORS: Record<string, string> = {
  초등: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  중학: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  고등: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  학원가: "bg-[var(--brand-gold)]/15 text-[var(--brand-gold)] border-[var(--brand-gold)]/40",
  대학: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const TRANSPORT = [
  { label: "지하철 2호선 예정역", value: "도보 3분", key: true },
  { label: "서울대로", value: "단지 바로 인접", key: false },
  { label: "제2순환도로", value: "차량 5분", key: false },
  { label: "광주 시청", value: "차량 15분", key: false },
];

const INFO_GROUPS = [
  {
    label: "광역 접근",
    items: ["나주 KTX역 19km", "화순 14km", "전남도청 인접"],
  },
  {
    label: "학군",
    items: ["진월초등학교 도보권", "봉선중·고등학교 인근", "봉선동 학원가"],
  },
  {
    label: "생활 편의",
    items: ["대형마트·편의점 인접", "전남대병원 차량 10분", "제석산 자연공원"],
  },
];

export default function Location({
  mapImageUrl,
  schoolImageUrl,
}: {
  mapImageUrl?: string;
  schoolImageUrl?: string;
}) {
  const MAP_IMAGE_URL = mapImageUrl || DEFAULT_MAP_URL;
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector(".loc-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
      gsap.from(sectionRef.current.querySelector(".loc-map"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        opacity: 0,
        x: -24,
        duration: 0.9,
        ease: "power2.out",
      });
      gsap.from(sectionRef.current.querySelector(".loc-info"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        opacity: 0,
        x: 24,
        duration: 0.9,
        ease: "power2.out",
      });
      gsap.from(sectionRef.current.querySelector(".edu-section"), {
        scrollTrigger: { trigger: sectionRef.current.querySelector(".edu-section"), start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.85,
        ease: "power2.out",
      });
    };
    init();
  }, []);

  return (
    <>
    <section
      id="location"
      ref={sectionRef}
      className="bg-[var(--brand-bg)] py-14 desktop:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <div className="loc-header mb-10 desktop:mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Location
            </span>
          </div>
          <div className="flex flex-col tablet:flex-row tablet:items-end tablet:justify-between gap-5">
            <h2 className="text-[36px] tablet:text-[52px] font-bold text-white tracking-[-2px]">
              탁월한 입지
            </h2>
            <div className="flex items-center gap-3 border border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/5 px-5 py-3 self-start">
              <span
                className="text-[28px] font-bold text-[var(--brand-gold)] leading-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                3분
              </span>
              <span className="text-white/68 text-[13px] font-normal leading-snug">
                지하철 2호선
                <br />
                예정역 도보
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col desktop:flex-row gap-8">
          {/* Map image */}
          <div className="loc-map w-full desktop:w-3/5">
            <div
              className="relative aspect-[3/2] tablet:aspect-[16/10] bg-[var(--brand-surface)] border border-white/[0.08] overflow-hidden cursor-zoom-in group"
              onClick={() => setLightbox(true)}
            >
              <img
                src={MAP_IMAGE_URL}
                alt="진월 더리브 라포레 입지 지도"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="2" />
                    <line x1="18" y1="18" x2="25" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div
                className="absolute top-4 left-4 bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[11px] font-semibold px-3 py-1.5 tracking-[1px]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                LOCATION MAP
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/75 backdrop-blur-sm border border-white/10 px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-gold)]" />
                <span className="text-[12px] font-light text-white">지하철 2호선 예정역</span>
                <span className="text-[12px] font-semibold text-[var(--brand-gold)] ml-1">도보 3분</span>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="loc-info w-full desktop:w-2/5 flex flex-col gap-6">
            <div>
              <p
                className="text-[10px] font-medium text-[var(--brand-gold)]/85 tracking-[3px] uppercase mb-4"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                교통 접근성
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TRANSPORT.map((t) => (
                  <div
                    key={t.label}
                    className={`p-4 border ${
                      t.key
                        ? "border-[var(--brand-gold)]/50 bg-[var(--brand-gold)]/8"
                        : "border-white/[0.07] bg-[var(--brand-surface)]"
                    }`}
                  >
                    <p className={`text-[12px] font-normal mb-1.5 leading-snug ${t.key ? "text-[var(--brand-gold)]" : "text-white/58"}`}>
                      {t.label}
                    </p>
                    <p className="text-[17px] font-bold text-white">{t.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {INFO_GROUPS.map((group) => (
                <div key={group.label} className="py-5 border-t border-white/[0.08]">
                  <p
                    className="text-[10px] font-medium text-[var(--brand-gold)]/85 tracking-[2px] uppercase mb-3"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {group.label}
                  </p>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14px] font-normal text-white/70">
                        <span className="w-[3px] h-[3px] rounded-full bg-[var(--brand-gold)]/50 flex-none" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 학군 안내 ── */}
        <div className="edu-section mt-10 desktop:mt-16 pt-10 desktop:pt-14 border-t border-white/[0.06]">
          <div className="flex flex-col desktop:flex-row gap-6 desktop:gap-10">

            {/* 큰 사진 + 텍스트 오버레이 */}
            <div className="w-full desktop:w-[55%]">
              <div className="relative w-full aspect-[4/3] desktop:aspect-auto desktop:h-full min-h-[320px] bg-[var(--brand-surface)] border border-white/[0.08] overflow-hidden">
                {schoolImageUrl ? (
                  <img
                    src={schoolImageUrl}
                    alt="학군 환경"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--brand-surface)]" />
                )}
                {/* 그라디언트 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                {/* 텍스트 오버레이 */}
                <div className="absolute inset-0 z-10 p-7 desktop:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px w-8 bg-[var(--brand-gold)]" />
                    <span
                      className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      Education
                    </span>
                  </div>
                  <h3 className="text-[28px] desktop:text-[38px] font-bold text-white tracking-[-1.5px] mb-3">
                    우수한 학군 환경
                  </h3>
                  <p className="text-[14px] font-light text-white/70 max-w-sm leading-relaxed">
                    봉선·진월동 인근 초·중·고 및 대학교가<br />
                    모두 도보·차량 거리에 위치합니다.
                  </p>
                </div>

                {/* 사진 없을 때 안내 */}
                {!schoolImageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white/20 text-[13px] font-light">관리자 페이지에서 학군 사진을 등록하세요</p>
                  </div>
                )}
              </div>
            </div>

            {/* 학교 카드 그리드 */}
            <div className="w-full desktop:w-[45%] flex flex-col justify-between gap-3">
              <div className="grid grid-cols-2 gap-2 flex-1">
                {SCHOOLS.map((school) => (
                  <div
                    key={school.name}
                    className={`p-4 border flex flex-col justify-between gap-3 ${
                      school.highlight
                        ? "border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/5"
                        : "border-white/[0.07] bg-[var(--brand-surface)]"
                    }`}
                  >
                    <span
                      className={`self-start text-[10px] font-medium px-2.5 py-1 border rounded-full tracking-[1px] ${
                        LEVEL_COLORS[school.level] ?? "bg-white/10 text-white/60 border-white/20"
                      }`}
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {school.level}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white tracking-[-0.3px] mb-0.5">
                        {school.name}
                      </p>
                      <p className={`text-[12px] font-normal ${school.highlight ? "text-[var(--brand-gold)]" : "text-white/50"}`}>
                        {school.walk}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[12px] font-light text-white/30 leading-relaxed">
                * 도보 거리는 단지 정문 기준 도보 이동 시간이며, 실제와 차이가 있을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {lightbox && (
      <ImageLightbox
        src={MAP_IMAGE_URL}
        alt="진월 더리브 라포레 입지 지도"
        onClose={() => setLightbox(false)}
      />
    )}
  </>
  );
}
