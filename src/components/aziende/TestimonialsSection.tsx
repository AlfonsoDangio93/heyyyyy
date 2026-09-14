import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

interface TestimonialsSectionProps {
  /** Le card prendono sempre l'altro colore della coppia rispetto alla sezione. */
  background?: "secondary" | "accent" | "pale";
}

const TestimonialsSection = ({ background = "secondary" }: TestimonialsSectionProps) => {
  const { t } = useTranslation();

  const sectionBg =
    background === "secondary" ? "bg-secondary" : background === "pale" ? "bg-secondary-pale" : "bg-accent";
  // Le card prendono sempre il tono opposto alla sezione: su crema o su
  // azzurro pallido diventano bianche, altrimenti sparirebbero.
  const cardBg = background === "secondary" ? "bg-accent" : "bg-background";

  const testimonials = [
    { quote: t('testimonials.quote1'), attribution: t('testimonials.attribution1') },
    { quote: t('testimonials.quote2'), attribution: t('testimonials.attribution2') },
    { quote: t('testimonials.quote3'), attribution: t('testimonials.attribution3') },
    { quote: t('testimonials.quote4'), attribution: t('testimonials.attribution4') },
  ];

  return (
    <section className={`py-20 md:py-28 ${sectionBg}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('testimonials.title')}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={index}
              delay={index * 120}
              direction={index % 2 === 0 ? "right" : "left"}
              className="h-full"
            >
              <Card className={`group h-full p-6 ${cardBg} border-2 border-primary shadow-lg transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl flex flex-col`}>
                <Quote className="w-10 h-10 text-primary mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6" />
                <p className="text-foreground italic leading-relaxed flex-1">
                  {testimonial.quote}
                </p>
                <p className="mt-4 text-sm text-primary/70 text-right">
                  {testimonial.attribution}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
