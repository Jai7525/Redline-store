import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "border border-transparent bg-red text-bone hover:bg-red-bright",
  secondary:
    "border border-bone/40 bg-transparent text-bone hover:border-red",
  ghost: "border border-transparent bg-transparent text-bone hover:text-red-bright",
} as const;

const sizes = {
  md: "h-12 px-8 text-[13px] tracking-[0.18em]",
  sm: "h-10 px-6 text-[12px] tracking-[0.16em]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 font-medium uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions;

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}
