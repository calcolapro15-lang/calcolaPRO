tsx
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
  ecommerce: {
    title: "Guida al calcolo dei margini E-commerce e Reselling",
    intro:
      "Vendere online su piattaforme come Vinted, eBay, Shopify o Amazon comporta costi nascosti che spesso riducono drasticamente il guadagno reale. Calcolare il margine netto prima di fissare il prezzo ti evita di vendere in perdita.",
    steps: [
      "Inserisci il prezzo finale a cui vendi l'articolo al cliente.",
      "Aggiungi il costo di acquisto del prodotto e le spese di imballaggio (scatole, nastro, etichette).",
      "Seleziona la piattaforma di vendita per applicare automaticamente le commissioni percentuali e fisse.",
      "Verifica il Guadagno Netto Reale e il ROI (ritorno sull'investimento) nel riquadro verde."
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
  piva: {
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
  rendita: {
    title: "Guida al calcolo della rendita da ETF, BTP e interesse composto",
    intro:
      "Simulare la crescita di un capitale nel tempo ti permette di capire l'effetto dell'interesse composto e di pianificare un piano di accumulo (PAC) o una rendita passiva al netto della tassazione italiana.",
    steps: [
      "Inserisci il capitale iniziale che hai già a disposizione.",
      "Aggiungi l'eventuale versamento mensile ricorrente (PAC) e la durata dell'investimento in anni.",
      "Imposta il rendimento annuo atteso e l'aliquota fiscale (12,5% per Titoli di Stato/BTP in white list, 26% per ETF azionari e azioni).",
      "Analizza il capitale finale netto e la rendita mensile stimata."
    ],
    faqs: [
      {
        question: "Che tassazione si applica a BTP ed ETF in Italia?",
        answer:
          "In Italia le plusvalenze e le cedole dei Titoli di Stato italiani ed europei (come i BTP) sono tassate al 12,5%, mentre gli ETF azionari, le azioni e i conti deposito sono tassati al 26%. A questo si aggiunge l'imposta di bollo dello 0,20% annuo sul controvalore."
      },
      {
        question: "Cos'è l'interesse composto?",
        answer:
          "L'interesse composto si verifica quando gli interessi o i dividendi generati da un investimento vengono reinvestiti, producendo a loro volta nuovi interessi negli anni successivi e accelerando la crescita del capitale nel lungo periodo."
      },
      {
        question: "I risultati della simulazione sono garantiti?",
        answer:
          "No, il calcolatore fornisce una stima matematica basata su un rendimento medio costante. I mercati finanziari sono soggetti a volatilità e i rendimenti passati non garantiscono rendimenti futuri."
      }
    ]
  }
};

export const CalculatorGuideFAQ: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const data = GUIDES[activeTab] || GUIDES.ecommerce;

  return (
    <section className="mt-12 border-t border-slate-200 pt-10 text-left">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-8">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
            Guida pratica
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{data.title}</h2>
          <p className="text-slate-600 leading-relaxed">{data.intro}</p>

          <div className="mt-5 bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-3">
              Come usare questo calcolatore in 4 passi
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              {data.steps.map((step, i) => (
                <li key={i} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Domande Frequenti (FAQ)
          </h3>
          <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 list-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-emerald-600 transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
