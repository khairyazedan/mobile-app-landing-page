import { useEffect, useRef, useState } from "react";

/* ── Testimonials data ────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Product Designer",
    company: "Notion",
    avatar: "SM",
    avatarBg: "from-indigo-400 to-violet-500",
    rating: 5,
    text: "SnapTrack completely changed how I manage my day. The progress tracking is beautiful — I actually look forward to checking it every morning. Best productivity app I've used in years.",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Software Engineer",
    company: "Stripe",
    avatar: "JO",
    avatarBg: "from-green-400 to-teal-500",
    rating: 5,
    text: "I've tried dozens of todo apps. SnapTrack is the first one I've stuck with for more than a month. The smart reminders actually adapt to when I get things done — it's genuinely clever.",
  },
  {
    id: 3,
    name: "Lena Hoffmann",
    role: "Freelance Writer",
    company: "Self-employed",
    avatar: "LH",
    avatarBg: "from-amber-400 to-orange-500",
    rating: 5,
    text: "As a freelancer juggling multiple clients, I needed something simple but powerful. SnapTrack nails that balance. The category stats help me see exactly where my time goes each week.",
  },
  {
    id: 4,
    name: "Carlos Rivera",
    role: "Marketing Manager",
    company: "HubSpot",
    avatar: "CR",
    avatarBg: "from-pink-400 to-rose-500",
    rating: 5,
    text: "Our whole team switched to SnapTrack. Productivity went up noticeably within the first two weeks. The interface is so clean that onboarding new people takes about five minutes.",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Medical Student",
    company: "Oxford University",
    avatar: "AP",
    avatarBg: "from-blue-400 to-indigo-500",
    rating: 5,
    text: "Studying medicine requires juggling an insane amount of tasks. SnapTrack keeps me sane. The streak feature alone motivates me to study every single day without fail.",
  },
  {
    id: 6,
    name: "Tom Bergström",
    role: "Startup Founder",
    company: "Launchpad",
    avatar: "TB",
    avatarBg: "from-violet-400 to-purple-600",
    rating: 5,
    text: "I recommended SnapTrack to every founder in my network after using it for two weeks. It's rare to find an app that's both powerful and genuinely enjoyable to open every day.",
  },
];

/* ── Star rating ──────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill="#f59e0b" className="shrink-0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ── Single testimonial card ─────────────────────────────── */
function TestimonialCard({ t, index, visible }) {
  return (
    <div
      className={`
        bg-white rounded-3xl p-6 border border-gray-100
        hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/80
        transition-all duration-500 ease-out flex flex-col gap-4
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
    >
      {/* Quote mark */}
      <div className="text-indigo-100 text-5xl font-serif leading-none select-none -mb-2">
        "
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {t.text}
      </p>

      {/* Stars */}
      <Stars count={t.rating} />

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        <div className={`w-10 h-10 rounded-full bg-linear-to-br ${t.avatarBg}
                         flex items-center justify-center shrink-0 shadow-sm`}>
          <span className="text-white text-xs font-extrabold">{t.avatar}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 leading-tight">{t.name}</p>
          <p className="text-xs text-gray-400 leading-tight">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

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

/* ── Main section ─────────────────────────────────────────── */
export default function Testimonials() {
  const [ref, visible] = useReveal();

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
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
            Testimonials
          </span>
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold
                         text-gray-900 leading-tight tracking-tight mb-4">
            Loved by Thousands of Users
          </h2>
          <p className="text-gray-500 text-[1rem] leading-relaxed max-w-md mx-auto">
            Don't just take our word for it — here's what people are saying
            about SnapTrack around the world.
          </p>

          {/* Aggregate rating */}
          <div className={`
            inline-flex items-center gap-3 mt-6 bg-white rounded-2xl
            px-5 py-3 border border-gray-100 shadow-sm
            transition-all duration-700 delay-200
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}>
            <Stars count={5} />
            <span className="text-gray-900 font-extrabold text-sm">4.9 out of 5</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 text-sm">12,000+ reviews</span>
          </div>
        </div>

        {/* ── Cards grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} visible={visible} />
          ))}
        </div>

      </div>
    </section>
  );
}