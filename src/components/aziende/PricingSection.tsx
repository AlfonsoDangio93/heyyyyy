import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import { useTranslation } from "@/i18n/useTranslation";

const PricingSection = () => {
  const { t } = useTranslation();

  const features = [t("pricing.feature1"), t("pricing.feature2"), t("pricing.feature3")];

  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-6">
          <Reveal>
            <SectionHeading>{t("pricing.title")}</SectionHeading>
          </Reveal>
          <Reveal delay={130}>
            <p className="text-center text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
          </Reveal>
        </div>

        <Reveal direction="scale" delay={220} className="mb-12 flex justify-center">
          <Card className="flex w-full max-w-md flex-col border-none bg-secondary p-8 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-soft">
            <div className="text-center">
              <h3 className="mb-4 text-2xl font-bold text-primary">{t("pricing.annual.title")}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">{t("pricing.annual.price")}</span>
                <span className="ml-2 text-muted-foreground">{t("pricing.annual.perEmployee")}</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <div className="text-center">
          <Reveal direction="scale" delay={340}>
            <CtaButton>{t("pricing.cta")}</CtaButton>
          </Reveal>
          <Reveal delay={440}>
            <p className="mt-8 whitespace-pre-line text-center text-sm text-muted-foreground">
              {t("pricing.asteriskNote")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
