import { Link } from "react-router-dom";
import LegalPage, { H2, Mail, OWNER, P, UL } from "@/components/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      slug="privacy"
      overline="Informativa ai sensi del Reg. UE 2016/679 (GDPR)"
      title="Privacy Policy"
      metaTitle="Privacy Policy | CalcolaPro"
      metaDescription="Informativa sulla privacy di CalcolaPro: quali dati vengono trattati, per quali finalità e quali sono i tuoi diritti ai sensi del GDPR."
    >
      <P>
        La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che visitano il sito CalcolaPro
        (di seguito "il Sito"), resa ai sensi dell'art. 13 del Regolamento (UE) 2016/679 ("GDPR") e del D.Lgs. 196/2003 come modificato
        dal D.Lgs. 101/2018.
      </P>

      <H2>1. Titolare del trattamento</H2>
      <P>
        Il Titolare del trattamento è <strong className="text-slate-900">{OWNER}</strong>, contattabile all'indirizzo email <Mail />.
      </P>

      <H2>2. Nessuna registrazione, nessun account</H2>
      <P>
        Il Sito offre calcolatori gratuiti utilizzabili senza registrazione. I valori che inserisci nei calcolatori (prezzi, costi,
        fatturato, dati del preventivo) vengono elaborati <strong className="text-slate-900">esclusivamente nel tuo browser</strong> e
        non vengono inviati, salvati o conservati sui nostri server.
      </P>

      <H2>3. Dati trattati</H2>
      <UL
        items={[
          <><strong className="text-slate-900">Dati di navigazione:</strong> i sistemi informatici e il fornitore di hosting acquisiscono, nel normale esercizio, alcuni dati tecnici (indirizzo IP, tipo di browser, data e ora della richiesta, pagine visitate). Sono usati solo per garantire il funzionamento e la sicurezza del Sito e vengono cancellati periodicamente.</>,
          <><strong className="text-slate-900">Dati salvati nel tuo dispositivo:</strong> se utilizzi il Generatore Preventivo, il nome/ragione sociale e la Partita IVA che inserisci vengono memorizzati nel "local storage" del tuo browser per comodità. Restano solo sul tuo dispositivo e puoi cancellarli in qualsiasi momento svuotando i dati del sito dal browser.</>,
          <><strong className="text-slate-900">Dati forniti volontariamente:</strong> se ci scrivi via email, tratteremo il tuo indirizzo e le informazioni contenute nel messaggio al solo fine di risponderti.</>,
        ]}
      />

      <H2>4. Finalità e base giuridica</H2>
      <UL
        items={[
          "Erogazione del servizio e sicurezza del Sito — legittimo interesse del Titolare (art. 6.1.f GDPR).",
          "Risposta alle richieste inviate via email — esecuzione di misure precontrattuali o richieste dell'interessato (art. 6.1.b GDPR).",
          "Adempimento di obblighi di legge, ove applicabili (art. 6.1.c GDPR).",
        ]}
      />

      <H2>5. Link di affiliazione e siti di terze parti</H2>
      <P>
        Il Sito contiene link verso servizi di terze parti, alcuni dei quali sono link di affiliazione. Cliccandoli lasci CalcolaPro:
        i dati eventualmente raccolti dal sito di destinazione (ad esempio tramite cookie di tracciamento dell'affiliazione) sono
        trattati dal relativo titolare secondo la sua informativa privacy, che ti invitiamo a consultare. Maggiori dettagli nel{" "}
        <Link to="/disclaimer" className="font-medium text-emerald-700 underline-offset-4 hover:underline">Disclaimer & Affiliate Disclosure</Link>.
      </P>

      <H2>6. Conservazione e destinatari</H2>
      <P>
        I dati sono conservati per il tempo strettamente necessario alle finalità indicate. Possono essere trattati dal fornitore di
        hosting in qualità di responsabile del trattamento. I dati non vengono venduti né ceduti a terzi per finalità di marketing.
      </P>

      <H2>7. I tuoi diritti</H2>
      <P>Ai sensi degli artt. 15-22 GDPR puoi in ogni momento:</P>
      <UL
        items={[
          "accedere ai tuoi dati e ottenerne copia;",
          "chiederne la rettifica, la cancellazione o la limitazione del trattamento;",
          "opporti al trattamento basato sul legittimo interesse;",
          "richiedere la portabilità dei dati;",
          <>proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 underline-offset-4 hover:underline">www.garanteprivacy.it</a>).</>,
        ]}
      />
      <P>Per esercitare i tuoi diritti scrivi a <Mail />.</P>

      <H2>8. Modifiche</H2>
      <P>
        Questa informativa può essere aggiornata nel tempo. La data dell'ultimo aggiornamento è indicata in cima alla pagina. Per
        informazioni sui cookie consulta la <Link to="/cookie-policy" className="font-medium text-emerald-700 underline-offset-4 hover:underline">Cookie Policy</Link>.
      </P>
    </LegalPage>
  );
}
