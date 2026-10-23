"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { id: "leistungen", label: "Leistungen", href: "#leistungen" },
  { id: "projekte", label: "Projekte", href: "#projekte" },
  { id: "vorgehen", label: "Vorgehen", href: "#vorgehen" },
  { id: "buero", label: "Büro", href: "#buero" },
  { id: "kontakt", label: "Kontakt", href: "#kontakt" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;
      setScrollProgress(ratio);

      // Determine active section
      const viewportMid = y + window.innerHeight * 0.35;
      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (viewportMid >= top) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-14 bg-[#FAFAF9]/92 backdrop-blur-md border-b border-[#121212]/10 shadow-[0_1px_12px_rgba(18,18,18,0.03)]"
          : "h-[72px] bg-[#FAFAF9]/75 backdrop-blur-sm border-b border-[#121212]/10"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full px-5 sm:px-8 lg:px-14 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#top"
          className="group flex items-baseline gap-3 focus:outline-none"
          aria-label="Tschander.Keller Architekten Zürich — Startseite"
        >
          <span className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.02em] text-[#121212]">
            TSCHANDER<span className="text-[#D92B2B]">.</span>KELLER
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/70">
            Architekten ETH/SIA · Zürich
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Hauptnavigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative flex items-center gap-2 text-[13px] tracking-[-0.01em] transition-colors py-1 ${
                  isActive
                    ? "text-[#121212] font-medium"
                    : "text-[#121212]/75 hover:text-[#121212]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full bg-[#D92B2B] transition-all duration-200 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="hidden sm:inline-flex items-center gap-2 bg-[#121212] text-[#FAFAF9] hover:bg-[#D92B2B] transition-colors duration-200 text-[12px] font-medium tracking-[0.01em] px-4 py-2"
          >
            <span>Gespräch vereinbaren</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 text-[#121212] border border-[#121212]/15"
            aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Red progress hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-transparent pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#D92B2B] transition-transform duration-75 origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#121212]/15 px-5 py-6 shadow-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/60 mb-4">
            Navigation · Dolderstrasse 30, 8032 Zürich
          </div>
          <div className="flex flex-col divide-y divide-[#121212]/10">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 flex items-center justify-between text-[15px] font-medium text-[#121212]"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#121212]/50">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                  )}
                </a>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-[#121212]/10 flex flex-col gap-2">
            <a
              href="#kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#121212] text-[#FAFAF9] text-[13px] font-medium py-3"
            >
              <span>Gespräch vereinbaren</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+41442528500"
              className="w-full text-center font-mono text-[11px] text-[#121212]/75 py-2"
            >
              +41 44 252 85 00 · info@tschanderkeller.ch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
