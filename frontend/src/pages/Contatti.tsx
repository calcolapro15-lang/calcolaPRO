import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function Contatti() {
  const [subject, setSubject] = useState("Richiesta informazioni");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <Mail className="size-3.5" />
          Supporto & Collaborazioni
        </div>
        <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-slate-900">
          Contattaci
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Hai suggerimenti per nuovi calcolatori, segnalazioni o proposte di partnership? Compila il modulo qui sotto oppure scrivici direttamente a{" "}
          <a href="mailto:calcolapro15@gmail.com" className="font-semibold text-emerald-700 underline">
            calcolapro15@gmail.com
          </a>.
        </p>

        <form
          action="https://web3forms.com"
          method="POST"
          className="mt-8 space-y-5"
        >
          <input
            type="hidden"
            name="access_key"
            value="576c1473-2ecd-4a5f-b192-2463a92d4213"
          />
          <input
            type="hidden"
            name="subject"
            value={`[CalcolaPro] ${subject}`}
          />
          <input
            type="hidden"
            name="from_name"
            value="CalcolaPro Sito Web"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Nome *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Il tuo nome"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                La tua Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="nome@esempio.it"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Oggetto
            </label>
            <select
              name="categoria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <option value="Richiesta informazioni">Richiesta informazioni</option>
              <option value="Suggerimento nuovo calcolatore">Suggerimento nuovo calcolatore</option>
              <option value="Segnalazione errore">Segnalazione errore</option>
              <option value="Collaborazione / Partnership">Collaborazione / Partnership</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Messaggio *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Scrivi qui il tuo messaggio..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            <Send className="size-4" />
            Invia messaggio
          </button>
        </form>
      </div>
    </div>
  );
}
