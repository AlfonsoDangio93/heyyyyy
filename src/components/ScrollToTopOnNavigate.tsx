import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Riporta la finestra in cima a ogni cambio di rotta: senza questo, navigando
 * dal fondo di una pagina si atterra a metà di quella successiva.
 * Gli ancoraggi interni (#contact, #clinic-contact) restano gestiti dal browser.
 */
const ScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTopOnNavigate;
