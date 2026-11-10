"use client";

import { useCart } from "@/context/CartContext";
import { Check, X } from "lucide-react";

export function AddedToBagToast() {
  const { addedBanner, dismissBanner, setIsCartOpen } = useCart();

  if (!addedBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 border border-line bg-surface/95 px-5 py-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex size-7 items-center justify-center rounded-full bg-red text-bone">
        <Check className="size-4" strokeWidth={2} />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-bone">
          Added To Your Bag
        </p>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
          {addedBanner.productName} — Size: {addedBanner.size}
        </p>
      </div>

      <div className="ml-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            dismissBanner();
            setIsCartOpen(true);
          }}
          className="border border-red bg-red px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-bone hover:bg-red-bright"
        >
          View Bag
        </button>

        <button
          type="button"
          onClick={dismissBanner}
          className="p-1 text-muted hover:text-bone"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

