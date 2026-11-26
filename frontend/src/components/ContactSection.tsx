import React, { useState } from "react";

export const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Richiesta informazioni");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          _subject: `[CalcolaPro] ${subject}`,
          message
        })
      });

      if (response.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm text-left">
      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
        Supporto & Collaborazioni
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Contattaci
      </h2>
      <p className="text-slate-600 text-sm mb-6">
        Hai suggerimenti per nuovi calcolatori, segnalazioni o proposte di collaborazione? Scrivici compilando il modulo qui sotto oppure invia un'email a{" "}
        <a
          href="mailto:calcolapro15@gmail.com"
          className="text-emerald-700 font-medium underline"
        >
          calcolapro15@gmail.com
        </a>.
      </p>

      {status === "sent" ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-5">
          <p className="font-semibold mb-1">Messaggio inviato con successo!</p>
          <p className="text-sm text-emerald-800">
            Grazie per averci scritto. Ti risponderemo il prima possibile all'indirizzo email che hai indicato.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm font-semibold text-emerald-700 underline"
          >
            Invia un altro messaggio
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Il tuo nome"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                La tua Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@esempio.it"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Oggetto
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Richiesta informazioni">Richiesta informazioni</option>
              <option value="Suggerimento nuovo calcolatore">Suggerimento nuovo calcolatore</option>
              <option value="Segnalazione errore">Segnalazione errore</option>
              <option value="Collaborazione / Partnership">Collaborazione / Partnership</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Messaggio *
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Scrivi qui il tuo messaggio..."
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">
              Si è verificato un problema durante l'invio. Riprova o scrivi direttamente a calcolapro15@gmail.com.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Invio in corso..." : "Invia messaggio"}
          </button>
        </form>
      )}
    </div>
  );
};
