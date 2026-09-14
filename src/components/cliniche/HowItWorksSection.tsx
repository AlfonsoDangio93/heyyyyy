import { Building2, Calendar, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { key: "step1", icon: Calendar },
    { key: "step2", icon: Building2 },
    { key: "step3", icon: Heart },
  ];

  return (
    <section className="bg-secondary-pale py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="mb-12">{t("howItWorks.title")}</SectionHeading>
        </Reveal>

        <div className="mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} delay={140 + index * 130} className="h-full">
              <Card className="group h-full border border-card-border/10 bg-background p-6 text-center shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-soft">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 ease-spring group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary">{t(`howItWorks.${key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`howItWorks.${key}.description`)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
