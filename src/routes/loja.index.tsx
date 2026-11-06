import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SlidersHorizontal, Search, X, PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { listCategories, listProducts } from "@/services/catalog";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: z.string().optional(),
  categoria: z.enum(["religiosas", "miniaturas", "chaveiros", "luminarias", "resina"]).optional(),
  ordem: z.enum(["relevancia", "menor-preco", "maior-preco", "avaliacao"]).optional(),
});

export const Route = createFileRoute("/loja/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Loja INOVIX — Produtos impressos em 3D" },
      {
        name: "description",
        content: "Peças religiosas, miniaturas, chaveiros, luminárias e produtos em resina com acabamento premium.",
      },
      { property: "og:title", content: "Loja INOVIX — Produtos impressos em 3D" },
      {
        property: "og:description",
        content: "Peças religiosas, miniaturas, chaveiros, luminárias e produtos em resina.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Loja,
});

const sortOptions = [
  { id: "relevancia", label: "Mais relevantes" },
  { id: "menor-preco", label: "Menor preço" },
  { id: "maior-preco", label: "Maior preço" },
  { id: "avaliacao", label: "Melhor avaliados" },
] as const;

function Loja() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/loja/" });
  const categories = listCategories();
  const products = listProducts(search);
  const activeCat = categories.find((c) => c.id === search.categoria);

  return (
    <div>
      <section className="border-b bg-surface">
        <div className="container-page py-10">
          <p className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-navy">Início</Link> / <span className="text-navy">Loja</span>
            {activeCat && <> / <span className="text-navy">{activeCat.name}</span></>}
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold text-navy sm:text-4xl">{activeCat ? activeCat.name : "Loja virtual"}</h1>
              <p className="mt-2 text-muted-foreground">
                {search.q ? (
                  <>Resultados para “<strong className="text-navy">{search.q}</strong>” · </>
                ) : null}
                {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
              </p>
            </div>
            <form
              className="relative w-full max-w-sm"
              onSubmit={(e) => {
                e.preventDefault();
                const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
                navigate({ search: (prev) => ({ ...prev, q: q || undefined }) });
              }}
            >
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                key={search.q}
                name="q"
                defaultValue={search.q}
                placeholder="Buscar na loja"
                className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none focus:border-turquoise focus:ring-4 focus:ring-turquoise/15"
              />
            </form>
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            <Link
              to="/loja"
              search={{ q: search.q, ordem: search.ordem }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                !search.categoria ? "border-navy bg-navy text-navy-foreground" : "bg-background text-navy hover:border-turquoise",
              )}
            >
              Todos
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/loja"
                search={{ ...search, categoria: c.id }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  search.categoria === c.id
                    ? "border-navy bg-navy text-navy-foreground"
                    : "bg-background text-navy hover:border-turquoise",
                )}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden space-y-6 lg:block">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-sm font-bold text-navy">
              <SlidersHorizontal className="h-4 w-4 text-turquoise-strong" /> Categorias
            </h2>
            <ul className="mt-4 space-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/loja"
                    search={{ ...search, categoria: search.categoria === c.id ? undefined : c.id }}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                      search.categoria === c.id ? "bg-turquoise-soft font-semibold text-navy" : "text-muted-foreground hover:bg-muted hover:text-navy",
                    )}
                  >
                    {c.name}
                    <span className="text-xs">{listProducts({ categoria: c.id }).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="font-display text-sm font-bold text-navy">Ordenar por</h2>
            <div className="mt-4 space-y-1">
              {sortOptions.map((o) => (
                <button
                  key={o.id}
                  onClick={() => navigate({ search: (prev) => ({ ...prev, ordem: o.id }) })}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                    (search.ordem ?? "relevancia") === o.id ? "bg-turquoise-soft font-semibold text-navy" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "h-3.5 w-3.5 rounded-full border-2",
                      (search.ordem ?? "relevancia") === o.id ? "border-turquoise-strong bg-turquoise" : "border-border",
                    )}
                  />
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-navy-gradient p-5 text-navy-foreground">
            <p className="font-display text-lg font-bold">Quer algo exclusivo?</p>
            <p className="mt-1 text-sm text-navy-foreground/70">A 3D Cêntrico cria peças sob medida para você.</p>
            <Button variant="hero" size="sm" className="mt-4" asChild>
              <Link to="/personalizados">Pedir orçamento</Link>
            </Button>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {search.q && (
                <button
                  onClick={() => navigate({ search: (prev) => ({ ...prev, q: undefined }) })}
                  className="flex items-center gap-1.5 rounded-full bg-turquoise-soft px-3 py-1.5 text-xs font-semibold text-navy"
                >
                  “{search.q}” <X className="h-3 w-3" />
                </button>
              )}
              {activeCat && (
                <button
                  onClick={() => navigate({ search: (prev) => ({ ...prev, categoria: undefined }) })}
                  className="flex items-center gap-1.5 rounded-full bg-turquoise-soft px-3 py-1.5 text-xs font-semibold text-navy"
                >
                  {activeCat.name} <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <select
              value={search.ordem ?? "relevancia"}
              onChange={(e) =>
                navigate({ search: (prev) => ({ ...prev, ordem: e.target.value as (typeof sortOptions)[number]["id"] }) })
              }
              className="h-10 rounded-xl border bg-background px-3 text-sm font-medium text-navy outline-none focus:border-turquoise lg:hidden"
              aria-label="Ordenar"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-dashed p-16 text-center">
              <PackageSearch className="h-10 w-10 text-turquoise-strong" />
              <p className="mt-4 font-display text-lg font-bold text-navy">Nenhum produto encontrado</p>
              <p className="mt-1 text-sm text-muted-foreground">Tente outra busca ou explore todas as categorias.</p>
              <Button variant="navy" className="mt-6" asChild>
                <Link to="/loja">Limpar filtros</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
