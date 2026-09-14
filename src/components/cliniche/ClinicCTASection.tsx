import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import { useTranslation } from "@/i18n/useTranslation";

const ClinicCTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-accent py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl space-y-6">
          <Reveal>
            <SectionHeading>{t("clinicCTA.title")}</SectionHeading>
          </Reveal>
          <Reveal delay={130}>
            <p className="text-center text-lg text-muted-foreground">{t("clinicCTA.subtitle")}</p>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={260}>
          <div id="clinic-contact" className="text-center">
            <CtaButton className="text-lg">{t("clinicCTA.cta")}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ClinicCTASection;
