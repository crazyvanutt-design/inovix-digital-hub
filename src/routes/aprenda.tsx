import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Clock, PlayCircle, Users, Award, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PageHero, SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/content";
import type { Course } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aprenda")({
  head: () => ({
    meta: [
      { title: "Aprenda — Cursos e tutoriais INOVIX" },
      {
        name: "description",
        content: "Cursos e tutoriais de impressão 3D, inteligência artificial, design e produtividade.",
      },
      { property: "og:title", content: "Aprenda — Cursos e tutoriais INOVIX" },
      { property: "og:description", content: "Cursos de impressão 3D, IA, design e produtividade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Aprenda,
});

const topics: (Course["topic"] | "Todos")[] = ["Todos", "Impressão 3D", "Inteligência Artificial", "Design", "Produtividade"];

const articles = [
  { t: "PLA, PETG ou resina: qual escolher?", c: "Impressão 3D", r: "6 min" },
  { t: "10 prompts de IA para quem vende online", c: "Inteligência Artificial", r: "4 min" },
  { t: "Como calcular o preço de uma peça 3D", c: "Negócios", r: "8 min" },
];

function Aprenda() {
  const [topic, setTopic] = useState<(typeof topics)[number]>("Todos");
  const list = courses.filter((c) => topic === "Todos" || c.topic === topic);
  const featured = courses[0]!;

  return (
    <>
      <PageHero
        breadcrumb="Aprenda"
        eyebrow="Cursos e tutoriais"
        title={<>Aprenda com quem <span className="text-turquoise">faz na prática</span></>}
        description="Do primeiro contato com a impressora 3D ao uso avançado de inteligência artificial nos negócios."
      >
        <div className="flex flex-wrap gap-6 text-sm text-navy-foreground/80">
          <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-turquoise" /> +60 aulas</span>
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-turquoise" /> 8 mil alunos</span>
          <span className="flex items-center gap-2"><Award className="h-4 w-4 text-turquoise" /> Certificado</span>
        </div>
      </PageHero>

      <div className="container-page py-14">
        <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-card md:grid-cols-2">
          <div className="relative">
            <img src={featured.image} alt={featured.title} className="h-full min-h-64 w-full object-cover" loading="lazy" />
            <button
              onClick={() => toast("Aula de demonstração", { description: "O player de vídeo será integrado futuramente." })}
              className="absolute inset-0 flex items-center justify-center bg-navy-deep/30 transition hover:bg-navy-deep/45"
              aria-label="Assistir aula"
            >
              <PlayCircle className="h-16 w-16 text-navy-foreground" />
            </button>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="w-fit rounded-full bg-turquoise-soft px-3 py-1 text-xs font-bold text-turquoise-strong">Curso em destaque · Gratuito</span>
            <h2 className="mt-4 text-3xl font-bold text-navy">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">
              Entenda como funciona uma impressora 3D, prepare seus arquivos, escolha materiais e crie seu primeiro produto
              para vender.
            </p>
            <div className="mt-5 flex gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.duration}</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {featured.lessons} aulas</span>
            </div>
            <Button variant="hero" size="lg" className="mt-7 w-fit" onClick={() => toast.success("Matrícula de demonstração realizada!")}>
              Começar agora <ArrowRight />
            </Button>
          </div>
        </div>

        <SectionHeading className="mt-20" eyebrow="Catálogo" title="Todos os cursos" />
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                topic === t ? "border-navy bg-navy text-navy-foreground" : "bg-background text-navy hover:border-turquoise",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <article key={c.id} className="group card-lift overflow-hidden rounded-2xl border bg-card">
              <div className="relative aspect-video overflow-hidden">
                <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold",
                    c.free ? "bg-turquoise text-navy-deep" : "bg-navy text-navy-foreground",
                  )}
                >
                  {c.free ? "Gratuito" : "Pro"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-turquoise-strong">{c.topic} · {c.level}</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy">{c.title}</h3>
                <div className="mt-4 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
                  <span>{c.lessons} aulas</span>
                  <button
                    onClick={() => toast(c.free ? "Curso aberto (demonstração)" : "Disponível no plano Pro")}
                    className="font-semibold text-navy hover:text-turquoise-strong"
                  >
                    Acessar →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SectionHeading className="mt-20" eyebrow="Blog" title="Artigos e guias rápidos" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <button
              key={a.t}
              onClick={() => toast("Artigo de demonstração")}
              className="card-lift rounded-2xl border bg-surface p-6 text-left"
            >
              <span className="text-xs font-semibold text-turquoise-strong">{a.c}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-navy">{a.t}</h3>
              <p className="mt-4 text-xs text-muted-foreground">Leitura de {a.r}</p>
            </button>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl bg-navy-gradient p-8 text-navy-foreground sm:flex-row sm:p-10">
          <div>
            <h3 className="text-2xl font-bold">Acesse todos os cursos Pro</h3>
            <p className="mt-1 text-navy-foreground/70">Incluso no plano Pro, com certificado.</p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link to="/planos">Ver planos</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
