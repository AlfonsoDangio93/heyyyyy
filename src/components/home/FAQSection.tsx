import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { useTranslation } from "@/i18n/useTranslation";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"];

/**
 * Terza scatola della home: rettangolo stondato **petrolio**, il colore del
 * marchio, che galleggia sulla pagina bianca. Le domande ci stanno dentro come
 * schede bianche, come le schede dentro il contenitore del riferimento.
 *
 * Era stata provata grigio caldo (`--surface`): scartata, il cliente ha scelto
 * il petrolio del logo.
 *
 * ⚠️ Il filo di bordo e' `border-accent/15` e non `border-card-border/10`: su
 * un fondo petrolio un bordo petrolio al 10% non si vede.
 */

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background px-3 py-3 md:p-4">
      <div className="rounded-card border border-accent/15 bg-primary py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titolo in colonna a sinistra e domande a destra: la scatola e'
              larga quanto la pagina e, con il titolo sopra e l'elenco stretto
              a sinistra, restava mezza vuota. */}
          <div className="lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-14">
            <Reveal>
              <SectionHeading align="left" rule={false} tone="light" className="mb-10 lg:mb-0">
                {t("home.faq.title")}
              </SectionHeading>
            </Reveal>

            {/* La prima domanda parte aperta: la sezione altrimenti si apre
                su cinque righe chiuse e non si capisce cosa ci sia dentro.
                Resta `collapsible`, quindi chi vuole puo' richiuderla. */}
            <Accordion type="single" collapsible defaultValue={FAQ_KEYS[0]} className="w-full">
              {FAQ_KEYS.map((key, index) => (
                <Reveal key={key} delay={index * 100} threshold={0.1}>
                  {/* ⚠️ Il filo di separazione si toglie all'ultima riga
                      **con l'indice, non con `last:`**. Ogni voce sta dentro il
                      suo `Reveal`, quindi e' figlia unica del suo contenitore e
                      `last:` la colpisce sempre: con `last:border-b-0` sparivano
                      tutti i separatori, non solo l'ultimo. Vale per qualunque
                      variante `first:` o `last:` dentro a un `Reveal`. */}
                  <AccordionItem
                    value={key}
                    className={cn(
                      "group",
                      // ⚠️ `border-b-0` esplicito sull'ultima: `AccordionItem`
                      // aggiunge `border-b` da solo, quindi senza toglierlo
                      // resta un filo appeso sotto l'ultima domanda.
                      index < FAQ_KEYS.length - 1 ? "border-b border-accent/25" : "border-b-0",
                    )}
                  >
                    {/* ⚠️ `[&>svg]:hidden` spegne il chevron che `AccordionTrigger`
                        infila da solo: `src/components/ui/**` non si tocca, quindi
                        l'icona giusta si aggiunge e quella di serie si nasconde.
                        La mia sta dentro uno `span`, percio' non la colpisce. */}
                    <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline md:gap-6 md:py-6 [&>svg]:hidden">
                      <span className="flex items-baseline gap-4">
                        <span className="text-fluid-sm font-bold text-accent/80">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-fluid-base font-semibold leading-snug text-accent">
                          {t(`home.faq.${key}.question`)}
                        </span>
                      </span>

                      {/* Un piu' che ruota di 45 gradi e diventa una croce, e il
                          cerchio si riempie: due segnali invece di uno. */}
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 transition-[background-color,border-color,transform] duration-300 ease-spring group-hover:border-accent/60 group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent group-data-[state=open]:bg-accent"
                      >
                        <Plus className="h-4 w-4 text-accent transition-colors duration-300 group-data-[state=open]:text-primary" />
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="max-w-3xl -translate-y-2 pb-7 text-fluid-base leading-relaxed text-accent/80 opacity-0 transition-all duration-500 ease-reveal group-data-[state=open]:translate-y-0 group-data-[state=open]:opacity-100 group-data-[state=open]:delay-100 sm:pl-[2.75rem]">
                      {t(`home.faq.${key}.answer`)}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
