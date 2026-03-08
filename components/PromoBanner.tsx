"use client";

import { useEffect, useRef, useState } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

/* ───────────────────────────────────────────
   배너 데이터 타입
   - imageUrl이 있으면 → 디자인된 이미지 배너
   - 없으면 → 코드 기반 콘텐츠 표시
   ─────────────────────────────────────────── */
export interface BannerItem {
  id: string;
  type: "school" | "promo" | "generic";
  imageUrl?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  stats?: { val: string; unit: string; label: string }[];
  bullets?: string[];
  cta?: { label: string; target: string };
  disclaimer?: string;
}

/* ── 기본 배너 데이터 (content.json에 없을 때 폴백) ── */
const DEFAULT_BANNERS: BannerItem[] = [
  {
    id: "school-premium",
    type: "school",
    eyebrow: "EDUCATION PREMIUM",
    title: "봉선동 프리미엄 학군\n도보 생활권",
    subtitle: "광주 남구 대표 학원가 도보권",
    description:
      "광주 남구 최고 학군인 봉선동 학원가까지 도보 10분. 진월초 도보 8분, 봉선중·고 15분 이내로 초·중·고 전 과정을 도보 생활권에서 해결할 수 있습니다.",
    stats: [
      { val: "10", unit: "분", label: "학원가 도보" },
      { val: "8", unit: "분", label: "진월초 도보" },
      { val: "12", unit: "분", label: "봉선중 도보" },
      { val: "15", unit: "분", label: "봉선고 도보" },
    ],
    bullets: [
      "봉선동 학원가 — 도보 10분 (광주남구 대표 학원 밀집지)",
      "진월초등학교 — 도보 8분",
      "봉선초등학교 — 도보 10분",
      "봉선중학교 — 도보 12분",
      "봉선고등학교 — 도보 15분",
    ],
    disclaimer: "* 도보 거리는 단지 정문 기준이며, 실제와 차이가 있을 수 있습니다.",
  },
  {
    id: "promo",
    type: "promo",
    eyebrow: "LIMITED OFFER",
    title: "300세대 한정\n잔여세대 특별 안내",
    subtitle: "선착순 동·호 지정",
    description:
      "진월 더리브 라포레만의 특별한 혜택을 확인하세요. 방문상담 예약 시 상세 안내를 받으실 수 있습니다.",
    stats: [
      { val: "300", unit: "세대", label: "총 세대수" },
      { val: "9", unit: "개동", label: "단지 규모" },
      { val: "6", unit: "타입", label: "평형 구성" },
    ],
    cta: { label: "방문상담 예약하기", target: "reservation" },
    disclaimer: "* 잔여세대 및 혜택은 사정에 따라 변경될 수 있습니다.",
  },
];

