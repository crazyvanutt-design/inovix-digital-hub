import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageSquare, PenTool, Printer, Truck, UploadCloud, Paintbrush } from "lucide-react";
import { toast } from "sonner";
import workshop from "@/assets/centrico-workshop.jpg";
import religiosa from "@/assets/prod-religiosa.jpg";
import miniaturas from "@/assets/prod-miniaturas.jpg";
import luminaria from "@/assets/prod-luminaria.jpg";
import resina from "@/assets/prod-resina.jpg";
import chaveiros from "@/assets/prod-chaveiros.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/personalizados")({
  head: () => ({
    meta: [
      { title: "Personalizados em impressão 3D — 3D Cêntrico | INOVIX" },
      {
        name: "description",
        content: "Peças sob medida em impressão 3D com a 3D Cêntrico: imagens sacras, brindes, litofanias e protótipos.",
      },
      { property: "og:title", content: "Personalizados em impressão 3D — 3D Cêntrico" },
      { property: "og:description", content: "Peças sob medida: imagens sacras, brindes, litofanias e protótipos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Personalizados,
});

const steps = [
  { icon: MessageSquare, t: "Conte sua ideia", d: "Envie referências, fotos ou um arquivo 3D." },
  { icon: PenTool, t: "Modelagem", d: "Criamos ou ajustamos o modelo e enviamos a prévia." },
  { icon: Printer, t: "Impressão", d: "Produção em resina 8K ou filamento premium." },
  { icon: Paintbrush, t: "Acabamento", d: "Lixamento, pintura à mão e controle de qualidade." },
  { icon: Truck, t: "Entrega", d: "Embalagem segura e envio para todo o Brasil." },
];

const materials = [
  { name: "PLA Premium", d: "Resistente e versátil, ideal para brindes e decoração.", tag: "Mais econômico" },
  { name: "PETG", d: "Alta durabilidade e resistência a impacto e umidade.", tag: "Uso funcional" },
  { name: "Resina 8K", d: "Detalhes microscópicos e superfície lisa como porcelana.", tag: "Máximo detalhe" },
  { name: "Resina translúcida", d: "Efeito cristal para joias, esculturas e luminárias.", tag: "Efeito vidro" },
];

const types = ["Imagem religiosa", "Miniatura / colecionável", "Chaveiros e brindes", "Litofania / luminária", "Protótipo / peça técnica", "Outro"];

function Personalizados() {
  const [type, setType] = useState(types[0]);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Orçamento de demonstração enviado!", { description: "Nenhum dado foi realmente enviado." });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <img src={workshop} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" width={1536} height={1024} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
        <div className="container-page relative py-20 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-turquoise/40 bg-turquoise/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
            Powered by 3D CÊNTRICO
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-6xl">
            Sua ideia, <span className="text-turquoise">impressa</span> com perfeição
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/80">
            Peças exclusivas em impressão 3D: imagens sacras, colecionáveis, brindes corporativos, litofanias e
            protótipos — do projeto ao acabamento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <a href="#orcamento">Solicitar orçamento grátis</a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#galeria">Ver trabalhos</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <SectionHeading align="center" eyebrow="Como funciona" title="Do conceito à sua porta em 5 etapas" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.t} className="relative rounded-2xl border bg-card p-6">
              <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-muted">{i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-turquoise">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-bold text-navy">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="galeria" className="container-page mt-24 scroll-mt-40">
        <SectionHeading eyebrow="Galeria" title="Trabalhos recentes" description="Alguns projetos produzidos pelo estúdio 3D Cêntrico." />
        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { src: religiosa, label: "Arte sacra", cls: "row-span-2" },
            { src: miniaturas, label: "Miniaturas RPG", cls: "col-span-2" },
            { src: luminaria, label: "Litofanias", cls: "" },
            { src: chaveiros, label: "Brindes", cls: "" },
            { src: resina, label: "Resina cristal", cls: "col-span-2" },
            { src: workshop, label: "Estúdio", cls: "col-span-2 md:col-span-1" },
          ].map((g) => (
            <div key={g.label} className={cn("group relative overflow-hidden rounded-2xl", g.cls)}>
              <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-navy backdrop-blur">
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 bg-surface py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Materiais" title="O material certo para cada projeto" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((m) => (
              <div key={m.name} className="card-lift rounded-2xl border bg-card p-6">
                <span className="rounded-full bg-turquoise-soft px-2.5 py-1 text-[11px] font-bold text-turquoise-strong">{m.tag}</span>
                <h3 className="mt-4 text-lg font-bold text-navy">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="orcamento" className="container-page mt-24 scroll-mt-40">
        <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-card lg:grid-cols-[1fr_1.3fr]">
          <div className="relative bg-navy-gradient p-8 text-navy-foreground sm:p-12">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="relative">
              <h2 className="text-3xl font-bold">Solicite seu orçamento</h2>
              <p className="mt-3 text-navy-foreground/75">Resposta em até 24 horas úteis, sem compromisso.</p>
              <ul className="mt-8 space-y-4">
                {["Modelagem 3D inclusa em projetos simples", "Prévia digital antes da produção", "Descontos progressivos para quantidade", "Envio para todo o Brasil"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-8 sm:p-12">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-turquoise-soft text-turquoise-strong">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-navy">Pedido recebido!</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">Na versão final, nossa equipe entrará em contato. Esta é apenas uma demonstração.</p>
                <Button variant="outline" className="mt-6 text-navy" onClick={() => setSent(false)}>Enviar outro pedido</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-navy">
                  Nome
                  <input required className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise" placeholder="Seu nome" />
                </label>
                <label className="text-sm font-medium text-navy">
                  E-mail ou WhatsApp
                  <input required className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise" placeholder="contato@exemplo.com" />
                </label>
                <div className="sm:col-span-2">
                  <p className="text-sm font-medium text-navy">Tipo de projeto</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {types.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm transition",
                          type === t ? "border-navy bg-navy font-semibold text-navy-foreground" : "hover:border-turquoise",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="text-sm font-medium text-navy">
                  Quantidade
                  <input type="number" min={1} defaultValue={1} className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise" />
                </label>
                <label className="text-sm font-medium text-navy">
                  Tamanho aproximado
                  <input className="mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise" placeholder="ex.: 15 cm de altura" />
                </label>
                <label className="text-sm font-medium text-navy sm:col-span-2">
                  Descreva sua ideia
                  <textarea required rows={4} className="mt-1.5 w-full rounded-xl border bg-background p-3 text-sm outline-none focus:border-turquoise" placeholder="Cores, acabamento, finalidade, prazo desejado..." />
                </label>
                <button
                  type="button"
                  onClick={() => toast("Anexo de demonstração")}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 text-sm text-muted-foreground transition hover:border-turquoise sm:col-span-2"
                >
                  <UploadCloud className="h-5 w-5 text-turquoise-strong" /> Anexar referências (fotos, STL, OBJ)
                </button>
                <Button type="submit" variant="hero" size="lg" className="sm:col-span-2">Enviar pedido de orçamento</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
