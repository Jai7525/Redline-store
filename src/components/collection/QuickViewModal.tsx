"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ArrowRight, Heart, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { SizeGuideModal } from "./SizeGuideModal";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, isInWishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      setSelectedSize(""); // STRICT: No size selected by default
      setSelectedColor(product.colors?.[0] || "");
      setQuantity(1);
      setErrorMsg(false);
      setIsAdding(false);
      setIsFullScreen(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isFullScreen) {
            setIsFullScreen(false);
          } else {
            onClose();
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [product, onClose, isFullScreen]);

  if (!product) return null;

  const currentImage = product.image || "/images/products/redline-oversized-graphic-tee.jpg";

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg(true);
      return;
    }
    setErrorMsg(false);
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      onClose();
    }, 350);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      >
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Modal Dialog Box */}
        <div className="relative z-10 flex max-h-[88dvh] w-full max-w-4xl flex-col overflow-y-auto border border-line bg-surface p-5 sm:p-7 md:max-h-[85vh] md:p-10 shadow-2xl backdrop-blur-2xl scrollbar-thin scrollbar-thumb-line/50">
          {/* Top Right Actions: Wishlist + Close */}
          <div className="sticky top-0 z-30 -mr-2 -mt-2 mb-2 flex items-center justify-end gap-2 self-end rounded-full bg-surface/80 p-1.5 backdrop-blur-md md:absolute md:right-5 md:top-5 md:m-0">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist toggle"
              className="p-1.5 text-muted transition-colors hover:text-red-bright"
            >
              <Heart
                className={`size-5 transition-transform hover:scale-110 ${
                  isWishlisted ? "fill-red text-red" : ""
                }`}
                strokeWidth={1.5}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 text-muted transition-colors hover:text-bone focus-visible:outline-none"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10">
            {/* Left: Product Image Stage */}
            <div className="flex flex-col gap-3">
              <div className="group relative aspect-square w-full max-h-[38vh] overflow-hidden border border-line/40 bg-background sm:max-h-[44vh] md:aspect-[3/4] md:max-h-none">
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover object-center transition-all duration-300"
                  />
                )}
                {product.badge && (
                  <span className="absolute left-3 top-3 bg-red px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-bone">
                    {product.badge}
                  </span>
                )}

                {/* Full-screen viewer trigger button */}
                <button
                  type="button"
                  onClick={() => setIsFullScreen(true)}
                  aria-label="View full screen image"
                  className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-background/70 text-bone opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-red-bright"
                >
                  <Maximize2 className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Right: Product Detail Column */}
            <div className="flex flex-col justify-between py-1">
              <div>
                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-red-bright">
                  {product.label}
                </p>

                <h2
                  id="quick-view-title"
                  className="mt-1.5 font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.1em] text-bone lg:text-4xl"
                >
                  {product.name}
                </h2>

                <p className="mt-1.5 font-sans text-base sm:text-lg font-light tracking-[0.12em] text-bone md:text-xl">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <div className="my-3 sm:my-5 h-px w-full bg-line/60" />

                <p className="text-xs font-light leading-relaxed tracking-[0.04em] text-bone/80 sm:text-sm">
                  {product.description}
                </p>

                {/* Color Selector if available */}
                {product.colors && product.colors.length > 1 && (
                  <div className="mt-4 sm:mt-5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                      Colour: <span className="text-bone">{selectedColor}</span>
                    </p>
                    <div className="mt-2 flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`border px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                            selectedColor === c
                              ? "border-red bg-surface text-bone"
                              : "border-line text-muted hover:border-bone hover:text-bone"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mt-4 sm:mt-6">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
                    <span className="flex items-center gap-2">
                      <span>Select Size</span>
                      {errorMsg && (
                        <span className="text-red-bright font-medium animate-pulse">
                          — Please select a size
                        </span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-[10px] uppercase tracking-[0.2em] text-bone/70 underline underline-offset-4 hover:text-red-bright"
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setErrorMsg(false);
                        }}
                        className={`h-9 min-w-12 border px-3 text-xs font-medium uppercase tracking-[0.16em] transition-all ${
                          selectedSize === size
                            ? "border-red bg-red text-bone shadow-[0_0_12px_rgba(200,16,46,0.5)]"
                            : "border-line bg-background/50 text-muted hover:border-bone/60 hover:text-bone"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4 sm:mt-5 flex items-center gap-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    Quantity
                  </span>
                  <div className="flex items-center border border-line bg-background">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-xs text-muted hover:text-bone"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-mono text-bone">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-xs text-muted hover:text-bone"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 sm:mt-8 flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full tracking-[0.24em] transition-all hover:shadow-[0_0_20px_rgba(200,16,46,0.6)]"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  <span>{isAdding ? "Adding..." : "Add to Bag"}</span>
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Image Viewer Modal */}
      {isFullScreen && currentImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen image view"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 p-4 backdrop-blur-2xl"
        >
          <button
            type="button"
            onClick={() => setIsFullScreen(false)}
            aria-label="Close full-screen image view"
            className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full border border-line bg-surface text-bone transition-colors hover:border-red hover:text-red-bright"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
          <div className="relative aspect-[3/4] h-[85vh] max-w-full overflow-hidden">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="85vh"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />
    </>
  );
}
