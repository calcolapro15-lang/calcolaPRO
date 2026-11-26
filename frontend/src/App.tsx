import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Margini from "@/pages/Margini";
import Preventivi from "@/pages/Preventivi";
import AffittiBrevi from "@/pages/AffittiBrevi";
import Contatti from "@/pages/Contatti";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Disclaimer from "@/pages/Disclaimer";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Margini />} />
        <Route path="/preventivi" element={<Preventivi />} />
        <Route path="/affitti-brevi" element={<AffittiBrevi />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="*" element={<Margini />} />
      </Route>
    </Routes>
  );
}
