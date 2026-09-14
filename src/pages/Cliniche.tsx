import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ClinicHeroSection from "@/components/cliniche/ClinicHeroSection";
import HowItWorksSection from "@/components/cliniche/HowItWorksSection";
import BenefitsSection from "@/components/cliniche/BenefitsSection";
import ClinicCTASection from "@/components/cliniche/ClinicCTASection";

const Cliniche = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ClinicHeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <ClinicCTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Cliniche;
