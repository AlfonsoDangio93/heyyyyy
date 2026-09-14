import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import step1Image from "@/assets/screening-step-1-email.png";
import step2Image from "@/assets/screening-step-2-calendar.png";
import step3Image from "@/assets/screening-step-3-reminder.png";
import step4Image from "@/assets/screening-step-4-clinic.png";
import { useTranslation } from "@/i18n/useTranslation";

const ScreeningProcessSection = () => {
  const { t } = useTranslation();

  const steps = [
    { number: "1", title: t("screeningProcess.step1"), image: step1Image },
    { number: "2", title: t("screeningProcess.step2"), image: step2Image },
    { number: "3", title: t("screeningProcess.step3"), image: step3Image },
    { number: "4", title: t("screeningProcess.step4"), image: step4Image },
  ];

  return (
    <section className="bg-secondary-pale py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl">
          <Reveal>
            <SectionHeading>{t("screeningProcess.title")}</SectionHeading>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-6 text-center text-lg text-muted-foreground">
              {t("screeningProcess.subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={240 + index * 120} className="h-full">
              <Card className="group h-full border border-card-border/10 bg-background p-6 text-center shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-soft">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground transition-transform duration-300 ease-spring group-hover:scale-110">
                  {step.number}
                </div>
                <h3 className="mb-4 text-lg font-semibold text-primary">{step.title}</h3>
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="mx-auto w-full max-w-[200px] transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreeningProcessSection;
