// Mirrors backend/routers/presets.py (PlatformPreset, TaxRegime, Presets).
export interface PlatformPreset {
  id: string;
  label: string;
  percentage: number;
  fixed: number;
  description: string;
}

export interface TaxRegime {
  id: string;
  label: string;
  rate: number;
  description: string;
}

export interface Presets {
  platforms: PlatformPreset[];
  tax_regimes: TaxRegime[];
}

// Local fallback so the calculator works even without the backend (static preview).
export const FALLBACK_PRESETS: Presets = {
  platforms: [
    { id: "vinted", label: "Vinted", percentage: 0, fixed: 0, description: "0% commissione venditore (a carico dell'acquirente)" },
    { id: "ebay", label: "eBay", percentage: 11, fixed: 0.35, description: "11% + 0,35 € per transazione" },
    { id: "shopify", label: "Shopify / Stripe", percentage: 2.9, fixed: 0.3, description: "2,9% + 0,30 € commissione di pagamento standard" },
    { id: "amazon", label: "Amazon", percentage: 15, fixed: 0, description: "15% tariffa di vendita media" },
    { id: "custom", label: "Personalizzato", percentage: 5, fixed: 0, description: "Imposta percentuale e quota fissa su misura" },
  ],
  tax_regimes: [
    { id: "none", label: "Nessuna tassa", rate: 0, description: "Vendita occasionale di beni personali usati" },
    { id: "forfettario", label: "Forfettario", rate: 15, description: "Stima ~15% sull'utile" },
    { id: "ordinario", label: "Ordinario", rate: 24, description: "Stima ~24% sull'utile" },
  ],
};

export interface MarginInput {
  price: number;
  cost: number;
  shipping: number;
  other: number;
  feePct: number;
  feeFixed: number;
  taxRate: number;
}

export interface MarginResult {
  fee: number;
  grossProfit: number;
  taxes: number;
  net: number;
  marginPct: number;
  roiPct: number;
}

export function computeMargin(i: MarginInput): MarginResult {
  // Platform fee is applied on the sale price; no fee if nothing is sold.
  const fee = i.price > 0 ? (i.price * i.feePct) / 100 + i.feeFixed : 0;
  const grossProfit = i.price - i.cost - i.shipping - i.other - fee;
  // Taxes are estimated on the profit (only when positive).
  const taxes = grossProfit > 0 ? (grossProfit * i.taxRate) / 100 : 0;
  const net = grossProfit - taxes;
  const invested = i.cost + i.shipping + i.other;
  return {
    fee,
    grossProfit,
    taxes,
    net,
    marginPct: i.price > 0 ? (net / i.price) * 100 : 0,
    roiPct: invested > 0 ? (net / invested) * 100 : 0,
  };
}

export function parseNum(v: string): number {
  let s = v.replace(/\s/g, "");
  // Italian thousands grouping ("40.000" / "1.250,50") → drop the dots.
  if (/^\d{1,3}(\.\d{3})+(,\d*)?$/.test(s)) s = s.replace(/\./g, "");
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

// "always" so 4-digit amounts get the thousands dot too (it-IT default skips it: 2559,40 €).
const eur = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", useGrouping: "always" } as Intl.NumberFormatOptions);
const pct = new Intl.NumberFormat("it-IT", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const fmtEur = (n: number) => eur.format(n);
export const fmtPct = (n: number) => `${pct.format(n)}%`;
export const fmtNumIt = (n: number) => String(n).replace(".", ",");
