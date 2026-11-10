"use client";

import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const isTops = category.includes("TEE") || category.includes("HOODIE") || category.includes("LONG");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-background/85 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-xl border border-line bg-surface p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-red-bright">
              Measurement Matrix
            </p>
            <h3 className="mt-1 font-display text-xl uppercase tracking-[0.12em] text-bone">
              {isTops ? "Tops & Outerwear Size Guide" : "Bottoms & Cargo Size Guide"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted hover:text-bone"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-4 text-xs font-light text-muted tracking-[0.1em]">
          All measurements are listed in inches (in) and reflect a relaxed, dropped-shoulder boxy fit. All values represent sample production specifications.
        </p>

        <div className="mt-6 overflow-x-auto">
          {isTops ? (
            <table className="w-full text-left text-xs uppercase tracking-[0.14em]">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Chest</th>
                  <th className="pb-3 font-medium">Length</th>
                  <th className="pb-3 font-medium">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40 text-bone/90 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">S</td>
                  <td className="py-2.5">44"</td>
                  <td className="py-2.5">28"</td>
                  <td className="py-2.5">22"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">M</td>
                  <td className="py-2.5">46"</td>
                  <td className="py-2.5">29"</td>
                  <td className="py-2.5">23"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">L</td>
                  <td className="py-2.5">48"</td>
                  <td className="py-2.5">30"</td>
                  <td className="py-2.5">24"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">XL</td>
                  <td className="py-2.5">50"</td>
                  <td className="py-2.5">31"</td>
                  <td className="py-2.5">25"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">XXL</td>
                  <td className="py-2.5">52"</td>
                  <td className="py-2.5">32"</td>
                  <td className="py-2.5">26"</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs uppercase tracking-[0.14em]">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="pb-3 font-medium">Waist</th>
                  <th className="pb-3 font-medium">Inseam</th>
                  <th className="pb-3 font-medium">Thigh</th>
                  <th className="pb-3 font-medium">Outseam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40 text-bone/90 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">30</td>
                  <td className="py-2.5">30"</td>
                  <td className="py-2.5">25"</td>
                  <td className="py-2.5">41"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">32</td>
                  <td className="py-2.5">31"</td>
                  <td className="py-2.5">26"</td>
                  <td className="py-2.5">42"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">34</td>
                  <td className="py-2.5">32"</td>
                  <td className="py-2.5">27"</td>
                  <td className="py-2.5">43"</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-bold text-bone">36</td>
                  <td className="py-2.5">32"</td>
                  <td className="py-2.5">28"</td>
                  <td className="py-2.5">44"</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 border-t border-line pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="border border-line bg-background/60 px-5 py-2 text-xs uppercase tracking-[0.18em] text-bone hover:border-red"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

