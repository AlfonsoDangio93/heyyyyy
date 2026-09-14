import { useEffect, useRef, useState } from "react";

/**
 * `repeat` a false, che e' il default, e' un interruttore a senso unico: una
 * volta comparso il contenuto resta. A true segue l'elemento in entrambe le
 * direzioni, quindi sparisce di nuovo risalendo.
 *
 * ⚠️ Il default non va cambiato: mezzo sito ci conta sopra, e contenuto che
 * svanisce risalendo va chiesto, non subito.
 */
export const useScrollAnimation = (threshold = 0.1, repeat = false) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (repeat) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [repeat, threshold]);

  return { ref, isVisible };
};
