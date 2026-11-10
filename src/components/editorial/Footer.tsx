"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (categoryKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const target = document.getElementById("drops");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="footer"
      aria-label="Site Footer"
      className="relative w-full overflow-hidden border-t border-line/60 bg-background text-bone"
    >
      {/* Subtle top crimson glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/60 to-transparent"
      />

      {/* Main Footer Content */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Column 1: Brand Identity & Statement (Spans 5 cols on lg) */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-5 lg:pr-8">
            {/* Original REDLINE Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              aria-label="REDLINE — Return to top"
              className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none"
            >
              <div className="relative h-8 w-36 sm:h-9 sm:w-40 lg:h-10 lg:w-44">
                <Image
                  src="/images/logo/redline-logo.png"
                  alt="REDLINE"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-contain object-left"
                />
              </div>
            </a>

            {/* Brand Statement */}
            <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.24em] text-bone sm:text-base">
              NOT MADE TO FIT IN.
            </p>

            {/* Supporting Text */}
            <p className="mt-3 max-w-sm font-sans text-xs uppercase tracking-[0.16em] text-bone/60 leading-relaxed sm:text-[13px]">
              Built for those who refuse to follow the ordinary. Wear your identity. Own your attitude.
            </p>

            {/* Attitude Coordinate Badge */}
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              <span className="size-1 rounded-full bg-red-bright" />
              <span>ORIGINAL UNDERGROUND SPECIFICATION</span>
            </div>
          </div>

          {/* Column 2: Navigation Links — EXPLORE (Spans 2 cols on lg) */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-bone">
              EXPLORE
            </h3>
            <div className="mt-2 h-px w-6 bg-red" />
            <ul className="mt-5 space-y-3 font-sans text-xs uppercase tracking-[0.22em] text-bone/70">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToTop();
                  }}
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#drops"
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  DROPS
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  COLLECTIONS
                </a>
              </li>
              <li>
                <a
                  href="#lookbook"
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  LOOKBOOK
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  ABOUT
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Categories — SHOP (Spans 2 cols on lg) */}
          <div className="flex flex-col lg:col-span-2">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-bone">
              SHOP
            </h3>
            <div className="mt-2 h-px w-6 bg-red" />
            <ul className="mt-5 space-y-3 font-sans text-xs uppercase tracking-[0.22em] text-bone/70">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick("TEES")}
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  T-SHIRTS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick("HOODIES")}
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  HOODIES
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick("ALL")}
                  className="transition-colors hover:text-red-bright focus-visible:outline-none"
                >
                  OVERSIZED
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & Legal (Spans 3 cols on lg) */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-bone">
              CONNECT
            </h3>
            <div className="mt-2 h-px w-6 bg-red" />

            {/* Note: No external social channels or contact email are currently configured in this project.
                They are presented as elegant non-clickable placeholders rather than broken links. */}
            <div className="mt-5 space-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <p>OFFICIAL DROP CHANNELS</p>
              <div className="flex items-center gap-3 font-sans text-xs text-bone/60">
                <span className="opacity-70">INSTAGRAM</span>
                <span className="text-line">•</span>
                <span className="opacity-70">PINTEREST</span>
                <span className="text-line">•</span>
                <span className="opacity-70">YOUTUBE</span>
              </div>
            </div>

            {/* Legal Information Placeholders with comments for future integration */}
            <div className="mt-6 pt-5 border-t border-line/40">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                LEGAL POLICIES
              </p>
              <div className="mt-2 flex items-center gap-4 text-[11px] font-sans uppercase tracking-[0.2em] text-bone/60">
                {/* Non-functional placeholders until dedicated policy pages or modals are implemented */}
                <span title="Privacy Policy will be available upon official launch" className="cursor-default hover:text-bone transition-colors">
                  PRIVACY POLICY
                </span>
                <span className="text-line">•</span>
                <span title="Terms & Conditions will be available upon official launch" className="cursor-default hover:text-bone transition-colors">
                  TERMS & CONDITIONS
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Bottom Sub-Divider & Copyright Row */}
      <div className="border-t border-line/50 bg-surface/30 py-6 sm:py-8">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Dynamic Copyright Line */}
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-muted text-center sm:text-left">
            © {currentYear} REDLINE STREETWEAR. ALL RIGHTS RESERVED.
          </p>

          {/* Back to Top Smooth Button */}
          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/80 transition-colors hover:text-red-bright focus-visible:outline-none"
          >
            <span>BACK TO TOP</span>
            <div className="flex size-6 items-center justify-center rounded-xs border border-line bg-surface transition-all duration-300 group-hover:border-red group-hover:bg-red/10 group-hover:-translate-y-0.5">
              <ArrowUp className="size-3 text-bone group-hover:text-red-bright" />
            </div>
          </button>
        </Container>
      </div>
    </footer>
  );
}
