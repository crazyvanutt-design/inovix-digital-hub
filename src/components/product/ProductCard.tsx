import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatBRL, installments } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-3.5 w-3.5", i < Math.round(value) ? "fill-warning text-warning" : "text-border")}
          />
        ))}
      </div>
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();

  const addToCart = () => {
    add(product.id, 1, product.colors[0]);
    toast.success("Adicionado ao carrinho", {
      description: product.name,
      action: { label: "Ver carrinho", onClick: () => setOpen(true) },
    });
  };

  return (
    <div className="group card-lift flex flex-col overflow-hidden rounded-2xl border bg-card">
      <Link
        to="/loja/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-navy px-2.5 py-1 text-[11px] font-bold text-navy-foreground">
            {product.badge}
          </span>
        )}
        {product.brand === "3D CÊNTRICO" && (
          <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-turquoise-strong backdrop-blur">
            3D Cêntrico
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <Rating value={product.rating} reviews={product.reviews} />
          <button
            onClick={() => toast("Adicionado aos favoritos (demonstração)")}
            aria-label="Favoritar"
            className="text-muted-foreground transition hover:text-destructive"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <Link
          to="/loja/$slug"
          params={{ slug: product.slug }}
          className="mt-2 line-clamp-2 min-h-[2.75rem] font-display text-[15px] font-semibold leading-snug text-navy hover:text-turquoise-strong"
        >
          {product.name}
        </Link>
        <div className="mt-3">
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatBRL(product.oldPrice)}</span>
          )}
          <div className="font-display text-xl font-bold text-navy">{formatBRL(product.price)}</div>
          <div className="text-xs text-muted-foreground">{installments(product.price)}</div>
        </div>
        <button
          onClick={addToCart}
          className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl bg-turquoise-soft text-sm font-semibold text-navy transition hover:bg-navy hover:text-navy-foreground"
        >
          <ShoppingCart className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  );
}
