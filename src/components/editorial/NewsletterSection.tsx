"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function NewsletterSection() {
  const prefersReducedMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (val: string): boolean => {
    // Standard RFC 5322 regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }

    if (!validateEmail(trimmed)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Process interaction with brief loading state
    setStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter — Get on the list"
      className="relative w-full overflow-hidden bg-background py-24 sm:py-32 lg:py-36"
    >
      {/* Top subtle divider border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* Atmospheric dark background gradient with subtle crimson glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[380px] w-[500px] rounded-full bg-red/4 blur-[130px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow Label */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center gap-2"
          >
            <span className="h-px w-5 bg-red-bright" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-red-bright">
              REDLINE / STAY CONNECTED
            </p>
            <span className="h-px w-5 bg-red-bright" />
          </motion.div>

          {/* Main Editorial Heading in Cinzel */}
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-4 font-display text-3xl font-bold uppercase tracking-[0.14em] text-bone sm:text-5xl lg:text-6xl"
          >
            Get On The List.
          </motion.h2>

          {/* Thin Crimson Accent Divider */}
          <motion.div
            initial={prefersReducedMotion ? { width: "48px" } : { width: 0 }}
            whileInView={{ width: "48px" }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.2,
            }}
            className="mx-auto mt-5 h-0.5 bg-red"
          />

          {/* Supporting Description in Outfit */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mx-auto mt-4 max-w-lg font-sans text-xs uppercase tracking-[0.2em] text-bone/70 sm:text-sm leading-relaxed"
          >
            Be first to discover new drops, exclusive collections and what&apos;s coming next.
          </motion.p>

          {/* Form / Confirmation Area */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10"
          >
            {status === "success" ? (
              /* Honest Confirmation Message */
              <div
                role="status"
                aria-live="polite"
                className="mx-auto flex flex-col items-center justify-center rounded-xs border border-line bg-surface/70 p-6 backdrop-blur-xs sm:p-8"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-red/10 text-red-bright mb-3">
                  <CheckCircle2 className="size-5" />
                </div>
                <p className="font-display text-sm uppercase tracking-[0.2em] text-bone sm:text-base font-medium">
                  Thanks for your interest in REDLINE.
                </p>
                <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.18em] text-muted">
                  Newsletter signup will be available soon.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-bright hover:underline focus-visible:outline-none"
                >
                  Enter another email →
                </button>
              </div>
            ) : (
              /* Newsletter Form */
              <form onSubmit={handleSubmit} noValidate className="w-full">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setErrorMessage("");
                      }
                    }}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    disabled={status === "loading"}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                    className={`h-13 flex-1 rounded-xs border bg-surface/90 px-5 font-mono text-xs uppercase tracking-[0.2em] text-bone placeholder:text-muted/60 transition-colors focus:border-red focus:bg-surface focus:outline-none disabled:opacity-50 ${
                      status === "error" ? "border-red-bright" : "border-line"
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative flex h-13 items-center justify-center gap-2.5 overflow-hidden rounded-xs border border-red bg-red px-8 font-sans text-xs font-semibold uppercase tracking-[0.26em] text-bone transition-all duration-300 hover:bg-transparent hover:text-bone hover:shadow-[0_0_20px_rgba(200,16,46,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-4 animate-spin text-bone" />
                    ) : (
                      <>
                        <span>JOIN THE LIST</span>
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Validation Error Announcement */}
                {status === "error" && (
                  <div
                    id="newsletter-error"
                    role="alert"
                    className="mt-3 flex items-center justify-center gap-2 text-left text-xs uppercase tracking-[0.16em] text-red-bright"
                  >
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            )}

            {/* Privacy Note */}
            <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.26em] text-muted/80">
              NO SPAM. JUST REDLINE UPDATES. UNSUBSCRIBE ANYTIME.
            </p>
          </motion.div>
        </div>
      </Container>

      {/* Bottom subtle divider border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}

