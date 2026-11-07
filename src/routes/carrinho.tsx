import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock, QrCode, CreditCard, Barcode, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FreeShippingBar, QuantityControl } from "@/components/cart/CartSheet";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — INOVIX" },
      { name: "description", content: "Revise os itens do seu carrinho e finalize sua compra na INOVIX." },
      { property: "og:title", content: "Carrinho — INOVIX" },
      { property: "og:description", content: "Revise os itens do seu carrinho na INOVIX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Carrinho,
});

const payments = [
  { id: "pix", label: "Pix", icon: QrCode, note: "5% de desconto" },
  { id: "cartao", label: "Cartão", icon: CreditCard, note: "Até 10x sem juros" },
  { id: "boleto", label: "Boleto", icon: Barcode, note: "Vence em 3 dias" },
] as const;

function Carrinho() {
  const { lines, subtotal, shipping, total, setQuantity, remove, clear } = useCart();
  const [pay, setPay] = useState<(typeof payments)[number]["id"]>("pix");
  const [coupon, setCoupon] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const discount = pay === "pix" ? subtotal * 0.05 : 0;

  if (done) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-turquoise-soft text-turquoise-strong">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-3xl font-bold text-navy">Pedido de demonstração concluído!</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Pedido {done}. Nenhum pagamento foi realizado — esta é apenas uma simulação do fluxo de compra.
        </p>
        <div className="mt-8 flex gap-3">
          <Button variant="navy" asChild><Link to="/conta">Ver minha conta</Link></Button>
          <Button variant="outline" asChild className="text-navy"><Link to="/loja">Continuar comprando</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <p className="text-xs text-muted-foreground"><Link to="/" className="hover:text-navy">Início</Link> / <span className="text-navy">Carrinho</span></p>
      <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">Seu carrinho</h1>

      {lines.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed p-16 text-center">
          <ShoppingBag className="h-12 w-12 text-turquoise-strong" />
          <p className="mt-4 font-display text-xl font-bold text-navy">Seu carrinho está vazio</p>
          <p className="mt-1 text-sm text-muted-foreground">Que tal conhecer os produtos da nossa vitrine?</p>
          <Button variant="hero" size="lg" className="mt-6" asChild><Link to="/loja">Explorar a loja</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <FreeShippingBar subtotal={subtotal} />
            <ul className="divide-y rounded-2xl border bg-card">
              {lines.map((l) => (
                <li key={l.productId} className="flex gap-4 p-4 sm:p-5">
                  <Link to="/loja/$slug" params={{ slug: l.product.slug }} className="shrink-0">
                    <img src={l.product.image} alt={l.product.name} className="h-24 w-24 rounded-xl border object-cover sm:h-28 sm:w-28" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link to="/loja/$slug" params={{ slug: l.product.slug }} className="font-display font-semibold text-navy hover:text-turquoise-strong">{l.product.name}</Link>
                        {l.color && <p className="text-xs text-muted-foreground">Opção: {l.color}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">Produção: {l.product.leadTime}</p>
                      </div>
                      <button onClick={() => remove(l.productId)} className="self-start text-muted-foreground hover:text-destructive" aria-label="Remover"><Trash2 className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QuantityControl value={l.quantity} onChange={(v) => setQuantity(l.productId, v)} />
                      <span className="font-display text-lg font-bold text-navy">{formatBRL(l.total)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={clear} className="text-sm font-medium text-muted-foreground hover:text-destructive">Esvaziar carrinho</button>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl border bg-card p-6 shadow-card lg:sticky lg:top-44">
            <h2 className="font-display text-lg font-bold text-navy">Resumo do pedido</h2>
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); toast(coupon ? `Cupom “${coupon}” inválido na demonstração` : "Digite um cupom"); }}
            >
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Cupom de desconto" className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none focus:border-turquoise" />
              </div>
              <Button type="submit" variant="outline" className="text-navy">Aplicar</Button>
            </form>
            <div>
              <p className="text-sm font-semibold text-navy">Forma de pagamento</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {payments.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPay(p.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-semibold transition",
                      pay === p.id ? "border-turquoise bg-turquoise-soft text-navy" : "text-muted-foreground hover:border-turquoise",
                    )}
                  >
                    <p.icon className="h-5 w-5" /> {p.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{payments.find((p) => p.id === pay)?.note}</p>
            </div>
            <dl className="space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-semibold text-navy">{formatBRL(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Frete</dt><dd className="font-semibold text-navy">{shipping === 0 ? "Grátis" : formatBRL(shipping)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-muted-foreground">Desconto Pix</dt><dd className="font-semibold text-success">-{formatBRL(discount)}</dd></div>}
              <div className="flex justify-between border-t pt-3"><dt className="font-semibold text-navy">Total</dt><dd className="font-display text-2xl font-bold text-navy">{formatBRL(total - discount)}</dd></div>
            </dl>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => {
                const id = `#INX-${Math.floor(10000 + Math.random() * 89999)}`;
                clear();
                setDone(id);
              }}
            >
              <Lock /> Finalizar compra (demonstração)
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">Nenhum pagamento real é processado neste protótipo.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
