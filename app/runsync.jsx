import { useState, useEffect, useRef } from "react";
import { Activity, Flame, Utensils, Calendar, ChevronRight, ChevronLeft, Zap, Target, Clock, TrendingUp, Heart, CheckCircle, Play, Droplets, LayoutGrid, Smartphone, RotateCcw, MousePointerClick, Wifi, BatteryFull, Signal, ArrowRight, Sparkles } from "lucide-react";

// ═══════════════════════════════════════════════════════════
// FONTS — Syne (display) + DM Sans (body)
// ═══════════════════════════════════════════════════════════
if (typeof document !== "undefined" && !document.querySelector('link[data-runsync-font]')) {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap";
  link.rel = "stylesheet";
  link.setAttribute("data-runsync-font", "true");
  document.head.appendChild(link);
}

// ═══════════════════════════════════════════════════════════
// DESIGN TOKENS — kamu bisa edit di sini untuk re-skin app
// ═══════════════════════════════════════════════════════════
const TOKENS = {
  bg: "#08080d",
  bgDeep: "#050507",
  surface: "rgba(255,255,255,0.04)",
  surfaceHi: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.14)",
  text: "#f5f5fa",
  textDim: "#a0a0b0",
  textMuted: "#666673",
  textFaint: "#3a3a44",
  teal: "#5eead4",
  purple: "#a78bfa",
  coral: "#fb7185",
  amber: "#fbbf24",
  green: "#4ade80",
  blue: "#60a5fa",
  red: "#f87171",
};

const FONTS = {
  display: "'Syne', sans-serif",
  body: "'DM Sans', sans-serif",
};

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const TRAINING_SESSIONS = {
  beginner: [
    { day: "Senin", type: "Run/Walk", duration: "20 min", detail: "1 min lari · 2 min jalan × 6", intensity: "Rendah", emoji: "🚶" },
    { day: "Rabu", type: "Rest Aktif", duration: "30 min", detail: "Jalan santai atau stretching", intensity: "Sangat Rendah", emoji: "🧘" },
    { day: "Jumat", type: "Run/Walk", duration: "25 min", detail: "2 min lari · 2 min jalan × 6", intensity: "Rendah", emoji: "🏃" },
    { day: "Minggu", type: "Long Walk", duration: "35 min", detail: "Jalan cepat konstan", intensity: "Rendah", emoji: "🌅" },
  ],
  intermediate: [
    { day: "Senin", type: "Easy Run", duration: "30 min", detail: "Pace santai, bisa ngobrol", intensity: "Sedang", emoji: "🏃" },
    { day: "Rabu", type: "Interval", duration: "35 min", detail: "8×400m cepat + warmup/cooldown", intensity: "Tinggi", emoji: "⚡" },
    { day: "Jumat", type: "Tempo Run", duration: "30 min", detail: "15 min tempo · 5 min easy", intensity: "Sedang-Tinggi", emoji: "🔥" },
    { day: "Minggu", type: "Long Run", duration: "50 min", detail: "Pace konstan, nyaman", intensity: "Sedang", emoji: "🌅" },
  ],
  advanced: [
    { day: "Senin", type: "Recovery", duration: "40 min", detail: "Zone 2, sangat ringan", intensity: "Rendah", emoji: "🌿" },
    { day: "Selasa", type: "Speed Work", duration: "50 min", detail: "12×400m @ 5K pace", intensity: "Sangat Tinggi", emoji: "🚀" },
    { day: "Kamis", type: "Tempo Run", duration: "50 min", detail: "20 min @ threshold pace", intensity: "Tinggi", emoji: "⚡" },
    { day: "Sabtu", type: "Long Run", duration: "90 min", detail: "Pace percakapan, aerobik", intensity: "Sedang", emoji: "🏔️" },
  ],
};

const FOOD_DATA = [
  { time: "Pre-Run Pagi", subtitle: "30-60 min sebelum lari", icon: "☕", color: TOKENS.amber,
    foods: [
      { name: "Pisang + Selai Kacang", cal: 180, carb: 30, protein: 4, note: "Quick energy!" },
      { name: "Roti gandum + madu", cal: 150, carb: 32, protein: 4, note: "Mudah dicerna" },
    ]},
  { time: "Post-Run Recovery", subtitle: "Dalam 30 menit setelah lari", icon: "⚡", color: TOKENS.green,
    foods: [
      { name: "Nasi + Telur + Ayam", cal: 450, carb: 55, protein: 32, note: "Recovery optimal" },
      { name: "Greek Yogurt + Granola", cal: 320, carb: 42, protein: 18, note: "Protein tinggi" },
    ]},
  { time: "Makan Siang", subtitle: "12:00 – 14:00", icon: "☀️", color: TOKENS.coral,
    foods: [
      { name: "Nasi + Ikan + Tempe + Lalapan", cal: 520, carb: 60, protein: 38, note: "Komplit & bergizi" },
    ]},
  { time: "Makan Malam", subtitle: "18:00 – 20:00", icon: "🌙", color: TOKENS.blue,
    foods: [
      { name: "Sup Ayam + Nasi Sedikit", cal: 380, carb: 35, protein: 28, note: "Light & nutritious" },
    ]},
];

const INTENSITY_COLOR = {
  "Sangat Rendah": "#a3e635", "Rendah": "#4ade80", "Sedang": "#facc15",
  "Sedang-Tinggi": "#fb923c", "Tinggi": "#f87171", "Sangat Tinggi": "#e879f9",
};

const INIT_DATA = { age: "22", gender: "male", weight: "65", height: "168", fitnessLevel: "intermediate", activityLevel: "light", goal: "maintain", runGoal: "5k", name: "Runner" };

// ═══════════════════════════════════════════════════════════
// CALCULATIONS
// ═══════════════════════════════════════════════════════════
function calcBMR(d) {
  const w = parseFloat(d.weight) || 65, h = parseFloat(d.height) || 168, a = parseInt(d.age) || 22;
  return d.gender === "male" ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161;
}
function calcTDEE(bmr, lvl) {
  const m = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
  return Math.round(bmr * (m[lvl] || 1.375));
}
function calcGoal(tdee, g) { return g === "lose" ? tdee - 500 : g === "gain" ? tdee + 300 : tdee; }
function calcBMI(d) {
  const w = parseFloat(d.weight) || 65, h = (parseFloat(d.height) || 168) / 100;
  return (w / (h*h)).toFixed(1);
}
function bmiLabel(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: TOKENS.blue };
  if (bmi < 25) return { label: "Normal", color: TOKENS.green };
  if (bmi < 30) return { label: "Overweight", color: TOKENS.amber };
  return { label: "Obese", color: TOKENS.red };
}

// ═══════════════════════════════════════════════════════════
// SHARED STYLES
// ═══════════════════════════════════════════════════════════
const S = {
  screen: {
    width: 390, height: 844, background: TOKENS.bg, color: TOKENS.text,
    fontFamily: FONTS.body, position: "relative", overflow: "hidden",
    display: "flex", flexDirection: "column",
  },
  card: {
    background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
    borderRadius: 18, padding: 16,
    backdropFilter: "blur(10px)",
  },
  cardTitle: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: TOKENS.text,
  },
  label: {
    display: "block", fontSize: 10, color: TOKENS.textMuted, textTransform: "uppercase",
    letterSpacing: 1.5, marginBottom: 8, fontFamily: FONTS.display, fontWeight: 700,
  },
  input: {
    width: "100%", background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
    borderRadius: 12, padding: "14px 16px", color: TOKENS.text, fontSize: 15,
    fontFamily: FONTS.body, outline: "none", boxSizing: "border-box",
    transition: "all 0.2s",
  },
  btn: {
    width: "100%", padding: "16px", borderRadius: 16, border: "none",
    background: `linear-gradient(135deg, ${TOKENS.teal} 0%, ${TOKENS.purple} 100%)`,
    color: TOKENS.bg, fontFamily: FONTS.display, fontWeight: 800, fontSize: 15,
    cursor: "pointer", boxShadow: `0 8px 24px rgba(94,234,212,0.25)`,
    letterSpacing: 0.3,
  },
  btnDisabled: {
    background: TOKENS.surface, color: TOKENS.textFaint,
    boxShadow: "none", cursor: "not-allowed",
  },
};

