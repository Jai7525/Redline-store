"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cinematicEase } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onQuickView, index }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.7,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: cinematicEase,
      }}
      className="group relative flex flex-col"
    >
      {/* 3:4 Portrait Image Stage - Stable image with subtle hover zoom */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden border border-line/40 bg-surface transition-colors duration-300 group-hover:border-line"
      >
        {/* Badge (NEW / HOT / LIMITED) */}
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-bone ${
              product.badge === "NEW"
                ? "bg-red"
                : product.badge === "HOT"
                ? "bg-red-bright"
                : "border border-red/60 bg-surface/90 text-red-bright"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-background/60 text-bone backdrop-blur-md transition-all duration-200 hover:scale-110 hover:text-red-bright focus-visible:outline-none"
        >
          <Heart
            className={`size-4 transition-transform duration-200 ${
              isWishlisted ? "scale-110 fill-red text-red" : "text-bone/80"
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Product Image - Preserved single asset */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
          aria-hidden="true"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex w-full items-center justify-center gap-2 border border-bone/30 bg-background/85 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-bone backdrop-blur-md transition-all duration-200 hover:border-red hover:bg-background hover:text-red-bright focus-visible:outline-none focus-visible:border-red"
          >
            <Eye className="size-3.5" strokeWidth={1.5} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="mt-4 flex flex-col">
        <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
          {product.label}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="min-w-0 text-left focus:outline-none"
          >
            <h3 className="truncate font-display text-xs uppercase tracking-[0.1em] text-bone transition-colors group-hover:text-red-bright sm:text-sm">
              {product.name}
            </h3>
            <p className="mt-0.5 font-sans text-xs font-light tracking-[0.14em] text-bone/90 sm:text-sm">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label={`Quick View & Add ${product.name}`}
            className="flex size-9 items-center justify-center border border-line bg-surface/70 text-bone transition-all duration-200 hover:border-red hover:bg-red hover:text-bone focus-visible:outline-none"
          >
            <ShoppingBag className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
