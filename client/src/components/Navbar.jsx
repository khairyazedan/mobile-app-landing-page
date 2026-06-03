import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  /* Add a subtle shadow + white bg when user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 bg-white
        transition-shadow duration-300
        ${scrolled ? "shadow-[0_2px_20px_rgba(92,110,248,0.10)]" : "shadow-none"}
      `}
    >
      {/* ── Desktop bar ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          onClick={() => handleNavClick("#home")}
        >
          <div className="w-9 h-9 rounded-[10px] bg-indigo-500 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 transition-colors duration-200">
            <span className="text-white font-extrabold text-base leading-none select-none">
              S
            </span>
          </div>
          <span className="font-extrabold text-[1.15rem] text-gray-900 tracking-tight">
            SnapTrack
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavClick(href)}
                className={`
                  relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200
                  ${
                    activeLink === href
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                {label}
                {/* Active underline dot */}
                {activeLink === href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#download"
          className="
            hidden md:inline-flex items-center gap-2
            bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700
            text-white text-sm font-semibold
            px-5 py-2.5 rounded-full
            transition-colors duration-200 shadow-sm
          "
        >
          <DownloadIcon />
          Download App
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-transform duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-1.75" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-transform duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"}
        `}
      >
        <ul className="px-5 pt-3 pb-5 flex flex-col gap-1 bg-white">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavClick(href)}
                className={`
                  block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150
                  ${
                    activeLink === href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {label}
              </a>
            </li>
          ))}

          {/* Mobile download button */}
          <li className="mt-2">
            <a
              href="#download"
              onClick={() => setMenuOpen(false)}
              className="
                flex items-center justify-center gap-2
                bg-indigo-500 hover:bg-indigo-600
                text-white text-sm font-semibold
                w-full py-3 rounded-xl
                transition-colors duration-200
              "
            >
              <DownloadIcon />
              Download App
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ── Inline SVG icon ──────────────────────────────────────── */
function DownloadIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
