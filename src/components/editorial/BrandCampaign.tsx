"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function BrandCampaign() {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToStory = () => {
    // Smooth scroll to brand story section if it exists, or drops as fallback
    const target = document.getElementById("about") || document.getElementById("drops");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="lookbook"
      aria-label="Brand Campaign / Lookbook — The Attitude"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32 lg:py-40"
    >
      {/* Top subtle border divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* Atmospheric dark background gradient with subtle crimson glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-red/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-red/3 blur-[140px]" />
      </div>

      <Container>
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Visual Editorial Image Column (Spans 7 columns on desktop) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative order-2 lg:order-1 lg:col-span-7"
          >
            {/* Outer decorative brutalist frame & crimson corner accents */}
            <div className="relative overflow-hidden rounded-xs border border-line bg-surface">
              {/* Top-left corner accent */}
              <div className="absolute top-0 left-0 z-20 size-3 border-t-2 border-l-2 border-red-bright/80" />
              {/* Bottom-right corner accent */}
              <div className="absolute bottom-0 right-0 z-20 size-3 border-b-2 border-r-2 border-red-bright/80" />

              {/* Main Campaign Editorial Photography */}
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-surface">
                <Image
                  src="/images/editorial/brand-campaign-model-official.jpg"
                  alt="REDLINE Campaign — Male streetwear model in oversized black gothic streetwear"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 58vw"
                  priority={false}
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Editorial Vignette & Shadow Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80 lg:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-transparent hidden lg:block" />

                {/* Subtle Crimson Laser Wash on Hover */}
                <div className="absolute inset-0 bg-red/10 mix-blend-color opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

                {/* Corner Coordinates */}
                <div className="absolute top-4 right-4 z-10 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-muted sm:block">
                  28.6139° N / 77.2090° E
                </div>
              </div>
            </div>

            {/* Subtle editorial backdrop shadow element */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 -z-10 bg-gradient-to-tr from-red/15 to-transparent blur-xl opacity-60 transition-opacity duration-700 group-hover:opacity-90"
            />
          </motion.div>

          {/* Editorial Typography & Copy Column (Spans 5 columns on desktop) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-5 lg:pl-6 xl:pl-10"
          >
            {/* Small Eyebrow with crimson pulse */}
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-red-bright" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-red-bright">
                REDLINE / THE ATTITUDE
              </p>
            </div>

            {/* Main Headline in Cinzel */}
            <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-[0.08em] text-bone sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.08]">
              Not Made <br />
              <span className="text-bone/90">To Fit In.</span>
            </h2>

            {/* Blood-red horizontal divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-12 bg-red" />
              <div className="h-px flex-1 bg-line" />
            </div>

            {/* Supporting Text in Outfit */}
            <p className="mt-6 max-w-lg font-sans text-sm font-light uppercase tracking-[0.18em] text-bone/70 sm:text-base leading-relaxed">
              For those who refuse to follow the ordinary. Built with attitude. Worn without permission.
            </p>

            {/* Campaign Statement / Attitude Card */}
            <div className="mt-8 rounded-xs border border-line/60 bg-surface/50 p-4 backdrop-blur-xs sm:p-5">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-muted">
                CAMPAIGN CODE:
              </p>
              <p className="mt-1 font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-bone font-medium">
                NO RULES. NO LIMITS. JUST REDLINE.
              </p>
            </div>

            {/* Interactive Call-to-Action */}
            <div className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={handleScrollToStory}
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-red bg-red px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.26em] text-bone transition-all duration-300 hover:bg-transparent hover:text-bone hover:shadow-[0_0_24px_rgba(200,16,46,0.35)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red"
              >
                {/* Subtle button glare shine effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                
                <span className="relative z-10">DISCOVER THE REDLINE ATTITUDE</span>
                <ArrowRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom subtle edge divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}

