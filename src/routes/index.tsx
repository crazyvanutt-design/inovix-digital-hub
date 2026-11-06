import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Box,
  BrainCircuit,
  CheckCircle2,
  CreditCard,
  Headphones,
  Layers,
  MapPin,
  Quote,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import hero from "@/assets/hero-3d-printer.jpg";
import workshop from "@/assets/centrico-workshop.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { ToolIcon } from "@/components/tools/ToolCard";
import { tools } from "@/data/content";
import { getFeaturedProducts, listCategories } from "@/services/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INOVIX — Tecnologia, criatividade e soluções em um só lugar" },
      {
        name: "description",
        content:
          "Ferramentas online, inteligência artificial, loja virtual e impressão 3D personalizada. Tudo em uma plataforma brasileira.",
      },
      { property: "og:title", content: "INOVIX — Tecnologia, criatividade e soluções em um só lugar" },
      {
        property: "og:description",
        content: "Ferramentas online, IA, loja virtual e impressão 3D personalizada em uma só plataforma.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const shortcuts = [
  { to: "/ferramentas", label: "Ferramentas online", desc: "PDF, imagens e calculadoras", icon: Wrench },
  { to: "/loja", label: "Loja virtual", desc: "Produtos prontos para você", icon: ShoppingBag },
  { to: "/personalizados", label: "Impressão 3D", desc: "Peças sob medida", icon: Box },
  { to: "/ia", label: "Inteligência artificial", desc: "Textos e imagens com IA", icon: BrainCircuit },
  { to: "/aprenda", label: "Tutoriais", desc: "Cursos e guias práticos", icon: BookOpen },
] as const;

const benefits = [
  { icon: Truck, title: "Frete grátis", desc: "Em compras acima de R$ 199 para todo o Brasil." },
  { icon: ShieldCheck, title: "Compra segura", desc: "Seus dados protegidos de ponta a ponta." },
  { icon: CreditCard, title: "Até 10x sem juros", desc: "Pix, cartão de crédito ou boleto." },
  { icon: MapPin, title: "Produção nacional", desc: "Peças fabricadas no Brasil com qualidade." },
  { icon: Headphones, title: "Suporte humano", desc: "Atendimento rápido por pessoas reais." },
  { icon: Zap, title: "Ferramentas grátis", desc: "Use as principais ferramentas sem pagar nada." },
];

const testimonials = [
  { name: "Mariana S.", role: "Arquiteta", text: "A litofania ficou perfeita. Acabamento impecável e chegou antes do prazo!" },
  { name: "Rafael T.", role: "Empreendedor", text: "Uso o conversor de PDF e o gerador de textos todos os dias no meu negócio." },
  { name: "Paróquia S. José", role: "Cliente 3D Cêntrico", text: "As imagens sacras têm um nível de detalhe que impressiona todos os fiéis." },
];

