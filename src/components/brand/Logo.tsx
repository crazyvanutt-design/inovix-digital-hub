import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-navy" />
      <path d="M12 12 L28 28" strokeWidth="4.2" strokeLinecap="round" className="stroke-turquoise" />
      <path d="M28 12 L12 28" strokeWidth="4.2" strokeLinecap="round" className="stroke-navy-foreground" />
      <circle cx="28" cy="12" r="3.2" className="fill-turquoise" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="INOVIX — início">
      <LogoMark />
      <span
        className={cn(
          "font-display text-[22px] font-extrabold tracking-tight",
          inverted ? "text-navy-foreground" : "text-navy",
        )}
      >
        INOVI<span className="text-turquoise">X</span>
      </span>
    </Link>
  );
}
