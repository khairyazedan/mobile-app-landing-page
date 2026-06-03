import { useEffect, useRef } from "react";

/* ── Store badge data ──────────────────────────────────────── */
const STORE_BADGES = [
  {
    label: "GET IT ON",
    name: "Google Play",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
        <path d="M3.18 23.76c.3.17.65.22 1.02.11l12.2-7.05-2.63-2.62-10.59 9.56zm16.5-10.32L16.5 11.5l3.18-1.83c.89-.51.89-1.33 0-1.84L16.5 5.99l-3.18 1.84L6.15 1.13C5.87.97 5.56.93 5.27 1L16.5 12l3.18-1.83.03.03c.89.51.89 1.33-.03 1.84z" />
        <path d="M2.2 1.26C2.07 1.49 2 1.76 2 2.07v19.86c0 .31.07.58.2.81L13.62 11.5 2.2 1.26z" />
      </svg>
    ),
  },
  {
    label: "Download on the",
    name: "App Store",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-700">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
];

/* ── Task list for the front phone ────────────────────────── */
const TASKS = [
  { name: "Workout",        done: true },
  { name: "Design Project", done: false },
  { name: "Read Book",      done: true },
  { name: "Meditation",     done: false },
];

/* ── Category bars for the back phone ─────────────────────── */
const CATEGORIES = [
  { label: "Work",     pct: 40, color: "bg-indigo-500" },
  { label: "Health",   pct: 30, color: "bg-green-400" },
  { label: "Personal", pct: 20, color: "bg-amber-400" },
  { label: "Other",    pct: 10, color: "bg-pink-400" },
];

const BAR_HEIGHTS = [40, 55, 70, 50, 85, 65, 100];

