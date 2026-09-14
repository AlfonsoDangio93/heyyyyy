import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { LOGIN_URL } from "@/lib/constants";
import { useTranslation } from "@/i18n/useTranslation";

const NAV_ITEMS = [
  { to: "/", labelKey: "header.home" },
  { to: "/navigatore-sanitario", labelKey: "header.comeFunziona" },
  { to: "/chi-siamo", labelKey: "header.chiSiamo" },
];

/** Pagine il cui primo blocco e' scuro a tutta altezza: solo li' l'header ci va sopra. */
const OVERLAY_ROUTES = ["/", "/navigatore-sanitario"];

interface NavItemProps {
  to: string;
  label: string;
  isActive: boolean;
  overlay: boolean;
  onClick?: () => void;
}

/**
 * Lo stato attivo e' marcato dal filetto e dal peso, mai dal colore: in
 * versione chiara `--foreground` e `--primary` sono lo stesso identico valore
 * HSL, quindi un cambio di colore fra i due sarebbe invisibile.
 */
const DesktopNavItem = ({ to, label, isActive, overlay }: NavItemProps) => (
  <Link
    to={to}
    aria-current={isActive ? "page" : undefined}
    className="group relative whitespace-nowrap py-1.5 text-fluid-sm transition-colors duration-200"
  >
    <span
      className={cn(
        "transition-colors duration-200",
        overlay
          ? isActive
            ? "font-semibold text-accent"
            : "font-medium text-accent/70 group-hover:text-accent"
          : isActive
            ? "font-semibold text-primary"
            : "font-medium text-primary/60 group-hover:text-primary",
      )}
    >
      {label}
    </span>
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1 left-0 h-[3px] rounded-pill transition-all duration-300 ease-out",
        overlay ? "bg-accent" : "bg-primary",
        isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50",
      )}
    />
  </Link>
);

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Tiene il pannello nel DOM per la durata dell'uscita: con `hidden` secco
  // l'animazione di chiusura non si vedrebbe.
  const [menuInUscita, setMenuInUscita] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const isSpotelloSanitario = location.pathname === "/sportello-sanitario";
  const canOverlay = OVERLAY_ROUTES.includes(location.pathname);
  // Sopra la hero l'header e' trasparente e bianco; appena si scorre torna
  // solido, altrimenti su crema il testo bianco sarebbe illeggibile.
  //
  // ⚠️ Col menu mobile aperto vale sempre la versione chiara, qualunque sia la
  // rotta: dietro c'e' il pannello petrolio a tutto schermo, e una barra crema
  // ci si stamperebbe sopra come una fascia estranea.
  const overlay = mobileMenuOpen || (canOverlay && !scrolled);

  // Scroll bloccato mentre il menu e' aperto, chiusura con Esc, e coda per
  // lasciar finire l'animazione di uscita.
  useEffect(() => {
    if (mobileMenuOpen) {
      setMenuInUscita(true);
      const precedente = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = precedente;
        window.removeEventListener("keydown", onKey);
      };
    }
    const id = window.setTimeout(() => setMenuInUscita(false), 450);
    return () => window.clearTimeout(id);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!canOverlay) {
      setScrolled(false);
      return;
    }

    // La soglia e' il punto in cui il testo della hero comincia a passare
    // sotto l'header, non la fine della hero: il testo della hero e' bianco e
    // l'header trasparente e' bianco pure lui, quindi per tutta la scrollata
    // dentro la hero le due scritte si sovrapponevano e non si leggeva niente.
    //
    // Il riferimento e' `[data-header-overlap]`, marcato sulla colonna di testo
    // della hero. Si misura in coordinate di documento (`rect.top + scrollY`),
    // cosi' il valore non dipende da quanto e' gia' stato scrollato.
    let threshold = 400;

    const measure = () => {
      const anchor = document.querySelector("[data-header-overlap]");
      if (anchor) {
        const top = anchor.getBoundingClientRect().top + window.scrollY;
        threshold = Math.max(top - 80, 40);
        return;
      }
      // Riserva: senza riferimento resta il comportamento vecchio.
      const hero = document.querySelector("main > section") as HTMLElement | null;
      threshold = hero ? Math.max(hero.offsetHeight - 80, 120) : 400;
    };
    const onScroll = () => setScrolled(window.scrollY > threshold);
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [canOverlay, location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
          overlay
            ? "border-transparent bg-transparent"
            : "border-border bg-accent/85 shadow-sm backdrop-blur-md",
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center">
              <Logo variant={overlay ? "white" : "default"} />
            </Link>

            {!isSpotelloSanitario && (
              <nav className="hidden items-center gap-7 lg:flex">
                {NAV_ITEMS.map((item) => (
                  <DesktopNavItem
                    key={item.to}
                    to={item.to}
                    label={t(item.labelKey)}
                    isActive={location.pathname === item.to}
                    overlay={overlay}
                  />
                ))}
                <LanguageSwitcher />
                <Button
                  asChild
                  size="default"
                  className={cn(
                    "rounded-pill",
                    overlay && "bg-accent text-primary hover:bg-accent/90",
                  )}
                >
                  <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                    {t("header.accedi")}
                  </a>
                </Button>
              </nav>
            )}

            {isSpotelloSanitario && (
              <div className="hidden items-center lg:flex">
                <LanguageSwitcher />
              </div>
            )}

            {!isSpotelloSanitario && (
              <button
                className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
                onClick={() => setMobileMenuOpen((aperto) => !aperto)}
                aria-expanded={mobileMenuOpen}
                aria-label={t("header.menuLabel")}
              >
                {/* Due barrette che ruotano e si incrociano: il panino non
                    sparisce per far posto a una X, diventa la X. */}
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={cn(
                      "absolute h-[2px] w-6 rounded-pill transition-transform duration-300 ease-spring motion-reduce:transition-none",
                      overlay ? "bg-accent" : "bg-primary",
                      mobileMenuOpen
                        ? i === 0
                          ? "rotate-45"
                          : "-rotate-45"
                        : i === 0
                          ? "-translate-y-[5px]"
                          : "translate-y-[5px]",
                    )}
                  />
                ))}
              </button>
            )}

            {isSpotelloSanitario && (
              <div className="lg:hidden">
                <LanguageSwitcher />
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Pannello a tutto schermo. Resta sempre montato e cambia stato, cosi'
          l'uscita e' animata quanto l'entrata: smontandolo sparirebbe di colpo.
          Sta sotto l'header (z-40 contro z-50), quindi logo e croce restano
          sopra e cliccabili. */}
      {!isSpotelloSanitario && (
        <div
          id="menu-mobile"
          hidden={!mobileMenuOpen && !menuInUscita}
          className={cn(
            "fixed inset-0 z-40 flex flex-col bg-primary transition-[opacity,transform] duration-[400ms] ease-reveal lg:hidden motion-reduce:transition-none",
            mobileMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0",
          )}
        >
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pb-10 pt-24">
            {NAV_ITEMS.map((item, index) => {
              const attivo = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={attivo ? "page" : undefined}
                  style={{ transitionDelay: mobileMenuOpen ? `${120 + index * 70}ms` : "0ms" }}
                  className={cn(
                    "flex items-baseline gap-4 border-b border-accent/15 py-5 font-display text-fluid-3xl tracking-tight transition-[opacity,transform,color] duration-500 ease-reveal motion-reduce:transition-none",
                    attivo ? "text-accent" : "text-accent/70",
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                >
                  <span className="font-sans text-xs font-bold text-accent/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(item.labelKey)}
                </Link>
              );
            })}

            <div
              style={{ transitionDelay: mobileMenuOpen ? `${120 + NAV_ITEMS.length * 70}ms` : "0ms" }}
              className={cn(
                "mt-10 flex flex-col gap-5 transition-[opacity,transform] duration-500 ease-reveal motion-reduce:transition-none",
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
            >
              {/* Nel pannello la lingua e' un segmentato a due pastiglie, non
                  l'interruttore del desktop: quello ha il fondo chiaro, dentro
                  una colonna si stirava a tutta larghezza e su petrolio si
                  leggeva male. Qui le due lingue sono esplicite. */}
              <div className="flex items-center gap-2">
                {(["it", "en"] as const).map((lingua) => {
                  const attiva = language === lingua;
                  return (
                    <button
                      key={lingua}
                      type="button"
                      onClick={() => setLanguage(lingua)}
                      aria-pressed={attiva}
                      className={cn(
                        "min-h-[44px] rounded-pill border px-5 text-sm font-bold uppercase tracking-wide transition-[background-color,border-color,color] duration-200",
                        attiva
                          ? "border-accent bg-accent text-primary"
                          : "border-accent/30 text-accent/80 hover:border-accent/60 hover:text-accent",
                      )}
                    >
                      {lingua}
                    </button>
                  );
                })}
              </div>

              <Button
                asChild
                size="lg"
                className="min-h-[44px] w-full rounded-pill bg-accent text-primary hover:bg-accent/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  {t("header.accedi")}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* L'header e' fuori dal flusso: dove non deve sovrapporsi serve un
          distanziatore, altrimenti il primo blocco della pagina ci finisce
          sotto. Dipende dalla rotta e non dallo scroll, cosi' la pagina non
          sobbalza quando l'header cambia aspetto. */}
      {!canOverlay && <div aria-hidden="true" className="h-20 shrink-0" />}
    </>
  );
};

export default Header;
