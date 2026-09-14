import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaButton from "@/components/CtaButton";
import { useTranslation } from "@/i18n/useTranslation";

const FAQ_KEYS = ["q1", "q2", "q3", "q4"];

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-accent py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading className="mb-10 md:mb-14">{t("faq.title")}</SectionHeading>
        </Reveal>

        <Accordion type="single" collapsible className="mx-auto mb-16 w-full max-w-4xl space-y-4">
          {FAQ_KEYS.map((key, index) => (
            <Reveal key={key} delay={index * 100} threshold={0.1}>
              <AccordionItem
                value={key}
                className="group overflow-hidden rounded-2xl border border-card-border/10 bg-background px-5 shadow-card transition-shadow duration-300 ease-out hover:shadow-soft data-[state=open]:shadow-soft data-[state=open]:ring-1 data-[state=open]:ring-primary/15 md:px-7"
              >
                <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:text-primary/40 [&>svg]:transition-colors group-hover:[&>svg]:text-primary [&[data-state=open]>svg]:text-primary">
                  <span className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary transition-[background-color,color,transform] duration-300 ease-out group-hover:scale-110 group-data-[state=open]:scale-110 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-bold leading-snug text-primary md:text-lg">
                      {t(`faq.${key}.question`)}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="-translate-y-2 pb-6 pl-0 text-base leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 ease-reveal group-data-[state=open]:translate-y-0 group-data-[state=open]:opacity-100 group-data-[state=open]:delay-100 sm:pl-[3.25rem]">
                  {t(`faq.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>

        <Reveal direction="scale" delay={200}>
          <div id="contact" className="text-center">
            <CtaButton>{t("faq.cta")}</CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQSection;