export default function Hero() {
  const heroRef = useRef(null);

  /* Subtle parallax on mouse move */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = ((e.clientX - left) / width  - 0.5) * 10;
      const y = ((e.clientY - top)  / height - 0.5) * 10;
      const front = hero.querySelector("#phone-front");
      const back  = hero.querySelector("#phone-back");
      if (front) front.style.transform = `translate(${-x * 0.8}px, ${-y * 0.8}px)`;
      if (back)  back.style.transform  = `rotate(6deg) translate(${-x * 0.4}px, ${-y * 0.4}px)`;
    };
    const onLeave = () => {
      const front = hero.querySelector("#phone-front");
      const back  = hero.querySelector("#phone-back");
      if (front) front.style.transform = "";
      if (back)  back.style.transform  = "rotate(6deg)";
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-16
                 bg-linear-to-br from-[#f5f6ff] via-[#eeeffe] to-[#e8e4fc]"
    >
      {/* ── Decorative blobs ─────────────────────────────────── */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full
                      bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full
                      bg-violet-200/40 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full px-6 py-16
                      flex flex-col lg:flex-row items-center justify-between gap-14">

        {/* ── Left: text ───────────────────────────────────────── */}
        <div className="flex-1 max-w-125 text-center lg:text-left animate-fade-in-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm
                          border border-indigo-100 rounded-full px-4 py-1.5 mb-6
                          text-indigo-600 text-sm font-semibold shadow-sm">
            <span className="text-base">⚡</span>
            Track. Manage. Achieve.
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.4rem,6vw,3.8rem)] font-extrabold leading-[1.08]
                         tracking-tight text-gray-900 mb-5">
            Your Goals.<br />
            <span className="text-indigo-500">Our Mission.</span>
          </h1>

          {/* Sub-copy */}
          <p className="text-gray-500 text-[1.05rem] leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            SnapTrack is your all-in-one productivity app designed to help you
            plan, track and achieve more every day.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
            <a
              href="#download"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600
                         active:scale-[0.97] text-white font-bold text-sm px-6 py-3.5
                         rounded-full shadow-md shadow-indigo-200 transition-all duration-200"
            >
              <DownloadIcon />
              Download Now
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50
                         active:scale-[0.97] text-indigo-600 font-bold text-sm px-6 py-3.5
                         rounded-full border-2 border-indigo-200 transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Store badges */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {STORE_BADGES.map((b) => (
              <a
                key={b.name}
                href={b.href}
                className="flex items-center gap-2.5 bg-white hover:bg-gray-50
                           border border-gray-200 hover:border-indigo-300
                           rounded-xl px-4 py-2.5 transition-all duration-200
                           shadow-sm hover:shadow-md group"
              >
                {b.icon}
                <div className="text-left leading-tight">
                  <div className="text-[10px] text-gray-400 font-medium">{b.label}</div>
                  <div className="text-sm font-bold text-gray-800">{b.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: phone mockups ─────────────────────────────── */}
        <div className="relative shrink-0 w-[320px] h-107.5 select-none">

          {/* Back phone — stats */}
          <div
            id="phone-back"
            className="absolute right-0 top-10 w-43.75 h-88.75 rounded-[34px]
                       bg-[#1a1a2e] shadow-2xl overflow-hidden z-10
                       transition-transform duration-500 ease-out"
            style={{ transform: "rotate(6deg)" }}
          >
            <div className="w-full h-full bg-[#f7f8ff] flex flex-col p-4">
              <div className="w-8 h-1.25 bg-gray-900/40 rounded-full mx-auto mb-3" />
              <p className="text-[11px] font-bold text-gray-800 mb-1">Statistics</p>
              <p className="text-[9px] text-gray-400 mb-3">This Week</p>

              {/* Bar chart */}
              <div className="flex items-end gap-1 h-16.25 mb-4">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-400 rounded-t-[3px] transition-all"
                    style={{ height: `${h}%`, opacity: i === 6 ? 1 : 0.7 }}
                  />
                ))}
              </div>

              <p className="text-[10px] font-bold text-gray-800 mb-2">Categories</p>
              {CATEGORIES.map((c) => (
                <div key={c.label} className="mb-2">
                  <div className="flex justify-between text-[8px] text-gray-500 mb-0.75">
                    <span>{c.label}</span><span>{c.pct}%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Front phone — tasks */}
          <div
            id="phone-front"
            className="absolute left-0 top-0 w-48.75 h-100 rounded-[36px]
                       bg-[#1a1a2e] shadow-[0_30px_80px_rgba(92,110,248,0.30)]
                       overflow-hidden z-20 transition-transform duration-500 ease-out"
          >
            <div className="w-full h-full bg-linear-to-b from-indigo-500 to-violet-600
                            flex flex-col p-4">
              {/* Notch */}
              <div className="w-14 h-1.5 bg-black/40 rounded-full mx-auto mb-3" />

              {/* Greeting */}
              <p className="text-white/70 text-[9px] font-medium mb-0.5">Good Morning!</p>
              <p className="text-white text-[13px] font-extrabold mb-3">Hello, Emma 👋</p>

              {/* Progress card */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-3">
                <p className="text-white/80 text-[8px] mb-2">Today's Progress</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/30 rounded-full h-1.25 overflow-hidden">
                    <div className="h-full bg-white rounded-full w-[75%]" />
                  </div>
                  <span className="text-white text-[10px] font-bold">75%</span>
                </div>
              </div>

              {/* Tasks */}
              <p className="text-white text-[10px] font-bold mb-2">My Tasks</p>
              <div className="flex flex-col gap-1.5">
                {TASKS.map((t) => (
                  <div
                    key={t.name}
                    className="bg-white/15 rounded-lg px-2.5 py-2 flex items-center justify-between"
                  >
                    <span className="text-white text-[9px] font-medium">{t.name}</span>
                    {t.done ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-400
                                      flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 10 10" fill="none" className="w-2 h-2">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2
                                      border-white/50 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom nav bar */}
              <div className="mt-auto flex justify-around pt-3 border-t border-white/20">
                {["M4 6h16M4 12h16M4 18h16", "M3 3h18v18H3z", "M12 2a10 10 0 100 20 10 10 0 000-20z", "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"].map((d, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="none" stroke="white"
                       strokeWidth="2" strokeLinecap="round" className="w-4 h-4 opacity-70">
                    <path d={d} />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Floating stat pill */}
          <div className="absolute -bottom-2 left-4 z-30
                          bg-white rounded-2xl shadow-lg px-3 py-2
                          flex items-center gap-2 animate-float">
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
              <span className="text-green-500 text-base">✓</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 leading-none">Tasks done</p>
              <p className="text-sm font-extrabold text-gray-900 leading-tight">12 / 16</p>
            </div>
          </div>

          {/* Floating streak pill */}
          <div className="absolute -top-3 right-4 z-30
                          bg-white rounded-2xl shadow-lg px-3 py-2
                          flex items-center gap-2 animate-float-delayed">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <span className="text-amber-400 text-base">🔥</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 leading-none">Day streak</p>
              <p className="text-sm font-extrabold text-gray-900 leading-tight">7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (injected once) ─────────────── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}

/* ── Inline icon ──────────────────────────────────────────── */
function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}