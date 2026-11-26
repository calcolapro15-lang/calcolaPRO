import { useState } from "react";
import { toast } from "sonner";
import { CalendarRange, Copy, Info, RotateCcw, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AffiliateBox from "@/components/AffiliateBox";
import NumField from "@/components/NumField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/seo";
import { fmtEur, fmtNumIt, fmtPct, parseNum } from "@/lib/margin";
import { PORTALS, RENT_TAX, computeRent } from "@/lib/affitti";

const COLORS = ["#F59E0B", "#64748B", "#8B5CF6", "#10B981"];

const DEFAULTS = { price: "90", nights: 18, stays: "5", portal: "airbnb_host", cleaning: "35", fixed: "250", tax: "cedolare21", property: "" };

function SliderField({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="nights" className="text-sm font-semibold text-slate-800">Notti prenotate al mese</Label>
        <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-sm font-bold text-white" data-testid="value-nights">
          {value} {value === 1 ? "notte" : "notti"}
        </span>
      </div>
      <input
        id="nights"
        type="range"
        min={1}
        max={30}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-auto accent-emerald-600"
        data-testid="slider-nights"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>1</span>
        <span>Occupazione {fmtPct((value / 30) * 100)}</span>
        <span>30</span>
      </div>
    </div>
  );
}

export default function AffittiBrevi() {
  usePageMeta(
    "Calcolatore Rendita Netta Affitti Brevi e Cedolare Secca | CalcolaPro",
    "Scopri quanto rende davvero la tua casa vacanze su Airbnb e Booking: commissioni, pulizie, spese, cedolare secca 21% o 26% e resa netta sull'investimento.",
  );
  const [price, setPrice] = useState(DEFAULTS.price);
  const [nights, setNights] = useState(DEFAULTS.nights);
  const [stays, setStays] = useState(DEFAULTS.stays);
  const [portalId, setPortalId] = useState(DEFAULTS.portal);
  const [commission, setCommission] = useState(fmtNumIt(PORTALS[0].percentage));
  const [cleaning, setCleaning] = useState(DEFAULTS.cleaning);
  const [fixed, setFixed] = useState(DEFAULTS.fixed);
  const [taxId, setTaxId] = useState(DEFAULTS.tax);
  const [ordinaryRate, setOrdinaryRate] = useState("35");
  const [property, setProperty] = useState(DEFAULTS.property);

  const portal = PORTALS.find((p) => p.id === portalId) ?? PORTALS[0];
  const tax = RENT_TAX.find((t) => t.id === taxId) ?? RENT_TAX[0];
  const taxRate = tax.editable ? Math.min(parseNum(ordinaryRate), 100) : tax.rate;

  const pickPortal = (id: string) => {
    const p = PORTALS.find((x) => x.id === id);
    if (!p) return;
    setPortalId(id);
    setCommission(fmtNumIt(p.percentage));
  };

  const reset = () => {
    setPrice(DEFAULTS.price);
    setNights(DEFAULTS.nights);
    setStays(DEFAULTS.stays);
    pickPortal(DEFAULTS.portal);
    setCleaning(DEFAULTS.cleaning);
    setFixed(DEFAULTS.fixed);
    setTaxId(DEFAULTS.tax);
    setOrdinaryRate("35");
    setProperty(DEFAULTS.property);
  };

  const nums = {
    price: parseNum(price),
    nights,
    stays: parseNum(stays),
    commissionPct: parseNum(commission),
    cleaning: parseNum(cleaning),
    fixed: parseNum(fixed),
    taxRate,
    propertyPrice: parseNum(property),
  };
  const r = computeRent(nums);
  const positive = r.nettoMensile >= 0;
  const speseTot = r.pulizie + r.fisse;

  const slices = [
    { name: "Commissioni portale", value: r.commissioni },
    { name: "Pulizie e utenze", value: speseTot },
    { name: "Tasse", value: r.tasse },
    { name: "Tuo netto", value: Math.max(r.nettoMensile, 0) },
  ];
  const total = slices.reduce((s, x) => s + x.value, 0);

  const copySummary = async () => {
    const text = [
      "Riepilogo CalcolaPro — Rendita Affitti Brevi",
      `Prezzo medio a notte: ${fmtEur(nums.price)} × ${nights} notti/mese`,
      `Soggiorni al mese: ${fmtNumIt(nums.stays)}`,
      `Portale: ${portal.label} (${fmtNumIt(nums.commissionPct)}%)`,
      `Regime fiscale: ${tax.label} (${fmtNumIt(taxRate)}%)`,
      "",
      `Fatturato lordo mensile: ${fmtEur(r.lordo)}`,
      `Commissioni portale: ${fmtEur(r.commissioni)}`,
      `Spese pulizie: ${fmtEur(r.pulizie)}`,
      `Spese fisse mensili: ${fmtEur(r.fisse)}`,
      `Tasse: ${fmtEur(r.tasse)}`,
      "",
      `Guadagno netto mensile: ${fmtEur(r.nettoMensile)}`,
      `Guadagno netto annuo stimato: ${fmtEur(r.nettoAnnuo)}`,
      ...(r.roiPct !== null ? [`Resa netta annua sull'investimento: ${fmtPct(r.roiPct)}`] : []),
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast.success("Riepilogo copiato negli appunti!");
  };

  const sub = positive ? "text-emerald-200" : "text-red-200";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="mb-8 max-w-3xl animate-rise">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Airbnb · Booking · Diretto</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]" data-testid="page-title">
          Rendita Netta Affitti Brevi
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Calcola quanto ti rende davvero la tua casa vacanze, al netto di commissioni, pulizie, spese fisse e cedolare secca.
        </p>
      </section>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <section className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 animate-rise [animation-delay:80ms]" data-testid="rent-form">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900">Dati dell'immobile</h2>
            <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500 active:scale-[0.98]" data-testid="button-reset-rent">
              <RotateCcw className="size-3.5" /> Ripristina
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumField id="night-price" label="Prezzo medio a notte" value={price} onChange={setPrice} suffix="€" testid="input-night-price" />
            <NumField id="stays" label="Soggiorni medi al mese" value={stays} onChange={setStays} suffix="n." testid="input-stays" hint="Serve per calcolare le pulizie" />
          </div>

          <SliderField value={nights} onChange={setNights} />

          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-800">Commissioni portale</Label>
              <Select value={portalId} onValueChange={(v: string) => pickPortal(v)}>
                <SelectTrigger className="h-11 w-full bg-white" data-testid="select-portal">
                  <SelectValue>{(v) => PORTALS.find((p) => p.id === v)?.label ?? ""}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PORTALS.map((p) => (
                    <SelectItem key={p.id} value={p.id} data-testid={`portal-option-${p.id}`}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500" data-testid="portal-description">{portal.description}</p>
            </div>
            <NumField id="commission" label="Commissione % sul lordo" value={commission} onChange={setCommission} suffix="%" testid="input-portal-commission" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumField id="cleaning" label="Costo pulizie per soggiorno" value={cleaning} onChange={setCleaning} suffix="€" testid="input-cleaning-cost" />
            <NumField id="fixed" label="Spese mensili fisse" value={fixed} onChange={setFixed} suffix="€" testid="input-fixed-costs" hint="Utenze, Wi-Fi, condominio" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800">Regime fiscale</Label>
            <div role="radiogroup" className="grid grid-cols-1 gap-2 sm:grid-cols-3" data-testid="radio-rent-tax">
              {RENT_TAX.map((t) => {
                const active = t.id === taxId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTaxId(t.id)}
                    data-testid={`rent-tax-option-${t.id}`}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow,transform] duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                      active ? "border-slate-900 bg-slate-900 text-white shadow-md" : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm",
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold">{t.label}</span>
                      {!t.editable && <span className={cn("font-mono text-xs font-semibold", active ? "text-emerald-300" : "text-emerald-700")}>{t.rate}%</span>}
                    </span>
                    <span className={cn("mt-0.5 block text-xs", active ? "text-slate-300" : "text-slate-500")}>{t.description}</span>
                  </button>
                );
              })}
            </div>
            {tax.editable && (
              <div className="max-w-xs animate-rise">
                <NumField id="ordinary-rate" label="Aliquota IRPEF stimata" value={ordinaryRate} onChange={setOrdinaryRate} suffix="%" testid="input-ordinary-rate" />
              </div>
            )}
            <p className="flex items-start gap-1.5 text-xs text-slate-500">
              <Info className="mt-0.5 size-3.5 shrink-0" /> Le tasse sono calcolate sul fatturato lordo: commissioni e spese non sono deducibili.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <NumField id="property" label="Prezzo di acquisto dell'immobile (facoltativo)" value={property} onChange={setProperty} suffix="€" testid="input-property-price" hint="Inseriscilo per calcolare la resa netta annua sull'investimento" />
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-5 animate-rise [animation-delay:160ms]">
          <div
            className={cn("relative overflow-hidden rounded-2xl p-6 shadow-lg transition-colors duration-300 sm:p-7", positive ? "bg-[#064E3B] text-emerald-50" : "bg-[#7F1D1D] text-red-50")}
            data-testid="card-rent-net"
            data-state={positive ? "profit" : "loss"}
          >
            <div className={cn("absolute -right-16 -top-16 size-48 rounded-full blur-3xl", positive ? "bg-emerald-400/25" : "bg-red-400/25")} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className={cn("text-xs font-bold uppercase tracking-[0.18em]", sub)}>Guadagno netto mensile reale</p>
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white", positive ? "bg-emerald-700" : "bg-red-700")} data-testid="badge-rent-status">
                  {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {positive ? "In guadagno" : "In perdita"}
                </span>
              </div>
              <p key={r.nettoMensile.toFixed(2)} className="mt-3 font-mono text-4xl font-bold tracking-tight animate-pop sm:text-5xl" data-testid="value-rent-net-monthly">
                {fmtEur(r.nettoMensile)}
                <span className={cn("text-base font-normal", sub)}>/mese</span>
              </p>
              <div className={cn("mt-5 grid gap-3 border-t border-white/15 pt-4", r.roiPct !== null ? "grid-cols-2" : "grid-cols-1")}>
                <div>
                  <p className={cn("text-xs", sub)}>Netto annuo stimato</p>
                  <p className="font-mono text-xl font-semibold" data-testid="value-rent-net-annual">{fmtEur(r.nettoAnnuo)}<span className={cn("text-sm font-normal", sub)}>/anno</span></p>
                </div>
                {r.roiPct !== null && (
                  <div className="text-right">
                    <p className={cn("text-xs", sub)}>Resa netta annua</p>
                    <p className="font-mono text-xl font-semibold" data-testid="value-rent-roi">{fmtPct(r.roiPct)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm" data-testid="chart-rent-breakdown">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-slate-900">Ripartizione mensile</h3>
              <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-slate-500"><CalendarRange className="size-3.5" />{fmtEur(r.lordo)}</span>
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
                {!positive && (
                  <li className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-800" data-testid="rent-loss-note">
                    Le spese superano gli incassi di {fmtEur(-r.nettoMensile)} al mese.
                  </li>
                )}
              </ul>
            </div>
            <dl className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
              {[
                { k: "Fatturato lordo mensile", v: r.lordo, t: "value-rent-gross" },
                { k: `Commissioni portale (${fmtNumIt(nums.commissionPct)}%)`, v: r.commissioni, t: "value-rent-commissions" },
                { k: "Spese pulizie e utenze", v: speseTot, t: "value-rent-expenses" },
                { k: tax.editable ? `Tasse IRPEF (${fmtNumIt(taxRate)}%)` : `Tasse Cedolare Secca (${tax.rate}%)`, v: r.tasse, t: "value-rent-taxes" },
              ].map((row) => (
                <div key={row.t} className="flex items-center justify-between px-4 py-2.5">
                  <dt className="text-slate-600">{row.k}</dt>
                  <dd className="font-mono font-semibold text-slate-900" data-testid={row.t}>{fmtEur(row.v)}</dd>
                </div>
              ))}
            </dl>
            <Button onClick={copySummary} className="mt-5 h-11 w-full bg-slate-900 text-white transition-[background-color,transform] duration-150 hover:bg-slate-800 active:scale-[0.98]" data-testid="button-copy-rent-summary">
              <Copy className="size-4" /> Copia riepilogo
            </Button>
          </div>

          <AffiliateBox
            testid="box-affiliate-rent"
            title="Automatizza e proteggi la tua casa vacanze"
            subtitle="Strumenti selezionati per host di affitti brevi."
            primary={{ label: "Prova software gestionale per Airbnb/Booking", icon: CalendarRange, testid: "cta-rent-software" }}
            secondary={{ label: "Calcola assicurazione per affitti brevi", icon: ShieldCheck, testid: "cta-rent-insurance" }}
          />
        </aside>
      </div>
    </div>
  );
}
