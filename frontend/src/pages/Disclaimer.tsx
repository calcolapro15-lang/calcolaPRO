import { AlertTriangle } from "lucide-react";
import LegalPage, { H2, Mail, OWNER, P, UL } from "@/components/LegalPage";

export default function Disclaimer() {
  return (
    <LegalPage
      slug="disclaimer"
      overline="Note legali e trasparenza"
      title="Disclaimer & Affiliate Disclosure"
      metaTitle="Disclaimer e Affiliate Disclosure | CalcolaPro"
      metaDescription="I calcoli di CalcolaPro sono stime indicative e non sostituiscono la consulenza fiscale. Il sito può contenere link di affiliazione senza costi aggiuntivi per te."
    >
      <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" data-testid="disclaimer-highlight">
        <AlertTriangle className="mt-0.5 size-5 shrink-0" />
        <p className="leading-relaxed">
          <strong>In sintesi:</strong> i risultati dei calcolatori sono <strong>stime indicative a scopo informativo</strong> e non
          sostituiscono la consulenza di un commercialista o consulente fiscale. Il sito può contenere{" "}
          <strong>link di affiliazione</strong>: se acquisti tramite questi link potremmo ricevere una commissione,{" "}
          <strong>senza alcun costo aggiuntivo per te</strong>.
        </p>
      </div>

      <H2>1. Natura informativa dei calcoli</H2>
      <P>
        CalcolaPro mette a disposizione gratuitamente strumenti di calcolo (margini e-commerce, tasse in regime forfettario, preventivi,
        rendita da affitti brevi) con finalità esclusivamente informative e divulgative. I risultati sono{" "}
        <strong className="text-slate-900">stime indicative</strong> basate su formule semplificate, sui dati inseriti dall'utente e su
        parametri medi (commissioni delle piattaforme, aliquote, coefficienti di redditività, contributi previdenziali) che possono
        variare nel tempo o in base alla situazione specifica.
      </P>

      <H2>2. Nessuna consulenza fiscale, legale o finanziaria</H2>
      <P>
        Le informazioni e i calcoli presenti sul Sito <strong className="text-slate-900">non costituiscono consulenza fiscale, contabile,
        legale o finanziaria</strong> e non sostituiscono in alcun modo il parere di un commercialista, consulente del lavoro o altro
        professionista abilitato. In particolare, i calcoli non tengono conto di:
      </P>
      <UL
        items={[
          "deduzioni, detrazioni, crediti d'imposta e situazioni reddituali personali;",
          "saldi e acconti, scadenze fiscali e variazioni normative successive all'ultimo aggiornamento;",
          "tariffe effettive e condizioni contrattuali delle singole piattaforme (eBay, Amazon, Vinted, Shopify, Airbnb, Booking, ecc.);",
          "obblighi specifici come CIN, comunicazioni alla Questura, imposta di soggiorno o adempimenti comunali.",
        ]}
      />
      <P>
        Prima di prendere decisioni economiche, fiscali o di investimento ti raccomandiamo di verificare i dati con un professionista
        qualificato.
      </P>

      <H2>3. Limitazione di responsabilità</H2>
      <P>
        Pur impegnandoci a mantenere gli strumenti accurati e aggiornati, il Titolare non garantisce la completezza, l'esattezza o
        l'attualità dei risultati e declina ogni responsabilità per eventuali danni, diretti o indiretti, derivanti dall'utilizzo dei
        calcolatori o dall'affidamento sulle stime fornite. L'utente utilizza il Sito sotto la propria responsabilità.
      </P>

      <H2>4. Affiliate Disclosure — Trasparenza sui link di affiliazione</H2>
      <P>
        CalcolaPro è un progetto gratuito e indipendente. Per sostenerne i costi, il Sito{" "}
        <strong className="text-slate-900">può contenere link di affiliazione</strong> verso prodotti e servizi di terze parti (ad
        esempio comparatori di spedizioni, conti business, servizi di commercialisti online, software gestionali e assicurazioni). I
        box che contengono questi link sono contrassegnati dall'etichetta "Consigliati".
      </P>
      <UL
        items={[
          <>Se clicchi su un link di affiliazione ed effettui un acquisto o un'iscrizione, potremmo ricevere una commissione dal partner.</>,
          <><strong className="text-slate-900">Per te non c'è alcun costo aggiuntivo</strong>: il prezzo che paghi è lo stesso che pagheresti accedendo direttamente al sito del partner.</>,
          <>Le commissioni non influenzano i risultati dei calcolatori, che restano neutrali e identici per tutti gli utenti.</>,
          <>Selezioniamo i servizi in base alla loro utilità per chi vende online, lavora in Partita IVA o gestisce affitti brevi, ma ti invitiamo sempre a valutare autonomamente le condizioni di ciascuna offerta.</>,
        ]}
      />
      <P>
        Il Sito può partecipare a programmi di affiliazione, inclusi eventualmente il Programma Affiliazione Amazon EU: in qualità di
        Affiliato Amazon, CalcolaPro può ricevere un guadagno dagli acquisti idonei.
      </P>

      <H2>5. Marchi</H2>
      <P>
        I nomi Vinted, eBay, Amazon, Shopify, Stripe, Airbnb, Booking.com e gli altri marchi citati appartengono ai rispettivi titolari e
        sono utilizzati a solo scopo descrittivo. CalcolaPro non è affiliato, sponsorizzato o approvato da tali società, salvo dove
        espressamente indicato.
      </P>

      <H2>6. Contatti</H2>
      <P>
        Il Sito è gestito da <strong className="text-slate-900">{OWNER}</strong>. Per segnalazioni, correzioni o domande scrivi a <Mail />.
      </P>
    </LegalPage>
  );
}
