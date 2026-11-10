"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, ArrowUpRight } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: readonly { name: string; href: string }[];
}

export function MobileNavigation({
  isOpen,
  onClose,
  navLinks,
}: MobileNavigationProps) {
  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between border-l border-line bg-surface/95 p-8 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <Link href="/" onClick={onClose} className="relative block h-8 w-32">
              <Image
                src="/images/logo/redline-logo.png"
                alt="REDLINE"
                fill
                sizes="128px"
                className="object-contain object-left"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="group p-2 text-bone transition-colors hover:text-red-bright focus-visible:outline-none"
            >
              <X className="size-6 transition-transform group-hover:rotate-90" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-10 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between font-display text-2xl uppercase tracking-[0.2em] text-bone transition-colors hover:text-red-bright"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="size-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-line pt-6">
          <button
            type="button"
            className="flex w-full items-center justify-between border border-line bg-background/50 px-5 py-3.5 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-red"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4" strokeWidth={1.5} />
              Shopping Bag
            </span>
            <span className="text-muted">0</span>
          </button>
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted">
            Darkness has a dress code.
          </p>
        </div>
      </div>
    </div>
  );
}

