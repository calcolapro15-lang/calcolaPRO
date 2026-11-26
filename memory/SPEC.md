# CalcolaPro — SPEC

Hub gratuito di calcolatori finanziari (mercato italiano, UI in italiano, formato € it-IT). Nessun login, nessun salvataggio.

## Routes
- `/` Margini E-commerce & Reselling (default). Two columns desktop / stacked mobile.
- `/preventivi` Preventivi & P.IVA — Tabs: "1. Calcolo Tasse Forfettario" (default) / "2. Generatore Preventivo Rapido"; affiliate box below both
- `/affitti-brevi` Rendita Netta Affitti Brevi calculator (two columns)
- Fixed navbar (logo + 3 links), footer with placeholder Privacy/Cookie/Disclaimer links.

## Backend
- `GET /api/presets` → `{platforms: PlatformPreset[], tax_regimes: TaxRegime[]}` (backend/routers/presets.py). Frontend falls back to identical local copy (frontend/src/lib/margin.ts).

## Calculation (client-side, frontend/src/lib/margin.ts)
- fee = price*feePct/100 + feeFixed (0 if price=0) — on sale price
- gross = price − cost − shipping − other − fee
- taxes = gross>0 ? gross*rate/100 : 0 — on profit
- net = gross − taxes; margin% = net/price; ROI% = net/(cost+shipping+other)
- Presets: Vinted 0%, eBay 11%+0,35€, Shopify/Stripe 2,9%+0,30€, Amazon 15%, Personalizzato 5% (editable fields).
- Tax: Nessuna 0%, Forfettario 15%, Ordinario 24%.
- Defaults: price 49,90, cost 18,00, shipping 4,90, other 1,50, eBay, no tax → net = 19,66 €.

## Other
- Copia riepilogo → clipboard + sonner toast.
- Affiliate CTAs are placeholder `href="#"`.

## Preventivi & P.IVA (frontend/src/lib/piva.ts, components/piva/*)
- Forfettario: reddito = fatturato × coeff (78/67/40/62%); INPS: Gestione Separata 26,07% reddito; Artigiani/Commercianti = 24% × max(reddito, 18.555) × 0,65 (minimo fisso + eccedenza, riduzione 35%); Cassa privata 14%.
  tasse = (reddito − INPS) × aliquota (5% start-up / 15%); netto = fatturato − tasse − INPS; mensile = /12; carico% = (tasse+INPS)/fatturato.
  Default 40.000 €, 78%, 5%, GS → netto 30.712,85 €, mensile 2.559,40 €.
- Preventivo: rivalsa 4% su compenso; IVA 22% su (compenso+rivalsa); bollo 2 € solo se no IVA e imponibile > 77,47 €. Default 1.000 € + rivalsa + bollo → 1.042,00 €.
  Nome+P.IVA salvati in localStorage "calcolapro.issuer". Stampa: @media print mostra solo #quote-sheet (A4).
- Currency formatting uses useGrouping "always" (1.000,00 €).

## Rendita Affitti Brevi (frontend/src/lib/affitti.ts, pages/AffittiBrevi.tsx)
- lordo = prezzo notte × notti (slider 1-30, default 18); commissioni = lordo × % (Airbnb Host 3,66 / Solo Host 15 / Booking 18,3 / Diretta 0 / Personalizzato 10, editable)
- pulizie = soggiorni × costo pulizia; tasse = lordo × aliquota (cedolare 21/26% or ordinaria editable default 35%) — on GROSS
- netto mensile = lordo − commissioni − pulizie − spese fisse − tasse; annuo ×12; ROI = annuo / prezzo immobile (optional)
- Defaults 90 €, 18 notti, 5 soggiorni, Airbnb Host, pulizie 35, fisse 250, cedolare 21 → 795,51 €/mese, 9.546,10 €/anno

## Legal + SEO
- Routes `/privacy-policy`, `/cookie-policy`, `/disclaimer` (pages/*.tsx, shared components/LegalPage.tsx; owner Marcello Tucci, calcolapro15@gmail.com). Footer links to them; scroll-to-top on route change.
- `usePageMeta` (lib/seo.ts) sets per-page title, meta description, og:*, canonical. public/robots.txt allows all.
- AffiliateBox (used by all 3 calculators): links rel="sponsored nofollow noopener" + disclosure line linking /disclaimer.
