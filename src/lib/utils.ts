import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * ⚠️ `text-fluid-*` sono corpi di testo custom, definiti in
 * `tailwind.config.ts`. tailwind-merge non legge quella config: non
 * riconoscendo il valore, classifica `text-fluid-3xl` come **colore** e lo
 * mette in conflitto con `text-accent`, cancellando una delle due classi.
 *
 * L'effetto era invisibile finche' il colore perso era `text-primary`, che ha
 * lo stesso identico HSL di `--foreground` ereditato dal body. Su fondo scuro
 * invece si vedeva eccome: ogni `SectionHeading tone="light"` restava petrolio
 * su petrolio, cioe' un titolo che non si leggeva.
 *
 * Dichiarando qui i sette corpi, corpo e colore tornano in due gruppi distinti
 * e convivono. Aggiungendo una taglia in `tailwind.config.ts` va aggiunta
 * anche qui, altrimenti il problema si ripresenta su quella.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "fluid-sm",
            "fluid-base",
            "fluid-lg",
            "fluid-xl",
            "fluid-2xl",
            "fluid-3xl",
            "fluid-4xl",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
