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
import { Volume2, VolumeX } from "lucide-react";

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
    const [isMuted, setIsMuted] = useState(true);
    const [canToggleAudio, setCanToggleAudio] = useState(false);
    const [overlayFading, setOverlayFading] = useState(false);
    const openingEndedRef = useRef(false);

    // Transition the exact same video element into a dark muted loop
    const transitionToLoop = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;

      // 1. Immediately mute before resetting
      video.muted = true;
      setIsMuted(true);

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

      // Ensure every page load starts from 0:00 without loop in Phase 1
      video.currentTime = 0;
      video.loop = false;
      video.muted = true;
      setIsMuted(true);

      video.addEventListener("ended", handleEnded);

      const onError = () => {
        setHasError(true);
        handleEnded();
      };
      video.addEventListener("error", onError);

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setCanToggleAudio(true);
          })
          .catch(() => {
            // Autoplay blocked policy handling
            setCanToggleAudio(true);
          });
      }

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("error", onError);
      };
    }, [handleEnded]);

    const toggleSound = () => {
      const video = videoRef.current;
      if (!video) return;

      // Directly toggle HTML video element muted property
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
    };

    const isDarkOverlayActive = isBackgroundMode || overlayFading;

    return (
      <div className="absolute inset-0 size-full overflow-hidden bg-background">
        {/* Continuous Single Video Element */}
        {!hasError ? (
          <video
            ref={videoRef}
            src="/redline_hero.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
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

        {/* Phase 1 Sound Toggle (Visible only during opening film) */}
        {!isDarkOverlayActive && canToggleAudio && !hasError && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="fixed bottom-8 left-8 z-50 flex items-center gap-2.5 border border-bone/20 bg-background/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-bone/80 backdrop-blur-md transition-all duration-300 hover:border-red hover:bg-background/90 hover:text-bone focus-visible:outline-none focus-visible:border-red"
          >
            {isMuted ? (
              <>
                <VolumeX className="size-3.5 text-muted" strokeWidth={1.5} />
                <span>Sound: Off</span>
              </>
            ) : (
              <>
                <Volume2 className="size-3.5 text-red-bright animate-pulse" strokeWidth={1.5} />
                <span className="text-bone">Sound: On</span>
              </>
            )}
          </button>
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
