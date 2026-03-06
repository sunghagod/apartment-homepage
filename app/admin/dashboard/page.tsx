"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ── 타입 ──────────────────────────────────────────────────────────────────────
interface Stat {
  val: string;
  unit: string;
  label: string;
}

interface Feature {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
}

interface SitemapSection {
  imageUrl: string;
  description: string;
  badges: string[];
}

interface FloorPlanContent {
  id: string;
  label: string;
  name: string;
  area: string;
  rooms: string;
  units: number;
  description: string;
  features: string[];
  imageUrl: string;
}

interface Content {
  site: { name: string };
  location?: { mapImageUrl: string; schoolImageUrl?: string };
  hero: {
    imageUrl: string;
    eyebrow: string;
    lines: string[];
    description: string;
    stats: Stat[];
  };
  features: Feature[];
  sitemap: {
    location: SitemapSection;
    layout: SitemapSection;
  };
  floorPlans?: FloorPlanContent[];
}

// ── 서브 컴포넌트 ──────────────────────────────────────────────────────────────

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#C8A870] text-[#09090D] text-[14px] font-semibold px-6 py-3 shadow-xl animate-fade-in">
      {message}
    </div>
  );
}

function SectionCard({ title, children, onSave, saving }: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-[#111117] border border-white/[0.08] p-6 rounded-none">
      <h2 className="text-[16px] font-semibold text-white mb-6 pb-4 border-b border-white/[0.08]">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-[#C8A870] text-[#09090D] text-[13px] font-semibold px-6 py-2.5 tracking-[0.3px] uppercase hover:bg-[#DFCBA0] transition-colors disabled:opacity-40"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] text-white/40 mb-1.5 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#09090D] border border-white/[0.1] text-white text-[14px] px-3 py-2 outline-none focus:border-[#C8A870]/50 transition-colors placeholder:text-white/20"
    />
  );
}

function TextArea({ value, onChange, rows = 3 }: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-[#09090D] border border-white/[0.1] text-white text-[14px] px-3 py-2 outline-none focus:border-[#C8A870]/50 transition-colors resize-none"
    />
  );
}

function ImageUploadCard({ slot, currentUrl, onUploaded }: {
  slot: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);

  useEffect(() => {
    setPreviewUrl(currentUrl);
  }, [currentUrl]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 즉시 로컬 미리보기
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slot", slot);

      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("업로드 실패");
      const { url } = await res.json();
      setPreviewUrl(url);
      onUploaded(url);
    } catch (err) {
      console.error(err);
      setPreviewUrl(currentUrl);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="relative">
      <div
        className="relative w-full aspect-video bg-[#09090D] border border-white/[0.1] overflow-hidden flex items-center justify-center cursor-pointer group"
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <svg className="mx-auto mb-2 opacity-30" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="3" y="5" width="26" height="20" rx="2" stroke="#C8A870" strokeWidth="1.5" />
              <circle cx="11" cy="12" r="2.5" stroke="#C8A870" strokeWidth="1.5" />
              <path d="M3 22l7-6 5 5 4-4 10 9" stroke="#C8A870" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <p className="text-white/30 text-[12px]">클릭하여 이미지 업로드</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-[13px] font-medium">이미지 교체</span>
        </div>

        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-[#C8A870] text-[13px] font-medium">업로드 중...</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ── 평면도 전용 이미지 업로드 카드 (object-contain + 흰 배경) ──────────────────
function FloorPlanImageCard({ slot, currentUrl, onUploaded }: {
  slot: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);

  useEffect(() => {
    setPreviewUrl(currentUrl);
  }, [currentUrl]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slot", slot);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("업로드 실패");
      const { url } = await res.json();
      setPreviewUrl(url);
      onUploaded(url);
    } catch (err) {
      console.error(err);
      setPreviewUrl(currentUrl);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="relative">
      <div
        className="relative w-full aspect-[4/3] bg-white border border-white/[0.1] overflow-hidden flex items-center justify-center cursor-pointer group"
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="평면도 미리보기"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center">
            <svg className="mx-auto mb-2 opacity-40" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="4" width="32" height="32" rx="2" stroke="#C8A870" strokeWidth="1.5" />
              <rect x="10" y="10" width="8" height="6" stroke="#C8A870" strokeWidth="1.2" />
              <rect x="22" y="10" width="8" height="6" stroke="#C8A870" strokeWidth="1.2" />
              <rect x="10" y="22" width="20" height="8" stroke="#C8A870" strokeWidth="1.2" />
            </svg>
            <p className="text-[#888] text-[12px]">클릭하여 평면도 업로드</p>
            <p className="text-[#aaa] text-[11px] mt-1">PNG / JPG (최대 20MB)</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 text-[#09090D] text-[13px] font-semibold px-4 py-2">
            이미지 교체
          </div>
        </div>

        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 border-2 border-[#C8A870] border-t-transparent rounded-full animate-spin" />
            <span className="text-[#C8A870] text-[13px] font-medium">업로드 중...</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />
      {previewUrl && (
        <p className="mt-1 text-[11px] text-white/30 truncate">{previewUrl.split("/").pop()}</p>
      )}
    </div>
  );
}

// ── 기본 평형 데이터 (Cloudinary에 floorPlans 없을 때 초기값) ────────────────
const DEFAULT_FLOOR_PLANS: FloorPlanContent[] = [
  { id: "84A", label: "84㎡ A", name: "84A타입", area: "전용 84.8566㎡ / 공급 115.8340㎡", rooms: "방 4 / 욕실 2", units: 127, features: ["4Bay 판상형", "대형 드레스룸", "팬트리 수납"], description: "127세대 공급. 4Bay 판상형 설계로 채광과 통풍을 극대화한 대표 평형.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440059/apartment/floorplan-84A.png" },
  { id: "84B", label: "84㎡ B", name: "84B타입", area: "전용 84.9777㎡ / 공급 115.6917㎡", rooms: "방 4 / 욕실 2", units: 52, features: ["최상층 특화", "알파룸", "거실 확장형"], description: "52세대 공급. 최상층 특화 설계가 적용된 프리미엄 타입.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440060/apartment/floorplan-84B.png" },
  { id: "84C", label: "84㎡ C", name: "84C타입", area: "전용 84.9703㎡ / 공급 116.1917㎡", rooms: "방 4 / 욕실 2", units: 43, features: ["맞통풍 설계", "주방 팬트리", "드레스룸"], description: "43세대 공급. 맞통풍 설계로 사계절 내내 쾌적한 실내 환경.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440062/apartment/floorplan-84C.png" },
  { id: "84D", label: "84㎡ D", name: "84D타입", area: "전용 84.9805㎡ / 공급 116.4486㎡", rooms: "방 3 / 욕실 2", units: 30, features: ["와이드 거실", "오픈 주방", "복도 최소화"], description: "30세대 공급. 복도를 최소화한 개방감 있는 평면.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440064/apartment/floorplan-84D.png" },
  { id: "115", label: "115㎡", name: "115타입", area: "전용 115.9641㎡ / 공급 143.9770㎡", rooms: "방 4 / 욕실 2", units: 8, features: ["8Bay 판상형", "초대형 드레스룸", "독립 서재"], description: "8세대 공급. 8Bay 판상형 구조의 프리미엄 중형 타입.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440065/apartment/floorplan-115.png" },
  { id: "126", label: "126㎡", name: "126타입", area: "전용 126.7672㎡ / 공급 153.6182㎡", rooms: "방 4 / 욕실 2", units: 40, features: ["테라스 특화", "대형 팬트리", "WIC 드레스룸"], description: "40세대 공급. 단지 최대 평형 테라스 특화 설계 타입.", imageUrl: "https://res.cloudinary.com/dtyvnypxw/image/upload/v1772440066/apartment/floorplan-126.png" },
];

// ── 메인 페이지 ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [toast, setToast] = useState("");
  const [savingSection, setSavingSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        if (!data.floorPlans || data.floorPlans.length === 0) {
          data.floorPlans = DEFAULT_FLOOR_PLANS;
        }
        setContent(data);
      })
      .catch(() => alert("콘텐츠를 불러올 수 없습니다."));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  async function saveContent(section: string) {
    if (!content) return;
    setSavingSection(section);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      setToast("저장되었습니다.");
    } catch {
      setToast("저장에 실패했습니다.");
    } finally {
      setSavingSection(null);
    }
  }

  function updateHeroLine(idx: number, val: string) {
    if (!content) return;
    const lines = [...content.hero.lines];
    lines[idx] = val;
    setContent({ ...content, hero: { ...content.hero, lines } });
  }

  function updateStat(idx: number, key: keyof Stat, val: string) {
    if (!content) return;
    const stats = [...content.hero.stats];
    stats[idx] = { ...stats[idx], [key]: val };
    setContent({ ...content, hero: { ...content.hero, stats } });
  }

  function updateFeature(idx: number, key: keyof Feature, val: string) {
    if (!content) return;
    const features = [...content.features];
    features[idx] = { ...features[idx], [key]: val };
    setContent({ ...content, features });
  }

  function updateSitemap(tab: "location" | "layout", key: keyof SitemapSection, val: string | string[]) {
    if (!content) return;
    setContent({
      ...content,
      sitemap: {
        ...content.sitemap,
        [tab]: { ...content.sitemap[tab], [key]: val },
      },
    });
  }

  function updateSitemapBadge(tab: "location" | "layout", idx: number, val: string) {
    if (!content) return;
    const badges = [...content.sitemap[tab].badges];
    badges[idx] = val;
    updateSitemap(tab, "badges", badges);
  }

  function updateFloorPlan(idx: number, key: keyof FloorPlanContent, val: string | number | string[]) {
    if (!content?.floorPlans) return;
    const floorPlans = [...content.floorPlans];
    floorPlans[idx] = { ...floorPlans[idx], [key]: val };
    setContent({ ...content, floorPlans });
  }

  function updateFloorPlanFeature(idx: number, fi: number, val: string) {
    if (!content?.floorPlans) return;
    const floorPlans = [...content.floorPlans];
    const features = [...floorPlans[idx].features];
    features[fi] = val;
    floorPlans[idx] = { ...floorPlans[idx], features };
    setContent({ ...content, floorPlans });
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#09090D] flex items-center justify-center">
        <p className="text-white/40 text-[14px]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090D]">
      {/* 상단 바 */}
      <header className="sticky top-0 z-40 bg-[#09090D]/95 backdrop-blur border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-4 w-px bg-[#C8A870]" />
          <h1 className="text-[15px] font-semibold text-white" style={{ fontFamily: "Manrope, sans-serif" }}>
            관리자 대시보드
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-[13px] text-white/50 hover:text-white/80 transition-colors"
          >
            홈페이지 보기 ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="max-w-[900px] mx-auto px-6 py-10 space-y-8">

        {/* ── 섹션 1: 사이트 정보 ── */}
        <SectionCard
          title="사이트 정보"
          onSave={() => saveContent("site")}
          saving={savingSection === "site"}
        >
          <Field label="단지명">
            <TextInput
              value={content.site.name}
              onChange={(v) => setContent({ ...content, site: { name: v } })}
            />
          </Field>
        </SectionCard>

        {/* ── 섹션 2: 히어로 ── */}
        <SectionCard
          title="히어로 섹션"
          onSave={() => saveContent("hero")}
          saving={savingSection === "hero"}
        >
          <Field label="배경 이미지">
            <ImageUploadCard
              slot="hero"
              currentUrl={content.hero.imageUrl}
              onUploaded={(url) =>
                setContent({ ...content, hero: { ...content.hero, imageUrl: url } })
              }
            />
          </Field>

          <Field label="상단 레이블 (Eyebrow)">
            <TextInput
              value={content.hero.eyebrow}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, eyebrow: v } })}
            />
          </Field>

          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
              헤드라인 (3줄)
            </label>
            <div className="space-y-2">
              {content.hero.lines.map((line, i) => (
                <TextInput
                  key={i}
                  value={line}
                  onChange={(v) => updateHeroLine(i, v)}
                  placeholder={`${i + 1}번째 줄`}
                />
              ))}
            </div>
          </div>

          <Field label="설명 문구">
            <TextArea
              value={content.hero.description}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, description: v } })}
              rows={2}
            />
          </Field>

          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
              통계 수치
            </label>
            <div className="grid grid-cols-3 gap-3">
              {content.hero.stats.map((s, i) => (
                <div key={i} className="space-y-2 p-3 bg-[#09090D] border border-white/[0.06]">
                  <TextInput value={s.val} onChange={(v) => updateStat(i, "val", v)} placeholder="수치" />
                  <TextInput value={s.unit} onChange={(v) => updateStat(i, "unit", v)} placeholder="단위" />
                  <TextInput value={s.label} onChange={(v) => updateStat(i, "label", v)} placeholder="라벨" />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ── 섹션 3: 단지 소개 (Features) ── */}
        <SectionCard
          title="단지 소개"
          onSave={() => saveContent("features")}
          saving={savingSection === "features"}
        >
          <div className="grid grid-cols-1 gap-6">
            {content.features.map((feat, i) => (
              <div key={feat.id} className="p-4 bg-[#09090D] border border-white/[0.06] space-y-4">
                <p className="text-[11px] text-[#C8A870] font-medium tracking-[2px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {feat.id}
                </p>
                <ImageUploadCard
                  slot={`feature-${feat.id}`}
                  currentUrl={feat.imageUrl}
                  onUploaded={(url) => updateFeature(i, "imageUrl", url)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="한국어 제목">
                    <TextInput value={feat.title} onChange={(v) => updateFeature(i, "title", v)} />
                  </Field>
                  <Field label="영문 부제목">
                    <TextInput value={feat.subtitle} onChange={(v) => updateFeature(i, "subtitle", v)} />
                  </Field>
                </div>
                <Field label="설명">
                  <TextArea value={feat.description} onChange={(v) => updateFeature(i, "description", v)} rows={2} />
                </Field>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── 섹션 3-1: 입지 지도 ── */}
        <SectionCard
          title="입지 지도 (탁월한 입지 섹션)"
          onSave={() => saveContent("location")}
          saving={savingSection === "location"}
        >
          <Field label="지도 이미지">
            <ImageUploadCard
              slot="location-map"
              currentUrl={content.location?.mapImageUrl ?? ""}
              onUploaded={(url) =>
                setContent({ ...content, location: { mapImageUrl: url } })
              }
            />
          </Field>
          <p className="text-[12px] text-white/30">클릭하여 지도 이미지를 교체합니다. 홈페이지 &apos;탁월한 입지&apos; 섹션에 바로 반영됩니다.</p>
        </SectionCard>

        {/* ── 섹션 4: 위치/배치도 (SiteMap) ── */}
        <SectionCard
          title="위치 및 배치도"
          onSave={() => saveContent("sitemap")}
          saving={savingSection === "sitemap"}
        >
          {(["location", "layout"] as const).map((tab) => {
            const labels = { location: "광역도", layout: "배치도" };
            const data = content.sitemap[tab];
            const slot = tab === "location" ? "sitemap-location" : "sitemap-layout";

            return (
              <div key={tab} className="p-4 bg-[#09090D] border border-white/[0.06] space-y-4">
                <p className="text-[12px] text-[#C8A870] font-semibold tracking-[2px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {labels[tab]}
                </p>
                <ImageUploadCard
                  slot={slot}
                  currentUrl={data.imageUrl}
                  onUploaded={(url) => updateSitemap(tab, "imageUrl", url)}
                />
                <Field label="설명">
                  <TextArea
                    value={data.description}
                    onChange={(v) => updateSitemap(tab, "description", v)}
                    rows={2}
                  />
                </Field>
                <div>
                  <label className="block text-[11px] text-white/40 mb-1.5 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
                    배지 (3개)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {data.badges.map((b, i) => (
                      <TextInput
                        key={i}
                        value={b}
                        onChange={(v) => updateSitemapBadge(tab, i, v)}
                        placeholder={`배지 ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </SectionCard>
        {/* ── 섹션 4-1: 학군 섹션 이미지 ── */}
        <SectionCard
          title="학군 섹션 이미지"
          onSave={() => saveContent("location")}
          saving={savingSection === "location"}
        >
          <p className="text-[12px] text-white/30 -mt-2">홈페이지 &apos;우수한 학군 환경&apos; 섹션에 표시될 큰 배경 사진입니다.</p>
          <ImageUploadCard
            slot="school-section"
            currentUrl={content.location?.schoolImageUrl ?? ""}
            onUploaded={(url) =>
              setContent({ ...content, location: { ...content.location, mapImageUrl: content.location?.mapImageUrl ?? "", schoolImageUrl: url } })
            }
          />
        </SectionCard>

        {/* ── 섹션 5: 평형 안내 ── */}
        <SectionCard
          title="평형 안내"
          onSave={() => saveContent("floorPlans")}
          saving={savingSection === "floorPlans"}
        >
          <p className="text-[12px] text-white/30 -mt-2">평면도 이미지를 클릭하여 교체하고 저장 버튼을 누르세요.</p>
          <div className="grid grid-cols-1 gap-6">
            {(content.floorPlans ?? []).map((plan, i) => (
              <div key={plan.id} className="p-4 bg-[#09090D] border border-white/[0.06] space-y-4">
                {/* 타입 헤더 */}
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#C8A870] font-semibold tracking-[2px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {plan.label}
                  </p>
                  <span className="text-[11px] text-white/30 font-light">{plan.units}세대</span>
                </div>

                {/* 평면도 이미지 업로드 */}
                <FloorPlanImageCard
                  slot={`floorplan-${plan.id}`}
                  currentUrl={plan.imageUrl}
                  onUploaded={(url) => updateFloorPlan(i, "imageUrl", url)}
                />

                  {/* name / units */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="타입명">
                      <TextInput value={plan.name} onChange={(v) => updateFloorPlan(i, "name", v)} placeholder="84A타입" />
                    </Field>
                    <Field label="공급 세대수">
                      <TextInput
                        value={String(plan.units)}
                        onChange={(v) => updateFloorPlan(i, "units", Number(v) || 0)}
                        placeholder="0"
                      />
                    </Field>
                  </div>

                  {/* area / rooms */}
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="면적">
                      <TextInput value={plan.area} onChange={(v) => updateFloorPlan(i, "area", v)} placeholder="전용 00㎡ / 공급 00㎡" />
                    </Field>
                    <Field label="구성">
                      <TextInput value={plan.rooms} onChange={(v) => updateFloorPlan(i, "rooms", v)} placeholder="방 4 / 욕실 2" />
                    </Field>
                  </div>

                  {/* description */}
                  <Field label="설명">
                    <TextArea value={plan.description} onChange={(v) => updateFloorPlan(i, "description", v)} rows={2} />
                  </Field>

                  {/* features */}
                  <div>
                    <label className="block text-[11px] text-white/40 mb-1.5 tracking-[0.5px] uppercase" style={{ fontFamily: "Manrope, sans-serif" }}>
                      특장점 (3개)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(plan.features ?? ["", "", ""]).map((feat, fi) => (
                        <TextInput
                          key={fi}
                          value={feat}
                          onChange={(v) => updateFloorPlanFeature(i, fi, v)}
                          placeholder={`특장점 ${fi + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
      </main>

      {/* 토스트 */}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
