import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { UploadCloud, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Tool } from "@/data/types";
import { formatBRL } from "@/lib/format";
import { ToolIcon } from "./ToolCard";

const field =
  "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-turquoise focus:ring-4 focus:ring-turquoise/15";

function PercentCalculator() {
  const [pct, setPct] = useState("15");
  const [value, setValue] = useState("250");
  const result = (Number(pct) / 100) * Number(value);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-medium text-navy">
          Porcentagem (%)
          <input className={`${field} mt-1.5`} inputMode="decimal" value={pct} onChange={(e) => setPct(e.target.value)} />
        </label>
        <label className="text-sm font-medium text-navy">
          De um valor
          <input className={`${field} mt-1.5`} inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <div className="rounded-2xl bg-navy-gradient p-5 text-navy-foreground">
        <p className="text-xs text-navy-foreground/70">Resultado</p>
        <p className="font-display text-3xl font-bold text-turquoise">
          {Number.isFinite(result) ? result.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) : "—"}
        </p>
        <p className="mt-1 text-xs text-navy-foreground/70">
          {pct}% de {value}
        </p>
      </div>
    </div>
  );
}

function PrintCostCalculator() {
  const [grams, setGrams] = useState("120");
  const [pricePerKg, setPricePerKg] = useState("110");
  const [hours, setHours] = useState("6");
  const [margin, setMargin] = useState("60");
  const material = (Number(grams) / 1000) * Number(pricePerKg);
  const energy = Number(hours) * 0.12 * 0.9; // ~120W @ R$0,90/kWh (demo)
  const cost = material + energy;
  const price = cost * (1 + Number(margin) / 100);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Filamento (g)", grams, setGrams],
          ["Preço do kg (R$)", pricePerKg, setPricePerKg],
          ["Tempo (horas)", hours, setHours],
          ["Margem (%)", margin, setMargin],
        ].map(([label, v, set]) => (
          <label key={label as string} className="text-sm font-medium text-navy">
            {label as string}
            <input
              className={`${field} mt-1.5`}
              inputMode="decimal"
              value={v as string}
              onChange={(e) => (set as (s: string) => void)(e.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-surface p-4">
          <p className="text-xs text-muted-foreground">Custo de produção</p>
          <p className="font-display text-xl font-bold text-navy">{formatBRL(cost || 0)}</p>
        </div>
        <div className="rounded-2xl bg-navy p-4 text-navy-foreground">
          <p className="text-xs text-navy-foreground/70">Preço sugerido</p>
          <p className="font-display text-xl font-bold text-turquoise">{formatBRL(price || 0)}</p>
        </div>
      </div>
    </div>
  );
}

function UploadMock({ tool }: { tool: Tool }) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => toast("Upload de demonstração", { description: "O processamento real será ativado em breve." })}
        className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-turquoise/50 bg-turquoise-soft/50 p-10 text-center transition hover:border-turquoise hover:bg-turquoise-soft"
      >
        <UploadCloud className="h-10 w-10 text-turquoise-strong" />
        <span className="font-semibold text-navy">Arraste seu arquivo aqui ou clique para enviar</span>
        <span className="text-xs text-muted-foreground">
          {tool.category === "documentos" ? "PDF, DOCX, XLSX até 50 MB" : "JPG, PNG, WebP até 20 MB"}
        </span>
      </button>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" /> Seus arquivos são processados com segurança e apagados automaticamente.
      </p>
    </div>
  );
}

export function ToolDemoDialog({ tool, onOpenChange }: { tool: Tool | null; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={!!tool} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-3xl p-0">
        {tool && (
          <>
            <DialogHeader className="border-b p-6 text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-turquoise">
                  <ToolIcon name={tool.icon} className="h-5 w-5" />
                </span>
                <div>
                  <DialogTitle className="font-display text-lg text-navy">{tool.name}</DialogTitle>
                  <DialogDescription className="text-xs">{tool.description}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="p-6">
              {tool.id === "calculators" && <PercentCalculator />}
              {tool.id === "print-cost" && <PrintCostCalculator />}
              {tool.category === "ia" && (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Experimente a demonstração completa na área de Inteligência Artificial.
                  </p>
                  <Button variant="hero" size="lg" asChild onClick={() => onOpenChange(false)}>
                    <Link to="/ia">
                      Abrir área de IA <ArrowRight />
                    </Link>
                  </Button>
                </div>
              )}
              {!["calculators", "print-cost"].includes(tool.id) && tool.category !== "ia" && <UploadMock tool={tool} />}
              <p className="mt-5 rounded-xl bg-surface px-3 py-2 text-center text-[11px] text-muted-foreground">
                Versão de demonstração — processamento real será integrado futuramente.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
