"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroVideo, type HeroVideoHandle } from "./HeroVideo";
import { HeroContent } from "./HeroContent";
import { HeroNavigation } from "./HeroNavigation";

interface CinematicHeroProps {
  onOpenWishlist?: () => void;
}

export function CinematicHero({ onOpenWishlist }: CinematicHeroProps) {
  const prefersReduced = useReducedMotion();
  const prefersReducedMotion = Boolean(prefersReduced);

  const [phase, setPhase] = useState<"film" | "background" | "revealed">("film");
  const [showSkip, setShowSkip] = useState(false);
  const heroVideoRef = useRef<HeroVideoHandle>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  const transitionToBackground = useCallback(() => {
    heroVideoRef.current?.transitionToLoop();
    setPhase("background");
    setShowSkip(false);
    document.body.style.overflow = "";

    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => {
      setPhase("revealed");
    }, 600);
  }, []);

  const handleOpeningEnded = useCallback(() => {
    transitionToBackground();
  }, [transitionToBackground]);

  const handleSkipIntro = useCallback(() => {
    transitionToBackground();
  }, [transitionToBackground]);

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionToBackground();
      return;
    }

    document.body.style.overflow = "hidden";

    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    return () => {
      clearTimeout(skipTimer);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
      document.body.style.overflow = "";
    };
  }, [transitionToBackground, prefersReducedMotion]);

  const isBackgroundMode = phase === "background" || phase === "revealed" || prefersReducedMotion;
  const isContentRevealed = phase === "revealed" || prefersReducedMotion;

  return (
    <section id="hero" className="relative min-h-dvh w-full overflow-hidden bg-background">
      {/* Subtle Skip Intro Option */}
      {showSkip && !isBackgroundMode && (
        <button
          type="button"
          onClick={handleSkipIntro}
          aria-label="SKIP INTRO — Skip cinematic introduction"
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center px-3 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-bone/60 transition-all duration-300 hover:text-bone focus-visible:outline-none focus-visible:text-bone"
        >
          <span className="relative">
            SKIP INTRO
            <span
              className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full"
              aria-hidden="true"
            />
          </span>
        </button>
      )}

      {/* Top Navigation */}
      <HeroNavigation
        isVisible={isContentRevealed}
        prefersReducedMotion={prefersReducedMotion}
        onOpenWishlist={onOpenWishlist}
      />

      {/* Hero Video */}
      <HeroVideo
        ref={heroVideoRef}
        onOpeningEnded={handleOpeningEnded}
        isBackgroundMode={isBackgroundMode}
      />

      {/* Hero Content */}
      <HeroContent
        isVisible={isContentRevealed}
        prefersReducedMotion={prefersReducedMotion}
      />
    </section>
  );
}
