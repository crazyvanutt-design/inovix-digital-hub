import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Copy, Image as ImageIcon, Languages, Loader2, Megaphone, PenLine, Sparkles, Wand2, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ia")({
  head: () => ({
    meta: [
      { title: "Inteligência Artificial — INOVIX" },
      {
        name: "description",
        content: "Gere textos, descrições de produtos, legendas e imagens com inteligência artificial em português.",
      },
      { property: "og:title", content: "Inteligência Artificial — INOVIX" },
      { property: "og:description", content: "Gere textos, descrições, legendas e imagens com IA em português." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IA,
});

const modes = [
  { id: "produto", label: "Descrição de produto", icon: PenLine },
  { id: "legenda", label: "Legenda para redes", icon: Megaphone },
  { id: "email", label: "E-mail profissional", icon: MessageSquareText },
] as const;

type Mode = (typeof modes)[number]["id"];

// DEMO: canned responses. Replace with a real AI call (server function) later.
function fakeGenerate(mode: Mode, topic: string, tone: string) {
  const t = topic.trim() || "luminária lua 3D";
  if (mode === "produto")
    return `✨ ${t.charAt(0).toUpperCase() + t.slice(1)} — design que encanta\n\nFeita com tecnologia de impressão 3D de alta precisão, esta peça une beleza e funcionalidade. Cada detalhe foi pensado para transformar o seu ambiente com personalidade e sofisticação.\n\n• Acabamento premium e durável\n• Produção nacional sob demanda\n• Ideal para presentear\n\nTom: ${tone}.`;
  if (mode === "legenda")
    return `Quando tecnologia encontra criatividade, nasce algo único. 💡\n\nConheça ${t} — feito camada por camada, com todo o cuidado que você merece.\n\n👉 Link na bio\n\n#impressao3d #design #inovix #feitonobrasil`;
  return `Olá,\n\nEspero que esteja bem. Gostaria de apresentar ${t}, uma solução pensada para atender às suas necessidades com qualidade e agilidade.\n\nFico à disposição para agendarmos uma conversa rápida esta semana.\n\nAtenciosamente,\nEquipe INOVIX`;
}

const aiTools = [
  { icon: PenLine, t: "Gerador de textos", d: "Artigos, descrições e roteiros em segundos." },
  { icon: ImageIcon, t: "Gerador de imagens", d: "Crie artes e mockups a partir de texto." },
  { icon: Wand2, t: "Removedor de fundo", d: "Recortes perfeitos com um clique." },
  { icon: Languages, t: "Tradutor inteligente", d: "Traduções naturais em mais de 30 idiomas." },
  { icon: Bot, t: "Assistente virtual", d: "Tire dúvidas e automatize tarefas." },
  { icon: Megaphone, t: "Marketing com IA", d: "Campanhas, anúncios e e-mails que convertem." },
];

function IA() {
  const [mode, setMode] = useState<Mode>("produto");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Profissional");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = () => {
    setLoading(true);
    setOutput("");
    setTimeout(() => {
      setOutput(fakeGenerate(mode, topic, tone));
      setLoading(false);
    }, 1100);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-turquoise/25 blur-3xl" />
        <div className="container-page relative pb-32 pt-16 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/10 px-3 py-1 text-xs font-semibold text-turquoise backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> INOVIX AI
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-6xl">
            Crie mais, em menos tempo, com <span className="text-turquoise">inteligência artificial</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-navy-foreground/75">
            Textos, imagens e automações em português, prontos para o seu negócio.
          </p>
        </div>
      </section>

      <section className="container-page relative z-10 -mt-24">
        <div className="grid overflow-hidden rounded-[2rem] border bg-card shadow-elevated lg:grid-cols-2">
          <div className="border-b p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-turquoise-strong">Gerador de textos</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition",
                    mode === m.id ? "border-navy bg-navy text-navy-foreground" : "hover:border-turquoise",
                  )}
                >
                  <m.icon className="h-4 w-4" /> {m.label}
                </button>
              ))}
            </div>
            <label className="mt-6 block text-sm font-medium text-navy">
              Sobre o que você quer escrever?
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                placeholder="ex.: luminária lua 3D com base de madeira"
                className="mt-1.5 w-full rounded-xl border bg-background p-3 text-sm outline-none focus:border-turquoise focus:ring-4 focus:ring-turquoise/15"
              />
            </label>
            <div className="mt-4">
              <p className="text-sm font-medium text-navy">Tom de voz</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Profissional", "Descontraído", "Persuasivo", "Inspirador"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                      tone === t ? "border-turquoise bg-turquoise-soft text-turquoise-strong" : "text-muted-foreground hover:border-turquoise",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Button variant="hero" size="lg" className="mt-6 w-full" onClick={generate} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} {loading ? "Gerando..." : "Gerar texto"}
            </Button>
          </div>
          <div className="flex flex-col bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Resultado</p>
              {output && (
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(output);
                    toast.success("Texto copiado");
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-turquoise-strong"
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar
                </button>
              )}
            </div>
            <div className="mt-4 min-h-[260px] flex-1 whitespace-pre-line rounded-2xl border bg-background p-5 text-sm leading-relaxed text-foreground">
              {loading ? (
                <div className="space-y-3">
                  {[90, 75, 85, 60].map((w) => (
                    <div key={w} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : output ? (
                output
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <Bot className="h-10 w-10 text-turquoise" />
                  <p className="mt-3">Seu texto aparecerá aqui.</p>
                </div>
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">Demonstração com respostas de exemplo — a IA real será conectada futuramente.</p>
          </div>
        </div>
      </section>

      <section className="container-page mt-24">
        <SectionHeading
          eyebrow="Ferramentas de IA"
          title="Um estúdio criativo inteiro com IA"
          action={
            <Button variant="navy" asChild>
              <Link to="/planos">Ver planos com IA</Link>
            </Button>
          }
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiTools.map((a) => (
            <div key={a.t} className="group card-lift rounded-2xl border bg-card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise-soft text-turquoise-strong transition group-hover:bg-navy group-hover:text-turquoise">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{a.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
