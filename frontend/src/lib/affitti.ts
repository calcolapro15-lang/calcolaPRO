// Rendita netta affitti brevi — calcolo client-side.

export interface PortalPreset {
  id: string;
  label: string;
  percentage: number;
  description: string;
}

export const PORTALS: PortalPreset[] = [
  { id: "airbnb_host", label: "Airbnb Host ~3,66%", percentage: 3.66, description: "Commissione split: 3% + IVA a carico dell'host" },
  { id: "airbnb_solo", label: "Airbnb Solo Host 15%", percentage: 15, description: "Commissione unica interamente a carico dell'host" },
  { id: "booking", label: "Booking.com ~15% + IVA", percentage: 18.3, description: "15% + IVA 22% = circa 18,3% sul lordo" },
  { id: "diretta", label: "Prenotazione diretta 0%", percentage: 0, description: "Nessuna commissione di intermediazione" },
  { id: "custom", label: "Personalizzato", percentage: 10, description: "Imposta la tua percentuale di commissione" },
];

export const RENT_TAX = [
  { id: "cedolare21", label: "Cedolare Secca 21%", rate: 21, description: "1° immobile", editable: false },
  { id: "cedolare26", label: "Cedolare Secca 26%", rate: 26, description: "Dal 2° immobile", editable: false },
  { id: "ordinaria", label: "Altro / Ordinaria", rate: 35, description: "Aliquota IRPEF modificabile", editable: true },
];

export interface RentInput {
  price: number;
  nights: number;
  stays: number;
  commissionPct: number;
  cleaning: number;
  fixed: number;
  taxRate: number;
  propertyPrice: number;
}

export interface RentResult {
  lordo: number;
  commissioni: number;
  pulizie: number;
  fisse: number;
  tasse: number;
  nettoMensile: number;
  nettoAnnuo: number;
  roiPct: number | null;
}

export function computeRent(i: RentInput): RentResult {
  const lordo = i.price * i.nights;
  const commissioni = (lordo * i.commissionPct) / 100;
  const pulizie = i.stays * i.cleaning;
  // Cedolare secca / IRPEF applied on gross rent: commissions and expenses are not deductible.
  const tasse = (lordo * i.taxRate) / 100;
  const nettoMensile = lordo - commissioni - pulizie - i.fixed - tasse;
  const nettoAnnuo = nettoMensile * 12;
  return {
    lordo,
    commissioni,
    pulizie,
    fisse: i.fixed,
    tasse,
    nettoMensile,
    nettoAnnuo,
    roiPct: i.propertyPrice > 0 ? (nettoAnnuo / i.propertyPrice) * 100 : null,
  };
}
