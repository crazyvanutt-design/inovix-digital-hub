import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Linkedin, Facebook, Mail, Phone, MapPin, Send, CreditCard, QrCode, Barcode } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Plataforma",
    links: [
      { to: "/ferramentas", label: "Ferramentas online" },
      { to: "/ia", label: "Inteligência artificial" },
      { to: "/aprenda", label: "Aprenda" },
      { to: "/planos", label: "Planos" },
    ],
  },
  {
    title: "Loja",
    links: [
      { to: "/loja", label: "Todos os produtos" },
      { to: "/personalizados", label: "Personalizados" },
      { to: "/personalizados", label: "3D CÊNTRICO" },
      { to: "/carrinho", label: "Carrinho" },
    ],
  },
  {
    title: "Conta",
    links: [
      { to: "/conta", label: "Minha conta" },
      { to: "/conta", label: "Meus pedidos" },
      { to: "/planos", label: "Assinatura" },
      { to: "/aprenda", label: "Central de ajuda" },
    ],
  },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Inscrição de demonstração realizada!", { description: "Nenhum e-mail foi enviado." });
    setEmail("");
  };

  return (
    <footer className="mt-24 bg-navy-gradient pt-14 text-navy-foreground">
      <div className="container-page">
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-navy-foreground/10 bg-navy-deep p-6 shadow-elevated sm:p-8 md:flex md:items-center md:justify-between md:gap-10">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="relative">
            <h3 className="text-xl font-bold sm:text-2xl">Receba novidades e ofertas exclusivas</h3>
            <p className="mt-1 text-sm text-navy-foreground/70">Lançamentos, cupons e tutoriais toda semana.</p>
          </div>
          <form onSubmit={subscribe} className="relative mt-5 flex w-full max-w-md gap-2 md:mt-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="h-12 flex-1 rounded-xl border border-navy-foreground/15 bg-navy-foreground/10 px-4 text-sm text-navy-foreground outline-none placeholder:text-navy-foreground/50 focus:border-turquoise"
            />
            <Button type="submit" variant="hero" size="lg" className="px-5">
              <Send /> Assinar
            </Button>
          </form>
        </div>

        <div className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.2fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
              Tecnologia, criatividade e soluções em um só lugar. Ferramentas digitais, inteligência artificial e
              produtos personalizados feitos no Brasil.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Youtube, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-foreground/10 transition hover:bg-turquoise hover:text-navy-deep"
                  aria-label="Rede social (demonstração)"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-turquoise">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-navy-foreground/75 transition hover:text-navy-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-turquoise">Atendimento</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-turquoise" /> (00) 0000-0000</li>
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-turquoise" /> contato@inovix.demo</li>
              <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-turquoise" /> Brasil</li>
            </ul>
            <p className="mt-4 text-xs text-navy-foreground/50">Seg. a sex., 9h às 18h</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-navy-foreground/10 py-6 text-xs text-navy-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} INOVIX. Protótipo de demonstração — produtos e preços fictícios.</p>
          <div className="flex items-center gap-2">
            <span className="mr-1">Formas de pagamento:</span>
            {[
              { Icon: QrCode, label: "Pix" },
              { Icon: CreditCard, label: "Cartão" },
              { Icon: Barcode, label: "Boleto" },
            ].map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 rounded-lg bg-navy-foreground/10 px-2.5 py-1.5">
                <Icon className="h-3.5 w-3.5 text-turquoise" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
