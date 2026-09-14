import { Link } from "react-router-dom";
import { Compass, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import { useTranslation } from "@/i18n/useTranslation";

const SolutionsSection = () => {
  const { t } = useTranslation();

  const solutions = [
    { key: "card1", to: "/coperture", icon: Stethoscope },
    { key: "card2", to: "/navigatore-sanitario", icon: Compass },
  ];

  return (
    <section className="bg-accent py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="mx-auto mb-16 max-w-3xl">{t("solutions.title")}</SectionHeading>
        </Reveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {solutions.map(({ key, to, icon: Icon }, index) => (
            <Reveal key={key} delay={140 + index * 130} className="h-full">
              <div className="flex h-full flex-col items-center text-center">
                <Link to={to} className="w-full flex-1">
                  <Card className="group flex h-full flex-col items-center justify-center border border-card-border/10 bg-background p-8 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-soft">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary transition-[background-color,color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="flex min-h-[3.5rem] items-center justify-center text-2xl font-bold text-primary">
                        {t(`solutions.${key}.title`)}
                      </h3>
                    </div>
                  </Card>
                </Link>
                <p className="mt-4 flex min-h-[3.5rem] max-w-md items-center justify-center text-lg text-muted-foreground">
                  {t(`solutions.${key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="scale" delay={420}>
          <div className="mt-10 flex justify-center">
            <CtaButton>{t("solutions.cta")}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default SolutionsSection;
