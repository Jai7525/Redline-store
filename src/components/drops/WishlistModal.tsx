"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DROPS_PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/Button";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlist, toggleWishlist, addToCart, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  const wishlistedProducts = DROPS_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-line bg-surface p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex items-center gap-2">
              <Heart className="size-5 fill-red text-red" strokeWidth={1.5} />
              <h2 className="font-display text-lg uppercase tracking-[0.2em] text-bone">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-2 text-muted hover:text-bone"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* List */}
          <div className="mt-6 max-h-[60vh] space-y-5 overflow-y-auto pr-1">
            {wishlistedProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">
                  No saved items.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-bone/50">
                  Click the heart icon on any piece to save it for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div key={p.id} className="flex gap-4 border-b border-line/40 pb-5">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-background border border-line">
                    <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-xs uppercase tracking-[0.12em] text-bone">
                          {p.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          aria-label="Remove item"
                          className="text-muted hover:text-red-bright"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="mt-1 font-sans text-xs font-light text-bone/90">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-3 w-full text-[10px] tracking-[0.2em]"
                      onClick={() => {
                        addToCart(p, p.sizes[0], p.colors?.[0], 1);
                        onClose();
                        setIsCartOpen(true);
                      }}
                    >
                      <span>Move to Bag</span>
                      <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