/* ── 학군 프리미엄 배너 (코드 기반) ── */
function SchoolBanner({ item }: { item: BannerItem }) {
  const [mapLightbox, setMapLightbox] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[var(--brand-bg)] border border-white/[0.06]">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--brand-gold)]/[0.04] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[var(--brand-gold)]/[0.02] blur-3xl pointer-events-none" />

      {/* 학군 지도 — 상단 중앙, 50% 크기, 클릭 확대 */}
      <div className="relative z-10 flex justify-center pt-6 tablet:pt-10 desktop:pt-14 px-5 tablet:px-8 desktop:px-16">
        <div
          className="w-full max-w-[90%] border border-white/[0.08] overflow-hidden cursor-zoom-in group"
          onClick={() => setMapLightbox(true)}
        >
          <img
            src="https://res.cloudinary.com/dtyvnypxw/image/upload/v1772968225/apartment/school-map.png"
            alt="진월 더리브 라포레 학군 지도"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="2" />
                <line x1="18" y1="18" x2="25" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="9" y1="12" x2="15" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="9" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {mapLightbox && (
        <ImageLightbox
          src="https://res.cloudinary.com/dtyvnypxw/image/upload/v1772968225/apartment/school-map.png"
          alt="진월 더리브 라포레 학군 지도"
          onClose={() => setMapLightbox(false)}
        />
      )}

      <div className="relative z-10 px-5 py-8 tablet:px-8 tablet:py-12 desktop:px-16 desktop:py-20">
        <div className="flex flex-col desktop:flex-row gap-8 desktop:gap-16">
          {/* 좌측: 헤드라인 + 통계 */}
          <div className="desktop:w-[45%]">
            {item.eyebrow && (
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-[var(--brand-gold)]" />
                <span
                  className="text-[10px] tablet:text-[11px] font-medium text-[var(--brand-gold)] tracking-[3px] tablet:tracking-[4px] uppercase"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {item.eyebrow}
                </span>
              </div>
            )}

            {item.subtitle && (
              <p className="text-[13px] tablet:text-[14px] font-light text-[var(--brand-gold)]/80 mb-2">
                {item.subtitle}
              </p>
            )}

            <h3 className="text-[26px] tablet:text-[36px] desktop:text-[44px] font-bold text-white tracking-[-1.5px] leading-[1.2] mb-4 tablet:mb-6 whitespace-pre-line">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-[13px] tablet:text-[14px] font-light text-white/60 leading-relaxed mb-6 tablet:mb-8 max-w-md">
                {item.description}
              </p>
            )}

            {/* 통계 그리드 */}
            {item.stats && (
              <div className="grid grid-cols-4 gap-px bg-white/[0.06]">
                {item.stats.map((s) => (
                  <div key={s.label} className="bg-[var(--brand-bg)] px-2 py-3 tablet:px-5 tablet:py-4 text-center">
                    <p
                      className="text-[20px] tablet:text-[28px] font-bold text-white leading-none mb-0.5"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {s.val}
                      <span className="text-[10px] tablet:text-[12px] font-light text-[var(--brand-gold)] ml-0.5">
                        {s.unit}
                      </span>
                    </p>
                    <p className="text-[9px] tablet:text-[11px] font-normal text-white/45 truncate">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 우측: 학교 리스트 */}
          <div className="desktop:w-[55%] flex flex-col justify-center">
            {item.bullets && (
              <div className="space-y-0">
                {item.bullets.map((bullet, i) => {
                  const isHighlight = bullet.includes("학원가");
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 tablet:gap-4 py-3 tablet:py-4 border-b border-white/[0.06] ${
                        isHighlight ? "bg-[var(--brand-gold)]/[0.04] -mx-3 px-3 tablet:-mx-4 tablet:px-4" : ""
                      }`}
                    >
                      <span
                        className={`flex-none w-6 h-6 tablet:w-7 tablet:h-7 flex items-center justify-center text-[11px] tablet:text-[12px] font-bold ${
                          isHighlight
                            ? "bg-[var(--brand-gold)] text-[var(--brand-bg)]"
                            : "bg-white/[0.06] text-white/50"
                        }`}
                        style={{ fontFamily: "var(--font-secondary)" }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`text-[13px] tablet:text-[15px] font-normal leading-snug ${
                          isHighlight ? "text-[var(--brand-gold)]" : "text-white/75"
                        }`}
                      >
                        {bullet}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {item.disclaimer && (
              <p className="text-[10px] tablet:text-[11px] font-light text-white/25 mt-4 leading-relaxed">
                {item.disclaimer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 프로모션 배너 (코드 기반) — 금박 질감 고급 스타일 ── */
function PromoBannerCard({ item }: { item: BannerItem }) {
  return (
    <div className="relative overflow-hidden">
      {/* ── 다층 금박 배경 ── */}
      {/* 베이스: 어두운 골드-브론즈 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1a12] via-[#1a1610] to-[#16130d]" />

      {/* 금박 노이즈 텍스처 — 거친 입자감 */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-[0.35]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23g)' fill='%23C8A870'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
        }}
      />
      {/* 미세 입자 (고주파) — 금속 표면 느낌 */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.8' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23f)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      {/* 브러시드 메탈 수평 줄무늬 */}
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-[0.06]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(200,168,112,0.15) 1px, transparent 2px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* 대각선 광택 시머 — 좌상→우하 */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(135deg, transparent 0%, transparent 35%, rgba(223,203,160,0.5) 45%, rgba(223,203,160,0.8) 50%, rgba(223,203,160,0.5) 55%, transparent 65%, transparent 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "60% 60%",
        }}
      />

      {/* 중앙 방사형 글로우 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(200,168,112,0.10)_0%,_transparent_60%)]" />

      {/* 에지 비네팅 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(10,8,5,0.4)_100%)]" />

      {/* 상하단 골드 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/25 to-transparent" />

      {/* ── 장식 보더 (이중 프레임) ── */}
      <div className="absolute inset-0 border border-[var(--brand-gold)]/20" />
      <div className="absolute top-3 left-3 right-3 bottom-3 tablet:top-4 tablet:left-4 tablet:right-4 tablet:bottom-4 border border-[var(--brand-gold)]/[0.10]" />
      {/* 코너 장식 */}
      <div className="absolute top-3 left-3 w-5 h-5 tablet:top-4 tablet:left-4 tablet:w-6 tablet:h-6 border-t border-l border-[var(--brand-gold)]/35" />
      <div className="absolute top-3 right-3 w-5 h-5 tablet:top-4 tablet:right-4 tablet:w-6 tablet:h-6 border-t border-r border-[var(--brand-gold)]/35" />
      <div className="absolute bottom-3 left-3 w-5 h-5 tablet:bottom-4 tablet:left-4 tablet:w-6 tablet:h-6 border-b border-l border-[var(--brand-gold)]/35" />
      <div className="absolute bottom-3 right-3 w-5 h-5 tablet:bottom-4 tablet:right-4 tablet:w-6 tablet:h-6 border-b border-r border-[var(--brand-gold)]/35" />

      <div className="relative z-10 px-6 py-10 tablet:px-10 tablet:py-14 desktop:px-16 desktop:py-16 text-center">
        {item.eyebrow && (
          <span
            className="inline-block text-[10px] tablet:text-[11px] font-medium text-[var(--brand-gold-lt)] tracking-[4px] tablet:tracking-[5px] uppercase mb-5 tablet:mb-6 border border-[var(--brand-gold)]/25 bg-[var(--brand-gold)]/[0.04] px-4 py-1.5 tablet:px-5 tablet:py-2"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {item.eyebrow}
          </span>
        )}

        {item.subtitle && (
          <p className="text-[13px] tablet:text-[15px] font-light text-[var(--brand-gold-lt)]/60 mb-2 tablet:mb-3">{item.subtitle}</p>
        )}

        <h3 className="text-[26px] tablet:text-[38px] desktop:text-[48px] font-bold text-[var(--brand-cream)] tracking-[-1.5px] leading-[1.2] mb-4 tablet:mb-6 whitespace-pre-line">
          {item.title}
        </h3>

        {item.description && (
          <p className="text-[13px] tablet:text-[14px] font-light text-[var(--brand-cream)]/50 leading-relaxed mb-8 tablet:mb-10 max-w-lg mx-auto">
            {item.description}
          </p>
        )}

        {/* 구분선 */}
        <div className="flex items-center justify-center gap-3 mb-8 tablet:mb-10">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[var(--brand-gold)]/30" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[var(--brand-gold)]/40" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[var(--brand-gold)]/30" />
        </div>

        {/* 통계 */}
        {item.stats && (
          <div className="flex justify-center gap-6 tablet:gap-12 desktop:gap-16 mb-8 tablet:mb-10">
            {item.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-[28px] tablet:text-[36px] desktop:text-[44px] font-bold text-[var(--brand-cream)] leading-none"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {s.val}
                  <span className="text-[11px] tablet:text-[14px] font-light text-[var(--brand-gold)] ml-0.5">
                    {s.unit}
                  </span>
                </p>
                <p className="text-[10px] tablet:text-[12px] font-normal text-[var(--brand-gold-lt)]/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {item.cta && (
          <button
            onClick={() =>
              document
                .getElementById(item.cta!.target)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center justify-center gap-2 w-full tablet:w-auto bg-gradient-to-r from-[var(--brand-gold)] to-[#B89960] text-[#12110c] px-8 py-3.5 tablet:py-4 text-[14px] tablet:text-[15px] font-semibold tracking-[0.5px] hover:brightness-110 transition-all duration-300 shadow-[0_2px_16px_rgba(200,168,112,0.2)]"
          >
            {item.cta.label}
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
        )}

        {item.disclaimer && (
          <p className="text-[10px] tablet:text-[11px] font-light text-[var(--brand-gold-lt)]/20 mt-6 tablet:mt-8">{item.disclaimer}</p>
        )}
      </div>
    </div>
  );
}

/* ── 이미지 전용 배너 ── */
function ImageBanner({ item }: { item: BannerItem }) {
  return (
    <div className="relative overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto block"
      />
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function PromoBanner({
  banners,
}: {
  banners?: BannerItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const items = banners && banners.length > 0 ? banners : DEFAULT_BANNERS;

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      sectionRef.current.querySelectorAll(".promo-item").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
        });
      });
    };
    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--brand-bg)] py-8 tablet:py-10 desktop:py-20"
    >
      <div className="max-w-[1320px] mx-auto px-4 tablet:px-6 space-y-5 tablet:space-y-6 desktop:space-y-10">
        {items.map((item) => (
          <div key={item.id} className="promo-item">
            {item.imageUrl ? (
              <ImageBanner item={item} />
            ) : item.type === "school" ? (
              <SchoolBanner item={item} />
            ) : (
              <PromoBannerCard item={item} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
