"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "framer-motion";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { FeaturedCollection } from "@/components/collection/FeaturedCollection";
import { CategoryShowcase } from "@/components/collection/CategoryShowcase";
import { BrandCampaign } from "@/components/editorial/BrandCampaign";
import { BrandStory } from "@/components/editorial/BrandStory";
import { NewsletterSection } from "@/components/editorial/NewsletterSection";
import { Footer } from "@/components/editorial/Footer";

// Dynamically load modals and drawers to keep initial mobile bundle ultra-light
const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false }
);
const AddedToBagToast = dynamic(
  () => import("@/components/cart/AddedToBagToast").then((mod) => mod.AddedToBagToast),
  { ssr: false }
);
const WishlistModal = dynamic(
  () => import("@/components/drops/WishlistModal").then((mod) => mod.WishlistModal),
  { ssr: false }
);

export default function Home() {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Subtle top scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="min-h-screen bg-background text-bone antialiased selection:bg-red selection:text-bone">
      {/* Subtle Crimson Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-red via-red-bright to-red"
      />

      {/* SECTION 1 & 2: Cinematic Dual-Phase Hero with Sticky Top Navigation */}
      <CinematicHero onOpenWishlist={() => setIsWishlistOpen(true)} />

      {/* SECTION 3: The First Drop (Featured Collection with Quick View & Bag Pulse) */}
      <FeaturedCollection
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* SECTION 4: Shop By Category (Choose Your Uniform — 3 Editorial Panels) */}
      <CategoryShowcase onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* SECTION 5: Brand Campaign / Editorial (Not Made To Fit In) */}
      <BrandCampaign />

      {/* SECTION 6: Brand Story (Beyond The Ordinary / Our Philosophy) */}
      <BrandStory />

      {/* SECTION 7: Newsletter (Get On The List / Stay Connected) */}
      <NewsletterSection />

      {/* SECTION 8: Final Footer */}
      <Footer onSelectCategory={(cat) => setActiveCategory(cat)} />

      {/* Global Interactive Drawers & Modals (Single-Page Landing Website) */}
      <CartDrawer />
      <AddedToBagToast />
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </main>
  );
}
