import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ScrollToTopOnNavigate from "@/components/ScrollToTopOnNavigate";
import ScrollProgress from "@/components/ScrollProgress";
import Index from "./pages/Index";
import GiornateDiPrevenzione from "./pages/GiornateDiPrevenzione";
import Coperture from "./pages/Coperture";
import Cliniche from "./pages/Cliniche";
import ChiSiamo from "./pages/ChiSiamo";
import SportelloSanitario from "./pages/SportelloSanitario";
import NavigatoreSanitario from "./pages/NavigatoreSanitario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <ScrollToTopOnNavigate />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/giornate-di-prevenzione" element={<GiornateDiPrevenzione />} />
            <Route path="/coperture" element={<Coperture />} />
            <Route path="/strutture-sanitarie" element={<Cliniche />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/sportello-sanitario" element={<SportelloSanitario />} />
            <Route path="/navigatore-sanitario" element={<NavigatoreSanitario />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
