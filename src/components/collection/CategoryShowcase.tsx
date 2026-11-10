"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cinematicEase } from "@/lib/motion";

interface CategoryShowcaseProps {
  onSelectCategory?: (category: string) => void;
}

const CATEGORIES = [
  {
    id: "tees",
    categoryKey: "TEES",
    label: "CATEGORY 01",
    title: "THE GRAPHIC SERIES.",
    description: "Bold graphics. Oversized silhouettes. No compromises.",
    cta: "EXPLORE TEES",
    image: "/images/products/redline-oversized-graphic-tee.jpg",
  },
  {
    id: "hoodies",
    categoryKey: "HOODIES",
    label: "CATEGORY 02",
    title: "BUILT FOR THE DARK.",
    description: "Heavy silhouettes. Dark essentials. Everyday rebellion.",
    cta: "EXPLORE HOODIES",
    image: "/images/products/redline-signature-hoodie.jpg",
  },
  {
    id: "oversized",
    categoryKey: "ALL",
    label: "CATEGORY 03",
    title: "NEVER BLEND IN.",
    description: "Made to stand apart. Designed beyond the ordinary.",
    cta: "EXPLORE OVERSIZED",
    image: "/images/products/redline-oversized-collection-model.jpg",
  },
] as const;

export function CategoryShowcase({ onSelectCategory }: CategoryShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleCategoryClick = (categoryKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryKey);
    }
    const target = document.getElementById("drops");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="collections" className="relative w-full bg-background py-24 sm:py-32">
      {/* Subtle top divider line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <Container>
        {/* SECTION INTRODUCTION */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: cinematicEase }}
          className="flex flex-col items-start max-w-3xl"
        >
          {/* Small Eyebrow with crimson dot */}
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-red-bright animate-pulse" />
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-red-bright">
              REDLINE / EXPLORE
            </p>
          </div>

          {/* Main Editorial Heading in Cinzel */}
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.12em] text-bone sm:text-5xl lg:text-6xl">
            Choose Your Uniform.
          </h2>

          {/* Supporting Text in Outfit */}
          <p className="mt-3 text-xs uppercase tracking-[0.26em] text-muted sm:text-sm">
            Three Expressions. One Attitude.
          </p>

          {/* Subtle Blood-Red Accent Line */}
          <div className="mt-6 flex items-center gap-3 w-48">
            <div className="h-px flex-1 bg-gradient-to-r from-red to-transparent" />
          </div>
        </motion.div>

        {/* THREE CATEGORY SHOWCASE PANELS (3-Column Editorial Composition) */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <motion.article
              key={cat.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                delay: prefersReducedMotion ? 0 : idx * 0.12,
                ease: cinematicEase,
              }}
              onClick={() => handleCategoryClick(cat.categoryKey)}
              className="group relative flex flex-col justify-end overflow-hidden border border-line/40 bg-surface min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] cursor-pointer transition-all duration-500 hover:border-red/60"
            >
              {/* Background Editorial Image */}
              <div className="absolute inset-0 size-full overflow-hidden bg-background">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={idx === 0}
                  className="object-cover object-center filter contrast-105 brightness-95 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-100"
                />

                {/* Multistage Dark Luxury Gradients for Maximum Legibility */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-radial-at-c from-transparent via-background/30 to-background/70 opacity-60"
                  aria-hidden="true"
                />

                {/* Subtle Crimson Ambient Accent on Hover */}
                <div
                  className="pointer-events-none absolute inset-0 bg-red/10 opacity-0 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              {/* Panel Top Tag */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-bone/60 group-hover:text-red-bright transition-colors">
                  {cat.label}
                </span>
              </div>

              {/* Panel Content (Bottom Positioned) */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col">
                <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-bone transition-colors group-hover:text-red-bright sm:text-3xl">
                  {cat.title}
                </h3>

                <p className="mt-3 text-xs font-light leading-relaxed tracking-[0.06em] text-bone/80 sm:text-sm">
                  {cat.description}
                </p>

                {/* Interactive CTA */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="relative text-xs uppercase tracking-[0.24em] text-bone group-hover:text-red-bright transition-colors">
                    {cat.cta}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-red transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight
                    className="size-4 text-bone transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-red-bright"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