// ═══════════════════════════════════════════════════════════
// iOS STATUS BAR — Dynamic Island + time + signal
// ═══════════════════════════════════════════════════════════
function StatusBar({ dark = false, time = "9:41" }) {
  const c = dark ? "#fff" : "#fff"; // status bar always white text on dark UI
  return (
    <div style={{ height: 50, position: "relative", flexShrink: 0, width: "100%" }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)",
        width: 118, height: 32, background: "#000",
        borderRadius: 18, zIndex: 100,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
      }} />
      {/* Time on left */}
      <div style={{
        position: "absolute", top: 17, left: 28, zIndex: 99,
        fontSize: 15, fontWeight: 700, color: c, fontFamily: FONTS.body,
        letterSpacing: -0.3,
      }}>
        {time}
      </div>
      {/* Right indicators */}
      <div style={{
        position: "absolute", top: 18, right: 26, display: "flex", gap: 5,
        alignItems: "center", zIndex: 99, color: c,
      }}>
        <Signal size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BatteryFull size={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div style={{
      position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
      width: 134, height: 5, background: "#fff", borderRadius: 3, opacity: 0.95,
      zIndex: 100,
    }} />
  );
}

// ═══════════════════════════════════════════════════════════
// LOGO — Custom SVG running figure with gradient bg
// ═══════════════════════════════════════════════════════════
function Logo({ size = 36, withGlow = true }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: `linear-gradient(135deg, ${TOKENS.teal} 0%, ${TOKENS.purple} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: withGlow ? `0 4px 14px ${TOKENS.teal}50` : "none",
      flexShrink: 0, position: "relative", overflow: "hidden",
    }}>
      {/* Subtle highlight */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(255,255,255,0.22), transparent 55%)",
        pointerEvents: "none",
      }} />
      {/* Running figure SVG */}
      <svg
        width={size * 0.7} height={size * 0.7} viewBox="0 0 24 24"
        fill="none" stroke="#0a0a0f" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "relative" }}
      >
        {/* Head */}
        <circle cx="16" cy="4.5" r="2" fill="#0a0a0f" stroke="none" />
        {/* Torso */}
        <path d="M15.5 7 L11 13" />
        {/* Front arm swinging forward */}
        <path d="M14 8.5 L17.5 12" />
        {/* Back arm */}
        <path d="M13 9 L8.5 7.5" />
        {/* Front leg extended */}
        <path d="M11 13 L14 16.5 L14 21" />
        {/* Back leg lifted */}
        <path d="M11 13 L8 17.5 L7 21" />
        {/* Speed lines */}
        <path d="M2 6 L5 6" strokeWidth="1.8" opacity="0.55" />
        <path d="M1 10 L4 10" strokeWidth="1.8" opacity="0.45" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// AVATAR — DiceBear API (auto-generated from name + gender)
// Free, legal, no copyright. Avatar berubah otomatis sesuai nama user.
// ═══════════════════════════════════════════════════════════
function Avatar({ name, gender, size = 50 }) {
  const seed = encodeURIComponent(
    name && name !== "Runner"
      ? name
      : (gender === "female" ? "Aria42" : "Kai28")
  );
  const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=64e8de,a78bfa&backgroundType=gradientLinear&radius=50&accessoriesProbability=20`;

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${TOKENS.teal}, ${TOKENS.purple})`,
      padding: 2.5,
      boxShadow: `0 6px 16px ${TOKENS.teal}40`,
      flexShrink: 0,
    }}>
      <img
        src={url}
        alt={name || "Profile"}
        loading="lazy"
        style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: TOKENS.bg, display: "block",
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 1: LANDING — Hero-style redesign
// ═══════════════════════════════════════════════════════════
function LandingScreen({ onNext }) {
  return (
    <div style={S.screen}>
      {/* Background mesh */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -80, right: -100, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${TOKENS.teal}25, transparent 65%)`, filter: "blur(20px)" }} />
        <div style={{ position: "absolute", bottom: -120, left: -100, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${TOKENS.purple}30, transparent 65%)`, filter: "blur(30px)" }} />
        <div style={{ position: "absolute", top: "35%", left: "30%", width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${TOKENS.coral}15, transparent 60%)`, filter: "blur(40px)" }} />
      </div>

      <StatusBar />

      <div style={{ flex: 1, padding: "16px 28px 0", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={36} />
          <div style={{ fontSize: 11, color: TOKENS.teal, letterSpacing: 4, fontFamily: FONTS.display, fontWeight: 700 }}>RUNSYNC</div>
        </div>

        {/* Hero headline */}
        <div style={{ marginTop: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: `${TOKENS.teal}15`, border: `1px solid ${TOKENS.teal}30`,
            borderRadius: 100, padding: "5px 12px", marginBottom: 16,
          }}>
            <Sparkles size={11} color={TOKENS.teal} />
            <span style={{ fontSize: 10, color: TOKENS.teal, fontFamily: FONTS.display, fontWeight: 700, letterSpacing: 1 }}>AI POWERED</span>
          </div>
          <h1 style={{
            fontFamily: FONTS.display, fontWeight: 800, fontSize: 46, lineHeight: 1,
            color: TOKENS.text, margin: 0, letterSpacing: -1.5,
          }}>
            Lari jadi<br />
            <span style={{
              background: `linear-gradient(90deg, ${TOKENS.teal} 0%, ${TOKENS.purple} 60%, ${TOKENS.coral} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>terstruktur.</span>
          </h1>
          <p style={{ color: TOKENS.textDim, fontSize: 14, lineHeight: 1.55, marginTop: 14, fontWeight: 400 }}>
            AI Running Coach yang ngitung kalori, susun latihan,<br />
            & kasih rekomendasi makanan — semua personal.
          </p>
        </div>

        {/* Feature grid 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 28 }}>
          {[
            { icon: "📊", label: "Kalori\n& Makro", color: TOKENS.coral },
            { icon: "🏃", label: "Program\nLari", color: TOKENS.teal },
            { icon: "🥗", label: "Rekomendasi\nMakanan", color: TOKENS.green },
            { icon: "💧", label: "Tracker\nHidrasi", color: TOKENS.blue },
          ].map((f, i) => (
            <div key={i} style={{
              background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
              borderRadius: 14, padding: "14px 14px 12px",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${f.color}18`, border: `1px solid ${f.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>{f.icon}</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 12, color: TOKENS.text, lineHeight: 1.2, whiteSpace: "pre-line" }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <div style={{ paddingBottom: 28 }}>
          <button onClick={onNext} style={{
            ...S.btn, fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Mulai Sekarang
            <ArrowRight size={18} strokeWidth={3} />
          </button>
          <div style={{ fontSize: 11, color: TOKENS.textFaint, marginTop: 12, textAlign: "center" }}>
            Gratis · No signup · Langsung jalan 🚀
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ONBOARDING SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════
function StepHeader({ step, title, subtitle, emoji, onBack }) {
  return (
    <div style={{ padding: "8px 20px 0" }}>
      {/* Progress bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: n <= step
              ? `linear-gradient(90deg, ${TOKENS.teal}, ${TOKENS.purple})`
              : TOKENS.surface,
            transition: "background 0.4s",
          }} />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
            borderRadius: 10, padding: 10, cursor: "pointer", color: TOKENS.textDim,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ChevronLeft size={18} />
          </button>
        )}
        <div>
          <div style={{ fontSize: 10, color: TOKENS.teal, letterSpacing: 2, textTransform: "uppercase", fontFamily: FONTS.display, fontWeight: 700 }}>
            Langkah {step} / 3
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 24, color: TOKENS.text, marginTop: 2, letterSpacing: -0.5 }}>
            {emoji} {title}
          </div>
          <div style={{ fontSize: 12, color: TOKENS.textMuted, marginTop: 2 }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 1 ──────────────────────────────────────────────
function Step1({ data, setData, onBack, onNext }) {
  const canNext = data.age && data.weight && data.height;
  return (
    <div style={S.screen}>
      <StatusBar />
      <StepHeader step={1} title="Data Diri" subtitle="Biar kita kenal kamu dulu!" emoji="👤" onBack={onBack} />
      <div style={{ flex: 1, padding: "24px 20px 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={S.label}>Usia 🎂</label>
          <input style={S.input} type="number" placeholder="e.g. 22" value={data.age} onChange={e => setData({ ...data, age: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label style={S.label}>Berat ⚖️</label>
            <input style={S.input} type="number" placeholder="65 kg" value={data.weight} onChange={e => setData({ ...data, weight: e.target.value })} />
          </div>
          <div>
            <label style={S.label}>Tinggi 📏</label>
            <input style={S.input} type="number" placeholder="168 cm" value={data.height} onChange={e => setData({ ...data, height: e.target.value })} />
          </div>
        </div>
        <div>
          <label style={S.label}>Gender 👤</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[{v: "male", l: "Cowok 🙋‍♂️"}, {v: "female", l: "Cewek 🙋‍♀️"}].map(g => {
              const active = data.gender === g.v;
              return (
                <button key={g.v} onClick={() => setData({ ...data, gender: g.v })} style={{
                  flex: 1, padding: "14px 8px", borderRadius: 12,
                  border: `1px solid ${active ? TOKENS.teal : TOKENS.border}`,
                  background: active ? `${TOKENS.teal}18` : TOKENS.surface,
                  color: active ? TOKENS.teal : TOKENS.textDim,
                  cursor: "pointer", fontSize: 14, fontFamily: FONTS.display, fontWeight: 700,
                  transition: "all 0.2s",
                }}>{g.l}</button>
              );
            })}
          </div>
        </div>

        {/* Live preview card */}
        {canNext && (
          <div style={{
            background: `linear-gradient(135deg, ${TOKENS.teal}12, ${TOKENS.purple}10)`,
            border: `1px solid ${TOKENS.teal}30`, borderRadius: 14, padding: 14,
          }}>
            <div style={{ fontSize: 10, color: TOKENS.teal, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: FONTS.display, fontWeight: 700, marginBottom: 6 }}>
              ⚡ Live Preview
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div style={{ fontSize: 10, color: TOKENS.textMuted }}>BMI kamu</div>
                <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: TOKENS.text }}>
                  {calcBMI(data)} <span style={{ fontSize: 11, color: bmiLabel(parseFloat(calcBMI(data))).color }}>· {bmiLabel(parseFloat(calcBMI(data))).label}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: TOKENS.textMuted }}>BMR</div>
                <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: TOKENS.purple }}>
                  {Math.round(calcBMR(data)).toLocaleString()} <span style={{ fontSize: 11, color: TOKENS.textMuted }}>kcal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: "16px 20px 24px" }}>
        <button onClick={onNext} disabled={!canNext} style={{ ...S.btn, ...(canNext ? {} : S.btnDisabled), display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Lanjut <ArrowRight size={16} strokeWidth={3} />
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── STEP 2 ──────────────────────────────────────────────
function Step2({ data, setData, onBack, onNext }) {
  const levels = [
    { v: "beginner", l: "Pemula", d: "Baru mau mulai / jarang olahraga", e: "🌱" },
    { v: "intermediate", l: "Menengah", d: "Udah sering olahraga, mau ningkatin", e: "⚡" },
    { v: "advanced", l: "Lanjutan", d: "Rutin latihan, mau maksimalin performa", e: "🔥" },
  ];
  const activities = [
    { v: "sedentary", l: "Duduk terus", d: "Kerja/kuliah duduk, jarang gerak", e: "🪑" },
    { v: "light", l: "Ringan", d: "Olahraga 1-3x/minggu", e: "🚶" },
    { v: "moderate", l: "Sedang", d: "Olahraga 3-5x/minggu", e: "🏃" },
    { v: "active", l: "Aktif", d: "Olahraga 6-7x/minggu", e: "🏋️" },
  ];
  return (
    <div style={S.screen}>
      <StatusBar />
      <StepHeader step={2} title="Fitness Level" subtitle="Seberapa aktif kamu sekarang?" emoji="💪" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 20px 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={S.label}>Level Fitness 💪</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {levels.map(l => {
              const active = data.fitnessLevel === l.v;
              return (
                <button key={l.v} onClick={() => setData({ ...data, fitnessLevel: l.v })} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "14px",
                  borderRadius: 14, cursor: "pointer", textAlign: "left", width: "100%",
                  border: `1px solid ${active ? TOKENS.teal : TOKENS.border}`,
                  background: active ? `linear-gradient(135deg, ${TOKENS.teal}, ${TOKENS.purple}aa)` : TOKENS.surface,
                  color: active ? TOKENS.bg : TOKENS.text,
                  transition: "all 0.2s",
                  boxShadow: active ? `0 4px 16px ${TOKENS.teal}30` : "none",
                }}>
                  <span style={{ fontSize: 24 }}>{l.e}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 14 }}>{l.l}</div>
                    <div style={{ fontSize: 11, opacity: active ? 0.75 : 0.55 }}>{l.d}</div>
                  </div>
                  {active && <CheckCircle size={18} strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label style={S.label}>Aktivitas Harian 📊</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {activities.map(a => {
              const active = data.activityLevel === a.v;
              return (
                <button key={a.v} onClick={() => setData({ ...data, activityLevel: a.v })} style={{
                  padding: "12px 10px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                  border: `1px solid ${active ? TOKENS.teal : TOKENS.border}`,
                  background: active ? `${TOKENS.teal}18` : TOKENS.surface,
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{a.e}</div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 12, color: active ? TOKENS.teal : TOKENS.text }}>{a.l}</div>
                  <div style={{ fontSize: 10, color: TOKENS.textMuted, marginTop: 1 }}>{a.d}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: "16px 20px 24px" }}>
        <button onClick={onNext} style={{ ...S.btn, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Lanjut <ArrowRight size={16} strokeWidth={3} />
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── STEP 3 ──────────────────────────────────────────────
function Step3({ data, setData, onBack, onNext }) {
  const goals = [
    { v: "lose", l: "Turun BB", d: "Bakar lemak", e: "🔥", c: TOKENS.coral },
    { v: "maintain", l: "Jaga Ideal", d: "Stay fit", e: "⚖️", c: TOKENS.green },
    { v: "gain", l: "Naik Otot", d: "Build muscle", e: "💪", c: TOKENS.blue },
  ];
  const runGoals = [
    { v: "5k", l: "Finish 5K", e: "🎯" },
    { v: "10k", l: "Kejar 10K", e: "🏆" },
    { v: "halfMarathon", l: "Half Marathon", e: "🥇" },
    { v: "fitness", l: "General Fitness", e: "❤️" },
  ];
  const cg = calcGoal(calcTDEE(calcBMR(data), data.activityLevel), data.goal);
  return (
    <div style={S.screen}>
      <StatusBar />
      <StepHeader step={3} title="Tujuan" subtitle="Mau achieve apa nih?" emoji="🎯" onBack={onBack} />
      <div style={{ flex: 1, padding: "20px 20px 0", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={S.label}>Target Tubuh 🎯</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {goals.map(g => {
              const active = data.goal === g.v;
              return (
                <button key={g.v} onClick={() => setData({ ...data, goal: g.v })} style={{
                  padding: "16px 8px", borderRadius: 14, cursor: "pointer",
                  border: `1.5px solid ${active ? g.c : TOKENS.border}`,
                  background: active ? `${g.c}22` : TOKENS.surface,
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 26 }}>{g.e}</span>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 12, color: active ? g.c : TOKENS.text }}>{g.l}</span>
                  <span style={{ fontSize: 9, color: TOKENS.textMuted }}>{g.d}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label style={S.label}>Target Lari 🏃</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {runGoals.map(g => {
              const active = data.runGoal === g.v;
              return (
                <button key={g.v} onClick={() => setData({ ...data, runGoal: g.v })} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderRadius: 12,
                  border: `1px solid ${active ? TOKENS.teal : TOKENS.border}`,
                  background: active ? `linear-gradient(135deg, ${TOKENS.teal}, ${TOKENS.purple}cc)` : TOKENS.surface,
                  color: active ? TOKENS.bg : TOKENS.text,
                  cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 18 }}>{g.e}</span>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 12 }}>{g.l}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label style={S.label}>Nama Kamu 🙌</label>
          <input style={S.input} placeholder="Panggil aku..." value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${TOKENS.purple}18, ${TOKENS.teal}10)`,
          border: `1px solid ${TOKENS.purple}30`, borderRadius: 16, padding: 14,
        }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 12, color: TOKENS.purple, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1.5 }}>
            📊 Preview Programmu
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <div style={{ fontSize: 9, color: TOKENS.textMuted, textTransform: "uppercase" }}>Target Kalori</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: TOKENS.teal }}>
                {cg.toLocaleString()}<span style={{ fontSize: 11, color: TOKENS.textMuted }}> kcal</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: TOKENS.textMuted, textTransform: "uppercase" }}>Latihan</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: TOKENS.purple }}>
                {(TRAINING_SESSIONS[data.fitnessLevel] || TRAINING_SESSIONS.intermediate).length}x<span style={{ fontSize: 11, color: TOKENS.textMuted }}> /mgg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "16px 20px 24px" }}>
        <button onClick={onNext} style={{ ...S.btn, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          Lihat Programku <Sparkles size={16} strokeWidth={3} />
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD SHARED
// ═══════════════════════════════════════════════════════════
function DashboardHeader({ data, accent = TOKENS.teal }) {
  const level = data.fitnessLevel === "beginner" ? "Pemula 🌱" : data.fitnessLevel === "advanced" ? "Lanjutan 🔥" : "Menengah ⚡";
  const goal = data.runGoal === "5k" ? "Target 5K" : data.runGoal === "10k" ? "Target 10K" : data.runGoal === "halfMarathon" ? "Half Marathon" : "General Fitness";
  return (
    <div style={{
      background: `linear-gradient(135deg, ${TOKENS.bg} 0%, #15151f 50%, #0f0a1f 100%)`,
      padding: "16px 20px 18px", borderBottom: `1px solid ${TOKENS.border}`,
      position: "relative", overflow: "hidden",
    }}>
      {/* Mesh accent */}
      <div style={{
        position: "absolute", top: -30, right: -30, width: 160, height: 160,
        borderRadius: "50%", background: `radial-gradient(circle, ${accent}25, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div>
          <div style={{ fontSize: 10, color: accent, letterSpacing: 2.5, fontFamily: FONTS.display, fontWeight: 700 }}>RUNSYNC</div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: TOKENS.text, marginTop: 2, letterSpacing: -0.3 }}>
            Halo, {data.name || "Runner"}! 👋
          </div>
          <div style={{ fontSize: 11, color: TOKENS.textMuted, marginTop: 4 }}>
            {level} · {goal} 🎯
          </div>
        </div>
        <Avatar name={data.name} gender={data.gender} size={50} />
      </div>
    </div>
  );
}

function TabBar({ active, onTabChange }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp, color: TOKENS.teal },
    { id: "training", label: "Latihan", icon: Activity, color: TOKENS.purple },
    { id: "nutrition", label: "Nutrisi", icon: Utensils, color: TOKENS.green },
    { id: "schedule", label: "Jadwal", icon: Calendar, color: TOKENS.blue },
  ];
  return (
    <div style={{
      display: "flex", padding: "10px 12px 0", gap: 4,
      borderBottom: `1px solid ${TOKENS.border}`,
      background: TOKENS.bg,
      position: "relative",
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => onTabChange(t.id)} style={{
            flex: 1, padding: "10px 4px", border: "none",
            background: "transparent",
            color: isActive ? t.color : TOKENS.textFaint,
            cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            position: "relative",
            transition: "color 0.2s",
          }}>
            <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: 10, fontFamily: FONTS.display, fontWeight: 700, letterSpacing: 0.3 }}>{t.label}</span>
            {isActive && (
              <div style={{
                position: "absolute", bottom: -1, left: "20%", right: "20%",
                height: 2, background: t.color, borderRadius: 2,
                boxShadow: `0 0 8px ${t.color}`,
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── DASHBOARD OVERVIEW ───────────────────────────────────
function DashOverview({ data, onTabChange }) {
  const [hydration, setHydration] = useState(3);
  const bmr = calcBMR(data);
  const tdee = calcTDEE(bmr, data.activityLevel);
  const cg = calcGoal(tdee, data.goal);
  const bmi = calcBMI(data);
  const bInfo = bmiLabel(parseFloat(bmi));
  const waterGoal = Math.round((parseFloat(data.weight) || 65) * 0.033 * 10) / 10;
  const ringPct = Math.min(cg / (tdee + 500), 1);
  const ringColor = data.goal === "lose" ? TOKENS.coral : data.goal === "gain" ? TOKENS.blue : TOKENS.green;

  return (
    <div style={S.screen}>
      <StatusBar />
      <DashboardHeader data={data} accent={TOKENS.teal} />
      <TabBar active="overview" onTabChange={onTabChange} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Hero stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {[
            { v: cg.toLocaleString(), u: "kcal", l: "Target", c: TOKENS.coral },
            { v: bmi, u: bInfo.label, l: "BMI", c: bInfo.color },
            { v: `${waterGoal}L`, u: "/hari", l: "Hidrasi", c: TOKENS.blue },
            { v: `${(TRAINING_SESSIONS[data.fitnessLevel] || TRAINING_SESSIONS.intermediate).length}x`, u: "/mgg", l: "Latihan", c: TOKENS.purple },
          ].map((s, i) => (
            <div key={i} style={{
              background: TOKENS.surface, border: `1px solid ${TOKENS.border}`,
              borderRadius: 12, padding: "10px 6px", textAlign: "center",
            }}>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 16, color: s.c, letterSpacing: -0.3 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: TOKENS.textMuted, marginTop: 1 }}>{s.u}</div>
              <div style={{ fontSize: 9, color: TOKENS.textFaint, marginTop: 1, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Calorie Ring */}
        <div style={S.card}>
          <div style={S.cardTitle}><Flame size={16} color={TOKENS.coral} /> Kebutuhan Kalori Harian</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 14 }}>
            <svg width={100} height={100} viewBox="0 0 100 100">
              <circle cx={50} cy={50} r={38} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
              <circle cx={50} cy={50} r={38} fill="none" stroke={ringColor} strokeWidth={8}
                strokeDasharray={`${ringPct * 238.76} 238.76`} strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ filter: `drop-shadow(0 0 6px ${ringColor})` }} />
              <text x={50} y={48} textAnchor="middle" fill={ringColor} fontSize={14} fontFamily={FONTS.display} fontWeight="800">
                {cg >= 1000 ? `${(cg/1000).toFixed(1)}k` : cg}
              </text>
              <text x={50} y={60} textAnchor="middle" fill={TOKENS.textMuted} fontSize={7}>kcal/day</text>
            </svg>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { l: "BMR", v: Math.round(bmr), c: TOKENS.purple },
                { l: "TDEE", v: tdee, c: TOKENS.blue },
                { l: "Target", v: cg, c: ringColor },
              ].map((it, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: TOKENS.textMuted, fontFamily: FONTS.display, fontWeight: 600 }}>{it.l}</span>
                    <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 11, color: it.c }}>{it.v.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${Math.min((it.v / (tdee + 500)) * 100, 100)}%`, background: it.c, borderRadius: 2, boxShadow: `0 0 4px ${it.c}80` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Macros */}
        <div style={S.card}>
          <div style={S.cardTitle}><Target size={16} color={TOKENS.teal} /> Distribusi Makro Ideal</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
            {[
              { l: "Karbo", pct: data.goal === "gain" ? 50 : data.goal === "lose" ? 40 : 45, c: TOKENS.amber, e: "🍚", div: 4 },
              { l: "Protein", pct: data.goal === "gain" ? 30 : data.goal === "lose" ? 35 : 30, c: TOKENS.coral, e: "🥩", div: 4 },
              { l: "Lemak", pct: data.goal === "gain" ? 20 : data.goal === "lose" ? 25 : 25, c: TOKENS.purple, e: "🥑", div: 9 },
            ].map((m, i) => {
              const grams = Math.round((cg * m.pct / 100) / m.div);
              return (
                <div key={i} style={{
                  background: `${m.c}10`, border: `1px solid ${m.c}30`,
                  borderRadius: 12, padding: "12px 8px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 22 }}>{m.e}</div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 19, color: m.c, lineHeight: 1, marginTop: 2 }}>{grams}g</div>
                  <div style={{ fontSize: 9, color: TOKENS.textMuted, marginTop: 3 }}>{m.l}</div>
                  <div style={{ fontSize: 9, color: m.c, marginTop: 1, fontWeight: 600 }}>{m.pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hydration */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={S.cardTitle}><Droplets size={16} color={TOKENS.blue} /> Hidrasi Harian</div>
            <span style={{ fontSize: 11, color: TOKENS.blue, fontFamily: FONTS.display, fontWeight: 700 }}>{hydration}/8</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {Array.from({ length: 8 }, (_, i) => (
                <button key={i} onClick={() => setHydration(i < hydration ? i : i + 1)} style={{
                  fontSize: 22, background: "none", border: "none", cursor: "pointer",
                  opacity: i < hydration ? 1 : 0.25,
                  transform: i < hydration ? "scale(1)" : "scale(0.9)",
                  transition: "all 0.2s",
                }}>💧</button>
              ))}
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${Math.min((hydration / 8) * 100, 100)}%`, background: `linear-gradient(90deg, #3b82f6, ${TOKENS.blue})`, borderRadius: 3, transition: "width 0.4s", boxShadow: `0 0 8px ${TOKENS.blue}60` }} />
            </div>
            <div style={{ fontSize: 10, color: TOKENS.textMuted, marginTop: 6 }}>250ml per 💧 · Target: {waterGoal}L/hari</div>
          </div>
        </div>

        {/* Body Stats */}
        <div style={S.card}>
          <div style={S.cardTitle}><Heart size={16} color={TOKENS.coral} /> Body Stats</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            {[
              { l: "BMI", v: bmi, s: bInfo.label, c: bInfo.color },
              { l: "Berat Ideal", v: `${Math.round(21.75 * Math.pow((parseFloat(data.height) || 168) / 100, 2))}kg`, s: "BMI 21.75", c: TOKENS.green },
              { l: "Est. Lemak", v: `${Math.round(1.2 * parseFloat(bmi) + 0.23 * (parseInt(data.age) || 22) - (data.gender === "male" ? 16.2 : 5.4))}%`, s: "Deurenberg", c: TOKENS.amber },
              { l: "Sesi/mgg", v: `${(TRAINING_SESSIONS[data.fitnessLevel] || TRAINING_SESSIONS.intermediate).length}x`, s: "Latihan", c: TOKENS.purple },
            ].map((s, i) => (
              <div key={i} style={{
                background: `${s.c}10`, border: `1px solid ${s.c}25`,
                borderRadius: 12, padding: "12px 14px",
              }}>
                <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: s.c, letterSpacing: -0.3 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: TOKENS.text, marginTop: 2 }}>{s.l}</div>
                <div style={{ fontSize: 9, color: TOKENS.textMuted, marginTop: 1 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── DASHBOARD TRAINING ──────────────────────────────────
function DashTraining({ data, onTabChange }) {
  const [completed, setCompleted] = useState({});
  const sessions = TRAINING_SESSIONS[data.fitnessLevel] || TRAINING_SESSIONS.intermediate;
  return (
    <div style={S.screen}>
      <StatusBar />
      <DashboardHeader data={data} accent={TOKENS.purple} />
      <TabBar active="training" onTabChange={onTabChange} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={S.cardTitle}><Activity size={16} color={TOKENS.purple} /> Program Larimu</div>
            <div style={{
              background: `${TOKENS.purple}20`, color: TOKENS.purple,
              padding: "4px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, fontFamily: FONTS.display,
              border: `1px solid ${TOKENS.purple}40`,
            }}>
              {data.fitnessLevel === "beginner" ? "Pemula 🌱" : data.fitnessLevel === "advanced" ? "Lanjutan 🔥" : "Menengah ⚡"}
            </div>
          </div>
          <div style={{ fontSize: 11, color: TOKENS.textMuted, marginTop: 6 }}>
            {sessions.length}x sesi per minggu · {Object.keys(completed).filter(k => completed[k]).length}/{sessions.length} selesai
          </div>
        </div>
        {sessions.map((s, i) => {
          const done = completed[i];
          return (
            <div key={i} style={{
              ...S.card, opacity: done ? 0.7 : 1, position: "relative",
              borderColor: done ? `${TOKENS.green}40` : TOKENS.border,
              background: done ? `${TOKENS.green}08` : TOKENS.surface,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${INTENSITY_COLOR[s.intensity]}25`,
                  border: `1px solid ${INTENSITY_COLOR[s.intensity]}50`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                  flexShrink: 0,
                }}>{s.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 14, color: TOKENS.text }}>{s.day}</span>
                    <span style={{ fontSize: 10, color: TOKENS.textFaint }}>·</span>
                    <span style={{ fontSize: 12, color: TOKENS.teal, fontFamily: FONTS.display, fontWeight: 600 }}>{s.type}</span>
                    {done && <span style={{ fontSize: 10, color: TOKENS.green, marginLeft: 4, fontWeight: 700 }}>✓ Done!</span>}
                  </div>
                  <div style={{ fontSize: 11, color: TOKENS.textDim, marginTop: 4, lineHeight: 1.4 }}>{s.detail}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, background: TOKENS.surface, padding: "3px 9px", borderRadius: 20, border: `1px solid ${TOKENS.border}` }}>
                      <Clock size={10} color={TOKENS.textMuted} />
                      <span style={{ fontSize: 10, color: TOKENS.textDim }}>{s.duration}</span>
                    </div>
                    <div style={{ padding: "3px 10px", borderRadius: 20, background: `${INTENSITY_COLOR[s.intensity]}20`, border: `1px solid ${INTENSITY_COLOR[s.intensity]}40` }}>
                      <span style={{ fontSize: 10, color: INTENSITY_COLOR[s.intensity], fontWeight: 700 }}>{s.intensity}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setCompleted({ ...completed, [i]: !done })} style={{
                  background: done ? `${TOKENS.green}25` : TOKENS.surface,
                  border: `1px solid ${done ? TOKENS.green : TOKENS.border}`,
                  borderRadius: 12, padding: 10, cursor: "pointer",
                  color: done ? TOKENS.green : TOKENS.textDim,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {done ? <CheckCircle size={18} /> : <Play size={16} fill="currentColor" />}
                </button>
              </div>
            </div>
          );
        })}
        <div style={{
          ...S.card,
          background: `linear-gradient(135deg, ${TOKENS.purple}15, ${TOKENS.amber}10)`,
          border: `1px solid ${TOKENS.amber}30`,
        }}>
          <div style={S.cardTitle}><Zap size={16} color={TOKENS.amber} /> Tips Latihan</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
            {["Warmup 5-10 menit sebelum lari 🔥", "Rule 80/20: 80% easy, 20% hard 📊", "Dengarkan tubuh — istirahat kalau cedera ⚠️", "Tidur 7-9 jam untuk recovery 😴"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: TOKENS.amber, fontSize: 13, marginTop: 0, fontWeight: 700 }}>›</span>
                <span style={{ fontSize: 11, color: TOKENS.textDim, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── DASHBOARD NUTRITION ─────────────────────────────────
function DashNutrition({ data, onTabChange }) {
  const [expanded, setExpanded] = useState(0);
  const cg = calcGoal(calcTDEE(calcBMR(data), data.activityLevel), data.goal);
  return (
    <div style={S.screen}>
      <StatusBar />
      <DashboardHeader data={data} accent={TOKENS.green} />
      <TabBar active="nutrition" onTabChange={onTabChange} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{
          ...S.card,
          background: `linear-gradient(135deg, ${TOKENS.green}10, ${TOKENS.teal}08)`,
          border: `1px solid ${TOKENS.green}25`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 10, color: TOKENS.textMuted, textTransform: "uppercase", letterSpacing: 1.5, fontFamily: FONTS.display, fontWeight: 700 }}>Target Harian</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: TOKENS.green, lineHeight: 1, marginTop: 6, letterSpacing: -1 }}>
                {cg.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: TOKENS.textMuted, marginTop: 4 }}>
                kcal · {data.goal === "lose" ? "turun BB 🔥" : data.goal === "gain" ? "naik massa 💪" : "maintenance ⚖️"}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, color: TOKENS.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Makan rutin</div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, color: TOKENS.amber, fontSize: 16, marginTop: 2 }}>4-5x</div>
              <div style={{ fontSize: 9, color: TOKENS.textMuted }}>per hari</div>
            </div>
          </div>
        </div>
        {FOOD_DATA.map((cat, ci) => (
          <div key={ci} style={S.card}>
            <button onClick={() => setExpanded(expanded === ci ? -1 : ci)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${cat.color}18`, border: `1px solid ${cat.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{cat.icon}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: cat.color }}>{cat.time}</div>
                    <div style={{ fontSize: 10, color: TOKENS.textMuted, marginTop: 1 }}>{cat.subtitle}</div>
                  </div>
                </div>
                <ChevronRight size={16} color={TOKENS.textFaint} style={{ transform: expanded === ci ? "rotate(90deg)" : "none", transition: "transform 0.25s" }} />
              </div>
            </button>
            {expanded === ci && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {cat.foods.map((f, fi) => (
                  <div key={fi} style={{
                    background: "rgba(255,255,255,0.03)", borderRadius: 12,
                    padding: "12px", border: `1px solid ${TOKENS.border}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: TOKENS.text }}>{f.name}</div>
                        <div style={{ fontSize: 10, color: cat.color, marginTop: 3, fontStyle: "italic" }}>{f.note}</div>
                      </div>
                      <div style={{
                        background: `${TOKENS.coral}25`, padding: "4px 10px", borderRadius: 20,
                        border: `1px solid ${TOKENS.coral}40`,
                      }}>
                        <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 11, color: TOKENS.coral }}>{f.cal} kcal</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      {[{l: "Karbo", v: f.carb, c: TOKENS.amber}, {l: "Protein", v: f.protein, c: TOKENS.green}].map((m, mi) => (
                        <div key={mi} style={{
                          flex: 1, textAlign: "center", background: `${m.c}10`,
                          borderRadius: 8, padding: "6px 0",
                          border: `1px solid ${m.c}25`,
                        }}>
                          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 14, color: m.c }}>{m.v}g</div>
                          <div style={{ fontSize: 9, color: TOKENS.textMuted, marginTop: 1 }}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <HomeIndicator />
    </div>
  );
}

// ─── DASHBOARD SCHEDULE ──────────────────────────────────
function DashSchedule({ data, onTabChange }) {
  const sessions = TRAINING_SESSIONS[data.fitnessLevel] || TRAINING_SESSIONS.intermediate;
  const allDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  return (
    <div style={S.screen}>
      <StatusBar />
      <DashboardHeader data={data} accent={TOKENS.blue} />
      <TabBar active="schedule" onTabChange={onTabChange} />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={S.card}>
          <div style={S.cardTitle}><Calendar size={16} color={TOKENS.blue} /> Jadwal Mingguan</div>
          <div style={{ fontSize: 11, color: TOKENS.textMuted, marginTop: 6 }}>
            Level {data.fitnessLevel === "beginner" ? "Pemula" : data.fitnessLevel === "advanced" ? "Lanjutan" : "Menengah"} · {sessions.length} sesi aktif
          </div>
        </div>
        {allDays.map((day, di) => {
          const s = sessions.find(x => x.day === day);
          return (
            <div key={di} style={{
              ...S.card,
              borderLeft: `3px solid ${s ? INTENSITY_COLOR[s.intensity] : TOKENS.border}`,
              padding: 14,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 11, color: s ? TOKENS.text : TOKENS.textFaint, textTransform: "uppercase", letterSpacing: 0.5 }}>{day.slice(0, 3)}</div>
                  <div style={{ fontSize: 20, marginTop: 2 }}>{s ? s.emoji : "😴"}</div>
                </div>
                {s ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: TOKENS.text }}>{s.type}</div>
                    <div style={{ fontSize: 10, color: TOKENS.textMuted, marginTop: 2, lineHeight: 1.4 }}>{s.detail}</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, color: TOKENS.teal, background: `${TOKENS.teal}10`, padding: "2px 7px", borderRadius: 8, border: `1px solid ${TOKENS.teal}25` }}>{s.duration}</span>
                      <span style={{ fontSize: 9, color: INTENSITY_COLOR[s.intensity], background: `${INTENSITY_COLOR[s.intensity]}15`, padding: "2px 7px", borderRadius: 8, border: `1px solid ${INTENSITY_COLOR[s.intensity]}30` }}>{s.intensity}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: TOKENS.textFaint }}>Rest Day</div>
                    <div style={{ fontSize: 10, color: TOKENS.textFaint, marginTop: 2 }}>Istirahat / stretching ringan</div>
                  </div>
                )}
              </div>
              {s && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${TOKENS.border}`, display: "flex", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, color: TOKENS.amber, background: `${TOKENS.amber}10`, padding: "3px 7px", borderRadius: 8 }}>🍌 Pre: Pisang</span>
                  <span style={{ fontSize: 9, color: TOKENS.green, background: `${TOKENS.green}10`, padding: "3px 7px", borderRadius: 8 }}>🍚 Post: Nasi+Ayam</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN ROUTER
// ═══════════════════════════════════════════════════════════
function renderScreen(screenId, data, setData, onNav, isInteractive) {
  const noOp = () => {};
  const nav = isInteractive ? onNav : noOp;
  const setD = isInteractive ? setData : noOp;
  switch (screenId) {
    case "landing":     return <LandingScreen onNext={() => nav("step1")} />;
    case "step1":       return <Step1 data={data} setData={setD} onBack={() => nav("landing")} onNext={() => nav("step2")} />;
    case "step2":       return <Step2 data={data} setData={setD} onBack={() => nav("step1")} onNext={() => nav("step3")} />;
    case "step3":       return <Step3 data={data} setData={setD} onBack={() => nav("step2")} onNext={() => nav("overview")} />;
    case "overview":    return <DashOverview data={data} onTabChange={nav} />;
    case "training":    return <DashTraining data={data} onTabChange={nav} />;
    case "nutrition":   return <DashNutrition data={data} onTabChange={nav} />;
    case "schedule":    return <DashSchedule data={data} onTabChange={nav} />;
    default:            return <LandingScreen onNext={() => nav("step1")} />;
  }
}

const ALL_SCREENS = [
  { id: "landing", title: "Landing", category: "Intro", color: TOKENS.teal },
  { id: "step1", title: "Data Diri", category: "Onboarding", color: TOKENS.purple },
  { id: "step2", title: "Fitness Level", category: "Onboarding", color: TOKENS.purple },
  { id: "step3", title: "Tujuan", category: "Onboarding", color: TOKENS.purple },
  { id: "overview", title: "Overview", category: "Main App", color: TOKENS.teal },
  { id: "training", title: "Latihan", category: "Main App", color: TOKENS.purple },
  { id: "nutrition", title: "Nutrisi", category: "Main App", color: TOKENS.green },
  { id: "schedule", title: "Jadwal", category: "Main App", color: TOKENS.blue },
];

// ═══════════════════════════════════════════════════════════
// PHONE FRAME — realistic iPhone with dynamic island
// ═══════════════════════════════════════════════════════════
function PhoneFrame({ children, scale = 1, active = false }) {
  const w = 390, h = 844;
  return (
    <div style={{
      width: w * scale + 14,
      height: h * scale + 14,
      background: "linear-gradient(135deg, #2a2a36 0%, #0f0f15 100%)",
      borderRadius: 40 * scale + 7,
      padding: 7,
      boxShadow: active
        ? `0 0 0 2px ${TOKENS.teal}, 0 30px 80px ${TOKENS.teal}40, 0 10px 30px rgba(0,0,0,0.5)`
        : "0 25px 60px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      flexShrink: 0,
    }}>
      <div style={{
        width: w * scale,
        height: h * scale,
        borderRadius: 36 * scale,
        overflow: "hidden",
        position: "relative",
        background: TOKENS.bg,
      }}>
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: w,
          height: h,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BOARD VIEW — Figma-canvas-like with screen numbers
// ═══════════════════════════════════════════════════════════
function BoardView({ data, onScreenSelect }) {
  const [hovered, setHovered] = useState(null);
  const categories = [
    { name: "Intro", desc: "Welcome screen" },
    { name: "Onboarding", desc: "3 langkah personalisasi" },
    { name: "Main App", desc: "Dashboard dengan 4 tab" },
  ];

  return (
    <div style={{ padding: "32px 24px 60px", background: TOKENS.bgDeep, minHeight: "100%" }}>
      {/* Hero header */}
      <div style={{ marginBottom: 36, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${TOKENS.teal}15`, border: `1px solid ${TOKENS.teal}30`,
          borderRadius: 100, padding: "5px 14px", marginBottom: 14,
        }}>
          <LayoutGrid size={11} color={TOKENS.teal} />
          <span style={{ fontSize: 10, color: TOKENS.teal, fontFamily: FONTS.display, fontWeight: 700, letterSpacing: 1.5 }}>DESIGN BOARD</span>
        </div>
        <h2 style={{
          fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: TOKENS.text,
          margin: 0, letterSpacing: -1, lineHeight: 1.1,
        }}>
          RunSync · <span style={{ background: `linear-gradient(90deg, ${TOKENS.teal}, ${TOKENS.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>8 Screens</span>
        </h2>
        <p style={{ color: TOKENS.textMuted, fontSize: 13, marginTop: 10, maxWidth: 540, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
          Klik screen mana saja untuk masuk <strong style={{ color: TOKENS.purple }}>Prototype Mode</strong> dan rasakan interaksi penuh. Layout & elemen bisa kamu edit langsung di file <code style={{ background: TOKENS.surface, padding: "2px 6px", borderRadius: 4, fontSize: 11, color: TOKENS.teal }}>RunSync.jsx</code>.
        </p>
      </div>

      {categories.map((cat, catIdx) => {
        const screens = ALL_SCREENS.filter(s => s.category === cat.name);
        const startIdx = ALL_SCREENS.findIndex(s => s.category === cat.name);
        return (
          <div key={cat.name} style={{ marginBottom: 48 }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${[TOKENS.teal, TOKENS.purple, TOKENS.green][catIdx]}20`,
                border: `1px solid ${[TOKENS.teal, TOKENS.purple, TOKENS.green][catIdx]}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: FONTS.display, fontWeight: 800, fontSize: 13,
                color: [TOKENS.teal, TOKENS.purple, TOKENS.green][catIdx],
              }}>
                {String(catIdx + 1).padStart(2, "0")}
              </div>
              <div>
                <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 16, color: TOKENS.text, letterSpacing: -0.3 }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 11, color: TOKENS.textMuted }}>{cat.desc} · {screens.length} screen{screens.length !== 1 && "s"}</div>
              </div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${TOKENS.border}, transparent)` }} />
            </div>

            {/* Phone grid */}
            <div style={{
              display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start",
            }}>
              {screens.map((screen, i) => {
                const globalIdx = startIdx + i + 1;
                const isHovered = hovered === screen.id;
                return (
                  <div key={screen.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    {/* Screen label with number */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "5px 12px", borderRadius: 100,
                      background: isHovered ? `${screen.color}20` : TOKENS.surface,
                      border: `1px solid ${isHovered ? screen.color + "60" : TOKENS.border}`,
                      transition: "all 0.25s",
                    }}>
                      <span style={{
                        fontFamily: FONTS.display, fontWeight: 800, fontSize: 10,
                        color: isHovered ? screen.color : TOKENS.textMuted, letterSpacing: 0.5,
                      }}>
                        {String(globalIdx).padStart(2, "0")}
                      </span>
                      <span style={{ width: 1, height: 10, background: TOKENS.border }} />
                      <span style={{
                        fontFamily: FONTS.display, fontWeight: 700, fontSize: 11,
                        color: isHovered ? TOKENS.text : TOKENS.textDim, letterSpacing: 0.3,
                      }}>
                        {screen.title}
                      </span>
                    </div>

                    {/* Phone with hover lift */}
                    <div
                      onMouseEnter={() => setHovered(screen.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => onScreenSelect(screen.id)}
                      style={{
                        cursor: "pointer",
                        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                      }}>
                      <PhoneFrame scale={0.34} active={isHovered}>
                        {renderScreen(screen.id, data, () => {}, () => {}, false)}
                      </PhoneFrame>
                      {isHovered && (
                        <div style={{
                          position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
                          background: TOKENS.teal, color: TOKENS.bg,
                          fontFamily: FONTS.display, fontWeight: 800, fontSize: 10,
                          padding: "4px 10px", borderRadius: 100,
                          whiteSpace: "nowrap", letterSpacing: 0.5,
                          boxShadow: `0 4px 12px ${TOKENS.teal}50`,
                        }}>
                          ▶ Click to prototype
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${TOKENS.teal}10, ${TOKENS.purple}10)`,
        border: `1px solid ${TOKENS.teal}25`,
        borderRadius: 20, padding: 28, marginTop: 16, textAlign: "center",
      }}>
        <Sparkles size={24} color={TOKENS.teal} style={{ marginBottom: 8 }} />
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18, color: TOKENS.text, marginBottom: 6 }}>
          Ready to test the prototype?
        </div>
        <div style={{ fontSize: 13, color: TOKENS.textMuted, marginBottom: 18, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
          Klik tombol di bawah untuk masuk Prototype Mode dan jalan-jalan di seluruh app dengan interaksi penuh.
        </div>
        <button onClick={() => onScreenSelect("landing")} style={{
          padding: "12px 28px", borderRadius: 14, border: "none",
          background: `linear-gradient(135deg, ${TOKENS.teal}, ${TOKENS.purple})`, color: TOKENS.bg,
          fontFamily: FONTS.display, fontWeight: 800, fontSize: 14, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 8,
          boxShadow: `0 8px 24px ${TOKENS.teal}40`,
          letterSpacing: 0.3,
        }}>
          ▶ Start from Landing <ArrowRight size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROTOTYPE VIEW
// ═══════════════════════════════════════════════════════════
function PrototypeView({ data, setData, screen, setScreen, onExit, onReset }) {
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (next) => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTimeout(() => setTransitioning(false), 50);
    }, 150);
  };

  const currentIdx = ALL_SCREENS.findIndex(s => s.id === screen);
  const currentScreen = ALL_SCREENS[currentIdx];

  return (
    <div style={{
      minHeight: "100%",
      background: `radial-gradient(ellipse at top, #1a0a2e 0%, ${TOKENS.bgDeep} 60%)`,
      padding: "24px 16px 40px",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 18, flexWrap: "wrap", justifyContent: "center", maxWidth: "100%" }}>
        {ALL_SCREENS.map((s, i) => {
          const isCurrent = screen === s.id;
          const isPast = i < currentIdx;
          return (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => navigate(s.id)}
                title={s.title}
                style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: isCurrent ? TOKENS.teal : isPast ? `${TOKENS.teal}20` : TOKENS.surface,
                  border: `1px solid ${isCurrent ? TOKENS.teal : isPast ? `${TOKENS.teal}50` : TOKENS.border}`,
                  color: isCurrent ? TOKENS.bg : isPast ? TOKENS.teal : TOKENS.textFaint,
                  fontFamily: FONTS.display, fontWeight: 800, fontSize: 11,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                  boxShadow: isCurrent ? `0 4px 12px ${TOKENS.teal}50` : "none",
                }}>{i + 1}</button>
              {i < ALL_SCREENS.length - 1 && (
                <div style={{ width: 8, height: 1.5, background: isPast ? `${TOKENS.teal}40` : TOKENS.border }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: 18, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${TOKENS.purple}15`, border: `1px solid ${TOKENS.purple}30`,
          borderRadius: 100, padding: "5px 12px", marginBottom: 8,
        }}>
          <Smartphone size={11} color={TOKENS.purple} />
          <span style={{ fontSize: 10, color: TOKENS.purple, fontFamily: FONTS.display, fontWeight: 700, letterSpacing: 1.5 }}>PROTOTYPE MODE</span>
        </div>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, color: TOKENS.text, letterSpacing: -0.5 }}>
          {currentScreen?.title}
        </div>
        <div style={{ fontSize: 11, color: TOKENS.textMuted, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <MousePointerClick size={11} /> Semua tombol & elemen fully interactive
        </div>
      </div>

      <div style={{
        opacity: transitioning ? 0.4 : 1,
        transform: transitioning ? "scale(0.97)" : "scale(1)",
        transition: "all 0.2s ease",
      }}>
        <PhoneFrame scale={0.82}>
          {renderScreen(screen, data, setData, navigate, true)}
        </PhoneFrame>
      </div>

      {/* Controls */}
      <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={onExit} style={{
          padding: "11px 20px", borderRadius: 12,
          border: `1px solid ${TOKENS.border}`, background: TOKENS.surface,
          color: TOKENS.textDim, fontFamily: FONTS.display, fontWeight: 700, fontSize: 12,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          letterSpacing: 0.3,
        }}>
          <LayoutGrid size={14} /> Board View
        </button>
        <button onClick={onReset} style={{
          padding: "11px 20px", borderRadius: 12,
          border: `1px solid ${TOKENS.coral}40`, background: `${TOKENS.coral}10`,
          color: TOKENS.coral, fontFamily: FONTS.display, fontWeight: 700, fontSize: 12,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          letterSpacing: 0.3,
        }}>
          <RotateCcw size={14} /> Reset Data
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function RunSyncPrototype() {
  const [mode, setMode] = useState("board");
  const [screen, setScreen] = useState("landing");
  const [data, setData] = useState({ ...INIT_DATA });

  const handleScreenSelect = (screenId) => {
    setScreen(screenId);
    setMode("prototype");
  };

  const handleReset = () => {
    setData({ ...INIT_DATA });
    setScreen("landing");
  };

  return (
    <div style={{ minHeight: "100vh", background: TOKENS.bgDeep, fontFamily: FONTS.body }}>
      {/* Top Toolbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5,5,7,0.85)", backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${TOKENS.border}`,
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={38} />
          <div>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 16, color: TOKENS.text, letterSpacing: 0.5 }}>RunSync</div>
            <div style={{ fontSize: 10, color: TOKENS.textMuted, letterSpacing: 0.3 }}>AI Running Coach · Interactive Prototype</div>
          </div>
        </div>

        <div style={{
          display: "flex", background: TOKENS.surface, borderRadius: 12, padding: 4,
          border: `1px solid ${TOKENS.border}`,
        }}>
          {[
            { id: "board", icon: LayoutGrid, label: "Board", color: TOKENS.teal },
            { id: "prototype", icon: Smartphone, label: "Prototype", color: TOKENS.purple },
          ].map(t => {
            const Icon = t.icon;
            const active = mode === t.id;
            return (
              <button key={t.id} onClick={() => setMode(t.id)} style={{
                padding: "9px 16px", borderRadius: 9, border: "none",
                background: active ? `${t.color}20` : "transparent",
                color: active ? t.color : TOKENS.textMuted,
                fontFamily: FONTS.display, fontWeight: 700, fontSize: 12, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7,
                transition: "all 0.2s", letterSpacing: 0.3,
              }}>
                <Icon size={13} /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {mode === "board" ? (
        <BoardView data={data} onScreenSelect={handleScreenSelect} />
      ) : (
        <PrototypeView
          data={data}
          setData={setData}
          screen={screen}
          setScreen={setScreen}
          onExit={() => setMode("board")}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
