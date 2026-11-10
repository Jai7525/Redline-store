"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function BrandStory() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToDrops = () => {
    const target = document.getElementById("drops");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      aria-label="Brand Story — Our Philosophy"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32 lg:py-40"
    >
      {/* Top subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* Atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/3 right-10 h-[450px] w-[450px] rounded-full bg-red/4 blur-[130px]" />
        <div className="absolute bottom-10 left-10 h-[350px] w-[350px] rounded-full bg-red/3 blur-[120px]" />
      </div>

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Typography & Editorial Story Column (Spans 7 columns on desktop - Asymmetric Layout opposite to Campaign) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-red" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-red-bright">
                REDLINE / OUR PHILOSOPHY
              </p>
            </div>

            {/* Main Heading in Cinzel */}
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-[0.1em] text-bone sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.08]">
              Beyond The <br className="hidden sm:inline" />
              <span className="text-bone/90">Ordinary.</span>
            </h2>

            {/* Small red accent line */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-12 bg-red" />
              <div className="h-px w-24 bg-line" />
            </div>

            {/* Supporting Headline in Outfit */}
            <p className="mt-6 font-display text-sm uppercase tracking-[0.22em] text-bone sm:text-base font-semibold leading-relaxed">
              We don&apos;t follow the crowd. We define our own direction.
            </p>

            {/* Brand Description Paragraphs */}
            <div className="mt-6 space-y-4 font-sans text-sm font-light uppercase tracking-[0.16em] text-bone/70 sm:text-base leading-relaxed">
              <p>
                REDLINE was built for those who see clothing as more than something to wear.
              </p>
              <p>
                It&apos;s an expression of identity, confidence and individuality.
              </p>
              <p>
                Inspired by underground culture and the freedom to stand apart, we create streetwear for people who refuse to blend in.
              </p>
            </div>

            {/* Distinctive Closing Statement Banner */}
            <div className="mt-8 relative overflow-hidden rounded-xs border-l-2 border-red bg-surface/60 p-5 sm:p-6 backdrop-blur-xs">
              <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
                <Compass className="size-8 text-bone" strokeWidth={1} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted">
                STATEMENT OF PURPOSE
              </p>
              <p className="mt-2 font-display text-sm sm:text-base uppercase tracking-[0.18em] text-bone font-semibold">
                WEAR YOUR IDENTITY. OWN YOUR ATTITUDE.
              </p>
            </div>

            {/* In-page CTA to Drops */}
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={handleScrollToDrops}
                className="group relative inline-flex items-center gap-3 border border-line/80 bg-surface/80 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.24em] text-bone transition-all duration-300 hover:border-red hover:bg-red/10 hover:text-bone focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="size-4 text-red transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Editorial Visual Column (Spans 5 columns on desktop) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative lg:col-span-5"
          >
            {/* Outer Brutalist Frame */}
            <div className="relative overflow-hidden rounded-xs border border-line bg-surface">
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 z-20 size-3 border-t-2 border-r-2 border-red-bright/80" />
              <div className="absolute bottom-0 left-0 z-20 size-3 border-b-2 border-l-2 border-red-bright/80" />

              {/* Editorial Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/editorial/brand-story-official-model.jpg"
                  alt="REDLINE Philosophy — Underground streetwear male model wearing oversized black gothic graphic tee in dark industrial setting"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 40vw"
                  priority={false}
                  className="object-cover object-[70%_center] transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Editorial Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent" />

                {/* Red Laser Hover Wash */}
                <div className="absolute inset-0 bg-red/10 mix-blend-color opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

                {/* Story Stamp Badge */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-xs border border-line/80 bg-background/90 px-3 py-1.5 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-red" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-bone/90">
                    PHILOSOPHY / 001
                  </span>
                </div>
              </div>
            </div>

            {/* Backdrop glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 -z-10 bg-gradient-to-br from-red/10 to-transparent blur-xl opacity-50"
            />
          </motion.div>
        </div>
      </Container>

      {/* Bottom subtle divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}

