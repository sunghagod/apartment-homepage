"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "로그인에 실패했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090D] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="h-px w-10 bg-[#C8A870] mx-auto mb-6" />
          <h1
            className="text-[22px] font-bold text-white tracking-[-0.5px] mb-1"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            ADMIN
          </h1>
          <p className="text-[13px] text-white/40 font-light">관리자 로그인</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] text-white/50 mb-2 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호 입력"
              className="w-full bg-[#111117] border border-white/[0.1] text-white text-[14px] px-4 py-3 outline-none focus:border-[#C8A870]/60 transition-colors placeholder:text-white/20"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#C8A870] text-[#09090D] text-[14px] font-semibold py-3.5 tracking-[0.3px] uppercase transition-all duration-200 hover:bg-[#DFCBA0] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-[13px] text-white/30 hover:text-white/60 transition-colors">
            ← 홈페이지로
          </a>
        </div>
      </div>
    </div>
  );
}
