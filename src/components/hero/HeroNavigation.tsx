"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MobileNavigation } from "./MobileNavigation";

const NAV_LINKS = [
  { name: "DROPS", href: "#drops" },
  { name: "COLLECTIONS", href: "#collections" },
  { name: "LOOKBOOK", href: "#lookbook" },
  { name: "ABOUT", href: "#about" },
] as const;

interface HeroNavigationProps {
  isVisible: boolean;
  prefersReducedMotion: boolean;
}

export function HeroNavigation({
  isVisible,
  prefersReducedMotion,
}: HeroNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        animate={
          isVisible || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: -24 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
          isScrolled
            ? "border-b border-line bg-background/85 backdrop-blur-md py-4"
            : "bg-gradient-to-b from-background/80 via-background/20 to-transparent py-6 sm:py-8"
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo on Left */}
          <Link
            href="/"
            aria-label="REDLINE Home"
            className="group relative flex items-center transition-opacity hover:opacity-90"
          >
            <div className="relative h-7 w-32 sm:h-8 sm:w-36 lg:h-9 lg:w-40">
              <Image
                src="/images/logo/redline-logo.png"
                alt="REDLINE"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Links Centered */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center space-x-9 lg:space-x-12"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative font-sans text-xs uppercase tracking-[0.25em] text-bone/90 transition-colors hover:text-bone"
              >
                <span>{link.name}</span>
                {/* Underline accent on hover */}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 sm:space-x-6">
            <button
              type="button"
              aria-label="Shopping Bag (0 items)"
              className="group relative p-2 text-bone transition-colors hover:text-red-bright focus-visible:outline-none"
            >
              <ShoppingBag className="size-5 transition-transform group-hover:scale-105" strokeWidth={1.5} />
              <span className="absolute top-1 right-0.5 flex size-3.5 items-center justify-center rounded-full bg-red text-[9px] font-bold text-bone">
                0
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 text-bone transition-colors hover:text-red-bright focus-visible:outline-none md:hidden"
            >
              <Menu className="size-6" strokeWidth={1.5} />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}

