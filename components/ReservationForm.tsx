"use client";

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { InputField, SelectField, TextareaField } from "./ui/Input";
import Button from "./ui/Button";
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

export default function ReservationForm() {
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
      setModal({
        isOpen: true,
        type: "success",
        title: "예약이 접수되었습니다",
        message: "입력하신 연락처로 확인 연락을 드리겠습니다. 감사합니다.",
      });
      setFormData({ name: "", phone: "", date: "", size: "", message: "" });
      setConsent({ privacy: false });
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
      className="py-14 desktop:py-32 bg-[var(--brand-cream2)]"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="flex flex-col desktop:flex-row gap-16 desktop:gap-24">
          {/* Section Header — left column on desktop */}
          <div className="form-header desktop:w-[38%] desktop:pt-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[var(--brand-gold)]" />
              <span
                className="text-[11px] font-medium text-[var(--brand-gold)] tracking-[4px] uppercase"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Reservation
              </span>
            </div>
            <h2 className="text-[34px] tablet:text-[46px] font-bold text-[var(--n-900)] tracking-[-2px] mb-5 leading-[1.1]">
              방문상담
              <br />
              예약
            </h2>
            <p className="text-[15px] font-light text-[var(--n-500)] max-w-sm leading-relaxed mb-10">
              아래 정보를 입력하시면 담당자가 확인 후 연락드리겠습니다.
            </p>
            {/* Contact info */}
            <div className="space-y-3 text-[14px] font-light text-[var(--n-600)]">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.5 10.5c-.8-.8-1.8-1.3-2.8-1.3-.5 0-1 .1-1.4.4L8 10.9c-1.3-.7-2.5-1.9-3.2-3.2l1.3-1.3c.3-.3.4-.7.4-1.2 0-1-.5-2-1.3-2.7L4 1.8C3.6 1.4 3 1.2 2.5 1.2 1.7 1.2 1 1.5.6 2L.3 2.4C-.3 3-.4 4 .1 5.2c1.3 3.3 4.5 6.4 7.7 7.7.5.2 1 .3 1.5.3 1 0 1.8-.4 2.3-.9l.3-.3c.4-.4.6-1 .6-1.5 0-.5-.2-1-.6-1.4l-1.2-1.1z"
                    fill="currentColor"
                  />
                </svg>
                <span>분양 상담 전화 안내 예정</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1a5 5 0 100 10A5 5 0 008 1zM2 8a6 6 0 1112 0A6 6 0 012 8zm6-3a1 1 0 011 1v2.586l1.707 1.707-.707.707L8 9V6a1 1 0 011-1z"
                    fill="currentColor"
                  />
                </svg>
                <span>특별공급 2.21 / 1순위 3.5 / 2순위 3.6</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 118 5a1.5 1.5 0 010 3z"
                    fill="currentColor"
                  />
                </svg>
                <span>광주광역시 남구 진월동</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="form-container flex-1">
            <div className="bg-white p-8 tablet:p-10">
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                    <InputField
                      id="name"
                      name="name"
                      label="이름"
                      required
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <InputField
                      id="phone"
                      name="phone"
                      label="연락처"
                      required
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      maxLength={13}
                    />
                  </div>

                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                    <InputField
                      id="date"
                      name="date"
                      label="방문상담 예약일"
                      required
                      type="date"
                      min={getTodayString()}
                      value={formData.date}
                      onChange={handleChange}
                      error={errors.date}
                    />
                    <SelectField
                      id="size"
                      name="size"
                      label="관심 평형"
                      options={sizeOptions}
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </div>

                  <TextareaField
                    id="message"
                    name="message"
                    label="문의사항"
                    placeholder="궁금하신 점이 있으시면 자유롭게 작성해주세요. (최대 500자)"
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                  />

                  {/* Consent */}
                  <div className="border-t border-[var(--n-100)] pt-6">
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.privacy}
                          onChange={(e) => {
                            setConsent({ privacy: e.target.checked });
                            if (e.target.checked && errors.privacyConsent) {
                              setErrors((prev) => ({
                                ...prev,
                                privacyConsent: undefined,
                              }));
                            }
                          }}
                          className="w-5 h-5 accent-[var(--color-accent)] cursor-pointer"
                        />
                        <span className="text-sm font-light text-[var(--n-700)]">
                          <span className="text-[var(--brand-gold)] font-normal">
                            [필수]
                          </span>{" "}
                          개인정보 수집·이용 및 마케팅 정보 수신 동의
                        </span>
                        <button
                          type="button"
                          onClick={() => setPrivacyOpen(!privacyOpen)}
                          className="ml-auto text-xs text-[var(--n-500)] underline underline-offset-2 shrink-0"
                        >
                          {privacyOpen ? "접기" : "내용보기"}
                        </button>
                      </label>
                      {privacyOpen && (
                        <div className="mt-2 ml-8 p-4 bg-[var(--n-50)] border border-[var(--n-200)] text-xs font-light text-[var(--n-600)] leading-relaxed max-h-64 overflow-y-auto">
                          <p className="font-normal text-[var(--n-800)] mb-2">
                            1. 개인정보 수집·이용
                          </p>
                          <table className="w-full border-collapse mb-4">
                            <thead>
                              <tr className="border-b border-[var(--n-300)]">
                                <th className="text-left py-2 pr-2 font-normal text-[var(--n-800)]">
                                  항목
                                </th>
                                <th className="text-left py-2 font-normal text-[var(--n-800)]">
                                  내용
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  수집 항목
                                </td>
                                <td className="py-2">
                                  이름, 연락처, 방문예약일, 관심 평형, 문의사항
                                </td>
                              </tr>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  수집 목적
                                </td>
                                <td className="py-2">
                                  방문상담 예약 접수 및 상담 안내 연락
                                </td>
                              </tr>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  보유 기간
                                </td>
                                <td className="py-2">
                                  상담 완료 후 30일 이내 파기
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  거부 권리
                                </td>
                                <td className="py-2">
                                  동의를 거부할 수 있으며, 거부 시 방문상담
                                  예약이 제한됩니다.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="font-normal text-[var(--n-800)] mb-2">
                            2. 마케팅 정보 수신
                          </p>
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-[var(--n-300)]">
                                <th className="text-left py-2 pr-2 font-normal text-[var(--n-800)]">
                                  항목
                                </th>
                                <th className="text-left py-2 font-normal text-[var(--n-800)]">
                                  내용
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  이용 목적
                                </td>
                                <td className="py-2">
                                  분양 관련 정보, 프로모션 및 이벤트 안내
                                </td>
                              </tr>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  수신 방법
                                </td>
                                <td className="py-2">전화, 문자(SMS/MMS)</td>
                              </tr>
                              <tr className="border-b border-[var(--n-200)]">
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  보유 기간
                                </td>
                                <td className="py-2">
                                  동의 철회 시까지 (철회 요청:
                                  sunghagod@gmail.com)
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-2 align-top whitespace-nowrap">
                                  거부 권리
                                </td>
                                <td className="py-2">
                                  동의 철회는 이메일(sunghagod@gmail.com)로
                                  요청하실 수 있습니다.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {errors.privacyConsent && (
                        <span className="block mt-1 ml-8 text-red-500 text-sm font-light">
                          {errors.privacyConsent}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="w-full py-4 text-lg"
                  >
                    예약하기
                  </Button>
                </div>
              </form>
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
