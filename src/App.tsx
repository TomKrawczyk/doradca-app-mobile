import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import Index from "./pages/Index";
import AboutCompany from "./pages/AboutCompany";
import EnergyPrices from "./pages/EnergyPrices";
import PVInstallation from "./pages/PVInstallation";
import Benefits from "./pages/Benefits";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter basename="/prezentacja_doradca">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutCompany />} />
          <Route path="/prices" element={<EnergyPrices />} />
          <Route path="/installation" element={<PVInstallation />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/install" element={<Install />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
