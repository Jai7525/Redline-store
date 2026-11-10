"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "./ProductCard";
import { QuickViewModal } from "./QuickViewModal";
import { PRODUCTS, type Product } from "@/data/products";
import { cinematicEase } from "@/lib/motion";

interface FeaturedCollectionProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const FILTER_TABS = [
  "ALL",
  "TEES",
  "HOODIES",
  "CARGO",
  "LONG SLEEVES",
] as const;

export function FeaturedCollection({
  activeCategory = "ALL",
  onCategoryChange,
}: FeaturedCollectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "ALL"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="drops" className="relative w-full bg-background py-24 sm:py-32">
      {/* Subtle top edge separation border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <Container>
        {/* Section Introduction */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: cinematicEase }}
          className="flex flex-col md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            {/* Small Eyebrow with crimson dot */}
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-red-bright animate-pulse" />
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                THE FIRST DROP / DROP 001
              </p>
            </div>

            {/* Main Editorial Heading in Cinzel */}
            <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.12em] text-bone sm:text-5xl lg:text-6xl">
              The First Drop.
            </h2>

            {/* Supporting Text in Outfit */}
            <p className="mt-3 text-sm font-light uppercase tracking-[0.2em] text-bone/70 sm:text-base">
              A new uniform for those who refuse to blend in.
            </p>
          </div>

          {/* In-page Category Filters */}
          <div className="mt-8 md:mt-0 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const isActive = activeCategory === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => onCategoryChange?.(tab)}
                  className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    isActive
                      ? "border border-red bg-surface text-bone shadow-[0_0_10px_rgba(200,16,46,0.35)]"
                      : "border border-transparent text-muted hover:border-line hover:text-bone"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 4-Column Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">
              No products found in this category.
            </p>
            <button
              type="button"
              onClick={() => onCategoryChange?.("ALL")}
              className="mt-4 border-b border-red text-xs uppercase tracking-[0.2em] text-bone hover:text-red-bright"
            >
              Reset to All
            </button>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </Container>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
