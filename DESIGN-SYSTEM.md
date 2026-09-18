# HeyLucy — Mappa del Design System

> Documento di riferimento per la riprogettazione della Home.
> Fotografia dello stato attuale del codice (`src/`) al 31 agosto 2026.
> **Vincolo trasversale: il progetto è un progetto Lovable e verrà deployato su Lovable.** Vedi § 12.
>
> **Aggiornato il 31/08/2026 dopo la riprogettazione della Home.** Le sezioni § 2, § 6, § 9, § 10 e § 13 riflettono il nuovo stato; vedi § 15 per il registro delle modifiche.

---

## 1. Stack e struttura

| Elemento | Valore |
|---|---|
| Build | Vite 5 + `@vitejs/plugin-react-swc` |
| Linguaggio | React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 (`darkMode: class`, mai attivato) |
| Componenti | shadcn/ui (`src/components/ui/`, 48 primitive) su Radix UI |
| Icone | `lucide-react` |
| Routing | `react-router-dom` v6, `BrowserRouter` (SPA client-side) |
| Stato server | `@tanstack/react-query` (istanziato ma non ancora usato) |
| i18n | Custom: Context + JSON (`src/i18n/`), IT/EN |
| Alias | `@/` → `./src` |

Layout applicativo (identico su tutte le pagine, `src/App.tsx`):

```
<LanguageProvider> → <QueryClientProvider> → <TooltipProvider>
  <Toaster /> <Sonner />
  <BrowserRouter>
    <div className="min-h-screen flex flex-col">
      <Header />               ← sticky
      <main className="flex-1"> …sezioni… </main>
      <Footer />
      <ScrollToTop />          ← FAB fisso
    </div>
```

---

## 2. Palette

Tutti i colori sono definiti come **token HSL** in `src/index.css` (`:root`) e mappati in `tailwind.config.ts`.
La regola scritta nel file è esplicita: *"All colors MUST be HSL"*.

### Token semantici

| Token | HSL | ≈ HEX | Uso reale nel sito |
|---|---|---|---|
| `--background` | `0 0% 100%` | `#FFFFFF` | Sfondo card, sfondo body |
| `--foreground` | `180 65% 24%` | `#156669` | **Tutto il testo**: titoli, corpo scuro |
| `--primary` | `180 65% 24%` | `#156669` | Brand principale: bottoni, icone, accenti |
| `--primary-foreground` | `0 0% 100%` | `#FFFFFF` | Testo sui bottoni primary |
| `--secondary` | `203 48% 80%` | `#B4D2E4` | Sfondo sezioni "azzurre", box overlay |
| `--secondary-foreground` | `180 60% 15%` | `#0F3D3D` | — (poco usato) |
| `--accent` | `30 56% 96.5%` | `#FBF6F1` | Sfondo sezioni "crema", header, footer |
| `--accent-foreground` | `180 60% 15%` | `#0F3D3D` | — |
| `--muted` | `203 48% 90%` | `#D9E8F2` | Placeholder, sfondi neutri |
| `--muted-foreground` | `180 20% 45%` | `#5C8A8A` | **Tutti i sottotitoli e i paragrafi secondari** |
| `--border` / `--input` | `203 30% 85%` | `#CDDBE4` | Bordi (applicato globalmente da `* { @apply border-border }`) |
| `--ring` | `180 65% 24%` | `#156669` | Focus ring |
| `--card` / `--popover` | `0 0% 100%` | `#FFFFFF` | |
| `--card-foreground` / `--popover-foreground` | `180 60% 15%` | `#0F3D3D` | |
| `--secondary-strong` | `203 40% 68%` | `#93B6CF` | Colonna "Polizza standard" del comparativo |
| `--highlight` | `208 47% 52%` | `#4A87BE` | Colonna "HeyLucy" del comparativo |
| `--highlight-foreground` | `0 0% 100%` | `#FFFFFF` | Testo sulla colonna evidenziata |
| `--success` | `150 100% 26%` | `#008744` | Check del comparativo |
| `--warning` | `38 92% 50%` | `#F59E0B` | Alert del comparativo |
| `--danger` | `355 77% 52%` | `#E32636` | X del comparativo |
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Non usato nel marketing site |

### Palette effettiva percepita (3 colori)

```
#156669  Verde petrolio scuro  — brand, testo, CTA
#B4D2E4  Azzurro chiaro        — sezioni alternate, box
#FBF6F1  Crema                 — sezioni alternate, header, footer
```

### Colori hardcoded (fuori dai token) — ⚠️ da normalizzare

| Valore | Dove | Nota |
|---|---|---|
| `#fbf6f1` | `ComparisonSection.tsx`, `BenefitsSection.tsx` | ✅ Risolto in `Header.tsx`, `Footer.tsx` e `TestimonialsSection.tsx`: ora usano `bg-accent`, e il token `--accent` vale esattamente `#fbf6f1` |
| `#156669` | — | ✅ Risolto: `Footer.tsx` e `TestimonialsSection.tsx` usano `text-primary` / `border-primary` |
| `#008744` / `#E32636` | `ComparisonSection.tsx` (SVG custom costo basso/alto) | Verde/rosso semaforico |
| `text-green-600` / `text-red-600` | `ComparisonSection.tsx` (Check / X) | Default Tailwind, fuori palette |
| `bg-white` | `ClinicCTASection.tsx` | Invece di `bg-background` |

### Token definiti ma MAI usati

- `--hero-gradient` → `linear-gradient(135deg, hsl(33 89% 96%), hsl(203 48% 90%))` — esposto come `bg-hero-gradient`, **0 occorrenze**.

---

## 3. Tipografia

Caricamento: Google Fonts in `index.html` (`preconnect` + stylesheet unico).

```html
Public Sans: 400, 500, 600, 700
Bungee: 400
```

| Famiglia Tailwind | Font stack | Stato |
|---|---|---|
| `font-sans` (default) | `"Public Sans", sans-serif` | Usato ovunque |
| `font-logo` | `"Bungee", sans-serif` | **Definito ma mai usato** — il logo è un PNG |

### Scala tipografica in uso

| Ruolo | Classi | Note |
|---|---|---|
| H1 hero home | `text-4xl md:text-5xl lg:text-6xl font-bold leading-tight` | `text-foreground` |
| H1 pagine interne | `text-3xl md:text-4xl lg:text-5xl font-bold` | `text-primary` |
| H2 sezione | `text-3xl md:text-4xl font-bold` | Standard su tutto il sito |
| H2 enfatico | `text-3xl md:text-4xl lg:text-5xl font-bold text-primary` | Navigatore Sanitario, Support |
| H3 card grande | `text-2xl font-bold text-foreground` | |
| H3 card piccola | `text-lg` / `text-xl font-semibold` | |
| Lead / sottotitolo | `text-lg md:text-xl text-muted-foreground` | Pattern ricorrente sotto ogni H1/H2 |
| Corpo | `text-base` / `text-muted-foreground` | |
| Micro-copy | `text-sm text-muted-foreground` | Note, disclaimer, attribuzioni |

Pesi in uso: **400** (corpo), **500** `font-medium` (nav), **600** `font-semibold` (label), **700** `font-bold` (titoli).

---

## 4. Spaziature, raggi, ombre

### Ritmo verticale

| Contesto | Classi |
|---|---|
| Sezione standard | `py-16 md:py-24` ← **usato in ~90% delle sezioni** |
| Footer | `py-12` |
| Header | altezza fissa `h-20` |
| Hero Sportello Sanitario | `py-5 md:py-6` ← anomalia (sezione compressa) |

### Container

```html
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```

Config Tailwind: `container` centrato, `padding: 2rem`, max `1400px` a `2xl`.
Larghezze massime interne ricorrenti: `max-w-3xl` (testo centrato), `max-w-5xl` / `max-w-6xl` (griglie card), `max-w-7xl` (griglie a 4).

### Raggi

`--radius: 0.75rem` (12px) →

| Classe | Valore |
|---|---|
| `rounded-lg` | 12px |
| `rounded-md` | 10px ← **raggio dei bottoni** |
| `rounded-sm` | 8px |

Raggi custom fuori scala: `rounded-2xl` (16px, immagini hero), `rounded-3xl` (24px, card Navigatore), `rounded-[28px] md:rounded-[32px]` (immagini Problem/WhyWelfare), `rounded-[20px]` (box overlay), `rounded-[45px]` (pill benefit), `rounded-full` (badge, FAB, avatar numerici).

### Ombre

| Classe | Valore |
|---|---|
| `shadow-card` | `0 2px 8px -2px hsl(180 30% 30% / 0.08)` — stato riposo card |
| `shadow-soft` | `0 4px 20px -4px hsl(180 65% 24% / 0.1)` — stato hover card |

Pattern: `shadow-card hover:shadow-soft transition-shadow`.
Fuori scala: `shadow-sm`, `shadow-lg`, `shadow-xl`, `shadow-[0_8px_20px_rgba(0,0,0,0.08)]`.

---

## 5. Componenti base

### Button (`src/components/ui/button.tsx`)

