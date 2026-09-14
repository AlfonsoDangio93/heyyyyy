import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const QUARTERS = ["q1", "q2", "q3", "q4"];

const CalendarSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const screeningCalendar = QUARTERS.map((key, index) => ({
    quarter: `Q${index + 1}`,
    months: t(`calendar.${key}.months`),
    title: t(`calendar.${key}.title`),
    description: t(`calendar.${key}.description`),
  }));

  const nextSlide = () => setCurrentIndex((prev) => (prev >= screeningCalendar.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? screeningCalendar.length - 1 : prev - 1));

  const current = screeningCalendar[currentIndex];

  return (
    <section className="bg-accent py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="mx-auto mb-12 max-w-4xl">{t("calendar.title")}</SectionHeading>
        </Reveal>

        {/* Desktop - i quattro trimestri */}
        <div className="mx-auto mb-6 hidden max-w-5xl gap-6 md:grid md:grid-cols-4">
          {screeningCalendar.map((item, index) => (
            <Reveal key={item.quarter} delay={140 + index * 120} className="h-full">
              <Card className="group h-full border-2 border-primary/20 bg-background p-6 text-center shadow-card transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary hover:shadow-soft">
                <div className="mb-1 text-3xl font-bold text-primary transition-transform duration-300 ease-spring group-hover:scale-110">
                  {item.quarter}
                </div>
                <div className="mb-3 text-xs text-muted-foreground">{item.months}</div>
                <h3 className="mb-2 text-xl font-semibold text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Mobile - carosello */}
        <Reveal className="mx-auto mb-6 max-w-sm md:hidden">
          <Card
            key={current.quarter}
            className="border-2 border-primary/20 bg-background p-6 text-center shadow-card motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 motion-safe:duration-300"
          >
            <div className="mb-1 text-3xl font-bold text-primary">{current.quarter}</div>
            <div className="mb-3 text-xs text-muted-foreground">{current.months}</div>
            <h3 className="mb-2 text-xl font-semibold text-primary">{current.title}</h3>
            <p className="text-muted-foreground">{current.description}</p>
          </Card>
        </Reveal>

        <div className="mb-6 flex justify-center gap-4 md:hidden">
          <button
            onClick={prevSlide}
            className="rounded-full bg-primary p-2 text-primary-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-primary/90"
            aria-label={t("calendar.prevLabel")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="rounded-full bg-primary p-2 text-primary-foreground transition-all duration-300 ease-out hover:scale-110 hover:bg-primary/90"
            aria-label={t("calendar.nextLabel")}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <Reveal delay={200}>
          <p className="mt-4 text-center text-sm italic text-muted-foreground">{t("calendar.note")}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default CalendarSection;
