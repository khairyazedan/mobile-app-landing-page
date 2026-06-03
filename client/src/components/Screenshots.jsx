import { useEffect, useRef, useState } from "react";

/* ── Screenshot data ──────────────────────────────────────── */
const SCREENSHOTS = [
  {
    id: "welcome",
    label: "Onboarding",
    title: "Welcome Screen",
    desc: "A warm, focused entry point that gets users started in seconds.",
    screen: <WelcomeScreen />,
    accent: "#5c6ef8",
    accentLight: "#eef0fe",
  },
  {
    id: "tasks",
    label: "Task List",
    title: "My Tasks",
    desc: "All your tasks in one place — filter by today, upcoming, or done.",
    screen: <TasksScreen />,
    accent: "#22c55e",
    accentLight: "#dcfce7",
  },
  {
    id: "progress",
    label: "Dashboard",
    title: "Today's Progress",
    desc: "A glanceable overview of your day with a live completion ring.",
    screen: <ProgressScreen />,
    accent: "#7c5cfc",
    accentLight: "#ede9fe",
  },
  {
    id: "stats",
    label: "Analytics",
    title: "Statistics",
    desc: "Weekly bar charts and category breakdowns to spot your patterns.",
    screen: <StatsScreen />,
    accent: "#f59e0b",
    accentLight: "#fef3c7",
  },
  {
    id: "profile",
    label: "Profile",
    title: "Your Profile",
    desc: "Manage your account, notifications and privacy in one tidy page.",
    screen: <ProfileScreen />,
    accent: "#ec4899",
    accentLight: "#fce7f3",
  },
];

