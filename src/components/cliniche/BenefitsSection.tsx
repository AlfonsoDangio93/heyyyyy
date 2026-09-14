import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const BenefitsSection = () => {
  const { t } = useTranslation();

  const benefits = [t("benefits.benefit1"), t("benefits.benefit2"), t("benefits.benefit3")];

  return (
    <section className="bg-primary py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading tone="light" className="mb-12 md:mb-16">{t("benefits.title")}</SectionHeading>
        </Reveal>

        <div className="mx-auto max-w-3xl">
          <Reveal delay={140}>
            <Card className="rounded-card border-none bg-accent p-8 shadow-soft md:p-10">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <Reveal key={benefit} direction="left" delay={220 + index * 120}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <p className="text-lg text-foreground">{benefit}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
