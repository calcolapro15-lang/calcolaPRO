import { Link } from "react-router-dom";
import LegalPage, { H2, Mail, OWNER, P, UL } from "@/components/LegalPage";

const BROWSERS = [
  { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
  { name: "Mozilla Firefox", url: "https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" },
  { name: "Apple Safari", url: "https://support.apple.com/it-it/guide/safari/sfri11471/mac" },
  { name: "Microsoft Edge", url: "https://support.microsoft.com/it-it/microsoft-edge" },
];

export default function CookiePolicy() {
  return (
    <LegalPage
      slug="cookie"
      overline="Informativa sull'uso di cookie e tecnologie simili"
      title="Cookie Policy"
      metaTitle="Cookie Policy | CalcolaPro"
      metaDescription="Cookie Policy di CalcolaPro: il sito usa solo strumenti tecnici necessari, nessun cookie di profilazione. Scopri come gestire le tue preferenze."
    >
      <P>
        Questa Cookie Policy spiega quali cookie e tecnologie simili utilizza il sito CalcolaPro, gestito da{" "}
        <strong className="text-slate-900">{OWNER}</strong>, in conformità alle Linee guida del Garante Privacy del 10 giugno 2021 e alla
        Direttiva 2002/58/CE.
      </P>

      <H2>1. Cosa sono i cookie</H2>
      <P>
        I cookie sono piccoli file di testo che i siti salvano sul tuo dispositivo durante la navigazione. Tecnologie simili, come il
        "local storage" del browser, permettono di memorizzare informazioni in modo analogo.
      </P>

      <H2>2. Cookie utilizzati da CalcolaPro</H2>
      <P>
        Allo stato attuale il Sito <strong className="text-slate-900">non utilizza cookie di profilazione né cookie analitici di terze parti</strong>.
        Utilizziamo esclusivamente strumenti tecnici necessari al funzionamento:
      </P>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[520px] text-left text-sm" data-testid="cookie-table">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-bold">Nome</th>
              <th className="px-4 py-3 font-bold">Tipo</th>
              <th className="px-4 py-3 font-bold">Finalità</th>
              <th className="px-4 py-3 font-bold">Durata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="px-4 py-3 font-mono text-xs">calcolapro.issuer</td>
              <td className="px-4 py-3">Local storage tecnico</td>
              <td className="px-4 py-3">Ricorda nome e P.IVA inseriti nel Generatore Preventivo</td>
              <td className="px-4 py-3">Fino alla cancellazione da parte dell'utente</td>
            </tr>
          </tbody>
        </table>
      </div>
      <P>
        Gli strumenti tecnici non richiedono il consenso preventivo dell'utente (art. 122 del Codice Privacy), poiché sono strettamente
        necessari a fornire il servizio richiesto.
      </P>

      <H2>3. Link di affiliazione e cookie di terze parti</H2>
      <P>
        Il Sito contiene link di affiliazione verso servizi esterni. Navigando su CalcolaPro questi partner non installano cookie sul tuo
        dispositivo. Quando clicchi un link di affiliazione e vieni reindirizzato al sito del partner, quest'ultimo può installare
        propri cookie (anche di tracciamento) per riconoscere che la visita proviene da CalcolaPro. Tali cookie sono gestiti
        esclusivamente dal partner secondo la sua cookie policy.
      </P>

      <H2>4. Eventuali aggiornamenti futuri</H2>
      <P>
        Se in futuro venissero introdotti strumenti di analisi statistica o pubblicità, questa pagina sarà aggiornata e, ove previsto
        dalla legge, verrà mostrato un banner per raccogliere il tuo consenso prima dell'installazione di cookie non tecnici.
      </P>

      <H2>5. Come gestire o cancellare cookie e dati locali</H2>
      <P>Puoi eliminare cookie e dati del sito in qualsiasi momento dalle impostazioni del tuo browser:</P>
      <UL
        items={BROWSERS.map((b) => (
          <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-700 underline-offset-4 hover:underline">
            {b.name}
          </a>
        ))}
      />

      <H2>6. Contatti</H2>
      <P>
        Per qualsiasi domanda su questa Cookie Policy scrivi a <Mail />. Per maggiori informazioni sul trattamento dei dati consulta la{" "}
        <Link to="/privacy-policy" className="font-medium text-emerald-700 underline-offset-4 hover:underline">Privacy Policy</Link>.
      </P>
    </LegalPage>
  );
}