Base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium … [&_svg]:size-4`

| Variante | Stile | Uso nel sito |
|---|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | **L'unica variante usata** |
| `outline`, `secondary`, `ghost`, `link`, `destructive` | — | Mai usate |

| Size | Stile | Uso |
|---|---|---|
| `default` | `h-10 px-4 py-2` | Bottone "Accedi" in header |
| `lg` | `h-11 rounded-md px-8` | Tutte le CTA di sezione |
| `sm`, `icon` | — | Mai usate |

**Override ricorrente delle CTA:** `size="lg"` + `className="text-xl px-8"` (o `text-base md:text-xl px-6 md:px-8`).
Le CTA sono sempre `<Button asChild>` che avvolge un `<a target="_blank" rel="noopener noreferrer">`.

### Card (`src/components/ui/card.tsx`)

Base: `rounded-lg border bg-card text-card-foreground shadow-sm`.
Nel sito viene quasi sempre riscritta: `p-8 bg-background border-none shadow-card hover:shadow-soft transition-shadow`.

Varianti di card osservate:
1. **Card soluzione** — `p-8 bg-background border-none shadow-card`, icona 48px + titolo centrati
2. **Card bordata** — `border-2 border-primary/20 hover:border-primary` (CalendarSection)
3. **Card testimonial** — `bg-[#fbf6f1] border-2 border-[#156669] shadow-lg hover:shadow-xl`
4. **Card feature grande** — `bg-card rounded-3xl p-8 md:p-10 grid grid-rows-subgrid row-span-4` (Navigatore Sanitario)
5. **Card step numerata** — cerchio `w-12 h-12 rounded-full bg-primary` con numero

### Altri componenti realmente usati

| Componente | Dove |
|---|---|
| `Accordion` (single, collapsible) | FAQSection |
| `Checkbox` | SportelloSanitario (consensi privacy) |
| `Toaster` + `Sonner` | Montati globalmente, mai invocati |
| `TooltipProvider` | Montato, nessun tooltip nel sito |

Le altre ~40 primitive shadcn in `src/components/ui/` sono presenti ma inutilizzate.

---

## 6. Componenti di layout condivisi

### `Header.tsx`
- `sticky top-0 z-50`, `h-20`, sfondo `#fbf6f1` **inline**, `border-b border-border shadow-sm`
- Logo a sinistra (`<Logo variant="default" />`, PNG con `mix-blend-mode: multiply`)
- Nav desktop da `lg:` — link: **Home · Come funziona · Chi siamo** (array `NAV_ITEMS`, condiviso fra desktop e mobile)
- "Come funziona" punta a `/navigatore-sanitario`: la rotta resta invariata per non rompere link esterni e sitemap, cambia solo l'etichetta
- Link attivo: `text-primary`; inattivo: `text-foreground hover:text-primary`
- `LanguageSwitcher` + `Button` "Accedi" → `https://my.heylucy.it/`
- Mobile: hamburger (`Menu` 24px) → pannello verticale `border-t`
- Su `/sportello-sanitario` la nav è **nascosta** (resta solo il language switcher)

### `Footer.tsx`
- `bg-accent py-12`, griglia `md:grid-cols-4`: Brand+slogan · Menu · Legale · Contatti
- Menu: Home · Come funziona · **Coperture** · Chi siamo (il footer è l'unico punto di accesso a `/coperture` dopo il nuovo menu)
- Tutti i testi `text-primary` con `opacity-90 hover:opacity-100`
- Barra inferiore `border-t border-[#156669]/20` con copyright ©2026 + logo "Powered by Mamazen"

### `Logo.tsx`
PNG `src/assets/logo.png`. Props: `variant` (`default` | `white` con filtro invert), `size` (`default` → `h-12 md:h-16`, `large` → `h-16 md:h-20`).

### `ScrollToTop.tsx`
FAB `fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary`, icona `ArrowUp`, compare oltre `scrollY > 300`, `hover:scale-110`.

### `LanguageSwitcher.tsx`
Pill `rounded-full bg-background/50 p-1` con due bottoni 🇮🇹 IT / 🇬🇧 EN. Attivo: `bg-primary text-primary-foreground`. Persistenza in `localStorage` (`heylucy-language`).

---

## 7. Pattern di sezione (anatomia ricorrente)

Ogni sezione segue lo stesso scheletro:

```tsx
const Section = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 bg-{secondary|accent}">
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("…")}</h2>
        {/* griglia di card */}
      </div>
    </section>
  );
};
```

**Animazione di ingresso** (`src/hooks/use-scroll-animation.tsx`): `IntersectionObserver` con `threshold: 0.1`, fade + slide di 16px, durata 500ms, **one-shot** (non si resetta all'uscita).

**Alternanza di sfondo**: è la regola compositiva portante del sito → `bg-secondary` (azzurro) ⇄ `bg-accent` (crema), a strisce piene, senza divisori.

**Griglie ricorrenti**: `grid-cols-1 md:grid-cols-2`, `md:grid-cols-3`, `sm:grid-cols-2 lg:grid-cols-4`, `lg:grid-cols-2` (testo+immagine), `lg:grid-cols-12` (split 5/7).

**Breakpoint**: `sm` 640 · `md` 768 (principale) · `lg` 1024 (nav + split hero) · `2xl` 1400 (max container).

---

## 8. Iconografia

Libreria unica: **lucide-react**. Nessuna icona custom se non due SVG inline.

| Dimensione | Classi | Contesto |
|---|---|---|
| 48px | `w-12 h-12 text-primary` | Icona principale di card |
| 40px | `w-10 h-10` | Quote testimonial |
| 32px | `w-8 h-8` | Icona dentro cerchio 64px |
| 24px | `w-6 h-6` / `h-6 w-6` | Nav, FAB, check |
| 16–20px | `w-4 h-4` / `w-5 h-5` | Inline nel testo |

`strokeWidth` di default; `strokeWidth={1.5}` nelle card soluzione della home; `stroke-[3]` per check/X della tabella comparativa.

### Icone usate per contesto

| Icona | Dove | Significato |
|---|---|---|
| `Stethoscope` | Home — card 1 | Coperture sanitarie |
| `Compass` | Home — card 2 | Navigatore sanitario |
| `FileSearch` | Coperture, Navigatore | Analisi / ricerca coperture |
| `Layers` | Coperture | Sovrapposizioni |
| `Users` | Coperture | Bisogni dei dipendenti |
| `Headphones` | Navigatore | Concierge umano |
| `CalendarHeart` | Navigatore | Monitoraggio prevenzione |
| `Tag` | Navigatore | Convenzioni e sconti |
| `Calendar` | Giornate, Cliniche | Pianificazione |
| `Headset` | Giornate | Sportello sanitario |
| `Building2` | Cliniche | Erogazione |
| `Heart` | Cliniche | Fidelizzazione |
| `Check` | Ovunque | Lista benefici (spesso in cerchio `bg-primary`) |
| `X` | Comparison | Assenza |
| `Quote` | Testimonials | Citazione |
| `Clock` | Sportello | Orari |
| `Menu` | Header | Hamburger |
| `ArrowUp` | ScrollToTop | Torna su |
| `ChevronLeft/Right` | Calendar | Carousel mobile |

**Icone non-lucide**: due SVG inline in `ComparisonSection.tsx` (cerchio verde `$` = costo basso, triangolo rosso `$` = costo alto) + **emoji** come icone nella pagina Sportello Sanitario (🩺 📅 💶 👨‍👩‍👧 ☂️).

---

## 9. CTA — inventario

### CTA primaria (unica destinazione di conversione)

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1GLSKlrwJgx6uM5nQ6Lf7KDSc5JNMAoIS7EFmemPS7r4B1Uz4H5UVAxC18lgblK0c8z5RwaRoM
```

Esportata da `src/lib/constants.ts` come `CALENDAR_CTA_URL` e usata dai componenti della nuova home.
⚠️ Le **9 occorrenze preesistenti** nelle altre pagine sono ancora hardcoded: vanno migrate alla costante.

| Label | Pagina / sezione |
|---|---|
| `PARLA CON NOI` | Home Hero, Home Solutions, WhyWelfare, FAQ, Pricing |
| `PRENOTA UN ASSESSMENT GRATUITO` | Coperture |
| `SCOPRI LA PIATTAFORMA` | Navigatore Sanitario — hero |
| `PRENOTA UNA DEMO` | Navigatore Sanitario — chiusura |
| `Entra nel network HeyLucy` | Strutture sanitarie (hero + chiusura) |

Stile: sempre `Button` variante `default`, `size="lg"`, testo maiuscolo per le CTA aziende (case scritto in `it.json`, non via CSS).

### CTA secondarie

| Label | Destinazione |
|---|---|
| `Accedi` (header) | `https://my.heylucy.it/` |
| Card Home → Coperture | `/coperture` (rotta interna) |
| Card Home → Navigatore | `/navigatore-sanitario` (rotta interna) |
| Bottoni WhatsApp / Email | `wa.me` +39 371 562 0380 · `sportellosanitario@heylucy.it` — **disabilitati finché non si spuntano i 2 consensi** |
| Privacy Policy / Condizioni | Due file Google Drive |

---

## 10. Mappa pagine → sezioni

| Rotta | File | Sezioni (in ordine) | Alternanza sfondi |
|---|---|---|---|
| `/` | `Index.tsx` | Hero · Clienti · Piattaforma · Vantaggio · Testimonial · FAQ · CTA finale | `sec`→`acc`→`sec`→`acc`→`sec`→`acc`→`sec` |
| `/giornate-di-prevenzione` | `GiornateDiPrevenzione.tsx` | FromMarginal · WhyWelfare · Calendar · ScreeningProcess · Support · Comparison · Testimonials · FAQ | `sec`→`acc`→`sec`→`acc`→`sec`→`acc`→`sec`→`acc` |
| `/coperture` | `Coperture.tsx` | Section1 (3 card icona) · Section2 (testo + CTA) | `secondary` → `accent` |
| `/navigatore-sanitario` | `NavigatoreSanitario.tsx` | Hero split · 4 card feature con immagine · Lista valore · CTA finale | `sec`→`acc`→`sec`→`acc` |
| `/strutture-sanitarie` | `Cliniche.tsx` | ClinicHero · HowItWorks · Benefits · ClinicCTA | `sec`→`background`→`sec`→`white` |
| `/chi-siamo` | `ChiSiamo.tsx` | Sezione unica testuale con link LinkedIn | `accent` |
| `/sportello-sanitario` | `SportelloSanitario.tsx` | Hero compatto · Servizi + consensi + bottoni contatto | `secondary` → `accent` — `noindex` iniettato via `useEffect` |
| `*` | `NotFound.tsx` | 404 minimale | `muted` — **senza Header/Footer** |

### Home in dettaglio (riprogettata il 31/08/2026)

Sistema di profondità a tre livelli introdotto con il redesign:
**sfondo sezione** (azzurro o crema) → **contenitore** (crema, `rounded-[2rem]`) → **card** (bianche, `rounded-3xl`).
L'alternanza a strisce piene resta la regola: azzurro ⇄ crema, sette sezioni.

| # | Sezione | File | Sfondo | Note |
|---|---|---|---|---|
| 1 | Hero | `aziende/HeroSection.tsx` | `secondary` | Invariata |
| 2 | Alcuni dei nostri clienti | `home/ClientsSection.tsx` | `accent` | Wordmark testuali da `CLIENTS` in `lib/constants.ts` — **da sostituire con i loghi ufficiali** |
| 3 | La piattaforma | `home/PlatformSection.tsx` | `secondary` | Titolo a pill petrolio, contenitore crema, 4 card bianche con `grid-rows-subgrid` |
| 4 | Il vantaggio di scegliere HeyLucy | `home/AdvantageSection.tsx` | `accent` | Comparativo a celle staccate (non è una `<table>`), card impilate sotto `md` |
| 5 | Cosa dicono di HeyLucy | `aziende/TestimonialsSection.tsx` | `secondary` | Componente condiviso con `/giornate-di-prevenzione` |
| 6 | FAQ | `home/FAQSection.tsx` | `accent` | 5 domande, accordion su card bianca |
| 7 | CTA finale | `home/FinalCTASection.tsx` | `secondary` | Usa `CALENDAR_CTA_URL` |

**`SectionHeading.tsx`** (`src/components/home/`) centralizza i titoli di sezione:
- Titolo `font-bold text-primary` centrato, con **filetto decorativo tricolore** sotto (barra `primary` 48px · punto `highlight` · trattino `secondary-strong`)
- `size="default"` → `text-3xl md:text-4xl lg:text-5xl` · `size="large"` → `text-4xl md:text-5xl lg:text-6xl`, usato solo da "La piattaforma"

⚠️ Il badge pieno (`bg-primary rounded-[2.5rem]`) usato nella prima versione **è stato rimosso**: un rettangolo colorato attorno a un testo si legge come bottone, e questi titoli non sono cliccabili.

**Componenti esistenti NON montati in nessuna pagina** (riutilizzabili):
`ProblemSection.tsx`, `PricingSection.tsx`, `SolutionsSection.tsx` (rimossa dalla home nel redesign), `NavLink.tsx`.

## 11. Asset e contenuti

### Immagini locali (`src/assets/`)

| File | Peso | Usato in |
|---|---|---|
| `logo.png` | 43 KB | Logo.tsx |
| `powered-by-mamazen.png` | 9 KB | Footer |
| `why-welfare-image.jpg` | **879 KB** | Home hero |
| `hero-aziende.jpg` | 408 KB | WhyWelfare, Navigatore hero |
| `Heylucy_-_Prevenzione_in_azienda.jpg` | 606 KB | SupportSection |
| `hero-cliniche-waiting.png` | **2,4 MB** | ClinicHero |
| `problem-fondi-sanitari.jpg` / `problem-screening.jpg` / `problem-assicurazioni.jpg` | 55–74 KB | ProblemSection (orfana) |
| `screening-step-1…4-*.png` | 57–132 KB | ScreeningProcess |
| `whatsapp-button.png` / `email-button.png` | 31 / 28 KB | Sportello |
| `doctor-icon.png`, `support-phones.png`, `hero-cliniche.jpg`, `hero-cliniche-new.jpg`, `hero-cliniche-stethoscope.jpg` | — | **Orfani** |

⚠️ Nessuna immagine è ottimizzata (no WebP/AVIF, no `srcset`, no `loading="lazy"`). ~7 MB di asset totali.

### Asset Lovable (`*.asset.json`) — ⚠️ attenzione

`image-4`, `image-5`, `image-6`, `concierge-chat` **non sono file immagine**: sono puntatori JSON a risorse ospitate da Lovable.

```json
{ "url": "/__l5e/assets-v1/<asset_id>/image-4.png", "project_id": "4557fa8d-…" }
```

Importati come `import img from "@/assets/image-4.png.asset.json"` e usati con `img.url`.
**Funzionano solo sul runtime Lovable**: in `npm run dev` locale quell'URL cade nel fallback SPA e restituisce HTML → immagine rotta su `/navigatore-sanitario`. Non è un bug da "correggere" convertendo a caso: è il meccanismo asset di Lovable.

### i18n

- `src/i18n/translations/it.json` e `en.json` — **170 chiavi, parità perfetta IT/EN** (verificato)
- Accesso via `useTranslation()` → `t("sezione.chiave")`; chiave mancante → viene restituita la chiave stessa
- Lingua di default `it`, persistita in `localStorage`, imposta `document.documentElement.lang`
- **Regola**: nessun testo hardcoded nei componenti… tranne `NavigatoreSanitario.tsx` e `NotFound.tsx`, che hanno tutte le stringhe inline (debito da sanare)

### SEO / Analytics (in `index.html`)

- Microsoft Clarity (`uf99oy4a7s`)
- Google Tag Manager (`GTM-N38WCMTN`) + noscript iframe
- Meta verifica dominio Facebook (`jeh63pt6eky15n5hvauklg9q648af0`)
- OG tags base (no `og:image`), `<title>` e `description` unici per tutto il sito (SPA senza meta dinamici)
- `public/robots.txt` + `public/sitemap.xml` (4 URL — **non aggiornata**: mancano `/coperture`, `/navigatore-sanitario`, `/giornate-di-prevenzione`)

---

## 12. Vincoli Lovable (obbligatori per il deploy) 🔒

Il progetto è sincronizzato con Lovable — **project id `4557fa8d-87d5-4bb5-8b03-c5acfb91dc0f`** — e verrà pubblicato da lì (`Share → Publish`). Ogni scelta di riprogettazione deve restare compatibile.

### Cosa NON toccare

| File / elemento | Perché |
|---|---|
| `vite.config.ts` → `componentTagger()` | Plugin `lovable-tagger`: in dev marca i componenti perché l'editor visuale di Lovable possa selezionarli. Rimuoverlo rompe l'editing visuale |
| `vite.config.ts` → `port: 8080`, `host: "::"` | Convenzione della preview Lovable. Per lavorare in locale su un'altra porta usare `npx vite --port <n>`, **non** modificare il file |
| `components.json` | Config shadcn letta da Lovable per generare/aggiornare componenti |
| `src/components/ui/**` | Primitive shadcn: Lovable le rigenera. Non riscriverle — personalizzare via `className` nei componenti applicativi |
| `index.html` → GTM, Clarity, meta Facebook | Tracciamento e verifica dominio in produzione. Vanno preservati identici |
| `package.json` scripts | `dev` / `build` / `build:dev` / `preview` sono usati dalla pipeline Lovable |
| `*.asset.json` | Asset gestiti da Lovable (vedi § 11). Non convertirli manualmente |

### Regole da rispettare nella riprogettazione

1. **Tutti i colori come token HSL in `src/index.css`.** È la convenzione dichiarata nel file (`All colors MUST be HSL`) ed è ciò che l'AI di Lovable si aspetta di trovare. Aggiungere nuovi colori = nuova variabile CSS + mapping in `tailwind.config.ts`, mai valori hex inline nei componenti.
2. **Un componente per file, PascalCase, export default**, sotto `src/components/<area>/`. È il pattern che il tagger e l'editor visuale sanno mappare.
3. **Solo Tailwind + shadcn.** Niente CSS-in-JS, niente librerie di stile aggiuntive, niente file `.css` per componente.
4. **Nessuna dipendenza server-side.** Il build è statico (`vite build` → `dist/`), SPA con `BrowserRouter`: nessun SSR, nessuna API route. Backend eventuale solo via Supabase (integrazione nativa Lovable).
5. **Nuove rotte** vanno aggiunte in `src/App.tsx` **sopra** la catch-all `*` (commento esplicito già presente nel file).
6. **Ogni nuova stringa va in `it.json` E `en.json`** con la stessa chiave, e letta con `t()`. La parità è attualmente 170/170: mantenerla.
7. **Immagini**: importarle da `src/assets/` con `import` ES (Vite le hasha nel build). Preferire percorsi relativi ad asset in repo rispetto ai `.asset.json` quando serve che funzionino anche in locale.
8. **Verificare che il build passi** (`npm run build`) prima di pubblicare — è il passo 2 del flusso già documentato in `.lovable/plan.md`.

---

## 13. Debito di design rilevato (input per la nuova home)

| # | Problema | Impatto sulla riprogettazione |
|---|---|---|
| 1 | Due creme diversi: token `--accent` ≈ `#FEF6EC` vs hardcoded `#fbf6f1` | Allineare `--accent` a `#fbf6f1` e rimuovere gli hex sparsi |
| 2 | `#156669` hardcoded 12+ volte nel Footer | Sostituire con `text-primary` |
| 3 | URL CTA Google Calendar duplicato 9 volte | Estrarre in `src/lib/constants.ts` |
| 4 | `--hero-gradient` e `font-logo` (Bungee) definiti e mai usati | O si usano nella nuova home, o si rimuovono |
| 5 | Raggi fuori scala: 12/16/20/24/28/32/45px in giro per il sito | Definire 3–4 step canonici |
| 6 | Ombre miste: token (`shadow-card/soft`) + Tailwind (`sm/lg/xl`) + arbitrarie | Unificare sulla coppia token |
| 7 | Home attuale = solo 2 sezioni (hero + 2 card) | Poca profondità narrativa: `ProblemSection` e `PricingSection` esistono già e sono orfane |
| 8 | Nessun `alt` dinamico/i18n sulle immagini, alt in italiano hardcoded | Accessibilità + coerenza EN |
| 9 | Immagini non ottimizzate (879 KB e 2,4 MB) | LCP della home penalizzato: la nuova hero va servita più leggera |
| 10 | `App.css` residuo del template Vite (`#root { max-width: 1280px; padding: 2rem }`) | **Non è importato** in `main.tsx`, quindi inerte: eliminabile |
| 11 | Meta SEO identici su tutte le rotte | Valutare `react-helmet` o meta statici per la home |
| 12 | `NavigatoreSanitario.tsx` con testi hardcoded fuori da i18n | Da portare su `t()` |
| 13 | `sitemap.xml` non allineata alle rotte reali | Aggiornare dopo il redesign |
| 14 | Animazione di ingresso applicata al **container intero** della sezione | Blocco unico che appare: valutare stagger sui figli |
| 15 | `dark:` mai implementato benché `darkMode: "class"` sia attivo | Decidere se la nuova home deve supportarlo |

---

## 14. Riepilogo operativo per la nuova Home

**Da conservare (identità del brand):**
- Palette a 3 colori: petrolio `#156669` · azzurro `#B4D2E4` · crema `#FBF6F1`
- Public Sans, titoli `font-bold`, corpo in `muted-foreground`
- Alternanza a strisce piene `secondary` ⇄ `accent` tra sezioni
- Ritmo `py-16 md:py-24` e container `px-4 sm:px-6 lg:px-8`
- Card bianche con `shadow-card → shadow-soft` in hover, icone lucide 48px in `text-primary`
- CTA `Button` primary `size="lg"`, testo maiuscolo, verso Google Calendar
- Fade-in on scroll a 500ms
- Header sticky crema `h-20` + Footer crema 4 colonne

**Da rivedere:**
- Densità e profondità narrativa della home (oggi 2 sole sezioni)
- Normalizzazione token (creme, raggi, ombre) prima di costruire nuove sezioni
- Peso delle immagini hero
- Gerarchia della CTA: oggi 2 CTA identiche a poca distanza

**Da rispettare sempre:** § 12 — vincoli Lovable.

---

## 15. Registro modifiche — 31 agosto 2026

Riprogettazione della Home a partire dal deck Canva.

**Design system**
- `--accent` corretto da `33 89% 96%` (`#FEF6EC`) a `30 56% 96.5%` (`#FBF6F1`): il token ora coincide con il crema usato ovunque
- Aggiunti i token `--secondary-strong`, `--highlight`, `--highlight-foreground`, `--success`, `--warning`, `--danger` e le relative utility Tailwind
- Introdotto il pattern di profondità sfondo → contenitore → card

**Nuovi file**
- `src/lib/constants.ts` — `CALENDAR_CTA_URL`, `LOGIN_URL`, `CLIENTS`
- `src/components/home/` — `SectionHeading`, `ClientsSection`, `PlatformSection`, `AdvantageSection`, `FAQSection`, `FinalCTASection`

**Contenuti**
- Menu: Home · Come funziona · Chi siamo · Accedi ("Come funziona" → `/navigatore-sanitario`)
- Language switcher ridotto a **una sola voce che alterna** IT/EN, con chiave `header.switchTo`
- Footer: logo "Powered by Mamazen" ridotto e portato **in linea** con la riga dei dati societari, separato da un filetto verticale
- Nuovo posizionamento di prezzo `~250 €` vs `oltre 700 €`, propagato a `comparison.row2`, `faq.q3` e `pricing.annual` su entrambe le lingue
- Titolo testimonial → "Cosa dicono di HeyLucy"; `quote1` e `quote2` riscritte secondo il Canva
- Namespace i18n `home.*` (clients, platform, advantage, faq, finalCta) + `header.home`, `header.comeFunziona`, `header.menuLabel`
- Parità IT/EN: **216 chiavi** su entrambi i file

**Motion (secondo passaggio)**
- Introdotto il motion system descritto in § 16: `Reveal`, `useReducedMotion`, `AnimatedNumber`, `ScrollProgress`
- Token easing `ease-reveal` / `ease-spring` e keyframes `float`
- Immagini della piattaforma scaricate in `src/assets/platform-*.png`: non dipendono più dal runtime asset di Lovable e si vedono anche in locale
- Logo wall in loop continuo con placeholder lorem ipsum
- FAQ ridisegnate a card separate con badge numerato

**Estensione a tutto il sito (terzo passaggio)**
- `CtaButton` — unico punto in cui è definito lo stile della CTA primaria, usato in **10 file**; le 9 URL hardcoded sono state migrate a `CALENDAR_CTA_URL`
- `SectionHeading` esteso con `align` (`center` · `left` · `right`) e adottato da tutte le sezioni del sito
- `Reveal` applicato a tutte le pagine: nessuna sezione usa più il fade a blocco unico
- `FramedImage` su hero Cliniche, hero Navigatore e immagine WhyWelfare
- FAQ di `/giornate-di-prevenzione` allineate al nuovo stile a card numerate
- `NavigatoreSanitario.tsx` riscritto: testi migrati al namespace i18n `navigatore.*` (la pagina prima esisteva solo in italiano) e blocco piattaforma sostituito dal componente condiviso `PlatformSection`
- `SportelloSanitario.tsx`: le emoji usate come icone sostituite da lucide in chip azzurri, hero non più compresso
- `NotFound.tsx`: ora ha Header, Footer e i testi in i18n (`notFound.*`)
- Ultimi hex fuori palette rimossi: `#fbf6f1`, `#156669`, `#008744`, `#E32636`, `text-green-600`, `text-red-600`, `bg-white` → token
- Anche i componenti orfani (`ProblemSection`, `PricingSection`, `SolutionsSection`) sono stati allineati, così restano pronti al riuso

**Alternanza degli sfondi**
- `/strutture-sanitarie` passa da `bg-background` a `bg-accent` nelle sezioni 2 e 4 (con le card di `HowItWorks` che diventano bianche), per stare sul ritmo azzurro/crema del resto del sito
- Su `/navigatore-sanitario` hero, piattaforma e valore erano tre `bg-secondary` consecutivi e la pagina si leggeva come un blocco unico: risolto insieme al punto qui sotto

**Due versioni del blocco piattaforma**

Lo stesso contenuto compare su due pagine con profondità e impaginazione diverse, altrimenti la pagina di approfondimento sembra un copia incolla della home.

| | `home/PlatformSection` | `navigatore/PlatformDetailSection` |
|---|---|---|
| Dove | `/` | `/navigatore-sanitario` |
| Ruolo | Vetrina: far capire in dieci secondi che esiste una piattaforma | Approfondimento: spiegare cosa fa davvero ogni funzione |
| Impaginazione | Griglia 2×2 di card compatte dentro un contenitore crema | Righe a piena larghezza con lati alternati, senza contenitore |
| Sfondo | `bg-secondary` | `bg-accent` |
| Testo per funzione | Titolo + un paragrafo | Titolo + frase sintetica + paragrafo esplicativo + 3 punti concreti |
| Immagini | Screenshot piccolo con bordo sottile | `FramedImage` grande, accento alternato `primary` / `highlight` |
| Chiavi i18n | `home.platform.*` | `navigatore.platform.*` (riusa solo gli `imageAlt`) |

**Registro linguistico di `navigatore.platform.*`:** italiano piano, frasi corte, nessun trattino lungo. Si parte da cosa fa la persona («scrivi la domanda come la diresti a un collega»), non da cosa fa il software.

**Regola:** nessuna pagina deve avere due sezioni consecutive con lo stesso sfondo. Alternanza verificata su tutte e quattro le pagine multi-sezione.

**Menu e gerarchia dei titoli (quarto passaggio)**
- Lo stato attivo del menu era **invisibile**: distingueva `text-primary` da `text-foreground`, ma i due token hanno lo stesso identico valore (`180 65% 24%`). Ora l'attivo è marcato da un filetto `h-[3px]` sotto la voce più il peso `font-semibold`, e le voci inattive stanno a `text-primary/60`. Su mobile: barretta laterale e fondo `bg-secondary/60`. Aggiunto `aria-current="page"`
- **Regola:** non usare mai un contrasto `foreground` / `primary` per distinguere due stati, sono lo stesso colore
- `SectionHeading` accetta `as` (`h1` · `h2`, default `h2`). `/coperture` e `/giornate-di-prevenzione` non avevano nessun `h1`: ora ogni pagina ne ha esattamente uno
- `/coperture` ricostruita su tre sezioni (hero con `h1` e immagine, assessment a card numerate, esito con occhiello e CTA) invece delle due precedenti senza titolo di pagina né immagini. Recuperato l'asset orfano `problem-fondi-sanitari.jpg`

**Home: hero, coperture extra, FAQ (quinto passaggio)**
- Copy dell'hero sostituita: `hero.title` e `hero.subtitle`. Lo slogan storico «Rivoluzioniamo la salute in azienda» resta vivo in `footer.slogan`
- Una sezione nuova dopo il logo wall: `CoverageExtraSection`, che tiene insieme entrambi gli slide del cliente (grafico a barre e diramazione «punto unico di contatto»)
- Aggiunta la famiglia `font-hand` (Caveat, da Google Fonts) per la sola annotazione manoscritta del grafico. Badge a stella e frecce curve sono SVG inline: il path della stella è generato, non disegnato a mano
- FAQ della home riportate al testo fornito dal cliente. La domanda 4 dice «Consulente Sanitario umano» mentre la card 2 della piattaforma dice «Concierge Sanitario umano»: **scelta del cliente, confermata due volte**, non normalizzare

**Parità dell'alternanza (aggiornato)**

`CoverageExtraSection` è **crema piena**, come lo slide del cliente: niente fascia azzurra, niente contenitore. Con Hero azzurro e Clienti nel mezzo, l'unico modo per evitare due sezioni crema adiacenti era spostare il logo wall.

**`ClientsSection` è ora una strip azzurra attaccata all'hero** (`bg-secondary pb-16 pt-2`): non è una sezione a sé che ripete lo sfondo per errore, è la continuazione voluta della fascia hero, secondo il pattern «hero + logo wall» . È l'unica adiacenza di sfondo ammessa nel sito, e va letta come una fascia sola.

Catena della home:
`sec (hero + clienti) → acc → sec → acc → sec → acc → sec`

Tutto ciò che segue «Coperture extra» è tornato ai colori originali: il ribaltamento tentato nel passaggio precedente è stato annullato.

**Regola generale:** con due soli sfondi, inserire una sezione in una catena alternata obbliga a ribaltare tutto ciò che segue, e il ribaltamento non è solo il colore di fondo (le tinte interne delle card sono scelte in funzione dello sfondo e sparirebbero). Prima di inserire, valutare se conviene invece agganciare la nuova sezione a una fascia esistente.

**Fedeltà agli screen del cliente**

Su richiesta esplicita, `CoverageExtraSection` replica lo slide:
- `SectionHeading` con `rule={false}`: lo slide non ha il filetto tricolore. È l'unico punto del sito in cui il filetto è disattivato
- Sottotitolo giustificato e allineato a sinistra, non centrato
- Barre alte 96px, raggio `rounded-lg`, contigue senza stacco
- Segmento «integrazioni» sul nuovo token `--graphite` (`202 15% 44%`, ardesia): il petrolio di brand che avevo usato prima non corrispondeva allo slide
- Legenda con pastiglie quadrate da 48px
- Annotazione in `font-hand` (Caveat) con la freccia curva (dal 17 settembre 2026 **sotto** la scritta, non piu' alla sua sinistra: vedi sotto)
- Badge a stella da 176/208px, testo vincolato a `inset-[19%]`, cioè al cerchio interno della stella: un padding uniforme spingerebbe il testo verso le punte, dove lo spazio si assottiglia

**Chi siamo**
- Pagina ristrutturata su due sezioni come le altre: hero `bg-secondary` con `h1`, filetto, paragrafo di apertura e immagine incorniciata; racconto su `bg-accent`
- L'immagine è un **segnaposto**: `src/assets/chi-siamo-founders.jpg`, per ora una copia di `hero-aziende.jpg`. Sostituendo il file con la foto dei founder, mantenendo lo stesso nome, la pagina si aggiorna senza toccare il componente

**Redesign su riferimenti Hale e Holifya (14 settembre 2026)**

Analisi delle fonti: i CSS di gethale.it sono in chiaro e sono stati letti direttamente; holifya.com risponde 403 a qualunque richiesta automatica, quindi è stato analizzato a programma sugli screenshot forniti dal cliente (palette dominante e bande orizzontali).

Cosa fanno i due riferimenti, misurato:

| | Hale | Holifya |
|---|---|---|
| Titoli | serif dedicato, diverso dal corpo | — |
| Scala | fluida con `clamp` | — |
| Raggio card | 36px | — |
| Ombre hover | ampie e tinte del brand | — |
| Contenitore | fluido fino a 1600px | — |
| Ritmo sezioni | — | quasi tutto chiaro `#F8F8F8`, corse da 900 a 1700px, poi 2-3 blocchi scuri `#002020` / `#004050` |

**Cosa è stato adottato**
- `font-display` = Instrument Serif per tutti gli `h1` e per `SectionHeading`. **Peso 400 obbligatorio**: il font ha un solo peso e un `font-bold` produrrebbe un finto grassetto sintetizzato, pessimo su un serif ad alto contrasto
- Scala tipografica fluida `text-fluid-sm` … `text-fluid-4xl`, interpolata con `clamp` invece che a scalini per breakpoint
- `--radius` da 0.75rem a 1rem, più `rounded-card` (36px) e `rounded-pill` (200px)
- Ombre tinte di petrolio, con `shadow-soft` molto più ampia di prima: il sollevamento all'hover ora si sente
- Contenitore fino a 1600px
- Nuovo token `--secondary-pale` (`#E8F1F6`): serve come respiro fra due sezioni chiare senza tornare all'alternanza a strisce

**Nuovo ritmo: base chiara più blocchi forti**

L'alternanza azzurro/crema a ogni sezione è stata abbandonata. Ora la base è chiara (crema e azzurro pallido si alternano con stacco minimo) e ogni pagina ha **uno o due blocchi petrolio pieni** come momenti forti.

| Pagina | Ritmo | Blocchi forti |
|---|---|---|
| `/` | hero · crema · **PETROLIO** · pallido · crema · pallido · crema · **PETROLIO** | Piattaforma, Clienti |
| `/giornate-di-prevenzione` | crema · pallido · crema · pallido · **PETROLIO** · crema · pallido · crema | Sportello sanitario |
| `/strutture-sanitarie` | crema · pallido · **PETROLIO** · crema | Benefici |
| `/coperture` | crema · pallido · **PETROLIO** | Esito |
| `/navigatore-sanitario` | crema · pallido · **PETROLIO** · crema | Valore |
| `/chi-siamo`, `/sportello-sanitario` | crema · pallido | nessuno |

La regola «nessuna adiacenza identica» resta valida e verificata su tutte le pagine.

⚠️ **Due correzioni che la base chiara ha reso necessarie**, entrambe misurate:
- Una card bianca su crema fa **1.07:1**, praticamente invisibile. Tutte le card su sezione chiara hanno ora un filo `border-card-border/10`, cioè petrolio al 10%. Sulle sezioni petrolio il filo non serve, il bianco stacca da solo
- `--muted-foreground` era `180 20% 45%`, cioè **3.52:1 su crema**, sotto la soglia AA. Portato a `180 22% 36%`, che dà 5.11:1 su crema e 4.80:1 su azzurro pallido

**Hero e header (secondo passaggio del redesign)**

L'hero replica la struttura misurata su Holifya: fotografia a tutto campo, testo sopra, e in fondo un **pannello che scavalca il bordo inferiore** e fa da cerniera con la sezione chiara successiva. Misure prese dai pixel di `pezzo 1.png`: pannello largo il 56%, allineato a destra, sporgenza di 89px.

⚠️ **`overflow-hidden` sta sul wrapper dello sfondo, non sulla sezione.** Sulla sezione taglierebbe la sporgenza del pannello, che e' l'effetto voluto.

**La foto dell'hero deve essere orizzontale.** `why-welfare-image.jpg` e' 1272x1920, cioe' verticale: usata a tutto campo veniva usata per intera larghezza e tagliata sopra e sotto. Sostituita con `hero-aziende.jpg` (1920x1280), il cui soggetto sta al 70% della larghezza e quindi lascia libero il lato del testo.

⚠️ **`object-position` orizzontale non sposta la foto** quando la sorgente e' meno larga del contenitore: `object-cover` usa tutta la larghezza e ritaglia in altezza. Per far "arretrare" la foto verso destra si allunga il velo, non si sposta l'immagine.

**Header sovrapposto**
- `fixed`, sfocato con `backdrop-blur-md`. Sopra la hero e' trasparente (nessun fondo, testo `text-accent`, logo `variant="white"`); superata la soglia torna solido (`bg-accent/85`, testo petrolio, logo normale)
- ⚠️ **La soglia e' il punto in cui il testo della hero passa sotto l'header, non la fine della hero.** Il testo della hero e' bianco e l'header trasparente e' bianco pure lui: tenendolo trasparente per tutta la hero, scrollando le due scritte si sovrapponevano e non si leggeva niente. La misura arriva da `[data-header-overlap]`, marcato sulla colonna di testo della hero, in coordinate di documento (`rect.top + scrollY`) meno gli 80px dell'header. A 1440 vuol dire 208px di scroll invece di 740. Senza quel riferimento resta la vecchia soglia sull'altezza della hero
- La versione trasparente vale **solo sulle rotte in `OVERLAY_ROUTES`**, cioe' dove il primo blocco e' scuro. Su crema il testo bianco sarebbe illeggibile
- Essendo fuori dal flusso, dove non si sovrappone serve un distanziatore `h-20`. Dipende dalla **rotta e non dallo scroll**: legarlo allo scroll farebbe sobbalzare la pagina a ogni cambio di stato

⚠️ **Le tappe dei gradienti Tailwind vanno a passi di 5.** `from-38%` e `via-62%` non vengono compilate e il gradiente resta senza tappe; servono valori come `from-40%` e `via-60%`, oppure la sintassi arbitraria `from-[38%]`.

⚠️ **Dopo un cambio a `tailwind.config.ts` il dev server va riavviato.** Vite non rilegge quel file a caldo: continua a servire il CSS vecchio, mentre `vite build` ricompila da zero e non mostra il problema.

**Hero allineata allo screenshot Holifya (terzo passaggio, 14 settembre 2026)**

Lo screenshot di riferimento e' stato misurato a programma su una finestra da 1913 CSS. L'hero ha **cinque elementi in colonna** piu' il pannello:

| Elemento | Misura sul riferimento | Resa in `HeroSection` |
|---|---|---|
| Titolo | 2 righe, 69px, bordo alto a 282px | `text-fluid-4xl`, tetto 68px, `lg:pt-72` |
| Sottotitolo | una riga sola, 18px semibold | `text-fluid-base font-semibold`, tetto 18,4px |
| Punti elenco | 3 voci, 17px, passo 39px | `<ul>` con `space-y-3`, punto fuori dal testo |
| CTA | pastiglia piena + pastiglia contornata | `CtaButton tone="light"` + `Button variant="outline"` |
| Pannello testate | alto 86px, sporgenza 43px, 56% della finestra | `translate-y-1/2` su `bottom-0`, `xl:w-[84%]` (67% della finestra, piu' largo apposta) |

Colonna del testo dal 10% al 53% della larghezza, alta 411px, poi 108px fino al bordo inferiore. Resa: 832px di hero contro gli 801 del riferimento, pannello alto 84px contro 86, sporgenza 42px contro 43, largo 1280px su 1913.

⚠️ **Il sottotitolo scende a `fluid-base`, non e' un errore.** Sul riferimento misura 18px ed e' quasi della stessa taglia dei punti elenco: la gerarchia la fa il peso, non il corpo. Con `fluid-lg` (22px) il blocco si sbilancia e il titolo perde stacco.

⚠️ **Il velo e' piu' denso di quello del riferimento perche' la foto e' diversa.** Misurato: la foto di Holifya ha luminanza media e regge il bianco a 5,4:1 con un velo leggero; `hero-aziende.jpg` e' un muro chiaro, media 166, e con lo stesso velo darebbe **2,4:1**. Il gradiente attuale (`from-primary/80 via-primary/70 via-55% to-primary/45`) misurato sul render da' **5,22:1 mediano e 4,58:1 come minimo sulle righe di testo**, cioe' lo stesso risultato percepito del riferimento. Cambiando la foto dell'hero il velo va rimisurato, non ereditato.

⚠️ **Sulla sezione serve `z-10`.** L'hero e' `relative isolate` e il pannello sporge dal suo bordo inferiore; la sezione successiva e' anch'essa posizionata e, a parita' di `z-index` automatico, verrebbe dipinta dopo, coprendo la sporgenza.

**Conseguenze sul resto della home**
- `PressSection` **non e' piu' montata**: le testate vivono nel pannello dell'hero. Il file resta in `src/components/home/` ma non e' importato da nessuno
- `PressPanel` riceve dall'hero `className="md:px-10 md:py-7"`: il padding di default dava un pannello alto 67px, troppo basso rispetto agli 86 del riferimento
- ⚠️ **Il nastro deve scorrere sempre, a qualunque larghezza.** Era stata provata una variante ferma e distribuita con `justify-between` da `lg` in su, che aveva il vantaggio di non tagliare nessun nome contro la maschera: **scartata su indicazione del cliente**. Se ricompare una riga ferma, e' una regressione, non un miglioramento
- Il pannello piu' largo ha dato respiro al nastro: passo fra i nomi da 48 a 56px, durata da 28 a 34 secondi, sfumatura ai bordi ristretta dal 5 al 4%
- I nomi hanno perso la sottolineatura piena: ora `decoration-primary/25` con stacco a 6px, che diventa piena al passaggio del mouse. Il corpo e' salito da `fluid-sm` a `fluid-base`. Cinque link tutti sottolineati pieni facevano rumore
- Lo stacco fra hero e `StatementSection` regge perche' quest'ultima ha `pt-28 md:pt-32`, molto piu' dei 42px di sporgenza

**`StatementSection` rifatta sullo screenshot (14 settembre 2026)**

La fascia grigia con il gradiente, il bordo sopra e sotto e la scheda crema in rilievo **non c'e' piu'**. Il riferimento ha un fondo chiaro e piatto con il testo appoggiato sopra, senza contenitori. Misure prese sullo screenshot a 1910 CSS:

| Elemento | Riferimento | Resa |
|---|---|---|
| Fondo | chiaro e piatto, nessun bordo | `bg-background` |
| Titolo | a sinistra, 52px, colonna 740px | `SectionHeading align="left" rule={false}`, `max-w-[760px]` |
| Paragrafo | a sinistra, colonna 633px | `max-w-[640px]`, `leading-relaxed` |
| Stacco sopra | 102px dal bordo sezione | 135px, cioe' 93px sotto il pannello testate |
| Stacco sotto | 95px | 119px |

⚠️ **Fondo bianco e non crema.** `CoverageExtraSection`, che viene subito dopo, e' crema: due fondi identici di fila violano la regola sulle adiacenze. Il bianco era gia' nel ritmo della home, lo usa `ShowcaseSection`.

⚠️ **Il titolo sta su una riga sola, il riferimento ne ha due.** Dipende dalla copy, che e' piu' corta, non dalla misura del carattere. Non allargare il titolo per forzare il ritorno a capo.

**Copy nuova, tutta da validare**
- `hero.subtitle` accorciato da 137 a 66 caratteri: il riferimento ha una riga sola e con il testo lungo il blocco andava a quattro righe. Il testo precedente era «Ti aiutiamo a sfruttare al meglio il tuo Fondo CCNL e aggiungiamo solo le coperture che mancano. Tutto in un'unica piattaforma, semplice.»
- `hero.bullet1/2/3` sono nuovi, ma ognuno riprende un dato gia' presente e gia' validato altrove sul sito: `home.faq.q1` per il fondo sfruttato al 100%, `home.advantage.row4` per il concierge umano, `home.advantage.row2` per l'80% di adesione
- `hero.ctaSecondary` riusa l'etichetta gia' in uso sull'hero di `/navigatore-sanitario` e punta a quella rotta

**Scostamenti dal riferimento tenuti apposta**

| Cosa | Riferimento | Qui | Perche' |
|---|---|---|---|
| Titolo | sans geometrico leggero | Instrument Serif | `font-display` e' una scelta di sistema presa dal riferimento Hale, vale per tutti gli `h1` |
| Rientro del testo | 356px su 1913 (contenitore 1200) | 188px su 1913 (contenitore 1600) | il contenitore e' quello di tutto il sito, un hero rientrato diversamente si stacca dalle sezioni sotto |
| Testate | quattro loghi fermi | cinque nomi per esteso su nastro scorrevole | i loghi delle testate non li abbiamo. Essendo nomi lunghi, il pannello e' piu' largo di quello del riferimento |
| Header | due pastiglie, piena e contornata | una sola, `Accedi` | non inventiamo una seconda CTA di header |

**`CoverageExtraSection` riprogettata a box (14 settembre 2026)**

Struttura presa da `pezzo 3.png`: li' ogni sezione e' un **rettangolo stondato** staccato dai bordi di circa 16px, con le sezioni impilate a distanza ravvicinata. Qui la sezione e' solo il margine (`px-3 py-3 md:p-4`) e il colore sta sul riquadro `rounded-card bg-primary` che ci galleggia dentro.

| Pezzo | Com'era | Com'e' |
|---|---|---|
| Fondo | crema a tutta larghezza | riquadro petrolio stondato su pagina bianca |
| Titolo | centrato, `size="large"` | a sinistra, `tone="light"`, corpo normale |
| Sottotitolo | giustificato, `max-w-5xl` centrato | a sinistra, colonna 640px |
| Barre | statiche, crescita allo scroll | crescita allo scroll **piu' le integrazioni accendibili** |
| Nota a mano e stella | colonna a destra del grafico | stella a cavallo del bordo alto, nota sotto |
| Legenda | pastiglie da 48px sotto al grafico | riga compatta dentro il riquadro acceso |

**La grafica ora si tocca.** Una pastiglia, «Integrazioni ad hoc», toglie e rimette il segmento crema dalla barra. Verificato in browser: 100% acceso, 66% spento, e `aria-pressed` segue.

- ⚠️ **Un comando solo, non un elenco di prestazioni.** Prima c'erano tre pastiglie (Chirurgia, Carie, Figli, le voci citate nella nota a mano): **scartate su indicazione del cliente**, perche' non e' detto che siano quelle a fare la differenza e la barra finiva per affermare un dato che nessuno ha validato. La nota a mano puo' elencarle perche' e' un esempio; una barra che le misura no
- La pastiglia fa da legenda del crema **e** da interruttore, cosi' la stessa etichetta non compare due volte. L'azzurro ha una legenda normale accanto
- Il segmento sta dentro un contenitore `overflow-hidden rounded-lg` largo quanto il totale e cresce con `flex-grow`: la coda resta stondata senza ricalcolare i raggi
- La base resta a 66% in valore assoluto mentre il totale cambia, perche' il suo `flex-grow` e' fisso e il contenitore si allarga insieme al segmento
- Prima cresce la base, poi dopo 700ms entrano le integrazioni: e' il punto della sezione
- ⚠️ La base della prima barra e la base della seconda devono essere **identiche**. Smorzando la prima per dare risalto alla seconda salta il confronto, che e' tutto il senso del disegno. Il risalto lo fa il riquadro acceso attorno alla riga «Con HeyLucy», dentro cui vivono anche i comandi

**Niente etichetta al passaggio del mouse.** Ci sono state tre versioni, tutte tolte su indicazione del cliente: un cursore a faccina emoji, poi un'etichetta che seguiva il puntatore, infine un fumetto agganciato al fianco del bottone con le battute «Ma daiii...» e «Meglio così». ⚠️ **Non riproporle.** Resta solo lo schiarimento del segmento crema al passaggio sulla pastiglia, che e' un ritorno di stato e non una battuta.

**La stella scavalca il bordo** come il pannello testate scavalca l'hero: meta' sul bianco della pagina e meta' sul petrolio. Sotto, la nota a mano con la freccia.

**La freccia della nota sta sotto la scritta e punta in basso** (17 settembre 2026, su richiesta del cliente). Prima stava a sinistra del testo e puntava in diagonale verso il basso a sinistra; ora `HandNote` e' una colonna (testo, poi freccia) e il disegno e' un arco verticale (`viewBox="0 0 56 100"`, punta a x=24) che scende verso la **fetta crema delle integrazioni** della barra «Con HeyLucy».
- Misurato a 1440: punta della freccia a 1027px, fetta crema da 892 a 1208 con centro a 1050. Verificato anche a 768, 1024 e 1536: la punta cade sempre dentro la fetta crema
- **Nota e freccia scendono fin sopra la barra** (stesso giorno, secondo passaggio): lo stacco dal sole e' `mt-48`, cosi' la punta si ferma fra 3 e 20px sopra il bordo della fetta invece di restare a mezz'aria. ⚠️ Per abbassarla ancora si allunga lo stacco, **non la freccia**: due disegni piu' lunghi sono stati provati e scartati dal cliente, uno con due curve opposte («troppo storta») e uno con un arco solo. Il disegno buono e' quello corto, `viewBox="0 0 56 100"` con la classe `h-20 w-12`
- ⚠️ Il rientro e' `lg:mr-12` e **non** `md:mr-12`: a 768 il rientro grande portava la punta 6px a sinistra della fetta, cioe' sopra la parte azzurra della base
- La freccia resta `hidden md:block`: sotto `md` la nota sta **sotto** il grafico, quindi una freccia rivolta in basso punterebbe al blocco del marchio invece che alle barre
- Spazio verificato: la colonna della nota finisce 14px sopra la prima riga del grafico a 768, 25px a 1024, 27px da 1280 in su

- 208px di lato da `md` in su (128 sotto), con lo scavalco a meta': ⚠️ cambiando la misura del sole va rifatto anche il margine negativo, che vale meta' altezza
- Crema con **filo di petrolio da 1,4**: sulla meta' bianca il crema da solo fa 1,05:1 e sparirebbe
- ⚠️ **Niente alone sfocato ne' ombra dietro.** Erano stati messi per appoggiarla sul bianco (`bg-primary/20 blur-2xl` piu' un `drop-shadow` petrolio) e poi **tolti**: sporcavano di verde il bianco della pagina. La stella si regge sul filo di bordo
- ⚠️ La stella e' **sorella** del riquadro, non figlia: `overflow-hidden` le taglierebbe la meta' di sopra
- ⚠️ Lo scavalco e' un `-mt` pari a meta' altezza, **non** `-translate-y-1/2` sul contenitore: la traslazione alzerebbe anche la nota, e `Reveal` da visibile impone comunque `translate-y-0`, che annullerebbe lo scavalco
- Sotto `md` la nota non ci sta in alto a destra (finirebbe sopra al titolo) e torna in fondo al grafico. Il testo e' scritto una volta sola, in `HandNote`

**Il bivio del «punto unico di contatto»** e' un SVG con due curve che si disegnano allo scroll (`pathLength={1}` piu' `strokeDashoffset` da 1 a 0: cosi' non dipende dalla lunghezza reale del tracciato).

- ⚠️ Serve `preserveAspectRatio="none"` **con un'altezza esplicita**. Con l'altezza automatica il riquadro prende le proporzioni del viewBox e scala in modo uniforme: i capolinea finiscono molto piu' dentro dei pallini
- ⚠️ I capolinea sono a **220 e 680**, non a 225 e 675: la griglia sotto ha `gap-8`, che sposta il centro di ogni colonna di 8px verso l'interno. Verificato in browser a 1913 e a 1280, cadono sui pallini a meno di un pixel
- ⚠️ **Sotto `md` la forcella sparisce e diventa un filo verticale.** I due rami vanno in colonna, quindi una forcella orizzontale non aggancerebbe niente: ogni ramo si porta sopra un filo da 32px con il pallino, che lo lega al marchio e poi l'uno all'altro

⚠️ **Le barre sono `w-full sm:flex-1`, non `flex-1`.** Sotto `sm` la riga e' in colonna e li' `flex-1` vale sull'asse verticale: `flex-basis: 0` schiaccia la pista a zero e **la barra sparisce**. Succedeva anche nella versione precedente, quindi sul mobile il grafico non si e' mai visto.

**Ritmo della home.** I blocchi petrolio diventano tre (Coperture extra, Piattaforma, Clienti). Restano separati da sezioni chiare e dalle fasce fotografiche, quindi la regola sulle adiacenze regge, ma il petrolio non e' piu' un accento raro.

**Copy nuova, da validare:** solo `home.coverageExtra.hint`. Tutto il resto della sezione usa copy gia' esistente.

**`ShowcaseSection` non e' piu' montata (14 settembre 2026)**

Tolte tutte e tre le fasce fotografiche, una richiesta per volta: «Trasmette attenzione reale alle persone», «Favorisce un clima sano e collaborativo» e infine «Trattiene i talenti». Senza fasce la sezione non ha piu' niente da mostrare, quindi e' uscita da `Index`. Il file resta in `src/components/home/` ma non lo importa nessuno, come `PressSection`.

- Le chiavi `whyWelfare.benefit1/2/3` **restano in `it.json` ed `en.json`**: le usa anche `WhyWelfareSection` su `/giornate-di-prevenzione`, dove sono un elenco puntato e non una fascia fotografica. Li' non ho toccato niente
- Sono uscite dal bundle `hero-cliniche.jpg` e `hero-cliniche-new.jpg`: **2,4 MB in meno**, quasi tutti della seconda, che era la seconda fascia. `Heylucy_-_Prevenzione_in_azienda.jpg` invece resta, la usa `SupportSection` su `/giornate-di-prevenzione`
- ⚠️ I due file usciti restano in `src/assets/` ma sono orfani: da eliminare se non servono altrove, ma il progetto non ha git e la cancellazione non si annulla

L'adiacenza che le fasce coprivano (riquadro petrolio di Coperture extra contro `PlatformSection`, petrolio pieno) **si e' risolta da sola**: `PlatformSection` e' passata a fondo bianco. Ora il riquadro petrolio galleggia su una pagina bianca continua, che e' esattamente l'effetto del riferimento.

**`PlatformSection` rifatta a timeline (14 settembre 2026)**

Struttura presa dalla sezione «Un metodo strutturato» del riferimento (`pezzo 2.png`): fondo bianco e piatto, testo a sinistra, immagine a destra, un filo verticale fra le due colonne con un pallino per riga.

| Pezzo | Com'era | Com'e' |
|---|---|---|
| Fondo | `bg-primary` a tutta larghezza | `bg-background` |
| Disposizione | griglia di quattro card 2x2 | quattro righe testo-immagine con il filo in mezzo |
| Card | scheda bianca con ombra, icona in pastiglia | **solo testo**, nessun fondo e nessuna pastiglia |
| Numerazione | assente | indice `01`-`04` in `muted-foreground` |
| Immagine | dentro la card, 16/9 | colonna sua, 16/10, cornice crema |

**Le righe entrano e rientrano (`repeat`)**

Su richiesta, qui il movimento e' a **doppio senso**: le righe compaiono scendendo e tornano a sparire risalendo, invece di restare visibili per sempre come nel resto del sito.

- `useScrollAnimation(threshold, repeat)` e `Reveal` hanno un secondo interruttore, `repeat`, **spento di default**. Acceso, l'osservatore segue l'elemento in entrambe le direzioni invece di essere a senso unico
- ⚠️ **Il default non va cambiato**: mezzo sito conta sull'interruttore a senso unico, e contenuto che svanisce risalendo e' una scelta da chiedere, non da imporre
- Il pallino ha il suo `Reveal` da 12px, quindi si accende quando arriva lui sullo schermo e non quando arriva la riga: ne viene fuori uno scaglionamento naturale
- ⚠️ La posizione del pallino sta sul contenitore e l'animazione dentro. `Reveal`, da visibile, impone `translate-x-0 translate-y-0`: sullo stesso elemento cancellerebbe il centraggio. Stessa insidia del sole di Coperture extra
- Con `prefers-reduced-motion` non sparisce niente: `Reveal` tiene `shown = reduced || isVisible`. Verificato in browser, con animazioni ridotte tutte le righe restano a opacita' 1

**Il filo e i pallini**

La colonna di mezzo e' una terza colonna della griglia larga `4.5rem`, non un `gap`: il filo ci corre dentro. Ogni riga disegna **due segmenti** invece di uno, e il primo manca alla prima riga e il secondo all'ultima, cosi' il filo comincia e finisce sui pallini come nel riferimento. Verificato sui pixel: filo da 2942 a 4439, pallini a 2947, 3444, 3942 e 4439.

⚠️ **Il pallino sta a `calc(50% - 1.25rem)`, non a `50%`.** La cella del filo non ha margine, quindi e' alta quanto tutta la riga, cioe' la scheda piu' i 40px di `mb-10` che distanziano le righe. Il centro della scheda cade a meta' cella meno mezzo margine. Cambiando `mb-10` va rifatta anche quella misura.

**Due scostamenti obbligati dal riferimento**, che li' ha cinque punti elenco per scheda e fotografie a tutto campo:
- il testo e' **centrato in verticale**. Abbiamo un paragrafo solo e l'altezza della riga la detta l'immagine: allineato in alto lasciava sotto un vuoto di duecento pixel
- le immagini sono `object-contain` dentro una cornice crema, non `object-cover`: sono schermate di prodotto con proporzioni diverse, ritagliandole si perdono titoli e pulsanti

⚠️ **Le quattro icone lucide sono uscite.** Stavano nella pastiglia del numero e la pastiglia e' stata tolta con tutti i fondi colorati della colonna sinistra. `FileSearch`, `Headphones`, `CalendarHeart` e `Tag` non sono piu' importate da nessuno: § 8 e' da aggiornare se la scelta resta.

**`AdvantageSection` rifatta a riquadro (14 settembre 2026)**

Stesso linguaggio delle altre: un rettangolo stondato azzurro pallido che galleggia sulla pagina bianca, come il riquadro petrolio di Coperture extra. La home ha ora tre scatole impilate su fondo bianco, che e' il ritmo del riferimento.

| Pezzo | Com'era | Com'e' |
|---|---|---|
| Fondo | fascia `bg-secondary-pale` a tutta larghezza | riquadro `rounded-card` azzurro sulla pagina bianca |
| Titolo | `SectionHeading` con filetto | a sinistra, `rule={false}` |
| Struttura | **due implementazioni**: griglia a tre colonne su desktop, lista di card su mobile | una sola griglia che collassa in colonna |
| Colonna HeyLucy | cella bianca | scheda bianca sollevata (`shadow-card`) |
| Colonna polizza | cella azzurra piena | solo contorno `border-primary/15` |
| Icone | check verde, X rossa, triangolo giallo | check verde e X grigia, uniformi su tutte le righe |

⚠️ **Una sola implementazione, non piu' due.** Prima lo stesso contenuto era scritto due volte, una per breakpoint: ogni ritocco andava fatto in due posti e le due versioni erano gia' divergenti (il mobile aveva le etichette di colonna, il desktop le intestazioni). Ora le intestazioni compaiono solo da `md`, e sotto rientrano dentro le schede con `md:hidden`.

**Il racconto lo fanno forma e colore.** La colonna HeyLucy e' **petrolio piena**, quella della polizza solo contornata e in grigio. Prima erano bianca contro contornata e si distinguevano troppo poco.

- ⚠️ Nella colonna petrolio la spunta e' **crema, non verde**: `--success` su petrolio fa 1,9:1 e sparisce. Il significato lo porta la colonna, non il colore dell'icona
- Sulla colonna del concorrente niente rosso ne' triangoli gialli: dipingere di rosso l'alternativa, su un sito sanitario, suona aggressivo

⚠️ **Le due colonne restano affiancate anche su mobile.** Incolonnate una sotto l'altra il confronto si perdeva: per sapere se 250 e' meglio o peggio bisognava ricordarsi il numero della scheda precedente. Sotto `md` cambia solo l'etichetta della voce, che scavalca le due colonne e sta sopra invece che in una terza colonna a sinistra. Le intestazioni «HeyLucy» e «Polizza sanitaria standard» stanno in cima una volta sola, non ripetute dentro ogni scheda.

⚠️ **`AnimatedNumber` non usa piu' `tabular-nums`.** Le cifre tabellari di Public Sans sono piu' larghe delle proporzionali, misurato: «250» passa da 29,6 a 33,6px. ⚠️ **La vera causa dello spazio era un'altra, trovata solo dopo.** Il testo stava dentro un contenitore `flex`, e in un flex **ogni porzione di testo diventa un elemento a se'**: `AnimatedNumber` ne produce tre (prima, numero, dopo), quindi il `gap` della riga si infilava **fra le parole**. A colonna stretta andavano perfino a capo separatamente, con la tilde su una riga e «dipendente» sull'altra. Risolto avvolgendo l'uscita di `AnimatedNumber` in un suo `span`, cosi' torna un elemento solo.

⚠️ Vale ovunque: **testo e icona dentro un flex con `gap` vanno messi ciascuno nel proprio `span`**, altrimenti il gap diventa spaziatura fra parole. I due pixel di spalla per lato si leggevano come uno spazio, e la copy sembrava scritta male: «Da ~ 250 €» invece di «Da ~250 €», «Oltre l' 80 %» con l'apostrofo staccato. Non servivano nemmeno a tenere ferma la riga, perche' il conteggio passa da una a tre cifre e la larghezza cambia lo stesso. Lo spazio che resta attorno a «~250» e' la spalla della tilde, che in Public Sans e' larga 11px a corpo 18: quella e' del carattere, non del codice.

**Recensioni vere da Trustpilot (14 settembre 2026)**

In home `TestimonialsSection` e' stata sostituita da `ReviewsSection`: al posto delle quattro citazioni anonime di dipendenti ci sono le **sei recensioni pubblicate sulla scheda Trustpilot di HeyLucy**. Struttura presa dalla sezione recensioni del riferimento: nastro orizzontale di schede che sborda dal bordo, riga di numeri sotto.

- ⚠️ `TestimonialsSection` **resta montata su `/giornate-di-prevenzione`** con le vecchie citazioni. Due sezioni recensioni diverse sullo stesso sito: da uniformare quando si mette mano a quella pagina
- Testo e numeri stanno in `constants.ts` (`TRUSTPILOT` e `REVIEWS`), non in `it.json`: sono dati, non copy da tradurre. Le recensioni restano in italiano anche in inglese, perche' tradurre le parole di un cliente vorrebbe dire riscriverle
- ⚠️ **Non correggere il testo delle recensioni, nemmeno i refusi** (per esempio «un' attenzione» di Giulia Bruno, o «ilTeam» di Alberto Alaimo). Sono parole di persone vere e vanno riportate come sono
- `title` e' vuoto dove Trustpilot mostra solo la prima riga del corpo troncata, che non e' un vero titolo. `invited` marca la recensione raccolta su invito, come fa Trustpilot

⚠️ **I numeri invecchiano da soli.** `TRUSTPILOT.score`, `count` e `fiveStarShare` sono fotografati al 14 settembre 2026: 4,2 di TrustScore, 6 recensioni, 100% a 5 stelle. Arrivando recensioni nuove il sito dichiara un punteggio che non esiste piu'. Vanno riallineati a mano, oppure si passa al widget ufficiale di Trustpilot, che li tiene aggiornati da solo.

⚠️ **La stella e il marchio Trustpilot sono ridisegnati da me, non sono gli asset ufficiali.** Trustpilot ha un kit di marchio con regole d'uso: prima di pubblicare conviene sostituirli con i file loro. Il verde `#00b67a` e' l'unico colore del sito **fuori palette**, ed e' voluto: e' quello che rende riconoscibili le stelle.

**Dettagli della resa**
- Le stelle sono bianche dentro un quadrato verde, non stelle verdi su fondo chiaro: e' il blocco di colore a farle riconoscere
- **Nastro in loop, non una barra da scorrere a mano.** Stessa meccanica di `PressPanel`: la lista e' ripetuta due volte per meta' e duplicata, e l'animazione trasla del 50%, cioe' esattamente la prima meta'. Ventiquattro schede, 62 secondi a giro
- ⚠️ **Non si ferma al passaggio del mouse**, a differenza del pannello testate e di quello clienti. La pausa c'era ed e' stata **tolta su richiesta**: chi vuole leggere con calma ha il bottone verso Trustpilot. Non rimetterla
- ⚠️ **Il nastro sta fuori dal contenitore**, come figlio diretto della sezione: va da bordo a bordo della finestra e non dentro una scatola larga 1600. Verificato che parta da x=0 e sia largo quanto la finestra
- ⚠️ La firma in fondo alla scheda ha `mt-auto`. Le recensioni sono lunghe in modo molto diverso, da una riga a dodici, e senza quello gli avatar finivano a quote diverse da una scheda all'altra
- Il corpo e' tagliato a cinque righe con `line-clamp-5`. La recensione di Benedetta ne occupa dodici e allungava tutte le schede. ⚠️ Il taglio e' **solo visivo**: il testo intero resta nel DOM, quindi chi legge con uno screen reader lo sente tutto
- Schede da 288px per 338, non 336 per 430: rimpicciolite su richiesta
- **Tolti su richiesta**, uno alla volta: il blocco dei numeri (TrustScore, recensioni, percentuale a 5 stelle), la riga di attribuzione sotto al nastro e la dicitura «Su invito». Sotto il titolo resta la riga breve con stelle, punteggio e marchio, e sotto al nastro il solo bottone verso Trustpilot
- ⚠️ `TRUSTPILOT.count` e `fiveStarShare` e il campo `invited` **restano in `constants.ts` ma non compaiono piu' a schermo**. Sono fatti veri della scheda e servono se quei blocchi tornano: non vanno cancellati per pulizia
- ⚠️ **Trustpilot marca da sola le recensioni raccolte su invito.** Toglierne l'etichetta qui e' una scelta del cliente: il testo e il voto non cambiano e il bottone porta alla scheda, dove il contesto completo si vede. Se un domani si vuole tornare a mostrarla il dato c'e' gia'
- Ottanta pixel di stacco fra la riga del punteggio e il nastro, misurati: `mt-14 md:mt-20`

**`FAQSection` dentro una scatola (14 settembre 2026)**

Terza scatola della home: rettangolo stondato **petrolio**, il colore del marchio, con un filo di bordo crema, che galleggia sulla pagina bianca.

Prima era grigio caldo (`--surface`), **scartato**: il cliente ha chiesto il colore del logo. Il token torna orfano, come prima.

- ⚠️ Il filo e' `border-accent/15` e non `border-card-border/10`: su un fondo petrolio un bordo petrolio al 10% non si vede
- ⚠️ **Titolo in colonna a sinistra, domande a destra.** Con il titolo sopra e l'elenco stretto a sinistra la scatola restava mezza vuota: e' larga quanto la pagina e «FAQ» e' un titolo di tre lettere
- Le risposte hanno `max-w-3xl`: nella colonna larga arrivavano a 1100px, cioe' righe da leggere col righello

**La fisarmonica non e' piu' fatta di schede**

Le domande erano schede bianche con ombra dentro la scatola: una scatola dentro una scatola. Ora sono **righe piatte separate da un filo**, con il numero, la domanda in crema e un piu' a destra che ruotando di 45 gradi diventa una croce, mentre il cerchio si riempie di crema. Due segnali invece di uno.

⚠️ **Il chevron di serie si nasconde, non si toglie.** `AccordionTrigger` in `src/components/ui/**` lo infila da solo e quella cartella non si tocca (§ 12): si spegne con `[&>svg]:hidden` sul trigger e si aggiunge la propria icona **dentro uno `span`**, cosi' il selettore non la colpisce.

⚠️ **`first:` e `last:` non funzionano dentro a un `Reveal`.** Ogni voce sta dentro il suo wrapper, quindi e' **figlia unica** del suo contenitore e `last:` la colpisce sempre: con `last:border-b-0` sparivano **tutti** i separatori, non solo l'ultimo, e la lista sembrava senza divisori. Si toglie con l'indice (`index < FAQ_KEYS.length - 1`). Vale per qualunque variante di posizione dentro a un `Reveal`, in tutto il sito.

⚠️ **Sull'ultima riga serve `border-b-0` esplicito.** `AccordionItem` aggiunge `border-b` di suo: non basta non mettere il bordo, va tolto, altrimenti resta un filo grigio appeso sotto l'ultima domanda. Verificato sui valori calcolati: 1px crema sulle prime quattro, 0px sulla quinta.

**`FinalCTASection` su bianco (14 settembre 2026)**

Da crema a `bg-background`, su richiesta. Il ritmo di chiusura e' quindi: scatola petrolio delle FAQ su pagina bianca, chiusura bianca, poi la fascia petrolio dei clienti.

Tolto anche il **filetto tricolore**, che era rimasto solo qui: ora tutta la home e' su `rule={false}`. Resta l'unica sezione con il **titolo centrato**, scelta voluta per la chiusura.

**Le tre scatole della home**, per non perdere il filo: petrolio (Coperture extra), azzurro pallido (Vantaggio), petrolio (FAQ). Tutte su pagina bianca, tutte `rounded-card`, tutte con il margine di 12-16px dal bordo della finestra. ⚠️ Due scatole petrolio su tre: sono lontane fra loro, ma se se ne aggiunge una terza conviene rivedere il ritmo.

**Footer a scatola e clienti a pannello (14 settembre 2026)**

Il footer e' diventato una **scatola stondata solo in alto**, `rounded-t-card` con il filo di bordo sul lato superiore: chiude la pagina, quindi in basso resta a filo. I clienti non sono piu' una fascia petrolio con titolo centrato, ma un **pannello uguale a quello delle testate nell'hero**, che ne scavalca il bordo alto.

- Pannello centrato e largo il **92% della finestra**, «quasi da lato a lato». Misurato a 1440: 1325x140, centrato, meta' sopra e meta' sotto il bordo (70 e 70). A 390: 359x111, 55 e 55
- ⚠️ **L'etichetta sta sopra i loghi, non a fianco.** A fianco si mangiava 200px di pannello e i loghi scorrevano in un ritaglio stretto: se ne vedevano quattro. Sopra, il nastro ha tutta la larghezza e se ne vedono sette, con dell'aria fra la scritta e i marchi
- Il footer ha `pt-28 md:pt-32` per fargli posto: verificato che a 390 il pannello finisca 55px dentro e il padding ne sia 112, e a 1440 70 contro 128. ⚠️ Crescendo ancora il pannello quel padding va rivisto
- ⚠️ **Crema e non petrolio.** Il footer petrolio era stato fatto e **scartato**: con Coperture extra e FAQ gia' petrolio diventava il terzo blocco uguale nella stessa pagina
- Il pannello e' **bianco** e non crema: su un footer crema un pannello crema sparirebbe. Bianco su crema fa 1,05:1, quindi lo staccano il filo di bordo e l'ombra, non il colore
- ⚠️ I loghi hanno perso `invert`. `brightness-0 invert` li portava a bianco per la vecchia fascia petrolio; sul pannello chiaro serve solo `brightness-0`, che li porta a nero tenendo la trasparenza. L'opacita' per cliente (`--logo-tone`) resta e continua a pareggiare la densita' di inchiostro

⚠️ **La sezione dei clienti non ha altezza propria.** Dentro c'e' solo un elemento in posizione assoluta, quindi occupa zero e il pannello si centra esattamente sul confine fra pagina e footer. E' la stessa meccanica dell'hero, e vale la stessa insidia: **la traslazione sta sul contenitore, non su `Reveal`**, che da visibile impone `translate-y-0` e annullerebbe lo scavalco.

**`/navigatore-sanitario` rifatta nel linguaggio nuovo (14 settembre 2026)**

Prima pagina interna portata sul sistema della home: fotografia a tutto campo nell'hero, sezioni chiare con il titolo a sinistra e `rule={false}`, scatole stondate per i momenti forti, pannello clienti e footer condivisi.

| Sezione | Com'era | Com'e' |
|---|---|---|
| Hero | crema, testo a sinistra e immagine incorniciata a destra | fotografia a tutto campo, testo dentro una scatola petrolio |
| Piattaforma estesa | fascia azzurra, righe alternate con `FramedImage` | pagina bianca, zigzag con schede colorate e immagini sovrapposte |
| Valore | fascia petrolio, elenco centrato | scatola petrolio con griglia asimmetrica di schede, come il riferimento |
| Chiusura | crema, titolo con filetto | bianca, `rule={false}` |
| Chiusura pagina | solo footer | pannello clienti che scavalca il footer, come in home |

**L'hero: il testo sta dentro una scatola, non sopra la foto**

⚠️ E' una deroga misurata, non una scelta estetica. La fotografia della sala d'attesa ha le **sedie bianche proprio nella colonna del testo**: il bianco sopra ci fa **2,4:1**, e per portarlo a 4,5 servirebbe un velo all'**88%**, che cancella la fotografia. La scatola petrolio risolve il contrasto (crema su petrolio, 6,25:1) e lascia la foto visibile intorno. Sull'hero della home il problema non c'e' perche' li' il velo denso basta.

⚠️ **La foto e' specchiata (`scale-x-[-1]`) e ancorata in alto (`object-top`).** Nell'originale il soggetto sta al 31% della larghezza, cioe' esattamente dietro alla scatola; specchiata finisce al 69% e si vede tutto. E un ritaglio centrato toglie 263px sopra, cioe' la testa: ancorando in alto si taglia solo il pavimento.

⚠️ **Nuovo file `hero-navigatore.jpg`, 213 KB**, ricavato da `hero-cliniche-waiting.png` che ne pesa 2332. Il PNG resta perche' lo usa ancora `/strutture-sanitarie`: quella pagina si porta dietro 2,3 MB sopra la piega e andrebbe passata al JPEG.

**La piattaforma estesa: zigzag**

Scheda e immagine si scambiano di lato a ogni riga e **si sovrappongono di una colonna**, come in un'apertura di rivista. Il fondo della scheda alterna petrolio e azzurro pallido. Dietro al titolo c'e' il numero in gigante, appena accennato. Le righe entrano e rientrano con lo scroll (`repeat`), da destra o da sinistra secondo il lato.

- ⚠️ **L'immagine sta sopra e la scheda sotto.** Sono schermate di prodotto: se fosse la scheda a coprirle si perderebbero pezzi di interfaccia. La scheda e' un blocco di colore e puo' finire coperta, percio' ha il padding maggiorato dal lato della sovrapposizione
- ⚠️ **Il numero gigante sta sempre dal lato libero**, opposto all'immagine: messo dal lato della sovrapposizione finiva coperto e spariva del tutto
- Sul petrolio il numero e' `text-accent/15` e non `/10`: al 10% non si vedeva

**La sezione valore ricalca il riferimento**

Scatola petrolio, titolo in alto a sinistra, e sotto una **griglia asimmetrica**: due schede impilate a sinistra e una alta a destra, che tiene l'altezza delle altre due. Ogni scheda ha l'indice, la frase come titolo e un'area grafica in fondo.

Le fotografie sono **scelte sul senso della frase**, con quello che il progetto ha gia': il gruppo che festeggia per il valore percepito dal team, la pila di moduli CCNL per il tempo perso in pratiche, i medici per la cultura della prevenzione. `problem-assicurazioni.jpg` e' rimasta fuori perche' racconta la stessa cosa della pila di moduli.

- Un velo `bg-primary/15` sopra ogni foto la lega al fondo petrolio della scatola senza spegnerla
- ⚠️ `alt=""` e `aria-hidden`: la frase della scheda dice gia' tutto, descrivere anche la foto aggiungerebbe rumore a chi legge con uno screen reader
- Prima al posto delle foto c'era un disegno astratto fatto da me, archi concentrici che riprendevano i raggi del marchio: **scartato** appena e' emerso che le foto giuste c'erano gia' in casa

⚠️ **L'indice e' `text-accent/90` maiuscolo e spaziato, non azzurro.** Il riferimento usa un verde chiaro; provato con `text-secondary`, che sul pannello della scheda fa **3,8:1** e non passa. Qui la distinzione la fanno peso e spaziatura, non il colore.

**Altro**

- `OVERLAY_ROUTES` ora comprende anche `/navigatore-sanitario`: il primo blocco e' scuro, quindi l'header ci va sopra trasparente
- Il pannello testate nell'hero e' stato messo e poi **tolto su richiesta**: resta solo in home
- ⚠️ `ClientsSection` e' montata qui e in home, ma **il footer ha `pt-28` su tutte le pagine**, anche dove il pannello non c'e'. Sulle altre rotte quello spazio resta vuoto: o si monta il pannello ovunque, o il padding va reso condizionale

**Passata sul mobile (14 settembre 2026)**

Partendo dalla home, misurata a 390x844.

| Sezione | Prima | Dopo |
|---|---|---|
| Pagina intera | 8563px | 8147px |
| Il fondo che paghi gia' | 444 | 380 |
| Coperture extra | 1337 | 1267 |
| La piattaforma | 2186 | 2030 |
| FAQ | 836 | 741 |
| Chiusura | 419 | 387 |

Nessuna modifica al desktop: sono tutti valori con prefisso `md:` o `lg:` che restano quelli di prima. Verificato dopo la passata che `PlatformSection` abbia ancora `128px` di padding e le celle `40px` di margine su desktop.

- ⚠️ Bersagli del tocco portati a **44px** dove erano sotto. Le righe delle FAQ restano abbondanti perche' l'area cliccabile e' tutta la riga
- ⚠️ **Eccezione: la pastiglia delle integrazioni su mobile e' alta 27px**, quindi sotto i 44px di bersaglio minimo. E' una scelta del cliente, che l'ha voluta molto piu' piccola. Da `md` in su i 44px tornano. Legenda e pastiglia stanno sulla stessa riga: 300px disponibili, alle misure del desktop la somma faceva 339, con corpo a 11px e padding stretto il totale scende sotto i 240
- ⚠️ **Nessuno scorrimento orizzontale**: verificato che `scrollWidth` sia esattamente 390. Gli elementi che sporgono sono solo i nastri, tutti dentro un `overflow-hidden`

**Il menu mobile e' un pannello a tutto schermo**

Era un elenco che appariva di colpo dentro l'header, senza animazione. Ora e' un pannello petrolio che copre lo schermo, con le voci in serif grande, numerate, e i filetti fra l'una e l'altra.

- ⚠️ **Il pannello resta montato e cambia stato.** Smontandolo l'uscita non si vedrebbe: sparirebbe di colpo. `hidden` lo toglie dall'albero solo quando anche l'uscita e' finita, con una coda di 450ms
- Le voci entrano **scaglionate**, 70ms l'una dall'altra. Verificato: a 120ms dall'apertura la prima e' a 0,38 di opacita' e le altre a 0, a 370ms sono a 0,99 / 0,98 / 0,92
- Il panino **diventa** la croce: due barrette che ruotano di 45 gradi in versi opposti, non un'icona che ne sostituisce un'altra
- ⚠️ Col menu aperto l'header usa **sempre** la versione chiara, qualunque sia la rotta: dietro c'e' il pannello petrolio e una barra crema ci si stamperebbe sopra come una fascia estranea
- Scroll del corpo bloccato mentre e' aperto, `Esc` chiude. Verificato che il blocco si tolga alla chiusura
- ⚠️ **Nel pannello la lingua e' un segmentato a due pastiglie**, non l'interruttore del desktop: quello ha il fondo chiaro, dentro una colonna si stirava a tutta larghezza e su petrolio si leggeva male
- `MobileNavItem` non serve piu' ed e' stato tolto

**`PressPanel` ha due rese, e non per capriccio**

In 358px di pannello il nastro orizzontale mostrava tre nomi tagliati a meta' dalla maschera, con l'etichetta sopra su una riga sua: sembrava rotto. Sotto `md` ora c'e' un **nastro verticale**, una testata per volta che scorre via verso l'alto ogni 2,4 secondi, con etichetta e nome sulla stessa riga. Il pannello e' passato da due righe a 58px di altezza.

- La lista e' ripetuta una volta in coda e il ritorno a zero avviene **a transizione spenta**, riaccesa al frame dopo: cosi' il giro e' continuo e non si vede la lista rimbalzare indietro. Verificata la sequenza completa: 0, -24, -48, -72, -96, -120, salto a 0, e riparte
- ⚠️ Le voci non visibili sono `aria-hidden` e fuori dal giro di tabulazione, duplicato di chiusura compreso
- ⚠️ Con `prefers-reduced-motion` il nastro **non parte**: resta fermo sulla prima testata. Verificato, dopo 3 secondi la trasformazione e' ancora a zero

⚠️ **Il marchio Trustpilot non si nasconde piu' sul mobile.** Era `hidden sm:flex`, e siccome l'etichetta del bottone finisce con «su», sul telefono si leggeva «Leggi tutte le recensioni su» e basta.

**`/coperture` rifatta (14 settembre 2026)**

| Sezione | Com'era | Com'e' |
|---|---|---|
| Hero | crema, testo a sinistra e immagine incorniciata a destra | fotografia a tutto campo, testo in una scatola petrolio |
| Assessment | fascia azzurra, titolo centrato, tre card | scatola azzurra su pagina bianca, titolo a sinistra, tre schede bianche |
| Esito | fascia petrolio, tutto centrato | scatola petrolio, tutto a sinistra, occhiello contornato |
| Chiusura | solo footer | pannello clienti che scavalca il footer |

⚠️ **Il testo dell'hero sta in una scatola.** La fotografia dei moduli e' luminosa, sono fogli bianchi: misurato, anche con un velo al 75% il crema sopra resta a **3,6:1** nel 5% peggiore. Per lo stesso motivo la pagina **non e' in `OVERLAY_ROUTES`**: l'header trasparente su quella fascia arriverebbe a 3,7:1. Header pieno, velo al 45% che serve solo a portare la foto nella palette.

⚠️ **Le CTA di questa pagina sono piu' strette di quelle di serie.** «PRENOTA UN ASSESSMENT GRATUITO» e' lunga trenta caratteri e alla misura normale la pastiglia diventava **412x44**, cioe' lunga nove volte la sua altezza: sembrava una barra, non un bottone. Corpo a 16px, padding a 24 e altezza a 48 la riportano a 351x48.

⚠️ **La scatola dell'esito ha il fondo piu' alto degli altri box.** Il pannello clienti si centra sul confine con il footer: senza quello spazio bianco finirebbe a cavallo del bordo della scatola petrolio invece che del footer. Stessa cosa su `/chi-siamo`, dove prima del pannello c'e' un distanziatore bianco esplicito.

**⚠️ Bug di `cn()`: i titoli su fondo scuro erano invisibili**

Trovato mentre il titolo di `CoverageExtraSection` non compariva. `cn()` passa per `tailwind-merge`, che **non legge `tailwind.config.ts`**: non riconoscendo `fluid-3xl` come un corpo, classificava `text-fluid-3xl` come **colore** e lo metteva in conflitto con `text-accent`, cancellandone una delle due.

```
twMerge('text-accent', 'text-fluid-3xl')  →  'text-fluid-3xl'   // il colore sparisce
twMerge('text-fluid-3xl', 'text-accent')  →  'text-accent'      // sparisce il corpo
twMerge('text-accent', 'text-2xl')        →  entrambe            // 2xl e' un corpo noto
```

In `SectionHeading` il corpo viene dopo il colore, quindi **il colore veniva sempre buttato** e il titolo ereditava `--foreground` dal body. Non se ne accorgeva nessuno perche' `--foreground` e `--primary` sono lo stesso identico HSL: su fondo chiaro il risultato era corretto per caso. Su `tone="light"` invece era petrolio su petrolio, cioe' **sette titoli illeggibili**: `PlatformSection`, `ClientsSection`, `CoverageExtraSection`, `SupportSection`, `BenefitsSection`, `/coperture` sezione 2, `/navigatore-sanitario` sezione valore.

Risolto in `src/lib/utils.ts` dichiarando i sette corpi fluidi a `tailwind-merge` con `extendTailwindMerge`. ⚠️ **Aggiungendo una taglia in `tailwind.config.ts` va aggiunta anche li'**, altrimenti il problema si ripresenta su quella. Vale per qualunque valore custom: `tailwind-merge` va tenuto allineato alla config a mano.

**Debito ancora aperto**
- `--hero-gradient` e `font-logo` (Bungee) ancora inutilizzati, e da oggi anche `--surface`, `--surface-deep` e `--press` (`--surface` e' stato ripreso dalle FAQ per mezza giornata e poi riscartato): li usavano solo la vecchia `StatementSection` e `PressSection`
- `sitemap.xml` da aggiornare (mancano `/coperture`, `/navigatore-sanitario`, `/giornate-di-prevenzione`)
- Loghi clienti reali da inserire al posto dei wordmark testuali
- Immagini pesanti non ottimizzate: `hero-cliniche-waiting.png` 2,4 MB, `why-welfare-image.jpg` 879 KB
- Meta SEO identici su tutte le rotte
- Refuso corretto rispetto al Canva: «senza raddioppiare prestazioni e costi» → «raddoppiare»
- Copy nuova da validare: `coperture.hero.subtitle` e `coperture.section1.title` (quest'ultima sostituisce «Analizziamo le coperture che hai già.», promossa a titolo di pagina)
- Copy nuova da validare sull'hero: `hero.subtitle`, `hero.bullet1/2/3`, `hero.ctaSecondary` (vedi sopra)
- Copy nuova da validare su Coperture extra: `home.coverageExtra.hint`
- La nota a mano e' scritta due volte nel DOM (sopra da `md`, sotto altrimenti): una delle due e' sempre `display:none`, quindi non e' letta due volte, ma resta una duplicazione
- `PressSection` non e' piu' montata: o si elimina il file o si trova dove rimetterla

---

## 15 bis. Cambio lingua: la pagina si sfoca e si rimette a fuoco

Da desktop, cambiando lingua la pagina **si sfoca a onde, sostituisce il testo mentre e' illeggibile e si rimette a fuoco**. Non e' un salto secco.

La regia dei tempi sta in `LanguageContext`, che mette `data-lingua-fase` sulla radice: `uscita` per 420ms, poi lo scambio del testo, poi `entrata` per 620ms. Il movimento sta tutto in `index.css`, agganciato a quell'attributo.

⚠️ **Niente variazioni di luminosita' su area grande: rischio fotosensibilita'.**

La prima versione faceva svanire le sezioni in **opacita'** e ci passava sopra una **banda crema a tutto schermo**: la pagina schiariva e tornava scura in meno di un secondo, su quasi tutto il viewport. E' il tipo di lampeggio che puo' innescare crisi in chi e' fotosensibile, e va evitato **a prescindere dalla frequenza**: la soglia delle tre volte al secondo e' un limite, non un permesso.

Ora si muovono **solo sfocatura e posizione**, che non cambiano la luminanza media dell'inquadratura. A 7px di sfocatura il testo e' gia' illeggibile, quindi lo scambio resta invisibile lo stesso: l'opacita' non serviva a niente.

**Misurato sui fotogrammi**, dodici scatti a 90ms l'uno per tutta la durata dell'effetto: luminanza media dell'inquadratura fra **0,2617 e 0,2648**, cioe' un'escursione dell'**1,2%**. La soglia di riferimento per il lampeggio parla di variazioni dal 10% in su su area grande: siamo a un ventesimo, e in una sola discesa, non in un impulso.

⚠️ Se un domani si rimette l'opacita' o una scia, **va rifatta questa misura**.

**Il resto**
- L'onda arriva da un `animation-delay` crescente per `nth-child`, 55ms a sezione: il cambio scende lungo la pagina. Serve anche a non avere mai l'intero schermo che cambia nello stesso istante
- ⚠️ Si anima la **sezione**, non ogni parola: sui discendenti, genitore e figlio applicherebbero entrambi la sfocatura e si sommerebbe
- Il testo cambia mentre e' sfocato. Verificato: a 200ms la sfocatura e' 4,8px e il titolo e' ancora in italiano; 200ms dopo e' inglese, ancora a 3,7px

⚠️ **Tre casi in cui l'effetto non parte affatto**, e il cambio e' istantaneo:
- stessa lingua
- `prefers-reduced-motion`. Verificato: nessuna fase, testo gia' cambiato
- **sotto i 1024px**: su un telefono costa caro in resa e si vede poco, e li' lo switch sta comunque dentro il menu a tutto schermo. Verificato: nessuna fase

I timer vengono azzerati a ogni nuovo cambio e alla smontata del provider: cliccando due volte di fila non restano fasi appese.

---

## 16. Motion system

Il movimento è una parte del design system, non un effetto per sezione. Tre soli meccanismi.

### 1. `Reveal` — ingresso allo scroll

`src/components/Reveal.tsx`. Un `IntersectionObserver` per istanza, one-shot.

| Prop | Default | Note |
|---|---|---|
| `direction` | `up` | `up` · `down` · `left` · `right` · `scale` · `fade` — offset di 40px, `scale` parte da 0.95 |
| `delay` | `0` | ms, per scaglionare gli elementi di un gruppo |
| `duration` | `700` | ms |
| `threshold` | `0.15` | `0` per gli elementi above the fold |
| `as` | `div` | l'elemento renderizzato |

**Regola d'uso:** un solo elemento animato per istanza. Se il figlio ha già una transizione propria (`hover:shadow-soft`), `Reveal` va usato come *wrapper* e non come elemento stilizzato — altrimenti `transition-[opacity,transform]` e `transition-shadow` si sovrascrivono.

⚠️ `Reveal` non inoltra `ref` né props arbitrarie: **non usarlo come figlio `asChild` di una primitiva Radix**, perderebbe `data-state` e con esso lo styling degli stati.

### 2. Curve e keyframes

| Token | Valore | Uso |
|---|---|---|
| `ease-reveal` | `cubic-bezier(0.22, 1, 0.36, 1)` | Ingressi: parte deciso, si posa |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-rimbalzo di icone e badge |
| `animate-float` | `float 7s ease-in-out infinite` | Oscillazione continua di ±14px (immagine hero) |
| `animate-marquee` | `marquee 40s linear infinite` | Logo wall in loop |

⚠️ Le curve **devono** stare in `transitionTimingFunction` nel config: `ease-[cubic-bezier(...)]` come valore arbitrario inline non viene compilato da Tailwind in questo progetto.

### 3. Scaglionamento

Il ritardo cresce con l'indice, tra 90 e 140 ms per passo. Gruppi noti:

| Gruppo | Passo |
|---|---|
| Hero (titolo → testo → CTA) | 140 ms |
| Card piattaforma | 130 ms, dopo 200 ms di attesa |
| Righe comparativo | 130 ms per riga, 70 ms per colonna |
| Testimonial | 120 ms, alternando `right` e `left` |
| FAQ | 100 ms |
| Lista "Un benefit che viene usato davvero" | 140 ms, dopo 180 ms |

### Immagini incorniciate

`src/components/FramedImage.tsx` — bordo `border-[3px] border-primary` su `rounded-[2rem]`, con un blocco pieno sfalsato di 12px (16px da `md`) dietro. Prop `accent`: `primary` (default) · `highlight` · `secondary-strong`.

Prop `fit`, da scegliere in base a cosa contiene l'immagine:

| `fit` | Comportamento | Quando |
|---|---|---|
| `cover` (default) | Riempie un contenitore di altezza fissa e ritaglia quello che avanza | Foto: il soggetto regge un ritaglio |
| `natural` | L'immagine tiene le sue proporzioni, il contenitore la segue | **Screenshot di prodotto**, sempre |

⚠️ **Non usare `cover` sugli screenshot.** I quattro screenshot della piattaforma hanno rapporti diversi (1.500, 1.625, 1.625, 1.783): dentro un contenitore a proporzione fissa `object-cover` mangia titoli e pulsanti. Sulla home, dove la griglia ha bisogno di riquadri uguali, si usa `aspect-[16/9]` con `object-contain` su passe-partout crema, così il riquadro resta uniforme ma l'immagine non viene tagliata.

### Micro-interazioni

- **Card**: `hover:-translate-y-1.5` + `shadow-card → shadow-soft`
- **Chip icona** (piattaforma): scala 1.1 e si riempie di `primary` all'hover della card
- **Screenshot** (piattaforma): zoom a 1.04 dentro il contenitore `overflow-hidden`
- **Badge FAQ**: da `bg-secondary` a `bg-primary` in apertura, via `group-data-[state=open]`
- **Apertura FAQ**: i keyframes `accordion-down` / `accordion-up` animano altezza **e** opacità in `cubic-bezier(0.22, 1, 0.36, 1)` (380/300 ms); il testo interno scorre da `-translate-y-2` con 100 ms di ritardo, e la card aperta prende un `ring-1 ring-primary/15`
- **Language switcher**: voce unica che alterna IT/EN a ogni click — bandiera che scala in `ease-spring`, icona di scambio che ruota di 180°
- **CTA primaria**: sollevamento di 2px, alone `primary/60` e riflesso che attraversa il bottone
- **Icone comparativo**: entrano in `ease-spring` da `scale-50 -rotate-45`
- **Numeri comparativo**: `AnimatedNumber` conta il primo numero del testo da 0 in 1200 ms

### Accessibilità

`useReducedMotion` (`src/hooks/use-reduced-motion.tsx`) legge `prefers-reduced-motion`. Con la preferenza attiva `Reveal` rende il contenuto già visibile a durata 0 e `AnimatedNumber` mostra il valore finale; marquee e float sono neutralizzati da `motion-reduce:animate-none` e `motion-safe:`.

### Elementi globali

- `ScrollProgress` — barra di avanzamento `h-1 bg-primary` fissa in cima, animata via `transform: scaleX()` con `requestAnimationFrame`
- `ScrollToTopOnNavigate` — riporta in cima a ogni cambio rotta, salta gli URL con hash
- `ScrollToTop` — il FAB ora entra in dissolvenza e scala, con `pointer-events-none` e `tabIndex={-1}` quando è nascosto

### Componenti condivisi del sistema

| Componente | Ruolo |
|---|---|
| `Reveal` | Ingresso allo scroll — vedi sopra |
| `CtaButton` | CTA primaria: sollevamento, alone e riflesso. Default `CALENDAR_CTA_URL` |
| `FramedImage` | Immagine con bordo marcato e blocco sfalsato dietro |
| `SectionHeading` | Titolo di sezione con filetto tricolore, `size` e `align` |
| `AnimatedNumber` | Conteggio del primo numero di una stringa |
| `ScrollProgress` | Barra di avanzamento lettura |
| `ScrollToTopOnNavigate` | Reset dello scroll al cambio rotta |

### Risolto: il logo con lo sfondo cotto

`logo.png` era **RGB senza canale alpha**, con il bianco cotto dentro, e `Logo.tsx` lo nascondeva con `mix-blend-mode: multiply`. Quel trucco aveva due difetti:

1. si rompeva dentro qualunque contesto di impilamento, e `Reveal` ne crea sempre uno perche' applica `will-change` e `transform`: il bianco ricompariva
2. rendeva **inservibile la variante bianca**: `brightness(0) invert(1)` su uno sfondo opaco annerisce tutto e poi lo inverte, producendo un rettangolo bianco pieno

Sostituito da `logo-transparent.png`, generato dall'originale calcolando l'alpha come distanza dal bianco e smontando la premoltiplicazione. Ora `Logo.tsx` non usa piu' alcun blend, e `variant="white"` funziona davvero: serve per l'header sovrapposto all'hero.

Stessa procedura usata per il marchio Mamazen e per il ritaglio Growens.

### Insidia nota

`AnimatedNumber` memoizza `text.match(...)`: `String.prototype.match` restituisce un array nuovo a ogni render e, se usato come dipendenza di `useEffect`, fa ripartire il conteggio all'infinito. Il numero resta a scatti e non si stabilizza mai. Vale per qualunque effetto che dipenda da un risultato di regex.

---

## 17. Da riprendere — 1 settembre 2026

Stato alla chiusura del 31 agosto: `tsc --noEmit` pulito, `vite build` verde, 7 rotte a 200, parità i18n **275 chiavi** su IT ed EN.

⚠️ **`npx tsc --noEmit` da solo non controlla niente, e dice sempre che va tutto bene.** `tsconfig.json` ha `"files": []` e due `references`: senza `--build` TypeScript compila la lista vuota ed esce 0 anche con un identificatore inesistente in `src`. Scoperto il 14 settembre, con un `CURSOR_HAPPY` mai definito che passava il controllo e si schiantava solo a schermo.

I comandi veri sono:

```
npx tsc -p tsconfig.app.json --noEmit    # il sito
npx tsc -p tsconfig.node.json --noEmit   # la config di Vite
```

`vite build` non copre il buco: esbuild toglie i tipi senza verificarli, quindi la build resta verde lo stesso.

### In attesa di una tua conferma

| Cosa | Dove | Nota |
|---|---|---|
| ~~Loghi clienti reali~~ | risolto | Tutti e sette installati in `src/assets/clients/`. `ClientsSection` li risolve da sola con `import.meta.glob`: basta il nome file uguale allo `slug` in `constants.ts`. Trattamento monocromatico con `brightness-0`, quindi **servono file con sfondo trasparente** |
| Prezzo su `PricingSection` | `pricing.annual.price` | Era 30 € riferito alle sole giornate di prevenzione, l'ho portato a ~250 € su tua indicazione «ovunque». Potrebbero essere due offerte diverse. Il componente non è montato su nessuna pagina, quindi il cambio è per ora inerte |
| Copy hero di `/coperture` | `coperture.hero.subtitle` | Scritta da me, mai validata |
| Titolo sezione `/coperture` | `coperture.section1.title` | Era «Analizziamo le coperture che hai già.», promossa a `h1` della pagina; la sezione ha preso «Cosa guardiamo nell'assessment» |
| ~~Concierge vs Consulente~~ | risolto il 17 settembre 2026 | Il cliente ha chiesto **«Consulente» ovunque**: in `it.json` non c'e' piu' nessun «Concierge». In `en.json` e' diventato **«Advisor»**, perche' «Consulente» in inglese non si puo' lasciare. ⚠️ Se l'inglese deve tenere «Concierge», si cambia solo `en.json` |

### Debito tecnico ancora aperto

- `sitemap.xml` non allineata: mancano `/coperture`, `/navigatore-sanitario`, `/giornate-di-prevenzione`
- Immagini non ottimizzate: `hero-cliniche-waiting.png` 2,4 MB e `why-welfare-image.jpg` 879 KB, entrambe sopra la piega. Nessun WebP, nessun `srcset`
- Meta SEO identici su tutte le rotte: la SPA non cambia `<title>` né description per pagina
- `--hero-gradient` e `font-logo` (Bungee) definiti e mai usati
- `src/App.css` è un residuo del template Vite, non importato da nessuno: eliminabile
- `.asset.json` di Lovable ormai orfani (`image-4/5/6`, `concierge-chat`): le immagini sono state scaricate in `src/assets/platform-*.png`

### Prima di pubblicare su Lovable

Rileggere § 12. In sintesi: non toccare `componentTagger()`, la porta 8080 in `vite.config.ts`, `components.json`, `src/components/ui/**` e gli script GTM, Clarity e meta Facebook in `index.html`. Verificare che `npm run build` passi, poi Share → Publish.

## 18. Fotografie nuove del cliente — 17 settembre 2026

Il cliente ha aggiunto la cartella **`public/Assets sito/`** e ci mette le immagini buone. E' la cartella sorgente, non quella servita: da li' ricavo una copia **WebP ridimensionata** in `src/assets/` e sono quelle che il sito importa. Cosi' la pagina resta leggera e l'originale resta intatto. ⚠️ Quando il cliente sostituisce un file in quella cartella **la copia in `src/assets/` va rifatta**, altrimenti il sito continua a mostrare la vecchia.

| Sorgente in `public/Assets sito/` | Copia usata dal sito | Peso | Dove |
|---|---|---|---|
| `Chatbot pic.png` (1496×680, 100 KB) | `platform-search.webp` 1496×680, senza perdita | 25 KB | Home «La piattaforma» 01, «Come funziona» 01 |
| `Consulente sanitario WA.png` (1908×1404, 878 KB) | `platform-concierge.webp` 1200×883, q93 | 136 KB | Home «La piattaforma» 02, «Come funziona» 02 |
| `Sezione prevenzione.png` (2298×1256, 338 KB) | `platform-prevention.webp` 1400×765, q95 | 57 KB | Home «La piattaforma» 03, «Come funziona» 03 |
| `Hero.jpg` (4025×6075, 2,6 MB) | `hero-home.webp` 1500×1902, q78, ritagliata all'8–92% dell'altezza | 206 KB | Hero della home |
| `Hero come funziona.jpg` (2550×1664, 1,3 MB) | `hero-come-funziona.webp` 1800×1175, q80 | 79 KB | Hero di `/navigatore-sanitario` |
| `Altre immagini stock (2).jpg` (4067×2997, 949 KB) | `valore-welfare.webp` 1400×1032, q80 | 82 KB | «Come funziona», scheda valore 01 |
| `Altre immagini stock (1).jpg` (5760×3840, 659 KB) | `tempo-liberato.webp` 1400×933, q80 | 35 KB | «Come funziona», scheda valore 02 |

Le tre schermate di prodotto sono state cambiate **anche sulla pagina «Come funziona»**, che monta le stesse tre voci: lasciarle diverse avrebbe mostrato due prodotti.

### Hero della home: il velo e' piu' denso di prima

La fotografia e' un muro azzurro molto chiaro con chiazze quasi bianche. Misurato: sui pixel a 255 servono **almeno 82 punti di velo** per tenere il bianco a 4,5:1. Il velo vecchio (`/80 → /70 → /45`, tarato sulla foto precedente) qui dava 2,9:1 sul mobile.

- Da `md`: `bg-gradient-to-r from-primary/90 via-primary/85 via-55% to-primary/50`. Misurato sulle righe di testo: **5,8:1 mediano, 5,1:1 minimo**
- Sotto `md` il testo occupa tutta la larghezza, quindi il velo **scende dall'alto**: `bg-gradient-to-b from-primary/90 via-primary/85 via-70% to-primary/55`. Pieno dove stanno testo e bottoni, aperto in fondo, cosi' la fotografia si vede almeno sotto. Misurato: **5,6:1 mediano, 5,3:1 minimo**
- ⚠️ Con un velo cosi' denso il soggetto sul mobile si intravede appena. E' il prezzo del testo bianco a tutta larghezza su un muro chiaro: per rivederlo servirebbe una scatola di testo come su «Come funziona»
- ⚠️ **Le opacita' vanno di cinque in cinque.** `via-primary/86` e `to-primary/78` non sono nella scala di Tailwind: non generano nessuna regola e il velo resta a meta' **senza nessun errore**. Era successo: il gradiente andava da `/90` a trasparente e il contrasto sul mobile era crollato a 1,5:1

### Hero di «Come funziona»: soggetto a sinistra, scatola a destra

La fotografia nuova ha l'uomo fra il 22% e il 42% della larghezza, quindi la scatola del testo e' passata **a destra** (`md:ml-auto`). Il ritaglio:

- `object-top` da `md`: la fascia visibile e' l'80% centrale e un ritaglio centrato mangerebbe la testa
- `object-[22%_top]` sotto `md`: li' si vede solo il 36% della larghezza e un ritaglio centrato mostrerebbe le sedie vuote
- ⚠️ `pt-52` sotto `md` (era `pt-32`): la scatola prende quasi tutta la larghezza e con lo stacco vecchio finiva **sulla faccia** del soggetto, che nel ritaglio verticale sta fra 77 e 192 pixel. Con 208 di stacco la faccia resta sopra la scatola
- Il velo resta `bg-primary/35`: il testo ha la sua scatola e non gli serve altro

### Altri due ritocchi dello stesso giro

- **Recensioni**: sotto al titolo non c'e' piu' niente. Le stelle di riepilogo erano l'ultimo pezzo rimasto dopo punteggio e giudizio, tolte anche quelle. Le stelle restano **dentro le schede**, dove sono il voto di quella recensione
- **FAQ**: la prima domanda parte aperta (`defaultValue={FAQ_KEYS[0]}`). Resta `collapsible`, quindi si puo' richiudere. Vale anche su «Chi siamo», che monta lo stesso componente

### Schede valore di «Come funziona»: un ritaglio per scheda

Le due schede basse hanno una striscia molto larga (596×144 da desktop, cioe' 4,1:1) e un ritaglio centrato ci mostra solo la fascia centrale dell'originale. Per questo `VALUE_CARDS` porta un campo **`focus`**, applicato con `cn()` sull'immagine:

- **01 valore percepito**, ritratto in studio: `object-[50%_12%]`. La faccia nell'originale sta fra l'8% e il 42% dell'altezza, un ritaglio centrato inquadrava il raccoglitore
- **02 tempo perso**, ragazza che si stira: e' la scheda alta (596×474), il ritaglio centrato va bene
- **03 cultura della prevenzione**: e' rimasta `problem-screening.jpg`, i due medici

⚠️ La pila di moduli (`problem-fondi-sanitari.jpg`) e' uscita dalla pagina: stava sulla 02 e il cliente ci ha voluto la foto nuova. Il file resta in `src/assets/` ma non lo usa piu' nessuno.

⚠️ `public/Assets sito/` sta dentro `public/`, quindi **gli originali finiscono anche nella build** (8,6 MB che nessuno scarica ma che vengono pubblicati). Se dà fastidio, la cartella va spostata fuori da `public/`, per esempio in `assets-sorgente/` alla radice: il sito non la importa, quindi non si rompe niente.

## 19. Inquadrature degli hero e schede valore senza foto — 17 settembre 2026

### Le due fotografie hanno la tela allargata a specchio

Il problema: con `object-cover` in un riquadro largo, la fotografia sta dentro per larghezza e la posizione orizzontale del soggetto **non si puo' spostare**, ne' con `object-position` ne' allargando l'immagine, perche' ogni spostamento costa altezza e taglia il soggetto. Misurato sulla home: per portare la ragazza dal 53% al 68% servivano 27 punti di larghezza in meno, che le tagliavano pugni e piedi.

Soluzione: **estendere la tela con una copia specchiata** del bordo, prima di ridimensionare. Alla giunzione le due colonne coincidono, quindi la cucitura e' continua per costruzione e resta invisibile.

- **Home** (`hero-home.webp`, 1800×1619, 214 KB): 1650px di muro specchiato aggiunti **a sinistra**, la ragazza passa dal 53% al 67% della larghezza. ⚠️ 1650 e non di piu': lei comincia a 1730px e uno specchio piu' largo ne copiava un pezzo, che ricompariva come fantasma sul bordo sinistro
- **Come funziona** (`hero-come-funziona.webp`, 2200×996, 84 KB): 1124px di sedie specchiate aggiunti a un lato e poi **tutta la fotografia specchiata**, cosi' l'uomo finisce al 78% della larghezza, cioe' a destra, e la scatola del testo torna a sinistra come nel resto del sito. Le sedie sono tutte uguali, quindi la fila allungata si legge come una fila normale
- Contrasto del testo bianco sulla home ricontrollato dopo il cambio: **5,7:1 mediano, 5,25:1 minimo** fra desktop e mobile

L'uomo di «Come funziona» cade a meta' dello spazio libero fra la scatola del testo e il bordo destro, con un solo `object-[78%_top]` valido a tutte le larghezze: misurato 1195 contro 1196 a 1536, 1120 contro 1121 a 1440, 995 contro 996 a 1280, 795 contro 797 a 1024. ⚠️ A 768 lo spazio libero e' 168px e non ci sta: li' resta appoggiato al bordo della scatola, ed e' comunque meglio del ritaglio centrato, che a quella larghezza lo porterebbe **fuori dallo schermo**.

### Schede valore di «Come funziona»: niente fotografie

Le tre voci sono ora tre schede uguali, `md:grid-cols-3`, con il numero grande in `font-display` al posto dell'immagine e un filetto corto da 48px a fare da stacco.

⚠️ La griglia asimmetrica con le foto (due strisce alte 144px piu' una scheda alta) e' stata **tolta su richiesta**: in una striscia cosi' bassa ogni fotografia usciva schiacciata. Non rimetterla.

`valore-welfare.webp` e `tempo-liberato.webp` restano in `src/assets/` ma non li usa piu' nessuno: erano nate per quelle schede. Non pesano sul build, che impacchetta solo i file importati.

### Coperture extra: via anche la riga d'istruzioni

«Tocca per togliere o rimettere le integrazioni» e' stata **tolta** (18 settembre 2026): faceva confusione invece di aiutare. La chiave `home.coverageExtra.hint` e' uscita da tutti e due i file di lingua, la parita' scende a 287.

⚠️ Non rimetterla: la pastiglia si vede gia' che e' un comando (bordo, spunta, sollevamento al passaggio) e porta `aria-pressed`, quindi lo stato resta leggibile anche con uno screen reader. E' la quarta cosa tolta da questa sezione dopo il cursore a faccina, l'etichetta che seguiva il mouse e il fumetto agganciato al bottone.
