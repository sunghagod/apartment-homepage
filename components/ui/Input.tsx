"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function InputField({
  label,
  error,
  required,
  className = "",
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-normal text-gray-800 tracking-[-0.5px]"
      >
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      <input
        id={id}
        className={`w-full h-12 font-light text-lg text-gray-800 bg-white border border-gray-600 px-4 tracking-[-0.5px] outline-none transition-colors duration-300 focus:border-[var(--color-accent)] placeholder:text-gray-500 ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm font-light">{error}</span>
      )}
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export function SelectField({
  label,
  error,
  required,
  options,
  className = "",
  id,
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-normal text-gray-800 tracking-[-0.5px]"
      >
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      <select
        id={id}
        className={`appearance-none w-full h-12 font-light text-lg text-gray-800 bg-white border border-gray-600 px-4 pr-10 tracking-[-0.5px] outline-none transition-colors duration-300 focus:border-[var(--color-accent)] bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")] bg-[position:right_12px_center] bg-no-repeat ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      >
        <option value="">선택해주세요</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm font-light">{error}</span>
      )}
    </div>
  );
}

interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export function TextareaField({
  label,
  error,
  required,
  className = "",
  id,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-base font-normal text-gray-800 tracking-[-0.5px]"
      >
        {label}
        {required && <span className="text-[var(--color-accent)] ml-1">*</span>}
      </label>
      <textarea
        id={id}
        className={`w-full font-light text-lg text-gray-800 bg-white border border-gray-600 px-4 py-3 tracking-[-0.5px] outline-none transition-colors duration-300 focus:border-[var(--color-accent)] placeholder:text-gray-500 resize-none ${
          error ? "border-red-500" : ""
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm font-light">{error}</span>
      )}
    </div>
  );
}
