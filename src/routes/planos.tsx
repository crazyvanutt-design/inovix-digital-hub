import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { toast } from "sonner";
import { PageHero, SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { plans } from "@/data/content";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e preços — INOVIX" },
      {
        name: "description",
        content: "Escolha o plano ideal: Essencial gratuito, Pro para criadores e Empresas para equipes.",
      },
      { property: "og:title", content: "Planos e preços — INOVIX" },
      { property: "og:description", content: "Essencial gratuito, Pro para criadores e Empresas para equipes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planos,
});

const compare: [string, boolean | string, boolean | string, boolean | string][] = [
  ["Ferramentas PDF", "10/dia", "Ilimitado", "Ilimitado"],
  ["Textos com IA", "5/mês", "300/mês", "Ilimitado"],
  ["Removedor de fundo", false, true, true],
  ["Cursos Pro", false, true, true],
  ["Desconto na loja", false, "10%", "15%"],
  ["Usuários", "1", "1", "Até 10"],
  ["Suporte prioritário", false, true, true],
];

const faq: [string, string][] = [
  ["Posso cancelar a qualquer momento?", "Sim. Na versão final, o cancelamento poderá ser feito direto na sua conta, sem multas."],
  ["Quais formas de pagamento serão aceitas?", "Pix, cartão de crédito e boleto. Nesta demonstração nenhum pagamento é processado."],
  ["O plano dá desconto na loja?", "Sim, assinantes Pro e Empresas recebem desconto automático em produtos da loja."],
  ["Existe período de teste?", "O plano Essencial é gratuito para sempre e você pode migrar quando quiser."],
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-turquoise-strong" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-muted-foreground/50" />;
  return <span className="text-sm font-semibold text-navy">{v}</span>;
}

function Planos() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <PageHero
        breadcrumb="Planos"
        eyebrow="Preços demonstrativos"
        title={<>Um plano para cada <span className="text-turquoise">momento</span></>}
        description="Comece grátis e evolua quando precisar de mais recursos, IA e benefícios na loja."
      >
        <div className="inline-flex rounded-xl bg-navy-foreground/10 p-1 backdrop-blur">
          {[
            [false, "Mensal"],
            [true, "Anual · 2 meses grátis"],
          ].map(([v, l]) => (
            <button
              key={String(v)}
              onClick={() => setYearly(v as boolean)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition",
                yearly === v ? "bg-background text-navy" : "text-navy-foreground/80 hover:text-navy-foreground",
              )}
            >
              {l as string}
            </button>
          ))}
        </div>
      </PageHero>

      <div className="container-page -mt-6 pb-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p) => {
            const price = yearly ? p.priceYearly / 12 : p.priceMonthly;
            return (
              <div
                key={p.id}
                className={cn(
                  "relative flex flex-col rounded-3xl border bg-card p-7 shadow-soft",
                  p.highlight && "border-turquoise shadow-elevated ring-4 ring-turquoise/15 lg:-translate-y-4",
                )}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent-gradient px-3 py-1 text-xs font-bold text-accent-foreground">
                    Mais escolhido
                  </span>
                )}
                <h2 className="text-xl font-bold text-navy">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-4xl font-extrabold text-navy">{price === 0 ? "Grátis" : formatBRL(price)}</span>
                  {price > 0 && <span className="mb-1 text-sm text-muted-foreground">/mês</span>}
                </div>
                {yearly && price > 0 && <p className="text-xs text-muted-foreground">{formatBRL(p.priceYearly)} cobrados anualmente</p>}
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-strong" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.highlight ? "hero" : "navy"}
                  size="lg"
                  className="mt-8 w-full"
                  onClick={() => toast.success(`Plano ${p.name} selecionado`, { description: "Demonstração — nenhum pagamento foi realizado." })}
                >
                  {p.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <SectionHeading className="mt-24" align="center" eyebrow="Comparativo" title="Compare os recursos" />
        <div className="mt-10 overflow-x-auto rounded-3xl border bg-card">
          <table className="w-full min-w-[560px] text-center">
            <thead>
              <tr className="border-b bg-surface">
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Recurso</th>
                {plans.map((p) => (
                  <th key={p.id} className={cn("p-4 font-display text-sm font-bold text-navy", p.highlight && "text-turquoise-strong")}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map(([label, ...vals]) => (
                <tr key={label} className="border-b last:border-0">
                  <td className="p-4 text-left text-sm text-foreground">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="p-4"><Cell v={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionHeading className="mt-24" align="center" eyebrow="Dúvidas" title="Perguntas frequentes" />
        <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl">
          {faq.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-display text-base font-semibold text-navy">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
