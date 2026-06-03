import { useEffect, useRef, useState } from "react";

/* ── Footer link columns ──────────────────────────────────── */
const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Features",     href: "#features" },
      { label: "Screenshots",  href: "#screenshots" },
      { label: "Pricing",      href: "#" },
      { label: "Updates",      href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",  href: "#" },
      { label: "Blog",      href: "#" },
      { label: "Careers",   href: "#" },
      { label: "Contact",   href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center",    href: "#" },
      { label: "FAQ",            href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

/* ── Social links ─────────────────────────────────────────── */
const SOCIALS = [
  { label: "Facebook",  href: "#", icon: <FacebookIcon /> },
  { label: "Twitter",   href: "#", icon: <TwitterIcon /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  { label: "LinkedIn",  href: "#", icon: <LinkedInIcon /> },
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

/* ── Main Footer ──────────────────────────────────────────── */
export default function Footer() {
  const [ref, visible] = useReveal();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer ref={ref} className="bg-gray-950 pt-16 pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Top: brand col + link columns + social ─────────── */}
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12
            border-b border-white/[0.07] transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >

          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <a href="#home" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-indigo-500
                              group-hover:bg-indigo-400 transition-colors duration-200
                              flex items-center justify-center shadow-md shadow-indigo-900/40">
                <span className="text-white font-extrabold text-base select-none">S</span>
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                SnapTrack
              </span>
            </a>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-57.5">
              Your all-in-one productivity app to plan, track and achieve your goals every day.
            </p>

            {/* Newsletter mini-form */}
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">
              Stay in the loop
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium
                              animate-fade-in">
                <CheckIcon />
                You're subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 bg-white/5 border border-white/10
                             text-white placeholder-gray-600 text-sm rounded-xl
                             px-3.5 py-2.5 outline-none
                             focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                             transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-indigo-500 hover:bg-indigo-400
                             active:scale-[0.97] text-white text-sm font-semibold
                             px-4 py-2.5 rounded-xl transition-all duration-200"
                >
                  Join
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {COLUMNS.map((col, ci) => (
            <div
              key={col.heading}
              className={`transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: visible ? `${(ci + 1) * 80}ms` : "0ms" }}
            >
              <h4 className="text-white text-sm font-bold mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-gray-400 hover:text-indigo-400 text-sm
                                 transition-colors duration-200 group flex items-center gap-1"
                    >
                      {l.label}
                      <span className="opacity-0 group-hover:opacity-100 -translate-x-1
                                       group-hover:translate-x-0 transition-all duration-200
                                       text-indigo-400 inline-block">
                        ›
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────────── */}
        <div
          className={`
            pt-8 flex flex-col sm:flex-row items-center justify-between gap-5
            transition-all duration-700 delay-300
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {/* Copyright */}
          <p className="text-gray-600 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} SnapTrack. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            <span className="text-gray-600 text-xs font-medium mr-1">Follow Us</span>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.07]
                           hover:bg-indigo-500 hover:border-indigo-500
                           flex items-center justify-center text-gray-500
                           hover:text-white transition-all duration-200
                           active:scale-90"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden sm:flex items-center gap-1.5 text-gray-600
                       hover:text-indigo-400 text-xs font-medium transition-colors
                       duration-200 group"
          >
            Back to top
            <span className="group-hover:-translate-y-0.5 transition-transform duration-200
                             inline-block">↑</span>
          </button>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease both; }
      `}</style>
    </footer>
  );
}

/* ── Social SVG Icons ─────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}