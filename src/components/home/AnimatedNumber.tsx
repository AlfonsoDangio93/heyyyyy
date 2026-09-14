import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AnimatedNumberProps {
  /** Testo completo della cella: il primo numero trovato viene animato. */
  text: string;
  active: boolean;
  duration?: number;
}

/**
 * Conta il primo numero presente nel testo da 0 al valore finale.
 * Se il testo non contiene cifre, o l'utente ha ridotto le animazioni,
 * viene reso invariato.
 */
const AnimatedNumber = ({ text, active, duration = 1200 }: AnimatedNumberProps) => {
  const reduced = useReducedMotion();

  // match va memoizzato: String.match restituisce un array nuovo a ogni render e,
  // usato come dipendenza dell'effetto, farebbe ripartire il conteggio all'infinito.
  const match = useMemo(() => text.match(/\d+/), [text]);
  const target = match ? Number(match[0]) : 0;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced || target === 0) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, reduced, target]);

  if (!match || reduced) return <>{text}</>;

  // ⚠️ Niente `tabular-nums`. Le cifre tabellari di Public Sans sono piu' larghe
  // di quelle proporzionali (misurato: «250» passa da 29,6 a 33,6px) e i due
  // pixel di spalla per lato si leggono come uno spazio: «Da ~ 250 €» invece
  // di «Da ~250 €», e «Oltre l' 80 %» sembrava un apostrofo staccato.
  // Non servivano nemmeno a tenere ferma la riga: il conteggio passa da una a
  // tre cifre, quindi la larghezza cambia lo stesso.
  return (
    <>
      {text.slice(0, match.index)}
      <span>{value}</span>
      {text.slice((match.index ?? 0) + match[0].length)}
    </>
  );
};

export default AnimatedNumber;
