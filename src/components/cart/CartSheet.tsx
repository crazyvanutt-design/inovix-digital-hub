import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_FROM, useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/format";

export function QuantityControl({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex h-9 items-center rounded-lg border bg-background">
      <button onClick={() => onChange(value - 1)} className="flex h-full w-8 items-center justify-center text-muted-foreground hover:text-navy" aria-label="Diminuir">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-semibold">{value}</span>
      <button onClick={() => onChange(value + 1)} className="flex h-full w-8 items-center justify-center text-muted-foreground hover:text-navy" aria-label="Aumentar">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);
  return (
    <div className="rounded-xl bg-turquoise-soft p-3">
      <p className="flex items-center gap-2 text-xs font-medium text-navy">
        <Truck className="h-4 w-4 text-turquoise-strong" />
        {missing > 0 ? (
          <>Faltam <strong>{formatBRL(missing)}</strong> para frete grátis</>
        ) : (
          <strong>Parabéns! Você ganhou frete grátis</strong>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
        <div className="h-full rounded-full bg-accent-gradient transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function CartSheet() {
  const { open, setOpen, lines, subtotal, count, setQuantity, remove } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <div className="border-b p-5">
          <SheetTitle className="font-display text-lg text-navy">Seu carrinho ({count})</SheetTitle>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-turquoise-soft text-turquoise-strong">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display font-semibold text-navy">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-muted-foreground">Explore a loja e encontre algo especial.</p>
            </div>
            <Button variant="navy" asChild onClick={() => setOpen(false)}>
              <Link to="/loja">Ir para a loja</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="p-5 pb-0">
              <FreeShippingBar subtotal={subtotal} />
            </div>
            <ul className="flex-1 space-y-4 overflow-y-auto p-5">
              {lines.map((line) => (
                <li key={line.productId} className="flex gap-3">
                  <img src={line.product.image} alt="" className="h-20 w-20 rounded-xl border object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-2 text-sm font-semibold text-navy">{line.product.name}</p>
                    {line.color && <p className="text-xs text-muted-foreground">{line.color}</p>}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityControl value={line.quantity} onChange={(v) => setQuantity(line.productId, v)} />
                      <span className="font-display font-bold text-navy">{formatBRL(line.total)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(line.productId)} className="self-start text-muted-foreground hover:text-destructive" aria-label="Remover">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold text-navy">{formatBRL(subtotal)}</span>
              </div>
              <Button variant="hero" size="lg" className="w-full" asChild onClick={() => setOpen(false)}>
                <Link to="/carrinho">Finalizar compra</Link>
              </Button>
              <button onClick={() => setOpen(false)} className="w-full text-center text-sm font-medium text-muted-foreground hover:text-navy">
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
