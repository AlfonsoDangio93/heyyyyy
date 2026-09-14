/** Unico punto di verità per i link esterni ricorrenti. */
export const CALENDAR_CTA_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1GLSKlrwJgx6uM5nQ6Lf7KDSc5JNMAoIS7EFmemPS7r4B1Uz4H5UVAxC18lgblK0c8z5RwaRoM";

export const LOGIN_URL = "https://my.heylucy.it/";

/** Testate che hanno parlato di HeyLucy. Con `url` valorizzato diventano link. */
export const PRESS = [
  {
    name: "Corriere Nazionale",
    url: "https://www.corrierenazionale.it/2025/11/04/la-salute-aziendale-a-portata-di-clic-mamazen-presenta-lucy/",
  },
  { name: "Tecno Medicina", url: "https://www.tecnomedicina.it/mamazen-presenta-lucy/" },
  {
    name: "Forme",
    url: "https://www.forme.online/2025/11/24/lucy-la-piattaforma-per-usare-meglio-il-welfare-sanitario/",
  },
  {
    name: "Rassegna Business",
    url: "https://www.rassegnabusiness.news/lucy-nuova-piattaforma-welfare-aziendale/",
  },
  {
    name: "Focus eCommerce",
    url: "https://www.focusecommerce.it/la-salute-aziendale-a-portata-di-clic-nasce-la-startup-lucy-252458/",
  },
];

/**
 * Clienti mostrati in home. `slug` è il nome del file logo atteso in
 * `src/assets/clients/`: lasciando lì `qonto.svg` il logo compare da solo,
 * senza toccare il codice. Finché il file manca viene reso il nome testuale.
 *
 * `scale` ritocca il singolo logo rispetto alla misura comune: serve perché
 * marchi con proporzioni molto diverse non pesano uguale a parità di ingombro.
 * 1 = misura piena.
 *
 * `tone` è l'opacità del singolo logo. Il campo resta per cliente perché la
 * densità di inchiostro dei marchi, misurata sui file, va dal 17% di Sevat
 * Group al 37% di Caffeina: se serve riequilibrare il peso percepito si
 * ritocca il singolo valore. Al momento sono tutti a 0.56 per scelta: fascia
 * volutamente discreta, i loghi restano sullo sfondo e non competono.
 */
export const CLIENTS = [
  { slug: "qonto", name: "Qonto", scale: 0.85, tone: 0.56 },
  { slug: "caffeina", name: "Caffeina", scale: 0.92, tone: 0.56 },
  { slug: "santeria", name: "Santeria", scale: 1, tone: 0.56 },
  { slug: "sevat-group", name: "Sevat Group", scale: 0.92, tone: 0.56 },
  { slug: "synesthesia-group", name: "Synesthesia Group", scale: 0.92, tone: 0.56 },
  { slug: "mamazen", name: "Mamazen", scale: 0.92, tone: 0.56 },
  { slug: "growens", name: "Growens", scale: 0.92, tone: 0.56 },
];

/**
 * Scheda Trustpilot di HeyLucy, letta il 14 settembre 2026.
 * ⚠️ Sono numeri che cambiano da soli: vanno riallineati quando arrivano
 * recensioni nuove, altrimenti il sito dichiara un punteggio che non c'e' piu'.
 */
export const TRUSTPILOT = {
  url: "https://it.trustpilot.com/review/heylucy.it",
  score: "4,2",
  count: 6,
  fiveStarShare: "100%",
  /** Verde del marchio Trustpilot: non e' un colore della nostra palette. */
  green: "#00b67a",
};

/**
 * Le sei recensioni pubblicate su Trustpilot, trascritte alla lettera.
 *
 * ⚠️ Non correggere il testo, nemmeno i refusi: sono parole di clienti veri e
 * riscriverle cambierebbe una recensione. `title` e' vuoto dove Trustpilot
 * mostra solo la prima riga del corpo troncata, che non e' un vero titolo.
 * `invited` marca la recensione raccolta su invito, come la marca Trustpilot.
 */
export const REVIEWS = [
  {
    name: "Alberto Alaimo",
    date: "3 set 2026",
    rating: 5,
    title: "",
    body: "Mi affido regolarmente a heylucy per supporto all'utilizzo della mia polizza, ilTeam è professionale, gentilissimo e pronto a risolvere immediatamente i problemi.",
    invited: false,
  },
  {
    name: "Benedetta",
    date: "2 set 2026",
    rating: 5,
    title: "E pensare che non sapevo nemmeno di avere un fondo sanitario",
    body: "Con questo servizio negli ultimi 6 mesi ho potuto fissare 2 visite mediche con grande facilità e una spesa irrisoria. Devo ammettere che inizialmente non avevo colto quanto potesse essere utile, ma l'efficienza del servizio, la semplicità delle comunicazioni e la oggettiva utilità del pacchetto di prevenzione hanno facilitato moltissimo la prenotazione delle visite. Molto contenta e soddisfatta.",
    invited: true,
  },
  {
    name: "Giulia Bruno",
    date: "1 set 2026",
    rating: 5,
    title: "Ottimo servizio",
    body: "Ottimo servizio! Gentili, competenti e molto disponibili. Mi hanno aiutata in situazioni complesse con una cura e un' attenzione davvero straordinarie.",
    invited: false,
  },
  {
    name: "Camilla",
    date: "31 ago 2026",
    rating: 5,
    title: "Ottimo servizio",
    body: "",
    invited: false,
  },
  {
    name: "Elena Daffara",
    date: "24 mar 2026",
    rating: 5,
    title: "Professionalità e velocità!!!!!",
    body: "I referenti di HeyLucy hanno risposto tempestivamente a ogni mia domanda, trovando in pochissimo tempo la soluzione a una mia richiesta.",
    invited: false,
  },
  {
    name: "Carlotta Mastrantonio",
    date: "24 mar 2026",
    rating: 5,
    title: "è andato tutto bene",
    body: "è andato tutto bene, veloci e professionali.",
    invited: false,
  },
];
