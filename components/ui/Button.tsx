"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-light text-lg tracking-[-0.5px] cursor-pointer transition-all duration-300 border-none";

  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-accent)] text-white px-8 py-3.5 hover:opacity-85",
    secondary:
      "bg-transparent text-gray-600 border border-gray-300 px-8 py-3.5 hover:text-gray-800 hover:border-gray-800",
    ghost: "bg-transparent text-gray-800 border-none px-0 py-2",
    dark: "bg-gray-800 text-white px-6 py-3",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin-slow w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          처리 중...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
