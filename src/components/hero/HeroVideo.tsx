"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import Image from "next/image";

export interface HeroVideoHandle {
  transitionToLoop: () => void;
}

interface HeroVideoProps {
  onOpeningEnded?: () => void;
  isBackgroundMode: boolean;
  posterSrc?: string;
}

export const HeroVideo = forwardRef<HeroVideoHandle, HeroVideoProps>(
  function HeroVideo(
    { onOpeningEnded, isBackgroundMode, posterSrc = "/REDLINE_Logo.png" },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasError, setHasError] = useState(false);
    const [overlayFading, setOverlayFading] = useState(false);
    const openingEndedRef = useRef(false);

    // Transition the exact same video element into a dark muted loop
    const transitionToLoop = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;

      // 1. Keep permanently muted
      video.muted = true;

      // 2. Enable continuous looping
      video.loop = true;

      // 3. Reset playback position to 0:00
      video.currentTime = 0;

      // 4. Restart playback
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback
        });
      }
    }, []);

    useImperativeHandle(ref, () => ({
      transitionToLoop,
    }));

    const handleEnded = useCallback(() => {
      // Natural onEnded event of Phase 1
      if (!openingEndedRef.current) {
        openingEndedRef.current = true;

        // Step 1: Smoothly fade dark overlay over final frame
        setOverlayFading(true);

        // Step 2: Smooth transition into muted background loop without visible glitch
        transitionToLoop();

        // Step 3: Notify parent to start content reveal
        onOpeningEnded?.();
      }
    }, [onOpeningEnded, transitionToLoop]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Ensure every page load starts from 0:00 without loop in Phase 1 and permanently muted
      video.currentTime = 0;
      video.loop = false;
      video.muted = true;

      video.addEventListener("ended", handleEnded);

      const onError = () => {
        setHasError(true);
        handleEnded();
      };
      video.addEventListener("error", onError);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully
        });
      }

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("error", onError);
      };
    }, [handleEnded]);

    const isDarkOverlayActive = isBackgroundMode || overlayFading;

    return (
      <div className="absolute inset-0 size-full overflow-hidden bg-background">
        {/* Continuous Single Video Element - permanently muted */}
        {!hasError ? (
          <video
            ref={videoRef}
            src="/redline_hero.mp4"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/images/logo/redline-logo.png"
            aria-label="REDLINE Hero Video"
            className="size-full object-cover object-center select-none"
          />
        ) : (
          <div className="relative flex size-full items-center justify-center bg-surface">
            <Image
              src={posterSrc}
              alt="REDLINE"
              fill
              priority
              className="object-contain p-12 opacity-25 filter grayscale"
            />
          </div>
        )}

        {/* Phase 2 Dark Black Overlay:
            Fades in smoothly over the final frame, dims the video to 60-70% darkness
            so the looping video stays visible as an atmospheric background while
            ensuring maximum typography readability. */}
        <div
          className={`pointer-events-none absolute inset-0 bg-background/70 backdrop-brightness-75 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDarkOverlayActive ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Bottom smooth fade into future page sections */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-1000 ${
            isDarkOverlayActive ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
    );
  }
);
