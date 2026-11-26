import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Printer } from "lucide-react";
import NumField from "@/components/NumField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fmtEur, parseNum } from "@/lib/margin";
import { BOLLO_THRESHOLD, computeQuote } from "@/lib/piva";

const STORAGE_KEY = "calcolapro.issuer";

interface Issuer {
  name: string;
  piva: string;
}

function loadIssuer(): Issuer {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { name: "", piva: "", ...(JSON.parse(raw) as Partial<Issuer>) };
  } catch {
    /* ignore */
  }
  return { name: "", piva: "" };
}

const inputCls = "h-11 bg-white transition-[border-color,box-shadow] duration-150 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25";

export default function QuoteTool() {
  const [issuer, setIssuer] = useState<Issuer>(loadIssuer);
  const [client, setClient] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [compenso, setCompenso] = useState("1.000");
  const [rivalsa, setRivalsa] = useState(true);
  const [bollo, setBollo] = useState(true);
  const [iva, setIva] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issuer));
  }, [issuer]);

  const amount = parseNum(compenso);
  const q = computeQuote(amount, { rivalsa, bollo, iva });

  const { number, dateStr, validStr } = useMemo(() => {
    const now = new Date();
    const valid = new Date(now);
    valid.setDate(valid.getDate() + 30);
    const f = (d: Date) => d.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
    return {
      number: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`,
      dateStr: f(now),
      validStr: f(valid),
    };
  }, []);

  const rows: { label: string; value: number; testid: string }[] = [
    { label: "Compenso professionale", value: q.compenso, testid: "quote-row-compenso" },
    ...(rivalsa ? [{ label: "Rivalsa INPS 4%", value: q.rivalsa, testid: "quote-row-rivalsa" }] : []),
    ...(iva ? [{ label: "IVA 22%", value: q.iva, testid: "quote-row-iva" }] : []),
    ...(q.bollo > 0 ? [{ label: "Marca da bollo", value: q.bollo, testid: "quote-row-bollo" }] : []),
  ];

  const issuerName = issuer.name || "Il tuo nome / Ragione sociale";
  const clientName = client || "Nome del cliente";
  const subjectText = subject || "Oggetto del lavoro";

  const copyText = async () => {
    const text = [
      `PREVENTIVO N. ${number} — ${dateStr}`,
      "",
      `Da: ${issuerName}${issuer.piva ? ` — P.IVA ${issuer.piva}` : ""}`,
      `Per: ${clientName}`,
      "",
      `Oggetto: ${subjectText}`,
      ...(description ? [description] : []),
      "",
      ...rows.map((r) => `${r.label}: ${fmtEur(r.value)}`),
      `TOTALE: ${fmtEur(q.totale)}`,
      "",
      ...(!iva ? ["Operazione senza applicazione dell'IVA ai sensi dell'art. 1, commi 54-89, L. 190/2014 (regime forfettario)."] : []),
      `Preventivo valido fino al ${validStr}.`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    toast.success("Testo del preventivo copiato negli appunti!");
  };

  const options = [
    { id: "rivalsa", label: "Aggiungi Rivalsa INPS 4%", checked: rivalsa, set: setRivalsa, hint: "Per iscritti alla Gestione Separata" },
    { id: "bollo", label: "Aggiungi Marca da bollo 2,00 €", checked: bollo, set: setBollo, hint: `Solo se senza IVA e totale > ${fmtEur(BOLLO_THRESHOLD)}` },
    { id: "iva", label: "Applica IVA 22%", checked: iva, set: setIva, hint: "Per regime ordinario" },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <section className="space-y-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 animate-rise print:hidden" data-testid="quote-form">
        <h2 className="font-heading text-lg font-bold text-slate-900">Dati del preventivo</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="issuer-name" className="text-sm font-semibold text-slate-800">Tuo Nome / Ragione Sociale</Label>
            <Input id="issuer-name" className={inputCls} placeholder="Mario Rossi" value={issuer.name} onChange={(e) => setIssuer({ ...issuer, name: e.target.value })} data-testid="input-issuer-name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="issuer-piva" className="text-sm font-semibold text-slate-800">Partita IVA</Label>
            <Input id="issuer-piva" className={`${inputCls} font-mono`} placeholder="01234567890" inputMode="numeric" value={issuer.piva} onChange={(e) => setIssuer({ ...issuer, piva: e.target.value })} data-testid="input-issuer-piva" />
          </div>
        </div>
        <p className="-mt-3 text-xs text-slate-500">Nome e P.IVA restano salvati solo su questo dispositivo.</p>

        <div className="space-y-1.5">
          <Label htmlFor="client" className="text-sm font-semibold text-slate-800">Nome del Cliente</Label>
          <Input id="client" className={inputCls} placeholder="Azienda Cliente S.r.l." value={client} onChange={(e) => setClient(e.target.value)} data-testid="input-client-name" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-sm font-semibold text-slate-800">Oggetto del lavoro / servizio</Label>
          <Input id="subject" className={inputCls} placeholder="Realizzazione sito web" value={subject} onChange={(e) => setSubject(e.target.value)} data-testid="input-quote-subject" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description" className="text-sm font-semibold text-slate-800">Descrizione</Label>
          <Textarea id="description" rows={4} className="bg-white transition-[border-color,box-shadow] duration-150 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/25" placeholder="Dettaglio delle attività incluse, tempi di consegna…" value={description} onChange={(e) => setDescription(e.target.value)} data-testid="input-quote-description" />
        </div>

        <NumField id="compenso" label="Compenso netto richiesto" value={compenso} onChange={setCompenso} suffix="€" testid="input-compenso" />

        <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="text-sm font-semibold text-slate-800">Opzioni fiscali da aggiungere al totale</p>
          {options.map((o) => (
            <label key={o.id} className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors duration-150 hover:bg-white" data-testid={`option-${o.id}`}>
              <Checkbox checked={o.checked} onCheckedChange={(c: boolean) => o.set(c)} className="mt-0.5" data-testid={`checkbox-${o.id}`} />
              <span>
                <span className="block text-sm font-medium text-slate-900">{o.label}</span>
                <span className="block text-xs text-slate-500">{o.hint}</span>
              </span>
            </label>
          ))}
          {iva && bollo && <p className="px-2 text-xs text-amber-700" data-testid="bollo-iva-note">Con IVA applicata la marca da bollo non è dovuta.</p>}
        </div>
      </section>

      <aside className="space-y-4 lg:col-span-7 animate-rise [animation-delay:80ms]">
        <div className="flex flex-wrap gap-3 print:hidden">
          <Button onClick={() => window.print()} className="h-11 bg-slate-900 px-5 text-white transition-[background-color,transform] duration-150 hover:bg-slate-800 active:scale-[0.98]" data-testid="button-print-quote">
            <Printer className="size-4" /> Stampa / Salva come PDF
          </Button>
          <Button variant="outline" onClick={copyText} className="h-11 bg-white px-5 transition-[background-color,transform] duration-150 active:scale-[0.98]" data-testid="button-copy-quote">
            <Copy className="size-4" /> Copia testo preventivo
          </Button>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-slate-200/60 p-3 sm:p-6 print:overflow-visible print:bg-transparent print:p-0">
          <article
            id="quote-sheet"
            className="mx-auto aspect-[210/297] w-full min-w-[520px] max-w-[720px] bg-white p-10 text-slate-800 shadow-xl sm:p-12 print:aspect-auto print:min-w-0 print:max-w-none print:p-0 print:shadow-none"
            data-testid="quote-preview-sheet"
          >
            <header className="flex items-start justify-between gap-6 border-b-2 border-slate-900 pb-6">
              <div>
                <p className="font-heading text-xl font-extrabold text-slate-900" data-testid="quote-preview-issuer">{issuerName}</p>
                <p className="mt-1 font-mono text-xs text-slate-500" data-testid="quote-preview-piva">P.IVA {issuer.piva || "—"}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">Preventivo</p>
                <p className="mt-1 font-mono text-sm font-semibold text-slate-900">N. {number}</p>
                <p className="font-mono text-xs text-slate-500">Data {dateStr}</p>
              </div>
            </header>

            <section className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Spett.le</p>
              <p className="mt-1 text-base font-semibold text-slate-900" data-testid="quote-preview-client">{clientName}</p>
            </section>

            <section className="mt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Oggetto</p>
              <p className="mt-1 font-heading text-base font-bold text-slate-900" data-testid="quote-preview-subject">{subjectText}</p>
              {description && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600" data-testid="quote-preview-description">{description}</p>}
            </section>

            <table className="mt-8 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300 text-left text-[11px] uppercase tracking-[0.14em] text-slate-500">
                  <th className="pb-2 font-bold">Voce</th>
                  <th className="pb-2 text-right font-bold">Importo</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.testid} className="border-b border-slate-100" data-testid={r.testid}>
                    <td className="py-2.5 text-slate-700">{r.label}</td>
                    <td className="py-2.5 text-right font-mono font-medium text-slate-900">{fmtEur(r.value)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pt-4 font-heading text-base font-bold text-slate-900">Totale</td>
                  <td className="pt-4 text-right font-mono text-xl font-bold text-emerald-700" data-testid="quote-preview-total">{fmtEur(q.totale)}</td>
                </tr>
              </tfoot>
            </table>

            <footer className="mt-10 space-y-1.5 border-t border-slate-200 pt-4 text-[11px] leading-relaxed text-slate-500">
              {!iva && (
                <p data-testid="quote-preview-forfettario-note">
                  Operazione senza applicazione dell'IVA ai sensi dell'art. 1, commi 54-89, L. 190/2014 (regime forfettario).
                  {q.bollo > 0 && " Imposta di bollo assolta sull'originale."}
                </p>
              )}
              <p>Preventivo valido fino al {validStr}. Pagamento tramite bonifico bancario.</p>
              <div className="flex justify-between pt-8">
                <span>Firma per accettazione</span>
                <span className="w-44 border-b border-slate-300" />
              </div>
            </footer>
          </article>
        </div>
      </aside>
    </div>
  );
}
