import { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import { CLIENTS } from "@/lib/constants";
import { useTranslation } from "@/i18n/useTranslation";

/**
 * I file logo vengono raccolti da `src/assets/clients/` e associati per nome:
 * lasciare `qonto.svg` in quella cartella basta a far comparire il logo, senza
 * toccare questo file. Se manca, al suo posto resta il nome testuale.
 */
const logoFiles = import.meta.glob("../../assets/clients/*.{svg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const logoBySlug = Object.fromEntries(
  Object.entries(logoFiles).map(([path, url]) => [
    path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "",
    url,
  ]),
);

/**
 * Trattamento monocromatico su pannello bianco: `brightness-0` porta ogni logo
 * a nero pieno conservando la trasparenza. ⚠️ Niente `invert`, che serviva
 * quando la fascia era petrolio: qui produrrebbe loghi bianchi invisibili.
 *
 * L'opacita' arriva da `--logo-tone`, impostata per cliente, e compensa la
 * densita' di inchiostro del singolo marchio: senza, i marchi pieni sembrano
 * molto piu' scuri di quelli a tratto sottile.
 *
 * Altezza e larghezza sono entrambe limitate, ed entrambe moltiplicate per
 * `--logo-scale`: e' un pareggiamento di massa ottica, non di altezza.
 */
const LOGO_TONE = "brightness-0 opacity-[var(--logo-tone)] group-hover/logo:opacity-100";

/**
 * I clienti sono un pannello uguale a quello delle testate nell'hero, ma
 * dall'altra parte della pagina: **scavalca il bordo alto del footer**, meta'
 * fuori e meta' dentro. Centrato e largo il 92% della finestra.
 *
 * Il pannello e' bianco e il footer crema: due chiari vicini, ma il filo di
 * bordo e l'ombra bastano a staccarlo. Crema contro crema sarebbe sparito.
 *
 * ⚠️ La sezione non ha altezza propria: dentro c'e' solo un elemento in
 * posizione assoluta, quindi occupa zero e il pannello si centra esattamente
 * sul confine fra la pagina e il footer. Il footer ha `pt-28` per fargli posto.
 *
 * ⚠️ La traslazione sta sul contenitore e non su `Reveal`: da visibile `Reveal`
 * impone `translate-y-0` e annullerebbe lo scavalco.
 */
const ClientsSection = () => {
  const { t } = useTranslation();

  // La base e' ripetuta tre volte prima di essere duplicata: meta' nastro deve
  // coprire anche gli schermi larghi, altrimenti il loop lascia un vuoto.
  const half = [...CLIENTS, ...CLIENTS, ...CLIENTS];
  const track = [...half, ...half];

  return (
    <section aria-label={t("home.clients.title")} className="relative z-10">
      <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
        <Reveal threshold={0} className="mx-auto w-[92%]">
          <div className="rounded-card border border-card-border/10 bg-background px-5 py-5 shadow-soft md:px-10 md:py-6">
            {/* ⚠️ Nessuna etichetta a schermo: tolta su richiesta, il pannello
                e' il solo nastro dei marchi. Il titolo resta come `aria-label`
                della sezione, altrimenti chi naviga con uno screen reader si
                troverebbe una fascia di loghi senza nome. */}
            <div className="flex flex-col items-stretch">
              {/* Sfuma i bordi cosi' i loghi entrano ed escono senza taglio netto */}
              <div
                className="group relative w-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
              >
                <ul className="flex w-max animate-marquee items-center gap-x-12 [animation-duration:44s] group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-x-16">
                  {track.map((client, index) => {
                    const logo = logoBySlug[client.slug];

                    return (
                      <li
                        key={`${client.slug}-${index}`}
                        aria-hidden={index >= half.length}
                        className="group/logo flex shrink-0 items-center"
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt={client.name}
                            loading="lazy"
                            style={
                              {
                                "--logo-scale": client.scale ?? 1,
                                "--logo-tone": client.tone ?? 0.6,
                              } as CSSProperties
                            }
                            className={`h-[calc(1.6rem*var(--logo-scale))] w-auto max-w-[calc(8rem*var(--logo-scale))] object-contain transition-opacity duration-300 md:h-[calc(2rem*var(--logo-scale))] md:max-w-[calc(10rem*var(--logo-scale))] ${LOGO_TONE}`}
                          />
                        ) : (
                          <span className="whitespace-nowrap text-fluid-base font-bold tracking-tight text-primary/70 transition-colors duration-200 hover:text-primary">
                            {client.name}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ClientsSection;
