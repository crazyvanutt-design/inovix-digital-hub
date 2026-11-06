import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Clock, Heart, Package, Ruler, Share2, ShieldCheck, ShoppingCart, Truck, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard, Rating } from "@/components/product/ProductCard";
import { QuantityControl } from "@/components/cart/CartSheet";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getCategory, getProductBySlug, getRelatedProducts } from "@/services/catalog";
import { useCart } from "@/lib/cart";
import { formatBRL, installments } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loja/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.product.name} — Loja INOVIX` : "Produto indisponível — INOVIX";
    const description = loaderData?.product.short ?? "Produto não encontrado na loja INOVIX.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">Produto não encontrado</h1>
      <p className="mt-2 text-muted-foreground">Esse item pode ter saído da vitrine.</p>
      <Button variant="navy" className="mt-6" asChild>
        <Link to="/loja">Voltar para a loja</Link>
      </Button>
    </div>
  ),
  component: ProductPage,
});

const views = ["object-center", "object-top scale-125", "object-bottom scale-150", "object-left scale-110"];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const [view, setView] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<string | null>(null);

  const addToCart = () => {
    add(product.id, qty, color);
    toast.success("Adicionado ao carrinho", { description: `${qty}× ${product.name}` });
    setOpen(true);
  };

  return (
    <div className="container-page py-8">
      <p className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-navy">Início</Link> / <Link to="/loja" className="hover:text-navy">Loja</Link> /{" "}
        <Link to="/loja" search={{ categoria: product.category }} className="hover:text-navy">{category?.name}</Link> /{" "}
        <span className="text-navy">{product.name}</span>
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {views.map((v, i) => (
              <button
                key={v}
                onClick={() => setView(i)}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border-2 bg-surface transition",
                  view === i ? "border-turquoise" : "border-transparent opacity-70 hover:opacity-100",
                )}
                aria-label={`Imagem ${i + 1}`}
              >
                <img src={product.image} alt="" className={cn("h-full w-full object-cover", v)} />
              </button>
            ))}
          </div>
          <div className="relative flex-1 overflow-hidden rounded-3xl border bg-surface">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className={cn("aspect-square w-full object-cover transition duration-500", views[view])}
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-bold text-navy-foreground">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-turquoise-soft px-3 py-1 text-xs font-bold text-turquoise-strong">{product.brand}</span>
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.short}</p>

          <div className="mt-6 rounded-2xl bg-surface p-5">
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatBRL(product.oldPrice)}</span>
            )}
            <div className="flex items-end gap-3">
              <span className="font-display text-4xl font-bold text-navy">{formatBRL(product.price)}</span>
              {product.oldPrice && (
                <span className="mb-1.5 rounded-md bg-success/15 px-2 py-0.5 text-xs font-bold text-success">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {installments(product.price)} · <strong className="text-turquoise-strong">{formatBRL(product.price * 0.95)} no Pix</strong>
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">Opção: <span className="font-normal text-muted-foreground">{color}</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition",
                    color === c ? "border-navy bg-navy text-navy-foreground" : "hover:border-turquoise",
                  )}
                >
                  {color === c && <Check className="h-3.5 w-3.5" />} {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityControl value={qty} onChange={(v) => setQty(Math.max(1, v))} />
            <Button variant="navy" size="lg" className="flex-1" onClick={addToCart}>
              <ShoppingCart /> Adicionar ao carrinho
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => toast("Adicionado aos favoritos (demonstração)")} aria-label="Favoritar">
              <Heart />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => toast("Link copiado (demonstração)")} aria-label="Compartilhar">
              <Share2 />
            </Button>
          </div>
          <Button
            variant="hero"
            size="lg"
            className="mt-3 w-full"
            onClick={() => {
              add(product.id, qty, color);
              navigate({ to: "/carrinho" });
            }}
          >
            Comprar agora
          </Button>

          {product.customizable && (
            <Link
              to="/personalizados"
              className="mt-4 flex items-center gap-3 rounded-2xl border border-turquoise/40 bg-turquoise-soft p-4 transition hover:border-turquoise"
            >
              <Wand2 className="h-5 w-5 shrink-0 text-turquoise-strong" />
              <span className="text-sm text-navy">
                <strong>Personalizável.</strong> Quer mudar tamanho, cor ou adicionar um nome? Solicite um orçamento.
              </span>
            </Link>
          )}

          <div className="mt-6 rounded-2xl border p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-navy"><Truck className="h-4 w-4 text-turquoise-strong" /> Calcular frete</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setShipping(cep.length >= 8 ? "Entrega estimada em 5 a 8 dias úteis · R$ 19,90 (grátis acima de R$ 199)" : "Digite um CEP válido");
              }}
            >
              <input
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="00000-000"
                className="h-10 flex-1 rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise"
              />
              <Button type="submit" variant="outline" className="text-navy">Calcular</Button>
            </form>
            {shipping && <p className="mt-2 text-xs text-muted-foreground">{shipping}</p>}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            {[
              { icon: ShieldCheck, label: "Garantia de 90 dias" },
              { icon: Package, label: "Embalagem segura" },
              { icon: Clock, label: product.leadTime },
            ].map((i) => (
              <div key={i.label} className="rounded-xl bg-surface p-3">
                <i.icon className="mx-auto h-5 w-5 text-turquoise-strong" />
                <p className="mt-1.5 text-muted-foreground">{i.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="descricao" className="mt-16">
        <TabsList className="h-auto gap-1 rounded-xl bg-surface p-1">
          <TabsTrigger value="descricao" className="rounded-lg px-4 py-2">Descrição</TabsTrigger>
          <TabsTrigger value="especificacoes" className="rounded-lg px-4 py-2">Especificações</TabsTrigger>
          <TabsTrigger value="avaliacoes" className="rounded-lg px-4 py-2">Avaliações ({product.reviews})</TabsTrigger>
        </TabsList>
        <TabsContent value="descricao" className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          {product.description}
        </TabsContent>
        <TabsContent value="especificacoes" className="mt-6">
          <dl className="grid max-w-3xl gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {[
              ["Material", product.material],
              ["Dimensões", product.size],
              ["Prazo de produção", product.leadTime],
              ["Marca", product.brand],
              ["Personalizável", product.customizable ? "Sim" : "Não"],
              ["Categoria", category?.name ?? "-"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center gap-3 bg-card p-4">
                <Ruler className="h-4 w-4 text-turquoise-strong" />
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="ml-auto text-sm font-semibold text-navy">{v}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="avaliacoes" className="mt-6 grid max-w-3xl gap-4">
          {[
            { n: "Ana P.", t: "Acabamento lindo, superou minhas expectativas!" },
            { n: "Carlos M.", t: "Chegou bem embalado e dentro do prazo. Recomendo." },
            { n: "Juliana R.", t: "Qualidade excelente, já comprei outras peças." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-navy">{r.n}</span>
                <Rating value={5} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.t}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <section className="mt-20">
        <SectionHeading eyebrow="Você também pode gostar" title="Produtos relacionados" />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
