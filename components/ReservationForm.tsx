"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Modal from "./ui/Modal";

interface FormData {
  name: string;
  phone: string;
  date: string;
  size: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  privacyConsent?: string;
}

interface ConsentState {
  privacy: boolean;
}

const sizeOptions = [
  { value: "84A", label: "84㎡ A타입" },
  { value: "84B", label: "84㎡ B타입" },
  { value: "84C", label: "84㎡ C타입" },
  { value: "84D", label: "84㎡ D타입" },
  { value: "115", label: "115㎡" },
  { value: "126", label: "126㎡" },
  { value: "etc", label: "미정 / 기타" },
];

function formatPhone(value: string): string {
  const numbers = value.replace(/[^\d]/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const PHONE_NUMBER = "";

export default function ReservationForm() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
    size: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [consent, setConsent] = useState<ConsentState>({ privacy: false });
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current.querySelector(".form-header"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
      });
      gsap.from(sectionRef.current.querySelector(".form-container"), {
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".form-container"),
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
      });
    };
    init();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (!/^[가-힣a-zA-Z\s]{2,20}$/.test(formData.name)) {
      newErrors.name = "2~20자의 한글 또는 영문을 입력해주세요.";
    }

    const phoneNumbers = formData.phone.replace(/-/g, "");
    if (!formData.phone) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^01[016789]\d{7,8}$/.test(phoneNumbers)) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요.";
    }

    if (!formData.date) {
      newErrors.date = "예약일을 선택해주세요.";
    }

    if (!consent.privacy) {
      newErrors.privacyConsent = "개인정보 수집·이용에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) throw new Error("Google Script URL not configured");
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...formData }),
      });
      router.push("/thank-you");
    } catch {
      setModal({
        isOpen: true,
        type: "error",
        title: "접수에 실패했습니다",
        message: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-14 tablet:py-20 desktop:py-32 bg-[var(--brand-bg)] overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--brand-gold)]/[0.03] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--brand-gold)]/[0.02] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 tablet:px-6">
        {/* 상단 헤더 */}
        <div className="form-header mb-7 tablet:mb-14 desktop:mb-16">
          <div className="flex items-center gap-3 tablet:gap-4 mb-4 tablet:mb-6">
            <div className="h-px w-8 tablet:w-10 bg-[var(--brand-gold)]" />
            <span
              className="text-[10px] tablet:text-[11px] font-medium text-[var(--brand-gold)] tracking-[3px] tablet:tracking-[4px] uppercase"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Reservation
            </span>
          </div>
          <h2 className="text-[26px] tablet:text-[46px] desktop:text-[56px] font-bold text-white tracking-[-1.5px] tablet:tracking-[-2px] mb-2 tablet:mb-5 leading-[1.1]">
            방문상담 예약
          </h2>
          <p className="text-[13px] tablet:text-[16px] font-light text-white/50 max-w-lg leading-relaxed">
            정보를 입력하시면 담당자가 확인 후 연락드립니다.
          </p>
        </div>

        <div className="flex flex-col desktop:flex-row gap-6 tablet:gap-10 desktop:gap-16">
          {/* 폼 카드 — 모바일에서 먼저 노출 */}
          <div className="form-container flex-1 desktop:order-1">
            <div className="bg-white/[0.06] border border-white/[0.10] backdrop-blur-sm p-4 tablet:p-8 desktop:p-10">
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4 tablet:space-y-6">
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6">
                    {/* 이름 */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[13px] tablet:text-[14px] font-medium text-white/70">
                        이름 <span className="text-[var(--brand-gold)]">*</span>
                      </label>
                      <input
                        id="name" name="name" required placeholder="홍길동"
                        value={formData.name} onChange={handleChange}
                        className={`w-full h-11 tablet:h-12 bg-white/[0.06] border text-[15px] font-light text-white placeholder:text-white/30 px-4 outline-none transition-all duration-300 focus:border-[var(--brand-gold)] focus:bg-white/[0.08] ${errors.name ? "border-red-400" : "border-white/[0.12]"}`}
                      />
                      {errors.name && <span className="text-red-400 text-[12px] font-light">{errors.name}</span>}
                    </div>
                    {/* 연락처 */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-[13px] tablet:text-[14px] font-medium text-white/70">
                        연락처 <span className="text-[var(--brand-gold)]">*</span>
                      </label>
                      <input
                        id="phone" name="phone" type="tel" required placeholder="010-0000-0000" maxLength={13}
                        value={formData.phone} onChange={handleChange}
                        className={`w-full h-11 tablet:h-12 bg-white/[0.06] border text-[15px] font-light text-white placeholder:text-white/30 px-4 outline-none transition-all duration-300 focus:border-[var(--brand-gold)] focus:bg-white/[0.08] ${errors.phone ? "border-red-400" : "border-white/[0.12]"}`}
                      />
                      {errors.phone && <span className="text-red-400 text-[12px] font-light">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6">
                    {/* 예약일 */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="date" className="text-[13px] tablet:text-[14px] font-medium text-white/70">
                        방문상담 예약일 <span className="text-[var(--brand-gold)]">*</span>
                      </label>
                      <input
                        id="date" name="date" type="date" required min={getTodayString()}
                        value={formData.date} onChange={handleChange}
                        className={`w-full h-11 tablet:h-12 bg-white/[0.06] border text-[15px] font-light text-white px-4 outline-none transition-all duration-300 focus:border-[var(--brand-gold)] focus:bg-white/[0.08] [color-scheme:dark] ${errors.date ? "border-red-400" : "border-white/[0.12]"}`}
                      />
                      {errors.date && <span className="text-red-400 text-[12px] font-light">{errors.date}</span>}
                    </div>
                    {/* 관심 평형 */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="size" className="text-[13px] tablet:text-[14px] font-medium text-white/70">
                        관심 평형
                      </label>
                      <select
                        id="size" name="size" value={formData.size} onChange={handleChange}
                        className="appearance-none w-full h-11 tablet:h-12 bg-white/[0.06] border border-white/[0.12] text-[15px] font-light text-white px-4 pr-10 outline-none transition-all duration-300 focus:border-[var(--brand-gold)] focus:bg-white/[0.08] bg-[url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' fill='none' stroke-width='1.5'/%3E%3C/svg%3E&quot;)] bg-[position:right_12px_center] bg-no-repeat"
                      >
                        <option value="" className="bg-[var(--brand-bg)] text-white/50">선택해주세요</option>
                        {sizeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[var(--brand-bg)] text-white">{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 문의사항 */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[13px] tablet:text-[14px] font-medium text-white/70">
                      문의사항
                    </label>
                    <textarea
                      id="message" name="message" rows={3} maxLength={500}
                      placeholder="궁금하신 점이 있으시면 자유롭게 작성해주세요."
                      value={formData.message} onChange={handleChange}
                      className="w-full bg-white/[0.06] border border-white/[0.12] text-[15px] font-light text-white placeholder:text-white/30 px-4 py-3 outline-none transition-all duration-300 focus:border-[var(--brand-gold)] focus:bg-white/[0.08] resize-none"
                    />
                  </div>

                  {/* Consent */}
                  <div className="border-t border-white/[0.08] pt-5 tablet:pt-6">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={consent.privacy}
                        onChange={(e) => {
                          setConsent({ privacy: e.target.checked });
                          if (e.target.checked && errors.privacyConsent) {
                            setErrors((prev) => ({ ...prev, privacyConsent: undefined }));
                          }
                        }}
                        className="w-[18px] h-[18px] mt-0.5 accent-[var(--brand-gold)] cursor-pointer shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <label className="text-[13px] tablet:text-[14px] font-light text-white/60 cursor-pointer leading-snug">
                          <span className="text-[var(--brand-gold)] font-normal">[필수]</span>{" "}
                          개인정보 수집·이용 및 마케팅 정보 수신 동의
                        </label>
                        <button
                          type="button"
                          onClick={() => setPrivacyOpen(!privacyOpen)}
                          className="block mt-1.5 text-[12px] text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors"
                        >
                          {privacyOpen ? "접기" : "내용보기"}
                        </button>
                      </div>
                    </div>
                    {privacyOpen && (
                      <div className="mt-3 p-3 tablet:p-4 bg-white/[0.03] border border-white/[0.08] text-[11px] tablet:text-[12px] font-light text-white/50 leading-relaxed max-h-52 tablet:max-h-64 overflow-y-auto">
                        <p className="font-normal text-white/70 mb-2">1. 개인정보 수집·이용</p>
                        <div className="space-y-1.5 mb-3">
                          <div><span className="text-white/60">수집 항목:</span> 이름, 연락처, 방문예약일, 관심 평형, 문의사항</div>
                          <div><span className="text-white/60">수집 목적:</span> 방문상담 예약 접수 및 상담 안내 연락</div>
                          <div><span className="text-white/60">보유 기간:</span> 상담 완료 후 30일 이내 파기</div>
                          <div><span className="text-white/60">거부 권리:</span> 동의를 거부할 수 있으며, 거부 시 예약이 제한됩니다.</div>
                        </div>
                        <p className="font-normal text-white/70 mb-2">2. 마케팅 정보 수신</p>
                        <div className="space-y-1.5">
                          <div><span className="text-white/60">이용 목적:</span> 분양 관련 정보, 프로모션 및 이벤트 안내</div>
                          <div><span className="text-white/60">수신 방법:</span> 전화, 문자(SMS/MMS)</div>
                          <div><span className="text-white/60">보유 기간:</span> 동의 철회 시까지 (철회 요청: sunghagod@gmail.com)</div>
                        </div>
                      </div>
                    )}
                    {errors.privacyConsent && (
                      <span className="block mt-2 ml-7 text-red-400 text-[12px] tablet:text-[13px] font-light">
                        {errors.privacyConsent}
                      </span>
                    )}
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--brand-gold)] text-[var(--brand-bg)] text-[15px] tablet:text-[16px] font-semibold py-4 tablet:py-5 tracking-[0.3px] uppercase transition-all duration-300 hover:bg-[var(--brand-gold-lt)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        처리 중...
                      </span>
                    ) : "방문상담 예약하기"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 정보 카드 — 모바일: 폼 아래 3열 그리드 / 데스크탑: 오른쪽 세로 */}
          <div className="desktop:w-[32%] desktop:order-2">
            <div className="grid grid-cols-3 desktop:grid-cols-1 gap-2.5 tablet:gap-3 desktop:gap-4">
              {/* 전화 */}
              <div className="bg-white/[0.05] border border-white/[0.08] p-3 tablet:p-4 desktop:p-5">
                <div className="w-7 h-7 tablet:w-8 tablet:h-8 bg-[var(--brand-gold)]/10 flex items-center justify-center mb-2 tablet:mb-3">
                  <svg className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 text-[var(--brand-gold)]" viewBox="0 0 16 16" fill="none">
                    <path d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9c-1.3-.7-2.5-1.9-3.2-3.2l1.3-1.3c.3-.3.4-.7.4-1.2 0-1-.5-2-1.3-2.7L4 1.8C3.6 1.4 3 1.2 2.5 1.2 1.7 1.2 1 1.5.6 2L.3 2.4C-.3 3-.4 4 .1 5.2c1.3 3.3 4.5 6.4 7.7 7.7.5.2 1 .3 1.5.3 1 0 1.8-.4 2.3-.9l.3-.3c.4-.4.6-1 .6-1.5 0-.5-.2-1-.6-1.4l-1.2-1.1z" fill="currentColor" />
                  </svg>
                </div>
                <span className="block text-[10px] tablet:text-[11px] font-medium text-white/35 tracking-[1.5px] uppercase mb-1" style={{ fontFamily: "var(--font-secondary)" }}>Phone</span>
                {PHONE_NUMBER ? (
                  <a href={`tel:${PHONE_NUMBER}`} className="text-[12px] tablet:text-[14px] font-medium text-white/90 hover:text-[var(--brand-gold)] transition-colors">{PHONE_NUMBER}</a>
                ) : (
                  <span className="text-[11px] tablet:text-[13px] font-light text-white/55 leading-tight">안내 예정</span>
                )}
              </div>
              {/* 일정 */}
              <div className="bg-white/[0.05] border border-white/[0.08] p-3 tablet:p-4 desktop:p-5">
                <div className="w-7 h-7 tablet:w-8 tablet:h-8 bg-[var(--brand-gold)]/10 flex items-center justify-center mb-2 tablet:mb-3">
                  <svg className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 text-[var(--brand-gold)]" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1a5 5 0 100 10A5 5 0 008 1zM2 8a6 6 0 1112 0A6 6 0 012 8zm6-3a1 1 0 011 1v2.586l1.707 1.707-.707.707L8 9V6a1 1 0 011-1z" fill="currentColor" />
                  </svg>
                </div>
                <span className="block text-[10px] tablet:text-[11px] font-medium text-white/35 tracking-[1.5px] uppercase mb-1" style={{ fontFamily: "var(--font-secondary)" }}>Status</span>
                <span className="text-[11px] tablet:text-[13px] font-light text-white/55 leading-tight">접수 완료</span>
              </div>
              {/* 위치 */}
              <div className="bg-white/[0.05] border border-white/[0.08] p-3 tablet:p-4 desktop:p-5">
                <div className="w-7 h-7 tablet:w-8 tablet:h-8 bg-[var(--brand-gold)]/10 flex items-center justify-center mb-2 tablet:mb-3">
                  <svg className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 text-[var(--brand-gold)]" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 118 5a1.5 1.5 0 010 3z" fill="currentColor" />
                  </svg>
                </div>
                <span className="block text-[10px] tablet:text-[11px] font-medium text-white/35 tracking-[1.5px] uppercase mb-1" style={{ fontFamily: "var(--font-secondary)" }}>Location</span>
                <span className="text-[11px] tablet:text-[13px] font-light text-white/55 leading-tight">광주 남구 진월동</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </section>
  );
}
