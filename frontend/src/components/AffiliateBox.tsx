import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Cta {
  label: string;
  icon: LucideIcon;
  testid: string;
  href?: string;
}

interface Props {
  title: string;
  subtitle: string;
  primary: Cta;
  secondary: Cta;
  testid: string;
}

export default function AffiliateBox({ title, subtitle, primary, secondary, testid }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B1528] p-6 text-slate-50 shadow-lg print:hidden" data-testid={testid}>
      <div className="absolute -bottom-20 -left-10 size-48 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="relative">
        <span className="inline-block rounded-full bg-sky-400/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300">Consigliati</span>
        <h3 className="mt-3 font-heading text-lg font-bold leading-snug">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={primary.href || "#"}
            target={primary.href ? "_blank" : undefined}
            rel="sponsored nofollow noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-sky-700 active:scale-[0.98]"
            data-testid={primary.testid}
          >
            <span className="flex items-center gap-2"><primary.icon className="size-4 shrink-0" /> {primary.label}</span>
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href={secondary.href || "#"}
            target={secondary.href ? "_blank" : undefined}
            rel="sponsored nofollow noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-[0.98]"
            data-testid={secondary.testid}
          >
            <span className="flex items-center gap-2"><secondary.icon className="size-4 shrink-0" /> {secondary.label}</span>
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-500" data-testid={`${testid}-disclosure`}>
          Link di affiliazione: potremmo ricevere una commissione, senza costi aggiuntivi per te.{" "}
          <Link to="/disclaimer" className="underline underline-offset-2 transition-colors hover:text-slate-300">Scopri di più</Link>
        </p>
      </div>
    </div>
  );
}
