import { useEffect, useRef, useState } from "react";

/* ── FAQ data ─────────────────────────────────────────────── */
const FAQS = [
  {
    id: 1,
    category: "General",
    question: "Is SnapTrack free to use?",
    answer:
      "Yes! SnapTrack is completely free to download and use. We offer a generous free tier that covers all the core features — task management, progress tracking, and reminders. A Pro plan with advanced analytics and team features is available for power users.",
  },
  {
    id: 2,
    category: "General",
    question: "Which platforms is SnapTrack available on?",
    answer:
      "SnapTrack is available on iOS (App Store) and Android (Google Play). We also have a web app at snaptrack.app so you can access your tasks from any browser. All your data syncs instantly across every device.",
  },
  {
    id: 3,
    category: "Features",
    question: "How do smart reminders work?",
    answer:
      "Smart reminders learn from your behaviour over time. If you consistently complete a certain task in the morning, SnapTrack will start nudging you in the morning. You can also set manual reminders — smart scheduling is just the default to save you time.",
  },
  {
    id: 4,
    category: "Features",
    question: "Can I share tasks or collaborate with my team?",
    answer:
      "Team collaboration is available on the Pro plan. You can create shared workspaces, assign tasks to teammates, comment on tasks, and see everyone's progress in a unified dashboard. Perfect for small teams and families alike.",
  },
  {
    id: 5,
    category: "Privacy",
    question: "Is my data secure and private?",
    answer:
      "Absolutely. All data is encrypted in transit with TLS and at rest with AES-256. We never sell your data to third parties. You can export or delete all your data at any time from the account settings page.",
  },
  {
    id: 6,
    category: "Privacy",
    question: "Can I export my data?",
    answer:
      "Yes — head to Settings → Account → Export Data. You'll receive a JSON or CSV export of all your tasks, notes, and statistics within a few seconds. We believe your data belongs to you.",
  },
  {
    id: 7,
    category: "Billing",
    question: "How do I upgrade to Pro?",
    answer:
      "Tap the crown icon in the app or visit snaptrack.app/pro. Pro is billed monthly or annually (save 40%). We accept all major credit cards, Apple Pay, and Google Pay. You can cancel anytime with no penalties.",
  },
  {
    id: 8,
    category: "Billing",
    question: "What happens to my data if I cancel Pro?",
    answer:
      "Your account and all data remain intact — you simply revert to the free plan. Any Pro-only features (advanced analytics, team workspaces) are paused, not deleted. If you resubscribe later, everything picks up where you left off.",
  },
];

/* ── Category colours ─────────────────────────────────────── */
const CATEGORY_STYLES = {
  General:  "bg-indigo-50 text-indigo-600",
  Features: "bg-green-50  text-green-600",
  Privacy:  "bg-amber-50  text-amber-600",
  Billing:  "bg-pink-50   text-pink-600",
};

/* ── Single accordion item ───────────────────────────────── */
function FAQItem({ faq, open, onToggle, index, visible }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(open ? bodyRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className={`
        bg-white rounded-2xl border transition-all duration-500 ease-out overflow-hidden
        ${open
          ? "border-indigo-200 shadow-md shadow-indigo-50"
          : "border-gray-100 hover:border-gray-200"
        }
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4
                   px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5
                            rounded-full ${CATEGORY_STYLES[faq.category]}`}>
            {faq.category}
          </span>
          <span className={`text-sm font-semibold leading-snug transition-colors duration-200
                            ${open ? "text-indigo-600" : "text-gray-900 group-hover:text-indigo-500"}`}>
            {faq.question}
          </span>
        </div>

        {/* +/– toggle icon */}
        <div className={`
          shrink-0 w-7 h-7 rounded-full flex items-center justify-center
          transition-all duration-300
          ${open
            ? "bg-indigo-500 rotate-45"
            : "bg-gray-100 group-hover:bg-indigo-50 rotate-0"
          }
        `}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke={open ? "white" : "#6b7280"} strokeWidth="2.5"
            strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5"  y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </button>

      {/* Answer — animated height */}
      <div
        style={{ height, transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        className="overflow-hidden"
      >
        <div ref={bodyRef} className="px-6 pb-5">
          <p className="text-gray-500 text-sm leading-relaxed">
            {faq.answer}
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
export default function FAQ() {
  const [ref, visible] = useReveal();
  const [openId, setOpenId] = useState(1); // first item open by default

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div
          ref={ref}
          className={`
            text-center mb-14 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <span className="inline-block text-indigo-500 text-xs font-bold
                           tracking-[0.15em] uppercase mb-3">
            FAQ
          </span>
          <h2 className="text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold
                         text-gray-900 leading-tight tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-[1rem] leading-relaxed max-w-md mx-auto">
            Everything you need to know about SnapTrack.
            Can't find the answer? Reach out to our support team.
          </p>
        </div>

        {/* ── Accordion list ─────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              open={openId === faq.id}
              onToggle={() => toggle(faq.id)}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ── Still have questions ────────────────────────────── */}
        <div
          className={`
            mt-14 text-center bg-gray-50 rounded-3xl p-8
            border border-gray-100 transition-all duration-700 delay-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100
                          flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#5c6ef8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <h3 className="text-gray-900 font-extrabold text-lg mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-500 text-sm mb-5 leading-relaxed">
            Our support team typically responds within a few hours.
            We're happy to help.
          </p>
          <a
            href="mailto:hello@snaptrack.app"
            className="inline-flex items-center gap-2 bg-indigo-500
                       hover:bg-indigo-600 active:scale-[0.97]
                       text-white text-sm font-semibold
                       px-6 py-3 rounded-full
                       transition-all duration-200 shadow-sm shadow-indigo-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Support
          </a>
        </div>

      </div>
    </section>
  );
}