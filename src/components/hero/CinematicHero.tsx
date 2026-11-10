"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { HeroVideo, type HeroVideoHandle } from "./HeroVideo";
import { HeroContent } from "./HeroContent";
import { HeroNavigation } from "./HeroNavigation";

export function CinematicHero() {
  // Dual-Phase Stages:
  // Phase 1 ("film"): Fullscreen opening video plays to 100% completion from 0:00 (every page load)
  // Phase 2 ("background"): Overlay fades, video mutes and restarts as a continuous dark loop
  // Phase 3 ("revealed"): Headline, ethos subtitle, CTA and top navigation reveal sequentially
  const prefersReduced = useReducedMotion();
  const prefersReducedMotion = Boolean(prefersReduced);

  const [phase, setPhase] = useState<"film" | "background" | "revealed">("film");
  const [showSkip, setShowSkip] = useState(false);
  const heroVideoRef = useRef<HeroVideoHandle>(null);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Transition to background loop and reveal content
  const transitionToBackground = useCallback(() => {
    // 1. Trigger the video element to mute, loop, and restart from 0:00
    heroVideoRef.current?.transitionToLoop();

    // 2. Set phase to background (activates dark black overlay)
    setPhase("background");
    setShowSkip(false);

    // 3. Unlock scrolling immediately
    document.body.style.overflow = "";

    // 4. Staggered reveal of website content & navigation
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    revealTimerRef.current = setTimeout(() => {
      setPhase("revealed");
    }, 600);
  }, []);

  // Natural completion callback from HeroVideo's onEnded event
  const handleOpeningEnded = useCallback(() => {
    transitionToBackground();
  }, [transitionToBackground]);

  // Skip Intro handler
  const handleSkipIntro = useCallback(() => {
    transitionToBackground();
  }, [transitionToBackground]);

  useEffect(() => {
    // Reduced motion: jump straight to background loop & revealed state
    if (prefersReducedMotion) {
      transitionToBackground();
      return;
    }

    // Every refresh starts fresh in Phase 1 (no sessionStorage skip)
    // Lock scrolling during the opening film
    document.body.style.overflow = "hidden";

    // Show discreet Skip Intro after 3 seconds
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
    <section className="relative min-h-dvh w-full overflow-hidden bg-background">
      {/* Discreet Skip Intro Button (Visible only during Phase 1 film) */}
      {showSkip && !isBackgroundMode && (
        <button
          type="button"
          onClick={handleSkipIntro}
          aria-label="Skip cinematic introduction"
          className="fixed bottom-8 right-8 z-50 border border-bone/20 bg-background/60 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-bone/70 backdrop-blur-sm transition-all duration-300 hover:border-red hover:bg-background/90 hover:text-bone focus-visible:outline-none focus-visible:border-red"
        >
          <span>Skip Intro</span>
        </button>
      )}

      {/* Top Navigation - Reveals in Phase 3 */}
      <HeroNavigation
        isVisible={isContentRevealed}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Hero Video Component (Continuous single element serving Phase 1 & Phase 2) */}
      <HeroVideo
        ref={heroVideoRef}
        onOpeningEnded={handleOpeningEnded}
        isBackgroundMode={isBackgroundMode}
      />

      {/* Hero Content (Headline, Subtitle, CTA) - Revealed in Phase 3 */}
      {isBackgroundMode && (
        <HeroContent
          isVisible={isContentRevealed}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}
    </section>
  );
}
