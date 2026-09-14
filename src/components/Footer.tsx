import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import poweredByMamazen from "@/assets/powered-by-mamazen.png";
import { useTranslation } from "@/i18n/useTranslation";

const FOOTER_LINKS = [
  { to: "/", labelKey: "header.home" },
  { to: "/navigatore-sanitario", labelKey: "header.comeFunziona" },
  { to: "/coperture", labelKey: "header.coperture" },
  { to: "/chi-siamo", labelKey: "header.chiSiamo" },
];

const LEGAL_LINKS = [
  {
    href: "https://drive.google.com/file/d/1UY2MDdzLm45zfsf3XYRiG1xqq7Bo1CbZ/view",
    labelKey: "footer.privacyPolicy",
  },
  {
    href: "https://drive.google.com/file/d/1s6M-bZFeBM8av1hEHh57P8EYGxwgyi7l/view",
    labelKey: "footer.terminiCondizioni",
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    // Scatola stondata **solo in alto**: il footer chiude la pagina, quindi in
    // basso resta a filo. Il pannello dei clienti ne scavalca il bordo alto,
    // percio' `pt-28` invece del padding simmetrico di prima.
    //
    // ⚠️ Crema e non petrolio. Il petrolio era stato provato e scartato: con
    // Coperture extra e le FAQ gia' petrolio diventava il terzo blocco uguale
    // nella stessa pagina.
    <footer className="rounded-t-card border-t border-card-border/15 bg-accent pb-12 pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Brand */}
          <div>
            <div className="mb-4">
              <Logo variant="default" size="large" />
            </div>
            <p className="text-sm text-primary opacity-90">{t("footer.slogan")}</p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-primary">{t("footer.menu")}</h3>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary opacity-90 transition-opacity hover:opacity-100"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 font-semibold text-primary">{t("footer.legale")}</h3>
            <nav className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary opacity-90 transition-opacity hover:opacity-100"
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-primary">{t("footer.contatti")}</h3>
            <p className="text-sm text-primary opacity-90">{t("footer.email")}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-primary/20 pt-8 text-center sm:flex-row sm:gap-4">
          <p className="text-sm text-primary opacity-75">
            © 2026 HeyLucy. Un servizio di S8 S.r.l. S.B. | P.IVA 13266920019
          </p>
          <span aria-hidden="true" className="hidden h-4 w-px bg-primary/25 sm:block" />
          <img
            src={poweredByMamazen}
            alt="Powered by Mamazen"
className="h-4 w-auto opacity-60 transition-opacity duration-200 hover:opacity-90 md:h-5"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
