import { useEffect, useRef, useState } from "react";

/* ── Store buttons data ───────────────────────────────────── */
const STORES = [
  {
    id: "google",
    top: "GET IT ON",
    name: "Google Play",
    icon: <GooglePlayIcon />,
  },
  {
    id: "apple",
    top: "Download on the",
    name: "App Store",
    icon: <AppleIcon />,
  },
];

/* ── Stat counters ────────────────────────────────────────── */
const STATS = [
  { value: 50,  suffix: "K+", label: "Downloads"     },
  { value: 4.9, suffix: "★",  label: "Average Rating" },
  { value: 30,  suffix: "K+", label: "Active Users"  },
];

/* ── Animated counter hook ───────────────────────────────── */
function useCounter(target, decimals = 0, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, decimals]);
  return val;
}

/* ── Individual stat with animated counter ───────────────── */
function StatItem({ stat, started, index }) {
  const isDecimal = !Number.isInteger(stat.value);
  const count = useCounter(stat.value, isDecimal ? 1 : 0, started);
  return (
    <div
      className={`
        text-center transition-all duration-700
        ${started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{ transitionDelay: started ? `${300 + index * 120}ms` : "0ms" }}
    >
      <p className="text-3xl font-extrabold text-white leading-none">
        {isDecimal ? count.toFixed(1) : count}
        <span className="text-white/80">{stat.suffix}</span>
      </p>
      <p className="text-white/60 text-xs font-medium mt-1">{stat.label}</p>
    </div>
  );
}

/* ── Intersection-observer hook ───────────────────────────── */
function useReveal(threshold = 0.2) {
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

/* ── Main CTA section ─────────────────────────────────────── */
export default function CTA() {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="download"
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      {/* ── Background gradient ─────────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-indigo-500 to-violet-600" />

      {/* ── Decorative circles ──────────────────────────────── */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96
                      rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80
                      rounded-full bg-violet-400/20 blur-3xl" />

      {/* Subtle grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">

        {/* ── Stats row ───────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-10 mb-14">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} started={visible} index={i} />
          ))}
        </div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <div
          className={`
            w-16 h-px bg-white/20 mx-auto mb-14 transition-all duration-700
            ${visible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
          `}
          style={{ transitionDelay: visible ? "500ms" : "0ms" }}
        />

        {/* ── Main content ────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left: logo + text */}
          <div
            className={`
              flex items-center gap-5 transition-all duration-700
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
            `}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            {/* Logo icon */}
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/15
                            border border-white/20 flex items-center justify-center
                            shadow-lg backdrop-blur-sm">
              <span className="text-white font-extrabold text-2xl">S</span>
            </div>

            {/* Headline + sub */}
            <div>
              <h2 className="text-[clamp(1.6rem,4vw,2.2rem)] font-extrabold
                             text-white leading-tight tracking-tight">
                Ready to Boost<br />Your Productivity?
              </h2>
              <p className="text-white/65 text-sm mt-2 leading-relaxed max-w-xs">
                Join thousands of users who are already
                achieving more with SnapTrack.
              </p>
            </div>
          </div>

          {/* Right: store buttons */}
          <div
            className={`
              flex flex-col sm:flex-row gap-3 transition-all duration-700
              ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
            `}
            style={{ transitionDelay: visible ? "350ms" : "0ms" }}
          >
            {STORES.map((s) => (
              <a
                key={s.id}
                href="#"
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  flex items-center gap-3 px-5 py-3.5 rounded-2xl
                  border transition-all duration-250 active:scale-[0.97]
                  ${hovered === s.id
                    ? "bg-white border-white shadow-xl shadow-black/20"
                    : "bg-white/10 border-white/25 shadow-md backdrop-blur-sm"
                  }
                `}
              >
                <div className={`transition-colors duration-250 ${hovered === s.id ? "text-gray-800" : "text-white"}`}>
                  {s.icon}
                </div>
                <div className="text-left leading-tight">
                  <p className={`text-[10px] font-medium transition-colors duration-250
                                 ${hovered === s.id ? "text-gray-400" : "text-white/60"}`}>
                    {s.top}
                  </p>
                  <p className={`text-[15px] font-bold transition-colors duration-250
                                 ${hovered === s.id ? "text-gray-900" : "text-white"}`}>
                    {s.name}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Bottom trust note ───────────────────────────────── */}
        <div
          className={`
            mt-12 flex flex-wrap items-center justify-center gap-6
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          style={{ transitionDelay: visible ? "500ms" : "0ms" }}
        >
          {[
            { icon: "🆓", text: "Free to download" },
            { icon: "🔒", text: "No credit card required" },
            { icon: "📱", text: "iOS & Android" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-sm">{icon}</span>
              <span className="text-white/55 text-xs font-medium">{text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── SVG Icons ────────────────────────────────────────────── */
function GooglePlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.18 23.76c.3.17.65.22 1.02.11l12.2-7.05-2.63-2.62-10.59 9.56z"/>
      <path d="M19.68 13.44L16.5 11.5l3.18-1.83c.89-.51.89-1.33 0-1.84L16.5 5.99l-3.18 1.84L6.15 1.13C5.87.97 5.56.93 5.27 1L16.5 12l3.18-1.83.03.03c.89.51.89 1.33-.03 1.84z"/>
      <path d="M2.2 1.26C2.07 1.49 2 1.76 2 2.07v19.86c0 .31.07.58.2.81L13.62 11.5 2.2 1.26z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}