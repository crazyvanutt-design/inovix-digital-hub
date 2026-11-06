// Demo cart kept in the browser. When payments/backend arrive, replace the
// persistence (localStorage) with a server-side cart; the hook API can stay.
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductById } from "@/services/catalog";
import type { CartItem, Product } from "@/data/types";

const STORAGE_KEY = "inovix-demo-cart";
export const FREE_SHIPPING_FROM = 199; // demonstrative
export const DEMO_SHIPPING = 19.9; // demonstrative

export interface CartLine extends CartItem {
  product: Product;
  total: number;
}

export function computeTotals(items: CartItem[]) {
  const lines: CartLine[] = items.flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ ...item, product, total: product.price * item.quantity }] : [];
  });
  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : DEMO_SHIPPING;
  return { lines, subtotal, count, shipping, total: subtotal + shipping };
}

interface CartContextValue extends ReturnType<typeof computeTotals> {
  add: (productId: string, quantity?: number, color?: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupted demo data */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const totals = computeTotals(items);
    return {
      ...totals,
      open,
      setOpen,
      add: (productId, quantity = 1, color) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity + quantity, color: color ?? i.color } : i,
            );
          }
          return [...prev, { productId, quantity, color }];
        }),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        ),
      remove: (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
