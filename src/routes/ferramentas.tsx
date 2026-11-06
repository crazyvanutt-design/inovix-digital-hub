import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Zap, Lock, Infinity as InfinityIcon } from "lucide-react";
import { PageHero } from "@/components/layout/SectionHeading";
import { ToolCard } from "@/components/tools/ToolCard";
import { ToolDemoDialog } from "@/components/tools/ToolDemoDialog";
import { Button } from "@/components/ui/button";
import { toolCategories, tools } from "@/data/content";
import type { Tool, ToolCategory } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Ferramentas online grátis — INOVIX" },
      {
        name: "description",
        content: "Conversor PDF, editor de imagens, calculadoras, gerador de textos com IA e muito mais, direto no navegador.",
      },
      { property: "og:title", content: "Ferramentas online grátis — INOVIX" },
      { property: "og:description", content: "Conversor PDF, editor de imagens, calculadoras e IA direto no navegador." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ferramentas,
});

function Ferramentas() {
  const [cat, setCat] = useState<ToolCategory | "todas">("todas");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Tool | null>(null);

  const filtered = useMemo(
    () =>
      tools.filter(
        (t) =>
          (cat === "todas" || t.category === cat) &&
          `${t.name} ${t.description}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [cat, q],
  );

  return (
    <>
      <PageHero
        breadcrumb="Ferramentas"
        eyebrow="+40 ferramentas online"
        title={<>Ferramentas que <span className="text-turquoise">simplificam</span> o seu dia</>}
        description="Converta documentos, edite imagens, faça cálculos e crie conteúdo com IA — rápido, seguro e sem instalar nada."
      >
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Qual ferramenta você procura?"
            className="h-14 w-full rounded-2xl border-0 bg-background pl-12 pr-4 text-[15px] text-foreground shadow-elevated outline-none ring-turquoise/40 focus:ring-4"
          />
        </div>
      </PageHero>

      <div className="container-page py-12">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[{ id: "todas" as const, name: "Todas" }, ...toolCategories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                cat === c.id ? "border-navy bg-navy text-navy-foreground" : "bg-background text-navy hover:border-turquoise",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => (
            <ToolCard key={t.id} tool={t} onOpen={() => setActive(t)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
            Nenhuma ferramenta encontrada para “{q}”.
          </p>
        )}

        <div className="mt-16 grid gap-4 rounded-3xl bg-surface p-6 sm:p-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy">Desbloqueie o modo Pro</h2>
            <p className="mt-2 text-sm text-muted-foreground">Uso ilimitado, IA avançada e arquivos maiores.</p>
            <Button variant="navy" className="mt-5" asChild>
              <Link to="/planos">Conhecer planos</Link>
            </Button>
          </div>
          {[
            { icon: InfinityIcon, t: "Uso ilimitado", d: "Sem limites diários" },
            { icon: Zap, t: "Processamento rápido", d: "Fila prioritária" },
            { icon: Lock, t: "Privacidade total", d: "Arquivos apagados em 1h" },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl bg-background p-5 shadow-soft">
              <b.icon className="h-6 w-6 text-turquoise-strong" />
              <p className="mt-3 font-bold text-navy">{b.t}</p>
              <p className="text-xs text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </div>

      <ToolDemoDialog tool={active} onOpenChange={(o) => !o && setActive(null)} />
    </>
  );
}
