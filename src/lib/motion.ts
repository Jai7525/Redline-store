import { type Transition, type Variants } from "framer-motion";

export const cinematicEase = [0.16, 1, 0.3, 1] as const;

export const transitionFast: Transition = {
  duration: 0.25,
  ease: cinematicEase,
};

export const transitionMedium: Transition = {
  duration: 0.6,
  ease: cinematicEase,
};

export const transitionSlow: Transition = {
  duration: 0.9,
  ease: cinematicEase,
};

export const transitionCinematic: Transition = {
  duration: 1.2,
  ease: cinematicEase,
};

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: cinematicEase,
    },
  },
};

export function resolveTransition(
  prefersReducedMotion: boolean | null,
  transition: Transition = transitionMedium,
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }
  return transition;
}
