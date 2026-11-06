import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-turquoise-strong">
            <span className="h-1.5 w-6 rounded-full bg-turquoise" /> {eyebrow}
          </span>
        )}
        <h2 className="mt-3 text-3xl font-bold text-navy sm:text-[2.25rem] sm:leading-tight">{title}</h2>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-turquoise/30 blur-3xl" />
      <div className="container-page relative py-14 sm:py-20">
        {breadcrumb && <p className="mb-4 text-xs text-navy-foreground/60">Início / {breadcrumb}</p>}
        <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/10 px-3 py-1 text-xs font-semibold text-turquoise backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
