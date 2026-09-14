import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FromMarginalSection from "@/components/aziende/FromMarginalSection";
import WhyWelfareSection from "@/components/aziende/WhyWelfareSection";
import CalendarSection from "@/components/aziende/CalendarSection";
import ScreeningProcessSection from "@/components/aziende/ScreeningProcessSection";
import SupportSection from "@/components/aziende/SupportSection";
import ComparisonSection from "@/components/aziende/ComparisonSection";
import TestimonialsSection from "@/components/aziende/TestimonialsSection";
import FAQSection from "@/components/aziende/FAQSection";

const GiornateDiPrevenzione = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FromMarginalSection />
        <WhyWelfareSection />
        <CalendarSection />
        <ScreeningProcessSection />
        <SupportSection />
        <ComparisonSection />
        <TestimonialsSection background="pale" />
        <FAQSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default GiornateDiPrevenzione;
