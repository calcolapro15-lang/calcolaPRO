import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/lib/seo";

export const OWNER = "CalcolaPro";
export const OWNER_EMAIL = "calcolapro15@gmail.com";
export const LAST_UPDATE = "26 novembre 2026";

interface Props {
  slug: string;
  overline: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  children: ReactNode;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 font-heading text-xl font-bold tracking-tight text-slate-900">{children}</h2>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 leading-relaxed text-slate-600">{children}</p>;
}

export function UL({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2 text-slate-600">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-600" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Mail() {
  return (
    <a href={`mailto:${OWNER_EMAIL}`} className="font-medium text-emerald-700 underline-offset-4 hover:underline" data-testid="legal-contact-email">
      {OWNER_EMAIL}
    </a>
  );
}

export default function LegalPage({ slug, overline, title, metaTitle, metaDescription, children }: Props) {
  usePageMeta(metaTitle, metaDescription);
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8" data-testid={`legal-page-${slug}`}>
      <div className="max-w-3xl animate-rise">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900" data-testid="legal-back-link">
          <ArrowLeft className="size-4" /> Torna ai calcolatori
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{overline}</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl" data-testid="legal-page-title">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Ultimo aggiornamento: {LAST_UPDATE}</p>
        <article className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 text-[15px] shadow-sm sm:p-10" data-testid="legal-page-content">
          {children}
        </article>
      </div>
    </div>
  );
}