function Index() {
  const featuredTools = ["pdf-converter", "image-editor", "calculators", "ai-writer"].map(
    (id) => tools.find((t) => t.id === id)!,
  );
  const categories = listCategories();
  const products = getFeaturedProducts(8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 bg-dots opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <div className="container-page relative grid items-center gap-12 pb-28 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-16">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-navy shadow-soft">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-turquoise-soft">
                <Sparkles className="h-3 w-3 text-turquoise-strong" />
              </span>
              Plataforma brasileira de tecnologia
            </span>
            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] text-navy sm:text-6xl lg:text-[4rem]">
              Tecnologia, criatividade e <span className="text-gradient">soluções</span> em um só lugar
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ferramentas digitais, inteligência artificial, loja virtual e produtos personalizados em impressão 3D —
              tudo o que você precisa para criar, produzir e vender.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/loja">
                  Explorar a loja <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-navy/15 bg-background text-navy">
                <Link to="/ferramentas">Usar ferramentas grátis</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t pt-6">
              {[
                ["+40", "ferramentas online"],
                ["+12 mil", "peças impressas"],
                ["4,9★", "avaliação média"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-navy">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-accent-gradient opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-background shadow-elevated">
              <img
                src={hero}
                alt="Impressora 3D imprimindo um vaso turquesa ao lado de uma peça branca já impressa"
                width={1536}
                height={1152}
                className="aspect-[4/3.4] w-full object-cover"
              />
            </div>
            <div className="absolute -left-4 bottom-10 w-60 animate-float rounded-2xl border bg-background/95 p-4 shadow-card backdrop-blur sm:-left-10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">Imprimindo: Vaso Spiral</span>
                <span className="font-bold text-turquoise-strong">78%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[78%] rounded-full bg-accent-gradient" />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">PLA Turquesa · 1h 12min restantes</p>
            </div>
            <div className="absolute -right-3 top-8 flex items-center gap-3 rounded-2xl border bg-background/95 p-3 pr-4 shadow-card backdrop-blur [animation-delay:1.5s] animate-float sm:-right-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-turquoise">
                <Layers className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold text-navy">Peça finalizada</p>
                <p className="text-[11px] text-muted-foreground">Camada 0,12 mm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORTCUTS */}
      <section className="container-page relative z-10 -mt-16 lg:-mt-20">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border bg-background p-3 shadow-card sm:grid-cols-3 lg:grid-cols-5">
          {shortcuts.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="group flex flex-col gap-3 rounded-2xl p-4 transition hover:bg-surface sm:flex-row sm:items-center"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-turquoise transition group-hover:scale-105 group-hover:shadow-glow">
                <s.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-bold text-navy">{s.label}</span>
                <span className="block text-xs text-muted-foreground">{s.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="Ferramentas em destaque"
          title="Resolva tarefas do dia a dia em segundos"
          description="Ferramentas online rápidas, seguras e direto no navegador — sem instalar nada."
          action={
            <Button variant="outline" asChild className="text-navy">
              <Link to="/ferramentas">
                Ver todas as ferramentas <ArrowRight />
              </Link>
            </Button>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool, i) => {
            const dark = tool.id === "ai-writer";
            return (
              <Link
                key={tool.id}
                to={tool.category === "ia" ? "/ia" : "/ferramentas"}
                className={
                  dark
                    ? "group card-lift relative overflow-hidden rounded-3xl bg-navy-gradient p-6 text-navy-foreground"
                    : "group card-lift relative overflow-hidden rounded-3xl border bg-surface p-6"
                }
              >
                {dark && <div className="absolute inset-0 bg-grid opacity-40" />}
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        dark
                          ? "flex h-14 w-14 items-center justify-center rounded-2xl bg-turquoise text-navy-deep"
                          : "flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-turquoise-strong shadow-soft"
                      }
                    >
                      <ToolIcon name={tool.icon} className="h-6 w-6" />
                    </span>
                    <span className={dark ? "text-xs text-navy-foreground/60" : "text-xs text-muted-foreground"}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className={dark ? "mt-8 text-xl font-bold" : "mt-8 text-xl font-bold text-navy"}>{tool.name}</h3>
                  <p className={dark ? "mt-2 text-sm text-navy-foreground/70" : "mt-2 text-sm text-muted-foreground"}>
                    {tool.description}
                  </p>
                  <span
                    className={
                      dark
                        ? "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise"
                        : "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-turquoise-strong"
                    }
                  >
                    Experimentar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="mt-24 bg-surface py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Vitrine"
            title="Produtos impressos com precisão e carinho"
            description="Peças religiosas, miniaturas, chaveiros, luminárias e produtos em resina."
            action={
              <Button variant="navy" asChild>
                <Link to="/loja">
                  Ver loja completa <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/loja"
                search={{ categoria: c.id }}
                className="group relative overflow-hidden rounded-2xl bg-background shadow-soft"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-navy-foreground">
                  <p className="font-display text-base font-bold">{c.name}</p>
                  <p className="mt-0.5 text-xs text-navy-foreground/75">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 3D CENTRICO */}
      <section className="container-page mt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep text-navy-foreground shadow-elevated">
          <img
            src={workshop}
            alt="Oficina de impressão 3D da 3D Cêntrico"
            loading="lazy"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/20" />
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-turquoise/40 bg-turquoise/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
                Marca parceira oficial
              </span>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
                3D <span className="text-turquoise">CÊNTRICO</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-navy-foreground/80">
                Estúdio especializado em impressão 3D artesanal: peças sacras, colecionáveis e projetos sob medida com
                acabamento de galeria.
              </p>
              <ul className="mt-6 grid max-w-lg gap-3 sm:grid-cols-2">
                {["Resina 8K de alta definição", "Pintura feita à mão", "Projetos 100% personalizados", "Orçamento em até 24h"].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-turquoise" /> {f}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/personalizados">Solicitar orçamento</Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/loja">Ver coleção</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 content-end gap-3 self-end">
              {[
                ["+3.500", "peças entregues"],
                ["0,025mm", "precisão"],
                ["100%", "nacional"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-4 backdrop-blur-md">
                  <p className="font-display text-xl font-bold text-turquoise sm:text-2xl">{v}</p>
                  <p className="mt-1 text-xs text-navy-foreground/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container-page mt-24">
        <SectionHeading
          align="center"
          eyebrow="Por que INOVIX"
          title="Uma experiência pensada para você"
          description="Qualidade, segurança e tecnologia em cada etapa — da ferramenta online à entrega na sua porta."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="card-lift flex gap-4 rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-turquoise-soft text-turquoise-strong">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold text-navy">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-surface p-6">
              <Quote className="h-6 w-6 text-turquoise" />
              <blockquote className="mt-3 text-[15px] leading-relaxed text-navy">“{t.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-turquoise">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
