import { useEffect, useRef, useState } from "react";

/* ── Feature data ─────────────────────────────────────────── */
const FEATURES = [
  {
    id: "tasks",
    icon: <TaskIcon />,
    iconBg: "bg-indigo-50",
    accent: "group-hover:bg-indigo-500",
    accentText: "group-hover:text-white",
    title: "Task Management",
    desc: "Create, organize and prioritize tasks effortlessly. Set deadlines, add subtasks, and never miss what matters most.",
    stat: "10k+ tasks",
    statLabel: "created daily",
  },
  {
    id: "progress",
    icon: <ProgressIcon />,
    iconBg: "bg-green-50",
    accent: "group-hover:bg-green-500",
    accentText: "group-hover:text-white",
    title: "Progress Tracking",
    desc: "Track your progress with beautiful statistics and visual charts. See exactly how productive you've been every day.",
    stat: "98%",
    statLabel: "user satisfaction",
  },
  {
    id: "reminders",
    icon: <RemindersIcon />,
    iconBg: "bg-amber-50",
    accent: "group-hover:bg-amber-500",
    accentText: "group-hover:text-white",
    title: "Smart Reminders",
    desc: "Get timely reminders to stay on track every day. Intelligent nudges that adapt to your schedule and habits.",
    stat: "3x faster",
    statLabel: "goal completion",
  },
  {
    id: "secure",
    icon: <SecureIcon />,
    iconBg: "bg-blue-50",
    accent: "group-hover:bg-blue-500",
    accentText: "group-hover:text-white",
    title: "Secure & Private",
    desc: "Your data is encrypted end-to-end and always protected. We never sell your information — your goals stay yours.",
    stat: "256-bit",
    statLabel: "AES encryption",
  },
];

/* ── Intersection-observer hook for scroll reveal ─────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Card component ───────────────────────────────────────── */
function FeatureCard({ feature, index, visible }) {
  return (
    <div
      className={`
        group relative bg-white rounded-3xl p-7 border border-gray-100
        hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/80
        cursor-default transition-all duration-500 ease-out overflow-hidden
        ${visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      {/* Hover colour wash */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-[0.03]
        transition-opacity duration-500 rounded-3xl
        ${feature.accent.replace("group-hover:bg-", "bg-")}
      `} />

      {/* Top row: icon + stat pill */}
      <div className="relative flex items-start justify-between mb-5">
        {/* Icon wrapper */}
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center
          transition-colors duration-300
          ${feature.iconBg} ${feature.accent}
        `}>
          <div className={`transition-colors duration-300 ${feature.accentText}`}>
            {feature.icon}
          </div>
        </div>

        {/* Stat pill */}
        <div className="text-right">
          <p className="text-[15px] font-extrabold text-gray-900 leading-tight">
            {feature.stat}
          </p>
          <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
            {feature.statLabel}
          </p>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-[1.05rem] font-bold text-gray-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        {feature.desc}
      </p>

      {/* Bottom "Learn more" link */}
      <div className="mt-5 flex items-center gap-1.5 text-indigo-500
                      text-sm font-semibold opacity-0 group-hover:opacity-100
                      -translate-x-2 group-hover:translate-x-0
                      transition-all duration-300">
        Learn more
        <ArrowIcon />
      </div>

      {/* Corner accent line */}
      <div className={`
        absolute bottom-0 left-0 h-1 w-0 group-hover:w-full
        rounded-b-3xl transition-all duration-500 ease-out
        ${feature.accent.replace("group-hover:bg-", "bg-")}
        group-hover:opacity-100 opacity-0
      `} />
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────── */
export default function Features() {
  const [ref, visible] = useReveal();

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ─────────────────────────────────── */}
        <div
          className={`
            text-center mb-16 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
          ref={ref}
        >
          <span className="inline-block text-indigo-500 text-xs font-bold
                           tracking-[0.15em] uppercase mb-3">
            Features
          </span>
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold
                         text-gray-900 leading-tight tracking-tight mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-500 text-[1rem] leading-relaxed
                        max-w-lg mx-auto">
            SnapTrack combines powerful features with a simple design
            to help you stay focused and productive.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.id}
              feature={f}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ── Bottom trust bar ───────────────────────────────── */}
        <div
          className={`
            mt-16 flex flex-wrap items-center justify-center gap-8
            transition-all duration-700 delay-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {[
            { value: "50K+",    label: "Active users" },
            { value: "4.9 ★",  label: "App Store rating" },
            { value: "99.9%",   label: "Uptime" },
            { value: "Free",    label: "to get started" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── SVG Icons ────────────────────────────────────────────── */
function TaskIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="14" />
    </svg>
  );
}

function RemindersIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SecureIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}