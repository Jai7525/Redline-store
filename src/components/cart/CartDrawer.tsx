"use client";

import Image from "next/image";
import { X, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-line bg-surface p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-red-bright" strokeWidth={1.5} />
              <h2 className="font-display text-lg uppercase tracking-[0.2em] text-bone">
                Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close bag"
              className="p-2 text-muted transition-colors hover:text-bone focus-visible:outline-none"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Item List */}
          <div className="mt-6 max-h-[55vh] space-y-6 overflow-y-auto pr-1">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">
                  Your bag is currently empty.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-bone/50">
                  Select a size from DROP 001 to begin.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 border-b border-line/40 pb-5"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-background border border-line">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-xs uppercase tracking-[0.12em] text-bone">
                          {item.product.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-[10px] uppercase tracking-[0.2em] text-muted hover:text-red-bright"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                        Size: <span className="text-bone">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-line bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="p-1.5 text-muted hover:text-bone"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="px-2 text-xs font-mono text-bone">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="p-1.5 text-muted hover:text-bone"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <span className="font-sans text-xs font-light text-bone">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="border-t border-line pt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Subtotal</span>
              <span className="font-display text-lg text-bone">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
              Taxes & standard insured shipping included.
            </p>

            <Button
              variant="primary"
              size="md"
              className="mt-6 w-full tracking-[0.22em]"
              onClick={() => {
                alert("This is a frontend demonstration. No payment processing.");
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

