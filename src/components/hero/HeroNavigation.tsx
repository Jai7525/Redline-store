"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Menu, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/context/CartContext";
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
  onOpenWishlist?: () => void;
}

export function HeroNavigation({
  isVisible,
  prefersReducedMotion,
  onOpenWishlist,
}: HeroNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, wishlist, setIsCartOpen, cartPulse } = useCart();
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
                src="/images/logo/redline-logo.webp"
                alt="REDLINE"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Links Centered: Exactly matching Screenshot [DROPS  COLLECTIONS  LOOKBOOK  ABOUT] */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center space-x-10 lg:space-x-14"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative font-sans text-xs uppercase tracking-[0.28em] text-bone/90 transition-colors hover:text-bone"
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Wishlist, Shopping Bag, Mobile Menu */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Wishlist (${wishlist.length} items)`}
              className="group relative p-2 text-bone transition-colors hover:text-red-bright focus-visible:outline-none"
            >
              <Heart
                className={`size-4 sm:size-5 transition-transform group-hover:scale-105 ${
                  wishlist.length > 0 ? "fill-red text-red" : ""
                }`}
                strokeWidth={1.5}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-red text-[8px] font-bold text-bone">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon Button with Crimson Pulse animation */}
            <button
              id="header-cart-icon"
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag, ${totalItems} items`}
              className={`group relative p-2 text-bone transition-all duration-300 focus-visible:outline-none ${
                cartPulse ? "scale-125 text-red-bright" : "hover:text-red-bright"
              }`}
            >
              {cartPulse && (
                <span className="absolute inset-0 rounded-full bg-red/40 animate-ping" />
              )}
              <ShoppingBag
                className="size-5 transition-transform group-hover:scale-105"
                strokeWidth={1.5}
              />
              <span
                aria-hidden="true"
                className={`absolute top-1 right-0.5 flex size-3.5 items-center justify-center rounded-full text-[9px] font-bold text-bone transition-colors ${
                  cartPulse ? "bg-red-bright scale-110" : "bg-red"
                }`}
              >
                {totalItems}
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
