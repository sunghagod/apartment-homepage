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
}

const sizeOptions = [
  { value: "59", label: "59㎡" },
  { value: "74", label: "74㎡" },
  { value: "84", label: "84㎡" },
  { value: "etc", label: "기타" },
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
    const initAnimation = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelector(".form-header"), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
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
      }
    };

    initAnimation();
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
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModal({
          isOpen: true,
          type: "success",
          title: "예약이 접수되었습니다",
          message:
            "입력하신 연락처로 확인 연락을 드리겠습니다. 감사합니다.",
        });
        setFormData({ name: "", phone: "", date: "", size: "", message: "" });
      } else {
        throw new Error("Submit failed");
      }
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
      className="py-[100px] bg-white"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="form-header text-center mb-16">
          <span className="text-sm font-light text-[var(--color-accent)] tracking-[2px] uppercase mb-4 block">
            RESERVATION
          </span>
          <h2 className="text-[28px] tablet:text-[36px] font-bold text-gray-900 tracking-[-1px] mb-4">
            방문상담 예약
          </h2>
          <p className="text-base font-light text-gray-600 max-w-lg mx-auto leading-relaxed">
            아래 정보를 입력하시면 담당자가 확인 후 연락드리겠습니다
          </p>
        </div>

        {/* Form */}
        <div className="form-container max-w-2xl mx-auto">
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

              {/* Privacy notice */}
              <p className="text-xs font-light text-gray-500 leading-relaxed">
                * 수집된 개인정보는 상담 목적으로만 사용되며, 상담 완료 후
                즉시 파기됩니다.
              </p>

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
