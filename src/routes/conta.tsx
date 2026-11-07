import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, LogOut, MapPin, Package, Settings, ShieldCheck, Sparkles, User, CreditCard, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useDemoAuth } from "@/lib/demo-auth";
import { formatBRL } from "@/lib/format";
import { getFeaturedProducts } from "@/services/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Minha conta — INOVIX" },
      { name: "description", content: "Acesse seus pedidos, favoritos, assinatura e dados da sua conta INOVIX." },
      { property: "og:title", content: "Minha conta — INOVIX" },
      { property: "og:description", content: "Pedidos, favoritos, assinatura e dados da sua conta INOVIX." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Conta,
});

const field = "mt-1.5 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise focus:ring-4 focus:ring-turquoise/15";

function AuthForm() {
  const { signIn } = useDemoAuth();
  const [mode, setMode] = useState<"login" | "cadastro">("login");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    signIn(String(fd.get("email")), String(fd.get("name") ?? ""));
    toast.success(mode === "login" ? "Login de demonstração realizado" : "Conta de demonstração criada");
  };

  return (
    <div className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
      <div className="relative hidden overflow-hidden rounded-[2rem] bg-navy-gradient p-12 text-navy-foreground lg:block">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative">
          <Logo inverted />
          <h1 className="mt-10 text-4xl font-bold leading-tight">Tudo o que você cria, <span className="text-turquoise">em um só lugar</span></h1>
          <ul className="mt-8 space-y-4 text-navy-foreground/80">
            {[
              [Package, "Acompanhe seus pedidos em tempo real"],
              [Sparkles, "Histórico das suas criações com IA"],
              [Heart, "Salve seus produtos favoritos"],
              [ShieldCheck, "Dados protegidos com segurança"],
            ].map(([Icon, t], i) => {
              const I = Icon as typeof Package;
              return (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-foreground/10"><I className="h-4 w-4 text-turquoise" /></span>
                  {t as string}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="flex rounded-xl bg-surface p-1">
          {(["login", "cadastro"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-semibold transition",
                mode === m ? "bg-background text-navy shadow-soft" : "text-muted-foreground",
              )}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>
        <h2 className="mt-8 text-3xl font-bold text-navy">{mode === "login" ? "Bem-vindo de volta" : "Crie sua conta grátis"}</h2>
        <p className="mt-2 text-sm text-muted-foreground">Ambiente de demonstração: use qualquer e-mail e senha.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "cadastro" && (
            <label className="block text-sm font-medium text-navy">Nome completo<input name="name" required className={field} placeholder="Seu nome" /></label>
          )}
          <label className="block text-sm font-medium text-navy">E-mail<input name="email" type="email" required className={field} placeholder="voce@exemplo.com" /></label>
          <label className="block text-sm font-medium text-navy">Senha<input name="password" type="password" required minLength={4} className={field} placeholder="••••••••" /></label>
          {mode === "login" && (
            <button type="button" onClick={() => toast("Recuperação de senha (demonstração)")} className="text-sm font-semibold text-turquoise-strong">
              Esqueci minha senha
            </button>
          )}
          <Button type="submit" variant="navy" size="lg" className="w-full">{mode === "login" ? "Entrar" : "Criar conta"}</Button>
          <div className="relative py-2 text-center text-xs text-muted-foreground">
            <span className="relative z-10 bg-background px-3">ou continue com</span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((p) => (
              <Button key={p} type="button" variant="outline" className="text-navy" onClick={() => toast(`Login com ${p} será ativado futuramente`)}>{p}</Button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

const orders = [
  { id: "#INX-10482", date: "02/11/2026", status: "Em produção", total: 189.9 },
  { id: "#INX-10377", date: "21/10/2026", status: "Enviado", total: 279.8 },
  { id: "#INX-10211", date: "03/10/2026", status: "Entregue", total: 59.7 },
];

const statusStyle: Record<string, string> = {
  "Em produção": "bg-warning/20 text-navy",
  Enviado: "bg-turquoise-soft text-turquoise-strong",
  Entregue: "bg-success/15 text-success",
};

const tabs = [
  { id: "geral", label: "Visão geral", icon: LayoutDashboard },
  { id: "pedidos", label: "Meus pedidos", icon: Package },
  { id: "favoritos", label: "Favoritos", icon: Heart },
  { id: "assinatura", label: "Assinatura", icon: CreditCard },
  { id: "dados", label: "Meus dados", icon: Settings },
] as const;

function Dashboard() {
  const { user, signOut } = useDemoAuth();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("geral");
  if (!user) return null;

  const ordersTable = (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <table className="w-full min-w-[480px] text-sm">
        <thead className="bg-surface text-left text-muted-foreground">
          <tr><th className="p-4 font-medium">Pedido</th><th className="p-4 font-medium">Data</th><th className="p-4 font-medium">Status</th><th className="p-4 text-right font-medium">Total</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-4 font-semibold text-navy">{o.id}</td>
              <td className="p-4 text-muted-foreground">{o.date}</td>
              <td className="p-4"><span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", statusStyle[o.status])}>{o.status}</span></td>
              <td className="p-4 text-right font-semibold text-navy">{formatBRL(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-3xl border bg-card p-4">
        <div className="flex items-center gap-3 border-b p-2 pb-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-turquoise">{user.name[0]}</span>
          <div className="min-w-0">
            <p className="truncate font-bold text-navy">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="mt-3 flex gap-1 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                tab === t.id ? "bg-turquoise-soft text-navy" : "text-muted-foreground hover:bg-muted hover:text-navy",
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
          <button onClick={signOut} className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </nav>
      </aside>

      <section>
        <h1 className="text-3xl font-bold text-navy">{tab === "geral" ? `Olá, ${user.name.split(" ")[0]}!` : tabs.find((t) => t.id === tab)?.label}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Área de demonstração com dados fictícios.</p>

        {tab === "geral" && (
          <div className="mt-8 space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Pedidos", "12", Package],
                ["Textos com IA", "148 / 300", Sparkles],
                ["Favoritos", "7", Heart],
              ].map(([l, v, Icon]) => {
                const I = Icon as typeof Package;
                return (
                  <div key={l as string} className="rounded-2xl border bg-card p-5">
                    <I className="h-5 w-5 text-turquoise-strong" />
                    <p className="mt-4 font-display text-2xl font-bold text-navy">{v as string}</p>
                    <p className="text-xs text-muted-foreground">{l as string}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-navy-gradient p-6 text-navy-foreground sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-turquoise">Plano atual</p>
                <p className="font-display text-2xl font-bold">{user.plan}</p>
                <p className="text-sm text-navy-foreground/70">Renova em 06/12/2026</p>
              </div>
              <Button variant="hero" asChild><Link to="/planos">Gerenciar plano</Link></Button>
            </div>
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-navy">Pedidos recentes</h2>
              {ordersTable}
            </div>
          </div>
        )}
        {tab === "pedidos" && <div className="mt-8">{ordersTable}</div>}
        {tab === "favoritos" && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {getFeaturedProducts(3).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        {tab === "assinatura" && (
          <div className="mt-8 rounded-2xl border bg-card p-6">
            <p className="font-display text-xl font-bold text-navy">Plano {user.plan}</p>
            <p className="mt-1 text-sm text-muted-foreground">R$ 29,90/mês · Cartão final 4242 (fictício)</p>
            <div className="mt-6 flex gap-3">
              <Button variant="navy" asChild><Link to="/planos">Mudar de plano</Link></Button>
              <Button variant="outline" onClick={() => toast("Cancelamento de demonstração")}>Cancelar</Button>
            </div>
          </div>
        )}
        {tab === "dados" && (
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Dados salvos (demonstração)"); }}
            className="mt-8 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-2"
          >
            <label className="text-sm font-medium text-navy"><span className="flex items-center gap-2"><User className="h-4 w-4" /> Nome</span><input defaultValue={user.name} className={field} /></label>
            <label className="text-sm font-medium text-navy">E-mail<input defaultValue={user.email} className={field} /></label>
            <label className="text-sm font-medium text-navy">Telefone<input placeholder="(00) 00000-0000" className={field} /></label>
            <label className="text-sm font-medium text-navy"><span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> CEP</span><input placeholder="00000-000" className={field} /></label>
            <Button type="submit" variant="navy" className="w-fit sm:col-span-2">Salvar alterações</Button>
          </form>
        )}
      </section>
    </div>
  );
}

function Conta() {
  const { user } = useDemoAuth();
  return user ? <Dashboard /> : <AuthForm />;
}
