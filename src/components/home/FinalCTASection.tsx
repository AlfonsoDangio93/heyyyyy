import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import { useTranslation } from "@/i18n/useTranslation";

const FinalCTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden bg-background py-16 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Reveal>
            {/* `rule={false}` come tutte le altre sezioni della home: il
                filetto tricolore era rimasto solo qui. */}
            <SectionHeading rule={false}>{t("home.finalCta.title")}</SectionHeading>
          </Reveal>

          <Reveal delay={130}>
            <p className="text-lg text-muted-foreground md:text-xl">{t("home.finalCta.subtitle")}</p>
          </Reveal>

          <Reveal direction="scale" delay={260} className="pt-2">
            <CtaButton>{t("home.finalCta.cta")}</CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
