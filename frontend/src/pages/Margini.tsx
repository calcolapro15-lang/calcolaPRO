import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, Landmark, RotateCcw, Truck, TrendingDown, TrendingUp, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { apiGet } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NumField from "@/components/NumField";
import AffiliateBox from "@/components/AffiliateBox";
import { usePageMeta } from "@/lib/seo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  FALLBACK_PRESETS,
  computeMargin,
  fmtEur,
  fmtNumIt,
  fmtPct,
  parseNum,
  type Presets,
} from "@/lib/margin";

const DEFAULTS = { price: "49,90", cost: "18,00", shipping: "4,90", other: "1,50", platform: "ebay", tax: "none" };

const SLICE_COLORS = ["#64748B", "#F59E0B", "#8B5CF6", "#10B981"];

export default function Margini() {
  usePageMeta(
    "Calcolatore Margini E-commerce, Vinted, eBay e Amazon | CalcolaPro",
    "Calcola gratis il guadagno netto reale e il margine % delle tue vendite su Vinted, eBay, Shopify e Amazon, al netto di commissioni, spedizione e tasse.",
  );
  const { data } = useQuery({
    queryKey: ["presets"],
    queryFn: () => apiGet<Presets>("/presets"),
    retry: false,
    staleTime: Infinity,
  });
  const presets = data ?? FALLBACK_PRESETS;

  const [price, setPrice] = useState(DEFAULTS.price);
  const [cost, setCost] = useState(DEFAULTS.cost);
  const [shipping, setShipping] = useState(DEFAULTS.shipping);
  const [other, setOther] = useState(DEFAULTS.other);
  const [platformId, setPlatformId] = useState(DEFAULTS.platform);
  const [feePct, setFeePct] = useState("11");
  const [feeFixed, setFeeFixed] = useState("0,35");
  const [taxId, setTaxId] = useState(DEFAULTS.tax);

  const platform = presets.platforms.find((p) => p.id === platformId) ?? presets.platforms[0];
  const tax = presets.tax_regimes.find((t) => t.id === taxId) ?? presets.tax_regimes[0];

  const pickPlatform = (id: string) => {
    const p = presets.platforms.find((x) => x.id === id);
    if (!p) return;
    setPlatformId(id);
    setFeePct(fmtNumIt(p.percentage));
    setFeeFixed(fmtNumIt(p.fixed));
  };

  const reset = () => {
    setPrice(DEFAULTS.price);
    setCost(DEFAULTS.cost);
    setShipping(DEFAULTS.shipping);
    setOther(DEFAULTS.other);
    pickPlatform(DEFAULTS.platform);
    setTaxId(DEFAULTS.tax);
  };

  const nums = {
    price: parseNum(price),
    cost: parseNum(cost),
    shipping: parseNum(shipping),
    other: parseNum(other),
    feePct: parseNum(feePct),
    feeFixed: parseNum(feeFixed),
    taxRate: tax.rate,
  };
  const r = computeMargin(nums);
  const positive = r.net >= 0;
  const feesAndShipping = r.fee + nums.shipping + nums.other;

  const slices = useMemo(
    () => [
      { name: "Costo prodotto", value: nums.cost },
      { name: "Commissioni & Spedizione", value: feesAndShipping },
      { name: "Tasse", value: r.taxes },
      { name: "Tuo guadagno netto", value: Math.max(r.net, 0) },
    ],
    [nums.cost, feesAndShipping, r.taxes, r.net],
  );
  const sliceTotal = slices.reduce((s, x) => s + x.value, 0);

  const copySummary = async () => {
    const text = [
      "Riepilogo CalcolaPro — Margini E-commerce",
      `Piattaforma: ${platform.label} (${fmtNumIt(nums.feePct)}% + ${fmtEur(nums.feeFixed)})`,
      `Regime fiscale: ${tax.label} (${tax.rate}%)`,
      "",
      `Prezzo di vendita: ${fmtEur(nums.price)}`,
      `Costo prodotto: ${fmtEur(nums.cost)}`,
      `Spedizione: ${fmtEur(nums.shipping)}`,
      `Altri costi / Packaging: ${fmtEur(nums.other)}`,
      `Commissioni piattaforma: ${fmtEur(r.fee)}`,
      `Tasse stimate: ${fmtEur(r.taxes)}`,
      "",
      `Guadagno netto: ${fmtEur(r.net)}`,
      `Margine: ${fmtPct(r.marginPct)}`,
      `ROI: ${fmtPct(r.roiPct)}`,
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

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="mb-8 max-w-3xl animate-rise">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Calcolatore gratuito</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]" data-testid="page-title">
          Margini E-commerce & Reselling
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Scopri quanto guadagni davvero su ogni vendita, al netto di commissioni, spedizione e tasse. I risultati si aggiornano in tempo reale.
        </p>
      </section>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Inputs */}
        <section
          className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 animate-rise [animation-delay:80ms]"
          data-testid="calculator-form"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-slate-900">Dati della vendita</h2>
            <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500 active:scale-[0.98]" data-testid="button-reset-calculator">
              <RotateCcw className="size-3.5" /> Ripristina
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NumField id="price" label="Prezzo di vendita al cliente" value={price} onChange={setPrice} suffix="€" testid="input-sale-price" />
            <NumField id="cost" label="Costo di acquisto del prodotto" value={cost} onChange={setCost} suffix="€" testid="input-purchase-cost" />
            <NumField id="shipping" label="Costo di spedizione a tuo carico" value={shipping} onChange={setShipping} suffix="€" testid="input-shipping-cost" />
            <NumField id="other" label="Altri costi / Packaging" value={other} onChange={setOther} suffix="€" testid="input-packaging-cost" />
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-slate-800">Piattaforma di vendita</Label>
              <Select value={platformId} onValueChange={(v: string) => pickPlatform(v)}>
                <SelectTrigger className="h-11 w-full bg-white" data-testid="select-platform-preset">
                  <SelectValue>{(v) => presets.platforms.find((p) => p.id === v)?.label ?? ""}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {presets.platforms.map((p) => (
                    <SelectItem key={p.id} value={p.id} data-testid={`platform-option-${p.id}`}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500" data-testid="platform-description">{platform.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumField id="feePct" label="Commissione %" value={feePct} onChange={setFeePct} suffix="%" testid="input-custom-platform-percentage" />
              <NumField id="feeFixed" label="Quota fissa" value={feeFixed} onChange={setFeeFixed} suffix="€" testid="input-custom-platform-fixed" />
            </div>
            <p className="flex items-start gap-1.5 text-xs text-slate-500">
              <Info className="mt-0.5 size-3.5 shrink-0" /> Commissioni calcolate sul prezzo di vendita. Puoi modificarle liberamente.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-800">Regime fiscale</Label>
            <div role="radiogroup" className="grid grid-cols-1 gap-2 sm:grid-cols-3" data-testid="radio-tax-regime">
              {presets.tax_regimes.map((t) => {
                const active = t.id === taxId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setTaxId(t.id)}
                    data-testid={`tax-option-${t.id}`}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow,transform] duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                      active
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:shadow-sm",
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
            <p className="text-xs text-slate-500">Tasse stimate sull'utile (prezzo − costi), solo se positivo.</p>
          </div>
        </section>

        {/* Results */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-5 animate-rise [animation-delay:160ms]">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl p-6 shadow-lg transition-colors duration-300 sm:p-7",
              positive ? "bg-[#064E3B] text-emerald-50" : "bg-[#7F1D1D] text-red-50",
            )}
            data-testid="card-net-profit-display"
            data-state={positive ? "profit" : "loss"}
          >
            <div className={cn("absolute -right-16 -top-16 size-48 rounded-full blur-3xl", positive ? "bg-emerald-400/25" : "bg-red-400/25")} />
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className={cn("text-xs font-bold uppercase tracking-[0.18em]", positive ? "text-emerald-200" : "text-red-200")}>
                  Guadagno netto reale
                </p>
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white", positive ? "bg-emerald-700" : "bg-red-700")} data-testid="badge-profit-status">
                  {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
                  {positive ? "In guadagno" : "In perdita"}
                </span>
              </div>
              <p key={r.net.toFixed(2)} className="mt-3 font-mono text-4xl font-bold tracking-tight animate-pop sm:text-5xl" data-testid="value-net-profit-amount">
                {fmtEur(r.net)}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/15 pt-4">
                <div>
                  <p className={cn("text-xs", positive ? "text-emerald-200" : "text-red-200")}>Margine</p>
                  <p className="font-mono text-lg font-semibold" data-testid="value-margin-percentage">{fmtPct(r.marginPct)}</p>
                </div>
                <div>
                  <p className={cn("text-xs", positive ? "text-emerald-200" : "text-red-200")}>ROI</p>
                  <p className="font-mono text-lg font-semibold" data-testid="value-roi-percentage">{fmtPct(r.roiPct)}</p>
                </div>
                <div>
                  <p className={cn("text-xs", positive ? "text-emerald-200" : "text-red-200")}>Tasse</p>
                  <p className="font-mono text-lg font-semibold" data-testid="value-taxes-amount">{fmtEur(r.taxes)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm" data-testid="chart-cost-breakdown">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-slate-900">Ripartizione del prezzo</h3>
              <span className="font-mono text-sm font-semibold text-slate-500">{fmtEur(nums.price)}</span>
            </div>
            <div className="mt-2 grid grid-cols-1 items-center gap-4 sm:grid-cols-[160px_1fr]">
              <div className="relative mx-auto h-40 w-40">
                {sliceTotal > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={slices} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={2} stroke="none" isAnimationActive={false}>
                        {slices.map((s, i) => (
                          <Cell key={s.name} fill={SLICE_COLORS[i]} />
                        ))}
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
                  <li key={s.name} className="flex items-center justify-between gap-3 text-sm" data-testid={`breakdown-row-${i}`}>
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: SLICE_COLORS[i] }} />
                      {s.name}
                    </span>
                    <span className="font-mono font-semibold text-slate-900">{fmtEur(s.value)}</span>
                  </li>
                ))}
                {!positive && (
                  <li className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-800" data-testid="breakdown-loss-note">
                    I costi superano il prezzo di {fmtEur(-r.net)}.
                  </li>
                )}
              </ul>
            </div>
            <Button onClick={copySummary} className="mt-5 h-11 w-full bg-slate-900 text-white transition-[background-color,transform] duration-150 hover:bg-slate-800 active:scale-[0.98]" data-testid="button-copy-summary">
              <Copy className="size-4" /> Copia riepilogo
            </Button>
          </div>

          <AffiliateBox
            testid="box-monetization-affiliate"
            title="Risparmia sulle spedizioni e gestisci i tuoi incassi"
            subtitle="Strumenti selezionati per aumentare il tuo margine."
            primary={{ label: "Confronta tariffe corrieri", icon: Truck, testid: "cta-compare-couriers" }}
            secondary={{ label: "Apri un conto business a zero spese", icon: Landmark, testid: "cta-open-business-account" }}
          />
        </aside>
      </div>
    </div>
  );
}
