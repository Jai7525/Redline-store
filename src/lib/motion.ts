import { type Transition, type Variants } from "framer-motion";

export const revealTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const cinematicFadeRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function resolveTransition(
  prefersReducedMotion: boolean | null,
  transition: Transition = revealTransition,
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }

  return transition;
}
