import { Calendar, Headset } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const FromMarginalSection = () => {
  const { t } = useTranslation();

  const cards = [
    { key: "screening", icon: Calendar },
    { key: "sportello", icon: Headset },
  ];

  return (
    <section className="bg-accent py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading as="h1" className="mx-auto mb-12 max-w-3xl">
            {t("fromMarginal.title")}
          </SectionHeading>
        </Reveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {cards.map(({ key, icon: Icon }, index) => (
            <Reveal key={key} delay={140 + index * 130} className="h-full">
              <Card className="group h-full border border-card-border/10 bg-background p-8 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-soft">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-[background-color,color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-primary">
                  {t(`fromMarginal.${key}.title`)}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {t(`fromMarginal.${key}.description`)}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FromMarginalSection;
