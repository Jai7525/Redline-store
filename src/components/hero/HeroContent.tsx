"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroContentProps {
  isVisible: boolean;
  prefersReducedMotion: boolean;
}

export function HeroContent({ isVisible, prefersReducedMotion }: HeroContentProps) {
  // Only reveal content after video completes and overlay fades.
  // Note: No duplicate logo here because the video itself features the logo!
  return (
    <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-5 text-center sm:px-8">
      <div className="max-w-4xl">
        {/* Main Headline */}
        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={
            isVisible || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 0.2,
          }}
          className="font-display text-4xl uppercase tracking-[0.14em] text-bone sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]"
        >
          Darkness Has A Dress Code.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={
            isVisible || prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: prefersReducedMotion ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 0.5,
          }}
          className="mx-auto mt-4 max-w-xl text-xs sm:text-sm md:text-base font-light uppercase tracking-[0.24em] text-bone/85 sm:mt-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        >
          Built for those who never follow the ordinary.
        </motion.p>
      </div>

      {/* EXPLORE COLLECTION Primary Button */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={
          isVisible || prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 1.0,
          ease: [0.16, 1, 0.3, 1],
          delay: prefersReducedMotion ? 0 : 0.8,
        }}
        className="mt-8 sm:mt-12"
      >
        <Button
          variant="primary"
          size="md"
          className="group relative px-8 py-4 tracking-[0.24em] transition-all duration-300 hover:shadow-[0_0_24px_rgba(200,16,46,0.5)] active:scale-[0.98]"
          onClick={() => {
            const nextSection = document.getElementById("drops");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span>Explore Collection</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </Button>
      </motion.div>
    </div>
  );
}
