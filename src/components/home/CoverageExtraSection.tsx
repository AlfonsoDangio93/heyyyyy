import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTranslation } from "@/i18n/useTranslation";
import { cn } from "@/lib/utils";

/** Stella a punte del badge, generata invece di essere disegnata a mano. */
const burstPath = (spikes = 22, outer = 50, inner = 41.5) => {
  const step = Math.PI / spikes;
  let d = "";
  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = i * step - Math.PI / 2;
    const x = (50 + radius * Math.cos(angle)).toFixed(2);
    const y = (50 + radius * Math.sin(angle)).toFixed(2);
    d += `${i === 0 ? "M" : "L"}${x},${y}`;
  }
  return `${d}Z`;
};

/**
 * Freccia curva disegnata a mano: prende il colore dal genitore.
 *
 * Punta in basso, non piu' a sinistra: la nota sta sopra e la fetta crema
 * delle integrazioni le cade sotto, quasi sulla stessa colonna (misurato a
 * 1440: centro della nota a 1203px, centro della fetta a 1182px).
 */
const CurvedArrow = ({ className = "" }: { className?: string }) => (
  // ⚠️ Questo e' il disegno buono, scelto dal cliente. Ne sono stati provati
  // altri due mentre la nota scendeva verso la barra, **entrambi scartati**:
  // uno lungo il doppio con due curve opposte («troppo storta») e uno lungo
  // con un arco solo. Per farla scendere si allunga lo stacco sopra, non la
  // freccia.
  <svg viewBox="0 0 56 100" fill="none" aria-hidden="true" className={className}>
    <path d="M38 6C46 34 26 48 24 88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 88 13 68M24 88 37 73" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/**
 * ⚠️ La pista delle barre e' `w-full sm:flex-1`, non `flex-1`. Sotto `sm` la
 * riga e' in colonna e li' `flex-1` vale sull'asse verticale: `flex-basis: 0`
 * schiaccia la pista a zero e la barra sparisce. Succedeva anche prima.
 */

/**
 * Nota scritta a mano con la freccia sotto, che scende verso la fetta crema
 * delle integrazioni. Compare una volta
 * sola sullo schermo: sotto il sole da `md` in su, in fondo al grafico sotto,
 * dove nell'angolo in alto a destra finirebbe sopra al titolo.
 */
const HandNote = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center gap-2 text-accent/70">
    <p className="max-w-[17rem] text-center font-hand text-2xl font-bold uppercase leading-tight text-accent md:-rotate-6 md:text-left md:text-[1.6rem]">
      {text}
    </p>
    {/* La freccia sta sotto la scritta e scende verso la fetta crema delle
        integrazioni. Il rientro la porta sulla colonna della fetta invece che
        sul bordo destro del riquadro.
        ⚠️ A 768 il rientro grande la portava 6px fuori dalla fetta, sopra la
        parte azzurra: da `md` il rientro e' zero, torna a 48px da `lg`. */}
    <CurvedArrow className="hidden h-20 w-12 shrink-0 md:block lg:mr-12" />
  </div>
);

/** Quota del fondo CCNL, uguale nelle due barre: e' il termine di paragone. */
const BASE_WIDTH = 66;

/**
 * Quota che le integrazioni aggiungono alla base: 66 piu' 34 fa 100.
 *
 * ⚠️ Una sola voce, non un elenco di prestazioni. Avevo provato con tre
 * pastiglie (chirurgia, carie, figli, le voci citate nella nota): **scartate**,
 * perche' non e' detto che siano quelle a fare la differenza e la barra
 * finiva per affermare un dato che nessuno ha validato.
 */
const EXTRA_WIDTH = 34;

/**
 * Il bivio del blocco «punto unico di contatto»: dal marchio scendono due rami
 * verso le colonne, che stanno al 25% e al 75% della larghezza, cioe'
 * esattamente sotto i due capolinea.
 *
 * ⚠️ `preserveAspectRatio="none"` con altezza esplicita: il disegno si stira
 * sul contenitore, quindi la x dei capolinea vale sempre larghezza/900 e
 * restano al 25% e al 75%, cioe' sopra i pallini. Con l'altezza automatica il
 * riquadro scalava in modo uniforme e i capolinea finivano molto piu' dentro.
 * `vectorEffect="non-scaling-stroke"` tiene il tratto a 2px malgrado lo stiro.
 */
