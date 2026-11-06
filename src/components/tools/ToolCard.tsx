import {
  ArrowLeftRight,
  ArrowUpRight,
  Box,
  Calculator,
  Eraser,
  FileArchive,
  Files,
  FileText,
  ImagePlus,
  Minimize2,
  QrCode,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import type { Tool } from "@/data/types";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  ArrowLeftRight,
  Box,
  Calculator,
  Eraser,
  FileArchive,
  Files,
  FileText,
  ImagePlus,
  Minimize2,
  QrCode,
  Sparkles,
  Wand2,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} />;
}

export function ToolCard({ tool, onOpen, featured = false }: { tool: Tool; onOpen?: () => void; featured?: boolean }) {
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group card-lift relative flex h-full flex-col rounded-2xl border bg-card p-5 text-left",
        featured && "p-6",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-turquoise-soft text-turquoise-strong transition group-hover:bg-navy group-hover:text-turquoise">
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </span>
        <div className="flex gap-1.5">
          {tool.pro && (
            <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-foreground">
              Pro
            </span>
          )}
          {tool.popular && (
            <span className="rounded-full bg-turquoise-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-turquoise-strong">
              Popular
            </span>
          )}
        </div>
      </div>
      <h3 className="mt-4 text-[17px] font-bold text-navy">{tool.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
        <span className="text-muted-foreground">{tool.uses}</span>
        <span className="flex items-center gap-1 font-semibold text-turquoise-strong">
          Abrir <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  );
}
