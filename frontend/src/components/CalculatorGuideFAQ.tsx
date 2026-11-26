import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface GuideData {
  title: string;
  intro: string;
  steps: string[];
  faqs: FAQItem[];
}

const GUIDES: Record<string, GuideData> = {
  "/": {
    title: "Guida al calcolo dei margini E-commerce e Reselling",
    intro:
      "Vendere online su piattaforme come Vinted, eBay, Shopify o Amazon comporta costi nascosti che spesso riducono il guadagno reale. Calcolare il margine netto prima di fissare il prezzo ti evita di vendere in perdita.",
    steps: [
      "Inserisci il prezzo finale a cui vendi l'articolo al cliente.",
      "Aggiungi il costo di acquisto del prodotto e le spese di imballaggio (scatole, nastro, etichette).",
      "Seleziona la piattaforma di vendita per applicare automaticamente le commissioni percentuali e fisse.",
      "Verifica il Guadagno Netto Reale e il ROI (ritorno sull'investimento) nel riepilogo."
    ],
    faqs: [
      {
        question: "Come si calcola il margine netto su una vendita online?",
        answer:
          "Il margine netto si ottiene sottraendo dal prezzo di vendita il costo del prodotto, le spese di spedizione a tuo carico, i materiali di imballaggio, le commissioni della piattaforma/pagamento e le eventuali imposte."
      },
      {
        question: "Qual è la differenza tra margine di profitto e ricarico (markup)?",
        answer:
          "Il margine indica la percentuale di guadagno rispetto al prezzo di vendita finale, mentre il ricarico (markup) misura quanto hai aumentato il costo di acquisto iniziale."
      },
      {
        question: "Quanto trattengono di commissione eBay, Vinted e Shopify?",
        answer:
          "Su Vinted la protezione acquisti è generalmente a carico dell'acquirente (0% per il venditore privato), su eBay le commissioni medie si aggirano intorno al 10-13% più quota fissa, mentre su Shopify si paga il canone mensile più circa l'1,5% - 2,9% per transazione con carta."
      }
    ]
  },
  "/preventivi": {
    title: "Guida al calcolo del netto in Regime Forfettario",
    intro:
      "Quando invii un preventivo a un cliente con Partita IVA forfettaria, l'importo fatturato non corrisponde al tuo guadagno reale: devi accantonare la quota per i contributi previdenziali (INPS o Cassa) e l'imposta sostitutiva.",
    steps: [
      "Inserisci l'importo lordo del preventivo o del fatturato annuo previsto.",
      "Scegli il tuo coefficiente di redditività in base al codice ATECO (es. 78% per professionisti e consulenti, 67% per commercianti/e-commerce).",
      "Seleziona l'aliquota d'imposta: 5% per i primi 5 anni di nuova attività (start-up) oppure 15% ordinaria.",
      "Controlla esattamente quanto mettere da parte per tasse e contributi e quanto ti resta netto in tasca."
    ],
    faqs: [
      {
        question: "Come funzionano le tasse nel Regime Forfettario?",
        answer:
          "Nel regime forfettario non si scaricano le spese reali: lo Stato applica un coefficiente di redditività al fatturato per stimare il reddito imponibile, su cui poi si calcolano i contributi INPS e l'imposta sostitutiva al 5% o al 15%."
      },
      {
        question: "Quando si applica l'aliquota agevolata al 5%?",
        answer:
          "L'imposta sostitutiva al 5% si applica per i primi 5 anni di attività a condizione che il contribuente non abbia esercitato nei 3 anni precedenti attività artistica, professionale o d'impresa e che l'attività non sia la prosecuzione di un lavoro precedente."
      },
      {
        question: "I contributi INPS versati sono deducibili nel forfettario?",
        answer:
          "Sì, i contributi previdenziali obbligatori versati nell'anno solare sono l'unica voce deducibile dal reddito imponibile prima di calcolare l'imposta sostitutiva del 5% o 15%."
      }
    ]
  },
  "/affitti-brevi": {
    title: "Guida al calcolo della rendita netta da Affitti Brevi (Airbnb e Booking)",
    intro:
      "Gestire un appartamento o una casa vacanze in locazione breve richiede di considerare non solo il prezzo a notte, ma anche il tasso di occupazione annuo, le commissioni dei portali OTA, i costi di pulizia/utenze e la cedolare secca.",
    steps: [
      "Inserisci la tariffa media a notte e la percentuale di occupazione stimata (es. 60% = circa 18 notti al mese).",
      "Aggiungi le commissioni della piattaforma (es. Airbnb o Booking.com) e le spese mensili fisse o per soggiorno (pulizie, biancheria, bollette, Wi-Fi).",
      "Seleziona l'aliquota della cedolare secca (21% sul primo immobile locato in forma non imprenditoriale, 26% dal secondo immobile).",
      "Analizza il guadagno netto mensile e annuo e il rendimento percentuale rispetto al valore dell'immobile."
    ],
    faqs: [
      {
        question: "Come funziona la cedolare secca sugli affitti brevi?",
        answer:
          "Per le locazioni brevi (sotto i 30 giorni) gestite da privati al di fuori dell'attività d'impresa, si applica la cedolare secca al 21% sul primo immobile destinato ad affitto breve e al 26% dal secondo al quarto immobile. Oltre i 4 immobili scatta l'obbligo di Partita IVA."
      },
      {
        question: "Su quale importo si calcola la cedolare secca?",
        answer:
          "La cedolare secca si calcola sul corrispettivo lordo indicato nel contratto di locazione (inclusa l'eventuale commissione trattenuta dal portale come Airbnb o Booking e le spese forfettarie addebitate all'ospite)."
      },
      {
        question: "Quali sono i principali costi da considerare in una casa vacanze?",
        answer:
          "Oltre alle imposte e alle commissioni OTA (solitamente tra il 3% e il 18% a seconda del modello tariffario), occorre calcolare pulizie e lavanderia, utenze (luce, gas, acqua, internet), manutenzione ordinaria, assicurazione e imposta di soggiorno (che però è a carico dell'ospite)."
      }
    ]
  }
};

export default function CalculatorGuideFAQ({ pathname }: { pathname: string }) {
  const normalizedPath = pathname === "/preventivi" || pathname === "/affitti-brevi" ? pathname : "/";
  const data = GUIDES[normalizedPath];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-8 space-y-8">
        <div>
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Guida pratica
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold text-slate-900">{data.title}</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">{data.intro}</p>

          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Come usare questo calcolatore in 4 passi
            </h3>
            <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-slate-700">
              {data.steps.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl font-bold text-slate-900">
            Domande Frequenti (FAQ)
          </h3>
          <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-xl leading-none text-emerald-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