/* ── Intersection-observer hook ───────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Phone frame wrapper ──────────────────────────────────── */
function PhoneFrame({ children, accent, active, onClick, index, visible }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative shrink-0 cursor-pointer select-none
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        ${active ? "scale-105 z-20" : "scale-100 hover:scale-[1.03] z-10"}
      `}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      {/* Glow behind active phone */}
      {active && (
        <div
          className="absolute -inset-3 rounded-[44px] opacity-20 blur-xl -z-10 transition-all duration-500"
          style={{ background: accent }}
        />
      )}

      {/* Phone shell */}
      <div
        className={`
          w-42 h-85 rounded-[36px] overflow-hidden
          shadow-xl transition-shadow duration-300
          ${active ? "shadow-2xl" : "hover:shadow-2xl"}
        `}
        style={{ background: "#1a1a2e" }}
      >
        {/* Inner notch bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-14 h-1.25 rounded-full bg-black/40" />
        </div>
        {/* Screen content */}
        <div className="w-full h-[calc(100%-28px)] overflow-hidden">
          {children}
        </div>
      </div>

      {/* Active indicator dot */}
      <div
        className={`
          absolute -bottom-3 left-1/2 -translate-x-1/2
          w-2 h-2 rounded-full transition-all duration-300
          ${active ? "opacity-100 scale-100" : "opacity-0 scale-50"}
        `}
        style={{ background: accent }}
      />
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function Screenshots() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal();
  const scrollRef = useRef(null);

  /* Auto-rotate every 3s */
  useEffect(() => {
    const t = setInterval(() =>
      setActive((a) => (a + 1) % SCREENSHOTS.length), 3000
    );
    return () => clearInterval(t);
  }, []);

  const current = SCREENSHOTS[active];

  return (
    <section id="screenshots" className="py-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#f7f8ff 0%,#f0eeff 100%)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div
          ref={ref}
          className={`
            text-center mb-16 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block text-indigo-500 text-xs font-bold
                           tracking-[0.15em] uppercase mb-3">
            Screenshots
          </span>
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold
                         text-gray-900 leading-tight tracking-tight mb-4">
            Beautiful. Simple. Powerful.
          </h2>
          <p className="text-gray-500 text-[1rem] leading-relaxed max-w-md mx-auto">
            A clean and intuitive interface designed for your daily productivity.
          </p>
        </div>

        {/* ── Phones row ─────────────────────────────────────── */}
        <div
          ref={scrollRef}
          className="flex items-end justify-center gap-4 pb-6 overflow-x-auto
                     scrollbar-none px-4"
          style={{ scrollbarWidth: "none" }}
        >
          {SCREENSHOTS.map((s, i) => (
            <PhoneFrame
              key={s.id}
              accent={s.accent}
              active={active === i}
              onClick={() => setActive(i)}
              index={i}
              visible={visible}
            >
              {s.screen}
            </PhoneFrame>
          ))}
        </div>

        {/* ── Info card below phones ──────────────────────────── */}
        <div className="mt-10 flex flex-col items-center gap-6">

          {/* Label + title + desc */}
          <div
            key={active}
            className="text-center max-w-sm animate-fade-in"
          >
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
              style={{ background: current.accentLight, color: current.accent }}
            >
              {current.label}
            </span>
            <h3 className="text-lg font-extrabold text-gray-900 mb-1">
              {current.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-2.5">
            {SCREENSHOTS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`
                  rounded-full transition-all duration-300
                  ${active === i ? "w-6 h-2.5" : "w-2.5 h-2.5 hover:scale-110"}
                `}
                style={{ background: active === i ? current.accent : "#d1d5db" }}
                aria-label={`View ${s.title}`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActive((a) => (a - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white
                         hover:bg-gray-50 flex items-center justify-center
                         transition-colors duration-200 shadow-sm"
              aria-label="Previous screenshot"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm text-gray-400 font-medium tabular-nums">
              {active + 1} / {SCREENSHOTS.length}
            </span>
            <button
              onClick={() => setActive((a) => (a + 1) % SCREENSHOTS.length)}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white
                         hover:bg-gray-50 flex items-center justify-center
                         transition-colors duration-200 shadow-sm"
              aria-label="Next screenshot"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.35s ease both; }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  SCREEN CONTENTS (JSX phone UIs — no images needed)        */
/* ═══════════════════════════════════════════════════════════ */

function WelcomeScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4
                    bg-linear-to-b from-indigo-500 to-violet-600">
      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center
                      justify-center mb-4">
        <span className="text-white font-extrabold text-2xl">S</span>
      </div>
      <p className="text-white font-extrabold text-base mb-1 text-center">
        Welcome to SnapTrack
      </p>
      <p className="text-white/60 text-[10px] text-center mb-6 leading-relaxed px-2">
        Plan your day, track your progress,<br />achieve your goals.
      </p>
      <div className="bg-white rounded-full px-6 py-2">
        <span className="text-indigo-600 font-bold text-xs">Get Started</span>
      </div>
    </div>
  );
}

function TasksScreen() {
  const tasks = [
    { name: "Workout",         done: true },
    { name: "Design Project",  done: false },
    { name: "Read Book",       done: true },
    { name: "Meditation",      done: false },
    { name: "Grocery Shopping",done: true },
  ];
  return (
    <div className="w-full h-full bg-[#f7f8ff] flex flex-col px-3 pt-2 pb-3">
      <p className="text-[11px] font-extrabold text-gray-900 mb-2">My Tasks</p>
      <div className="flex gap-1.5 mb-3">
        {["All","Today","Done"].map((t,i) => (
          <span key={t} className={`text-[8px] px-2.5 py-0.5 rounded-full font-semibold
            ${i===0 ? "bg-indigo-500 text-white" : "text-gray-400"}`}>{t}</span>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {tasks.map((t) => (
          <div key={t.name}
            className="flex items-center justify-between py-1.5 px-2
                       bg-white rounded-xl border border-gray-100">
            <span className={`text-[9px] font-medium ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>
              {t.name}
            </span>
            <div className={`w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center
              ${t.done ? "bg-green-400" : "border border-gray-300"}`}>
              {t.done && (
                <svg viewBox="0 0 10 10" fill="none" className="w-2 h-2">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-base leading-none">+</span>
        </div>
      </div>
    </div>
  );
}

function ProgressScreen() {
  return (
    <div className="w-full h-full flex flex-col px-3 pt-2
                    bg-linear-to-b from-indigo-500 to-violet-600">
      <p className="text-white/60 text-[8px] mb-0.5">Good Morning!</p>
      <p className="text-white font-extrabold text-[11px] mb-2">Hello, Emma 👋</p>
      {/* Progress card */}
      <div className="bg-white/20 rounded-xl p-2.5 mb-3">
        <p className="text-white/70 text-[8px] mb-1.5">Today's Progress</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full w-3/4"/>
          </div>
          <span className="text-white font-bold text-[9px]">75%</span>
        </div>
      </div>
      <p className="text-white font-bold text-[9px] mb-1.5">My Tasks</p>
      {[
        { name: "Workout",        done: true },
        { name: "Design Project", done: false },
        { name: "Read Book",      done: true },
        { name: "Meditation",     done: false },
      ].map((t) => (
        <div key={t.name}
          className="flex items-center justify-between bg-white/15
                     rounded-lg px-2 py-1.5 mb-1">
          <span className="text-white text-[8px] font-medium">{t.name}</span>
          <div className={`w-3 h-3 rounded-full shrink-0 flex items-center justify-center
            ${t.done ? "bg-indigo-300" : "border border-white/40"}`}>
            {t.done && (
              <svg viewBox="0 0 10 10" fill="none" className="w-1.5 h-1.5">
                <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsScreen() {
  const bars = [40, 55, 70, 50, 85, 65, 100];
  const cats = [
    { label: "Work",     pct: 40, color: "bg-indigo-400" },
    { label: "Health",   pct: 30, color: "bg-green-400" },
    { label: "Personal", pct: 20, color: "bg-amber-400" },
    { label: "Other",    pct: 10, color: "bg-pink-400" },
  ];
  return (
    <div className="w-full h-full bg-[#f7f8ff] flex flex-col px-3 pt-2 pb-2">
      <div className="flex items-center justify-between mb-0.5">
        <p className="text-[11px] font-extrabold text-gray-900">Statistics</p>
        <span className="text-[8px] text-gray-400">This Week ▾</span>
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-0.75 h-16 mb-3 mt-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 bg-indigo-400 rounded-t-[3px]"
            style={{ height: `${h}%`, opacity: 0.6 + i * 0.06 }}/>
        ))}
      </div>
      <p className="text-[9px] font-bold text-gray-800 mb-2">Categories</p>
      {cats.map((c) => (
        <div key={c.label} className="mb-1.5">
          <div className="flex justify-between text-[7px] text-gray-500 mb-0.5">
            <span>{c.label}</span><span>{c.pct}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct * 1.6}px` }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen() {
  const rows = [
    { icon: "👤", label: "Personal Information" },
    { icon: "🔔", label: "Notifications" },
    { icon: "🔒", label: "Privacy & Security" },
    { icon: "❓", label: "Help & Support" },
  ];
  return (
    <div className="w-full h-full bg-[#f7f8ff] flex flex-col px-3 pt-2 pb-2">
      <p className="text-[11px] font-extrabold text-gray-900 mb-3">Profile</p>
      {/* Avatar */}
      <div className="flex flex-col items-center mb-3">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-400
                        to-violet-500 flex items-center justify-center mb-1.5 shadow-md">
          <span className="text-white font-extrabold text-sm">EJ</span>
        </div>
        <p className="text-[10px] font-bold text-gray-900">Emma Johnson</p>
        <p className="text-[7.5px] text-gray-400">emma@example.com</p>
      </div>
      {/* Menu rows */}
      <div className="flex flex-col gap-0.5">
        {rows.map((r) => (
          <div key={r.label}
            className="flex items-center gap-2 py-1.5 px-2
                       bg-white rounded-xl border border-gray-100">
            <span className="text-[10px]">{r.icon}</span>
            <span className="text-[8px] font-medium text-gray-700">{r.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 py-1.5 px-2
                        bg-white rounded-xl border border-red-50 mt-0.5">
          <span className="text-[10px]">🚪</span>
          <span className="text-[8px] font-medium text-red-400">Log Out</span>
        </div>
      </div>
    </div>
  );
}

/* ── Nav icons ────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}