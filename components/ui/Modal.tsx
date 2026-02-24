"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-[90%] max-w-md bg-white p-0 backdrop:bg-black/50"
      onClose={onClose}
    >
      <div className="p-8 text-center">
        <div className="mb-6">
          {type === "success" ? (
            <div className="mx-auto w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          ) : (
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-[-1px]">
          {title}
        </h3>
        <p className="text-base font-light text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        <Button variant="primary" onClick={onClose} className="w-full">
          확인
        </Button>
      </div>
    </dialog>
  );
}
