import { useState } from "react";
import { Info, PiggyBank } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import NumField from "@/components/NumField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fmtEur, fmtPct, parseNum } from "@/lib/margin";
import { COEFFICIENTS, INPS_FUNDS, TAX_RATES, computeForfettario } from "@/lib/piva";

const COLORS = ["#8B5CF6", "#F59E0B", "#10B981"];

export default function ForfettarioTool() {
  const [fatturato, setFatturato] = useState("40.000");
  const [coeffId, setCoeffId] = useState("professionisti");
  const [taxId, setTaxId] = useState("startup");
  const [fundId, setFundId] = useState("separata");

  const coeff = COEFFICIENTS.find((c) => c.id === coeffId) ?? COEFFICIENTS[0];
  const tax = TAX_RATES.find((t) => t.id === taxId) ?? TAX_RATES[0];
  const fund = INPS_FUNDS.find((f) => f.id === fundId) ?? INPS_FUNDS[0];

  const fatt = parseNum(fatturato);
  const r = computeForfettario(fatt, coeff.rate, tax.rate, fundId);
  const positive = r.netto >= 0;

  const slices = [
    { name: "Tasse (imposta sostitutiva)", value: r.tasse },
    { name: "Contributi INPS", value: r.inps },
    { name: "Netto in tasca", value: Math.max(r.netto, 0) },
  ];
  const total = slices.reduce((s, x) => s + x.value, 0);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <section className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 animate-rise" data-testid="forfettario-form">
        <h2 className="font-heading text-lg font-bold text-slate-900">Dati della tua attività</h2>

        <NumField id="fatturato" label="Fatturato lordo annuo stimato" value={fatturato} onChange={setFatturato} suffix="€" testid="input-fatturato" hint="Incassi annui previsti (limite regime forfettario: 85.000 €)" />

        <div className="space-y-1.5">
          <Label className="text-sm font-semibold text-slate-800">Categoria attività / Coefficiente di redditività</Label>
          <Select value={coeffId} onValueChange={(v: string) => setCoeffId(v)}>
            <SelectTrigger className="h-11 w-full bg-white" data-testid="select-coefficiente">
              <SelectValue>{(v) => { const c = COEFFICIENTS.find((x) => x.id === v); return c ? `${c.label} (${c.rate}%)` : ""; }}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COEFFICIENTS.map((c) => (
                <SelectItem key={c.id} value={c.id} data-testid={`coefficiente-option-${c.id}`}>
                  {c.label} ({c.rate}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-800">Aliquota imposta sostitutiva</Label>
          <div role="radiogroup" className="grid grid-cols-2 gap-2" data-testid="radio-aliquota">
            {TAX_RATES.map((t) => {
              const active = t.id === taxId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setTaxId(t.id)}
                  data-testid={`aliquota-option-${t.id}`}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow,transform] duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                    active ? "border-slate-900 bg-slate-900 text-white shadow-md" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm",
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold">{t.label}</span>
                    <span className={cn("font-mono text-xs font-semibold", active ? "text-emerald-300" : "text-emerald-700")}>{t.rate}%</span>
                  </span>
                  <span className={cn("mt-0.5 block text-xs", active ? "text-slate-300" : "text-slate-500")}>{t.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
          <Label className="text-sm font-semibold text-slate-800">Cassa previdenziale INPS</Label>
          <Select value={fundId} onValueChange={(v: string) => setFundId(v)}>
            <SelectTrigger className="h-11 w-full bg-white" data-testid="select-inps">
              <SelectValue>{(v) => INPS_FUNDS.find((f) => f.id === v)?.label ?? ""}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {INPS_FUNDS.map((f) => (
                <SelectItem key={f.id} value={f.id} data-testid={`inps-option-${f.id}`}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="flex items-start gap-1.5 pt-1 text-xs text-slate-500" data-testid="inps-description">
            <Info className="mt-0.5 size-3.5 shrink-0" /> {fund.description}. I contributi sono dedotti dal reddito prima delle tasse.
          </p>
        </div>
      </section>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-5 animate-rise [animation-delay:80ms]">
        <div
          className={cn("relative overflow-hidden rounded-2xl p-6 shadow-lg transition-colors duration-300 sm:p-7", positive ? "bg-[#064E3B] text-emerald-50" : "bg-[#7F1D1D] text-red-50")}
          data-testid="card-netto-annuo"
          data-state={positive ? "profit" : "loss"}
        >
          <div className={cn("absolute -right-16 -top-16 size-48 rounded-full blur-3xl", positive ? "bg-emerald-400/25" : "bg-red-400/25")} />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">Guadagno netto annuo</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-bold text-white">
                <PiggyBank className="size-3.5" /> In tasca
              </span>
            </div>
            <p key={r.netto.toFixed(2)} className="mt-3 font-mono text-4xl font-bold tracking-tight animate-pop sm:text-5xl" data-testid="value-netto-annuo">
              {fmtEur(r.netto)}
            </p>
            <div className="mt-5 flex items-end justify-between border-t border-white/15 pt-4">
              <div>
                <p className="text-xs text-emerald-200">Netto mensile reale</p>
                <p className="font-mono text-2xl font-semibold" data-testid="value-netto-mensile">
                  {fmtEur(r.nettoMensile)}<span className="text-sm font-normal text-emerald-200">/mese</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-200">Carico fiscale totale</p>
                <p className="font-mono text-lg font-semibold" data-testid="value-carico-fiscale">{fmtPct(r.caricoPct)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm" data-testid="chart-forfettario">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-slate-900">Dove va il tuo fatturato</h3>
            <span className="font-mono text-sm font-semibold text-slate-500">{fmtEur(fatt)}</span>
          </div>
          <div className="mt-2 grid grid-cols-1 items-center gap-4 sm:grid-cols-[160px_1fr]">
            <div className="relative mx-auto h-40 w-40">
              {total > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={slices} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={2} stroke="none" isAnimationActive={false}>
                      {slices.map((s, i) => <Cell key={s.name} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(value: number) => fmtEur(value)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="grid h-full place-items-center rounded-full border-8 border-slate-100 text-xs text-slate-400">Nessun dato</div>
              )}
            </div>
            <ul className="space-y-2.5">
              {slices.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {s.name}
                  </span>
                  <span className="font-mono font-semibold text-slate-900">{fmtEur(s.value)}</span>
                </li>
              ))}
            </ul>
          </div>
          <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
            {[
              { k: `Reddito imponibile (${coeff.rate}%)`, v: fmtEur(r.reddito), t: "value-reddito-imponibile" },
              { k: "Contributi INPS", v: fmtEur(r.inps), t: "value-contributi-inps" },
              { k: `Tasse da accantonare (${tax.rate}%)`, v: fmtEur(r.tasse), t: "value-tasse-accantonare" },
              { k: "Carico fiscale totale", v: fmtPct(r.caricoPct), t: "value-carico-fiscale-detail" },
            ].map((row) => (
              <div key={row.t} className="flex items-center justify-between px-4 py-2.5">
                <dt className="text-slate-600">{row.k}</dt>
                <dd className="font-mono font-semibold text-slate-900" data-testid={row.t}>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
