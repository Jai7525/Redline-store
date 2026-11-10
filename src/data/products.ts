export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  label: string;
  badge?: "NEW" | "HOT" | "LIMITED";
  image: string;
  description: string;
  sizes: string[];
  colors?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "drop-001-tee",
    name: "Oversized Graphic Tee",
    price: 1499,
    currency: "INR",
    category: "TEES",
    label: "DROP 001 / TEES",
    badge: "NEW",
    image: "/images/products/redline-oversized-graphic-tee.jpg",
    description:
      "Heavyweight 280 GSM luxury combed cotton with signature distressed gothic calligraphy, dropped shoulders and wide boxy fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Deep Black", "Vintage Charcoal"],
  },
  {
    id: "drop-001-hoodie",
    name: "Signature Hoodie",
    price: 2499,
    currency: "INR",
    category: "HOODIES",
    label: "DROP 001 / HOODIES",
    badge: "NEW",
    image: "/images/products/redline-signature-hoodie.jpg",
    description:
      "500 GSM dense French Terry knit with double-layered structured hood, crimson laser chest embroidery, and custom matte black hardware.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Deep Black"],
  },
  {
    id: "drop-001-cargo",
    name: "Utility Cargo",
    price: 1999,
    currency: "INR",
    category: "CARGO",
    label: "DROP 001 / BOTTOMS",
    badge: "HOT",
    image: "/images/products/redline-utility-cargo.jpg",
    description:
      "Industrial tactical trousers engineered from heavy-duty ripstop cotton with modular dual-entry cargo pockets, reinforced knee panels and cinchable hems.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Washed Black", "Dark Charcoal"],
  },
  {
    id: "drop-001-longsleeve",
    name: "Graphic Long Sleeve",
    price: 1799,
    currency: "INR",
    category: "LONG SLEEVES",
    label: "DROP 001 / LONG SLEEVES",
    badge: "LIMITED",
    image: "/images/products/redline-graphic-long-sleeve.jpg",
    description:
      "Enzyme-washed relaxed long sleeve tee featuring intricate gothic arm sleeve prints, front chest calligraphy, and heavy ribbed cuffs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Deep Black"],
  },
];

export const DROPS_PRODUCTS = PRODUCTS;
export const FEATURED_PRODUCTS = PRODUCTS;
