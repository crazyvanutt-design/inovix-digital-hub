import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useDemoAuth } from "@/lib/demo-auth";
import { mainNav } from "./nav";

function SearchBox({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/loja", search: q.trim() ? { q: q.trim() } : {} });
    onDone?.();
  };
  return (
    <form onSubmit={submit} className="relative w-full" role="search">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar produtos, ferramentas, tutoriais..."
        aria-label="Buscar"
        className="h-11 w-full rounded-xl border border-input bg-surface pl-11 pr-24 text-sm outline-none transition placeholder:text-muted-foreground focus:border-turquoise focus:bg-background focus:ring-4 focus:ring-turquoise/15"
      />
      <Button type="submit" variant="navy" size="sm" className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2">
        Buscar
      </Button>
    </form>
  );
}

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const { user } = useDemoAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy-deep text-navy-foreground">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-turquoise" /> Frete grátis acima de R$ 199
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-turquoise" /> Compra 100% segura
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-navy-foreground/70">
            <Sparkles className="h-3.5 w-3.5 text-turquoise" /> Ambiente de demonstração
          </span>
        </div>
      </div>

      <div className="border-b bg-background/90 backdrop-blur-xl">
        <div className="container-page flex h-[72px] items-center gap-4 lg:gap-8">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="!h-5 !w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="border-b p-5">
                <Logo />
              </div>
              <div className="p-5">
                <SearchBox onDone={() => setMenuOpen(false)} />
              </div>
              <nav className="flex flex-col px-3">
                {mainNav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-[15px] font-semibold text-navy hover:bg-muted"
                    activeProps={{ className: "bg-turquoise-soft text-turquoise-strong" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/conta"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-semibold text-navy hover:bg-muted"
                >
                  Minha conta
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Logo />

          <div className="hidden flex-1 md:block">
            <SearchBox />
          </div>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <Link
              to="/conta"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition hover:bg-muted"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turquoise-soft text-turquoise-strong">
                <User className="h-[18px] w-[18px]" />
              </span>
              <span className="hidden leading-tight xl:block">
                <span className="block text-xs text-muted-foreground">{user ? "Olá," : "Bem-vindo"}</span>
                <span className="block font-semibold text-navy">{user ? user.name.split(" ")[0] : "Entrar / Cadastrar"}</span>
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="relative flex h-11 items-center gap-2 rounded-xl bg-navy px-3.5 text-sm font-semibold text-navy-foreground shadow-soft transition hover:bg-navy-soft"
              aria-label={`Carrinho com ${count} itens`}
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-turquoise px-1.5 text-[11px] font-bold text-navy-deep">
                {count}
              </span>
            </button>
          </div>
        </div>

        <nav className="hidden border-t lg:block">
          <div className="container-page flex h-12 items-center gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition hover:text-navy"
                activeProps={{
                  className:
                    "!text-navy after:absolute after:inset-x-3.5 after:-bottom-[7px] after:h-[3px] after:rounded-full after:bg-turquoise",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/personalizados"
              className="ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-turquoise-strong hover:bg-turquoise-soft"
            >
              <span className="h-2 w-2 rounded-full bg-turquoise" /> 3D CÊNTRICO
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
