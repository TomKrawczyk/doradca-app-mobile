import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AboutCompany = lazy(() => import("./pages/AboutCompany"));
const EnergyPrices = lazy(() => import("./pages/EnergyPrices"));
const PVInstallation = lazy(() => import("./pages/PVInstallation"));
const Benefits = lazy(() => import("./pages/Benefits"));
const Install = lazy(() => import("./pages/Install"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const AppLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
    <LoadingSpinner size="large" />
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors />
        <PWAInstallPrompt />
        <BrowserRouter basename="/prezentacja_doradca">
          <Suspense fallback={<AppLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutCompany />} />
              <Route path="/prices" element={<EnergyPrices />} />
              <Route path="/installation" element={<PVInstallation />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/install" element={<Install />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
