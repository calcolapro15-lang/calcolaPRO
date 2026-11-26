import React from "react";

interface PlatformRow {
  name: string;
  listingFee: string;
  salesCommission: string;
  paymentFee: string;
  shippingCost: string;
  idealFor: string;
  badgeColor: string;
}

const PLATFORMS: PlatformRow[] = [
  {
    name: "Vinted (Privati)",
    listingFee: "0 €",
    salesCommission: "0% per il venditore (5% + 0,70 € a carico dell'acquirente)",
    paymentFee: "Inclusa",
    shippingCost: "A carico dell'acquirente (etichetta prepagata)",
    idealFor: "Abbigliamento, usato e reselling rapido senza Partita IVA",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    name: "eBay",
    listingFee: "0 € (fino a 150 inserzioni/mese)",
    salesCommission: "10% – 13% sul totale (inclusa spedizione)",
    paymentFee: "0,35 € fissi per ordine",
    shippingCost: "A tuo carico o addebitata al cliente",
    idealFor: "Elettronica, ricambi, collezionismo e usato ad alto valore",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Shopify",
    listingFee: "Da ~27 €/mese (piano Basic)",
    salesCommission: "0% (con Shopify Payments)",
    paymentFee: "1,5% – 2,9% + 0,25 € per transazione",
    shippingCost: "Gestita da te tramite corriere",
    idealFor: "Creare un brand proprietario e scalare con pubblicità",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Amazon (Seller)",
    listingFee: "0,99 €/articolo (Individuale) o 39 €/mese (Pro)",
    salesCommission: "8% – 15% per segnalazione (varia per categoria)",
    paymentFee: "Inclusa (extra se usi Logistica FBA)",
    shippingCost: "Tariffe FBA o spedizione gestita da te",
    idealFor: "Alti volumi di vendita e prodotti con codice EAN",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
];

export default function PlatformComparison() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
          Confronto rapido
        </span>
        <h2 className="mt-3 font-heading text-2xl font-bold text-slate-900">
          Vinted vs eBay vs Shopify vs Amazon: dove guadagni di più?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Confronta costi fissi, commissioni sul venduto e spese di incasso delle principali piattaforme prima di pubblicare il tuo prodotto.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700">
                <th className="px-4 py-3.5">Piattaforma</th>
                <th className="px-4 py-3.5">Costo fisso / Inserzione</th>
                <th className="px-4 py-3.5">Commissione vendita</th>
                <th className="px-4 py-3.5">Incasso / Pagamento</th>
                <th className="px-4 py-3.5">Ideale per</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {PLATFORMS.map((p) => (
                <tr key={p.name} className="hover:bg-slate-50/70">
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    <span className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${p.badgeColor}`}>
                      {p.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{p.listingFee}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">{p.salesCommission}</td>
                  <td className="px-4 py-4 text-slate-700">{p.paymentFee}</td>
                  <td className="px-4 py-4 text-slate-600">{p.idealFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          * Le percentuali sono indicative per il mercato italiano e possono variare in base a categoria merceologica, piano abbonamento o promozioni attive.
        </p>
      </div>
    </section>
  );
}
