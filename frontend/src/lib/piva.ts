// Forfettario + preventivo calculations (client-side, no backend state).

export interface Coefficient {
  id: string;
  label: string;
  rate: number;
}

export const COEFFICIENTS: Coefficient[] = [
  { id: "professionisti", label: "Consulenti / Freelance / Digital", rate: 78 },
  { id: "artigiani", label: "Artigiani / Tecnici", rate: 67 },
  { id: "commercianti", label: "Commercianti / E-commerce", rate: 40 },
  { id: "altro", label: "Altro", rate: 62 },
];

export const TAX_RATES = [
  { id: "startup", label: "Start-up", rate: 5, description: "Primi 5 anni di attività" },
  { id: "ordinaria", label: "Ordinaria", rate: 15, description: "Aliquota standard" },
];

export interface InpsFund {
  id: string;
  label: string;
  description: string;
}

// Artigiani/Commercianti: minimale di reddito e aliquota IVS (stima 2025), riduzione 35% per forfettari.
export const INPS_MINIMALE = 18555;
export const INPS_AC_RATE = 24;
export const INPS_AC_REDUCTION = 35;
export const INPS_GS_RATE = 26.07;
export const INPS_CASSA_RATE = 14;

export const INPS_FUNDS: InpsFund[] = [
  { id: "separata", label: "Gestione Separata (~26,07%)", description: "26,07% del reddito imponibile" },
  {
    id: "artigiani_commercianti",
    label: "Artigiani e Commercianti (riduzione 35%)",
    description: "Contributo minimo fisso sul minimale di 18.555 € + 24% sulla parte eccedente, ridotto del 35%",
  },
  { id: "cassa", label: "Cassa Professionale privata (~14%)", description: "Stima media 14% del reddito imponibile" },
];

export function computeInps(fundId: string, reddito: number): number {
  if (fundId === "artigiani_commercianti") {
    // Fixed minimum on the minimale + 24% on the excess = 24% of max(reddito, minimale).
    const base = Math.max(reddito, INPS_MINIMALE);
    return ((base * INPS_AC_RATE) / 100) * (1 - INPS_AC_REDUCTION / 100);
  }
  const rate = fundId === "cassa" ? INPS_CASSA_RATE : INPS_GS_RATE;
  return (reddito * rate) / 100;
}

export interface ForfettarioResult {
  reddito: number;
  inps: number;
  imponibileFiscale: number;
  tasse: number;
  netto: number;
  nettoMensile: number;
  caricoPct: number;
}

export function computeForfettario(fatturato: number, coeff: number, taxRate: number, fundId: string): ForfettarioResult {
  const reddito = (fatturato * coeff) / 100;
  const inps = fatturato > 0 ? computeInps(fundId, reddito) : 0;
  // Contributi deducibili dal reddito prima dell'imposta sostitutiva.
  const imponibileFiscale = Math.max(reddito - inps, 0);
  const tasse = (imponibileFiscale * taxRate) / 100;
  const netto = fatturato - tasse - inps;
  return {
    reddito,
    inps,
    imponibileFiscale,
    tasse,
    netto,
    nettoMensile: netto / 12,
    caricoPct: fatturato > 0 ? ((tasse + inps) / fatturato) * 100 : 0,
  };
}

export const BOLLO_THRESHOLD = 77.47;
export const BOLLO_AMOUNT = 2;

export interface QuoteOptions {
  rivalsa: boolean;
  bollo: boolean;
  iva: boolean;
}

export interface QuoteResult {
  compenso: number;
  rivalsa: number;
  imponibile: number;
  iva: number;
  bollo: number;
  totale: number;
}

export function computeQuote(compenso: number, o: QuoteOptions): QuoteResult {
  const rivalsa = o.rivalsa ? compenso * 0.04 : 0;
  const imponibile = compenso + rivalsa;
  const iva = o.iva ? imponibile * 0.22 : 0;
  // Marca da bollo only on IVA-exempt documents above 77,47 €.
  const bollo = o.bollo && !o.iva && imponibile > BOLLO_THRESHOLD ? BOLLO_AMOUNT : 0;
  return { compenso, rivalsa, imponibile, iva, bollo, totale: imponibile + iva + bollo };
}