// I capolinea sono a 220 e 680, non a 225 e 675: la griglia sotto ha
// `gap-8`, che sposta il centro di ogni colonna di 8px verso l'interno.
const HUB_PATHS = ["M450 4 C450 46 220 34 220 76", "M450 4 C450 46 680 34 680 76"];

const CoverageExtraSection = () => {
  // Un osservatore per grafica: sono lontane fra loro e con una soglia sola
  // la seconda risulterebbe già disegnata quando arriva sullo schermo.
  const { ref: chartRef, isVisible: chartVisible } = useScrollAnimation(0.35);
  const { ref: hubRef, isVisible: hubVisible } = useScrollAnimation(0.3);
  const reduced = useReducedMotion();
  const { t } = useTranslation();

  const [extrasOn, setExtrasOn] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [extrasIn, setExtrasIn] = useState(false);

  const grown = chartVisible || reduced;
  const linked = hubVisible || reduced;

  // Prima cresce la base, poi entrano le integrazioni: e' il punto della
  // sezione, e vederle arrivare dopo lo dice senza bisogno di scriverlo.
  useEffect(() => {
    if (!grown) return undefined;
    if (reduced) {
      setExtrasIn(true);
      return undefined;
    }
    const id = window.setTimeout(() => setExtrasIn(true), 700);
    return () => window.clearTimeout(id);
  }, [grown, reduced]);

  const fullWidth = grown
    ? extrasIn && extrasOn
      ? BASE_WIDTH + EXTRA_WIDTH
      : BASE_WIDTH
    : 0;
  const motion = reduced ? "" : "transition-[width,flex-grow] duration-700 ease-reveal";

  return (
    // Struttura a box: la sezione e' solo il margine, il colore sta sul
    // rettangolo stondato che ci galleggia dentro.
    <section className="relative bg-background px-3 py-3 md:p-4">
      {/* La stella sta a cavallo del bordo alto del riquadro, meta' fuori e
          meta' dentro: e' sorella del riquadro e non figlia, altrimenti
          `overflow-hidden` le taglierebbe la parte di sopra.
          ⚠️ La traslazione sta sul contenitore e non su `Reveal`: da visibile
          `Reveal` impone `translate-y-0` e annullerebbe lo scavalco. */}
      <div className="absolute right-5 top-3 z-10 flex flex-col items-center md:right-[7%] md:top-4">
        {/* Il margine negativo vale meta' altezza del sole (64px e 104px):
            cosi' scavalca il bordo restando in colonna con la nota, che gli
            sta sotto. Con `-translate-y-1/2` sul contenitore si alzerebbe
            anche la nota. ⚠️ Cambiando la misura del sole va rifatto il
            margine, altrimenti lo scavalco non e' piu' a meta'. */}
        <Reveal direction="scale" threshold={0} duration={700} className="-mt-16 md:-mt-[104px]">
          <div className="relative h-32 w-32 -rotate-6 md:h-52 md:w-52">
            {/* Crema con il filo petrolio: la meta' di sopra sta sul bianco
                della pagina, dove il crema da solo farebbe 1,05:1 e sparirebbe.
                Il filo la tiene leggibile su entrambi i fondi.
                ⚠️ Niente alone sfocato ne' ombra petrolio dietro: erano stati
                provati e tolti, sporcavano di verde il bianco della pagina. */}
            <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full text-accent">
              <path
                d={burstPath()}
                fill="currentColor"
                stroke="hsl(var(--primary))"
                strokeWidth={1.4}
                strokeLinejoin="round"
              />
            </svg>
            {/* Il testo sta dentro `inset-[19%]`, cioe' il cerchio interno
                della stella: un padding uniforme lo spingerebbe sulle punte. */}
            <span className="absolute inset-[19%] flex items-center justify-center text-center text-xs font-bold leading-snug text-primary md:text-base">
              {t("home.coverageExtra.badge")}
            </span>
          </div>
        </Reveal>

        {/* ⚠️ Lo stacco dal sole e' grande apposta: nota e freccia scendono
            fin sopra la barra, cosi' la punta indica la fetta crema invece di
            restare a mezz'aria. Misurato: la punta cade fra 3 e 20px
            sopra il bordo della fetta, secondo la larghezza. Cambiando l'altezza del sole o del grafico va rifatto. */}
        <Reveal delay={260} threshold={0} className="mt-48 hidden md:block">
          <HandNote text={t("home.coverageExtra.note")} />
        </Reveal>
      </div>

      <div className="overflow-hidden rounded-card bg-primary py-14 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading tone="light" align="left" rule={false} className="max-w-[820px]">
              {t("home.coverageExtra.title")}
            </SectionHeading>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-[640px] text-fluid-base leading-relaxed text-accent/80">
              {t("home.coverageExtra.subtitle")}
            </p>
          </Reveal>

          {/* Grafica 1: le due barre a confronto, con le fette da accendere.
              La riga «Con HeyLucy» sta dentro un riquadro acceso: e' il caso
              che conta, e i comandi vivono li' dentro. La riga di sopra ha lo
              stesso padding ma invisibile, altrimenti le due barre non
              partirebbero dalla stessa colonna e il confronto salterebbe. */}
          <div ref={chartRef} className="mt-14 md:mt-20">
            <div className="rounded-[1.5rem] border border-transparent p-4 md:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                <span className="text-fluid-base text-accent/80 sm:w-44 sm:shrink-0 sm:text-right">
                  {t("home.coverageExtra.yourFund")}
                </span>
                <div className="flex h-14 w-full sm:flex-1 md:h-20" aria-hidden="true">
                  <div
                    className={cn("h-full rounded-lg bg-secondary", motion)}
                    style={{ width: grown ? `${BASE_WIDTH}%` : "0%" }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-accent/25 bg-accent/[0.07] p-4 md:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                <span className="text-fluid-lg font-bold text-accent sm:w-44 sm:shrink-0 sm:text-right">
                  {t("home.coverageExtra.withHeylucy")}
                </span>
                <div className="flex h-14 w-full sm:flex-1 md:h-20" aria-hidden="true">
                  {/* Il contenitore e' stondato e ritaglia: cosi' la fetta in
                      coda resta arrotondata qualunque sia l'ultima accesa. */}
                  <div
                    className={cn("flex h-full overflow-hidden rounded-lg", motion)}
                    style={{ width: `${fullWidth}%` }}
                  >
                    <div className="h-full bg-secondary" style={{ flexGrow: BASE_WIDTH, flexBasis: 0 }} />
                    <div
                      className={cn(
                        "h-full bg-accent shadow-[inset_1px_0_0_hsl(var(--primary)/0.35)]",
                        hovered ? "brightness-105" : "",
                        reduced ? "" : "transition-[flex-grow,filter] duration-700 ease-reveal",
                      )}
                      style={{ flexGrow: extrasOn ? EXTRA_WIDTH : 0, flexBasis: 0 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:pl-52">
                {/* ⚠️ Sotto `md` legenda e pastiglia stanno **sulla stessa riga**: sono
                    300px disponibili e alle misure del desktop la somma faceva
                    339, quindi la pastiglia andava a capo. Corpo a 12px, passo
                    ridotto e padding piu' stretto portano il totale a 272. */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3 md:gap-x-5">
                  <span className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[3px] bg-secondary md:h-3 md:w-3" />
                    <span className="text-[11px] text-accent/80 md:text-fluid-sm">
                      {t("home.coverageExtra.legendBase")}
                    </span>
                  </span>

                  {/* Unico comando: la pastiglia fa da legenda del crema e da
                      interruttore delle integrazioni. Il contenitore e'
                      `relative` perche' ci appoggia sopra l'etichetta che
                      segue il mouse. */}
                  {/* Unico comando: la pastiglia fa da legenda del crema e da
                      interruttore delle integrazioni. */}
                  <button
                    type="button"
                    aria-pressed={extrasOn}
                    onClick={() => setExtrasOn((on) => !on)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocus={() => setHovered(true)}
                    onBlur={() => setHovered(false)}
                    className={cn(
                      "flex items-center gap-1 rounded-pill border px-2.5 py-1 text-[11px] font-semibold md:min-h-[44px] md:gap-2 md:px-4 md:py-2 md:text-fluid-sm transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                      extrasOn
                        ? "border-accent bg-accent text-primary"
                        : "border-accent/40 bg-transparent text-accent/80 hover:border-accent/70 hover:text-accent",
                    )}
                  >
                    {extrasOn ? <Check className="h-3 w-3 md:h-4 md:w-4" /> : <Plus className="h-3 w-3 md:h-4 md:w-4" />}
                    {t("home.coverageExtra.legendExtra")}
                  </button>
                </div>

                {/* ⚠️ Qui c'era «Tocca per togliere o rimettere le integrazioni»,
                    tolta su richiesta: faceva solo confusione. La pastiglia si
                    vede gia' che e' un comando (bordo, spunta, sollevamento al
                    passaggio) e porta `aria-pressed`, quindi lo stato resta
                    leggibile anche a chi usa uno screen reader. */}
              </div>
            </div>
          </div>

          {/* Sotto `md` la nota non ci sta in alto a destra: va qui. */}
          <Reveal delay={120} className="mt-10 flex justify-center md:hidden">
            <HandNote text={t("home.coverageExtra.note")} />
          </Reveal>

          {/* Grafica 2: i due rami che convergono nel marchio */}
          {/* Filo leggero fra il grafico e il blocco del marchio: separa i due
              discorsi senza chiudere il primo in una scatola. */}
          <div ref={hubRef} className="mt-12 border-t border-accent/15 pt-12 md:mt-20 md:pt-16">
            <Reveal className="flex flex-col items-center">
              <Logo variant="white" />
              <p className="mt-3 max-w-md text-center text-fluid-base text-accent/80">
                {t("home.coverageExtra.hub")}
              </p>
            </Reveal>

            <svg
              viewBox="0 0 900 80"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              className="mt-4 h-16 w-full text-accent/45 md:h-24"
            >
              {HUB_PATHS.map((d, index) => (
                <path
                  key={d}
                  d={d}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  // `pathLength` normalizza la curva a 1: il disegno progressivo
                  // non dipende piu' dalla lunghezza reale del tracciato.
                  //
                  // ⚠️ Il tratto e' lungo **1,6 e non 1**. Con
                  // `preserveAspectRatio="none"` la curva viene stirata in
                  // orizzontale, ma `non-scaling-stroke` fa calcolare il
                  // tratteggio in coordinate schermo: un tratto lungo quanto la
                  // curva **normalizzata** ne copriva solo il 70% e la linea
                  // finiva un centinaio di pixel prima del pallino. Un tratto
                  // abbondante copre tutto. Il disegno si completa quindi nei
                  // primi due terzi dell'animazione, e va bene cosi'.
                  pathLength={1}
                  strokeDasharray={1.6}
                  className={reduced ? "" : "transition-[stroke-dashoffset] duration-[1100ms] ease-reveal"}
                  style={{
                    strokeDashoffset: linked ? 0 : 1.6,
                    transitionDelay: linked && !reduced ? `${240 + index * 180}ms` : "0ms",
                  }}
                />
              ))}
            </svg>

            {/* ⚠️ Due colonne **anche sul telefono**, non una in colonna: la
                forcella e' il disegno della sezione e in verticale si perde.
                Con `gap-3` le due colonne misurano 173px e i loro centri
                cadono al 24,2% della larghezza, cioe' sui capolinea della
                forcella, che stanno a 220 e 680 su 900. Il testo scende di
                corpo per starci: titolo a 12px su due righe. */}
            <div className="grid grid-cols-2 gap-3 md:gap-8">
              {["branch1", "branch2"].map((key, index) => (
                <Reveal
                  key={key}
                  direction="scale"
                  delay={500 + index * 160}
                  className="flex flex-col items-center"
                >
                  <span aria-hidden="true" className="h-3 w-3 rounded-full bg-accent/70" />
                  <p className="mt-3 max-w-xs text-center text-xs font-semibold leading-snug text-accent md:mt-4 md:text-fluid-base">
                    {t(`home.coverageExtra.${key}.title`)}
                  </p>
                  <p className="mt-1 max-w-xs text-center text-[11px] leading-snug text-accent/80 md:text-fluid-sm">
                    {t(`home.coverageExtra.${key}.detail`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageExtraSection;
