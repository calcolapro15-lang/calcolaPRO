import { Calculator, FileText, Landmark, UserCheck } from "lucide-react";
import AffiliateBox from "@/components/AffiliateBox";
import ForfettarioTool from "@/components/piva/ForfettarioTool";
import QuoteTool from "@/components/piva/QuoteTool";
import { usePageMeta } from "@/lib/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabCls =
  "h-10 gap-2 rounded-lg px-4 text-sm font-semibold text-slate-600 transition-[background-color,color,box-shadow] duration-150 hover:text-slate-900 data-active:bg-slate-900 data-active:text-white data-active:hover:text-white data-active:shadow-md";

export default function Preventivi() {
  usePageMeta(
    "Calcolo Tasse Regime Forfettario e Generatore Preventivi PDF | CalcolaPro",
    "Calcola netto annuo e mensile in regime forfettario con INPS e imposta sostitutiva al 5% o 15%, e crea gratis un preventivo professionale in PDF.",
  );
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="mb-8 max-w-3xl animate-rise print:hidden">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Strumenti per freelance</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]" data-testid="page-title">
          Preventivi & Partita IVA
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Stima quanto ti resta in tasca con il regime forfettario e crea un preventivo professionale pronto da stampare o salvare in PDF.
        </p>
      </section>

      <Tabs defaultValue="forfettario" className="gap-6">
        <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xs group-data-horizontal/tabs:h-auto sm:w-fit print:hidden" data-testid="piva-tabs">
          <TabsTrigger value="forfettario" className={tabCls} data-testid="tab-forfettario">
            <Calculator className="size-4" /> 1. Calcolo Tasse Forfettario
          </TabsTrigger>
          <TabsTrigger value="preventivo" className={tabCls} data-testid="tab-preventivo">
            <FileText className="size-4" /> 2. Generatore Preventivo Rapido
          </TabsTrigger>
        </TabsList>
        <TabsContent value="forfettario" className="text-base">
          <ForfettarioTool />
        </TabsContent>
        <TabsContent value="preventivo" className="text-base">
          <QuoteTool />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <AffiliateBox
          testid="box-affiliate-piva"
          title="Gestisci la tua Partita IVA senza stress"
          subtitle="Servizi selezionati per freelance e professionisti in regime forfettario."
          primary={{ label: "Simula apertura P.IVA con commercialista online", icon: UserCheck, testid: "cta-open-piva" }}
          secondary={{ label: "Apri conto business per freelance", icon: Landmark, testid: "cta-freelance-account" }}
        />
      </div>
    </div>
  );
}
