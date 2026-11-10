"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color?: string) => void;
  updateQuantity: (productId: string, size: string, color: string | undefined, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartPulse: boolean;
  addedBanner: {
    productName: string;
    size: string;
  } | null;
  dismissBanner: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "redline_cart_items_v3";
const WISHLIST_STORAGE_KEY = "redline_wishlist_items_v3";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [addedBanner, setAddedBanner] = useState<{
    productName: string;
    size: string;
  } | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setItems(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const addToCart = useCallback(
    (product: Product, size: string, color?: string, quantity = 1) => {
      setItems((prev) => {
        const itemColor = color || product.colors?.[0] || "";
        const existingIdx = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.size === size &&
            (item.color || "") === itemColor
        );
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += quantity;
          return updated;
        }
        return [...prev, { product, size, color: itemColor, quantity }];
      });

      // Trigger Crimson Radar Pulse & Bag glow effect
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 1200);

      // Show confirmation toast
      setAddedBanner({ productName: product.name, size });
      setTimeout(() => setAddedBanner(null), 4000);
    },
    []
  );

  const removeFromCart = useCallback((productId: string, size: string, color?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            (item.color || "") === (color || "")
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId &&
          item.size === size &&
          (item.color || "") === (color || "")
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const dismissBanner = useCallback(() => {
    setAddedBanner(null);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        cartPulse,
        addedBanner,
        dismissBanner,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
