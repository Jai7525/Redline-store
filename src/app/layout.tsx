import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://redline-streetwear.com"),
  title: {
    default: "REDLINE | Premium Gothic Streetwear",
    template: "%s | REDLINE",
  },
  description:
    "Discover REDLINE streetwear. Explore oversized graphic tees, hoodies and collections built for those who refuse to follow the ordinary.",
  keywords: [
    "REDLINE",
    "gothic streetwear",
    "luxury streetwear",
    "oversized graphic tee",
    "hoodies",
    "underground fashion",
    "men's streetwear",
  ],
  authors: [{ name: "REDLINE Streetwear" }],
  creator: "REDLINE",
  publisher: "REDLINE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "REDLINE | Premium Gothic Streetwear",
    description:
      "Discover REDLINE streetwear. Explore oversized graphic tees, hoodies and collections built for those who refuse to follow the ordinary.",
    url: "https://redline-streetwear.com",
    siteName: "REDLINE",
    images: [
      {
        url: "/images/editorial/brand-campaign-model-official.jpg",
        width: 1200,
        height: 630,
        alt: "REDLINE — Not Made To Fit In",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDLINE | Premium Gothic Streetwear",
    description:
      "Discover REDLINE streetwear. Explore oversized graphic tees, hoodies and collections built for those who refuse to follow the ordinary.",
    images: ["/images/editorial/brand-campaign-model-official.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://redline-streetwear.com/#organization",
      name: "REDLINE",
      url: "https://redline-streetwear.com",
      logo: "https://redline-streetwear.com/images/logo/redline-logo.png",
      slogan: "NOT MADE TO FIT IN.",
      description: "REDLINE is a luxury gothic streetwear fashion brand.",
    },
    {
      "@type": "WebSite",
      "@id": "https://redline-streetwear.com/#website",
      url: "https://redline-streetwear.com",
      name: "REDLINE",
      description:
        "Discover REDLINE streetwear. Explore oversized graphic tees, hoodies and collections built for those who refuse to follow the ordinary.",
      publisher: {
        "@id": "https://redline-streetwear.com/#organization",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${outfit.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background font-sans text-bone"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
