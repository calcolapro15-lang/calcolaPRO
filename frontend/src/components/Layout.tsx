import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Calculator, Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import CalculatorGuideFAQ from "@/components/CalculatorGuideFAQ";
import PlatformComparison from "@/components/PlatformComparison";

const NAV = [
  { to: "/", label: "Margini E-commerce", testid: "nav-link-ecommerce-margins" },
  { to: "/preventivi", label: "Preventivi & P.IVA", testid: "nav-link-preventivi-piva" },
  { to: "/affitti-brevi", label: "Rendita Affitti Brevi", testid: "nav-link-affitti-brevi" },
  { to: "/contatti", label: "Contatti", testid: "nav-link-contatti" },
];

const CALCULATOR_PATHS = ["/", "/preventivi", "/affitti-brevi"];

function navClass(isActive: boolean) {
  return cn(
    "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-150",
    isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const showGuideFAQ = CALCULATOR_PATHS.includes(pathname);
  const showComparison = pathname === "/";

  return (
    <div className="flex min-h-svh flex-col bg-[#F8FAFC]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-xs backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2.5" data-testid="nav-brand-logo" onClick={() => setOpen(false)}>
            <span className="grid size-9 place-items-center rounded-xl bg-slate-900 text-emerald-400 shadow-sm">
              <Calculator className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-heading text-lg font-extrabold tracking-tight text-slate-900">
              Calcola<span className="text-emerald-600">Pro</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Sezioni">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end data-testid={n.testid} className={({ isActive }) => navClass(isActive)}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Apri menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 py-3 md:hidden" data-testid="nav-mobile-menu">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                data-testid={`${n.testid}-mobile`}
                className={({ isActive }) => navClass(isActive)}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
        {showComparison && <PlatformComparison />}
        {showGuideFAQ && <CalculatorGuideFAQ pathname={pathname} />}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-heading font-bold text-slate-900">
              Calcola<span className="text-emerald-600">Pro</span>
              <span className="ml-2 font-sans font-normal text-slate-500">© {new Date().getFullYear()}</span>
            </p>
            <p className="mt-1 text-slate-500" data-testid="footer-disclaimer-text">
              Disclaimer: i calcoli sono stime a scopo informativo e non sostituiscono la consulenza di un commercialista. Il sito può contenere link di affiliazione.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-600">
            <Link to="/contatti" className="transition-colors hover:text-slate-900" data-testid="footer-link-contatti">Contatti</Link>
            <Link to="/privacy-policy" className="transition-colors hover:text-slate-900" data-testid="footer-link-privacy">Privacy Policy</Link>
            <Link to="/cookie-policy" className="transition-colors hover:text-slate-900" data-testid="footer-link-cookie">Cookie Policy</Link>
            <Link to="/disclaimer" className="transition-colors hover:text-slate-900" data-testid="footer-link-disclaimer">Disclaimer & Affiliate Disclosure</Link>
          </div>
        </div>
      </footer>
      <Toaster richColors />
    </div>
  );
}
