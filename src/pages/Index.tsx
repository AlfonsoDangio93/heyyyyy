import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeroSection from "@/components/aziende/HeroSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ClientsSection from "@/components/home/ClientsSection";
import StatementSection from "@/components/home/StatementSection";
import CoverageExtraSection from "@/components/home/CoverageExtraSection";
import PlatformSection from "@/components/home/PlatformSection";
import AdvantageSection from "@/components/home/AdvantageSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatementSection />
        <CoverageExtraSection />
        <PlatformSection />
        <AdvantageSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTASection />
        <ClientsSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
