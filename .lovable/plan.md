1. **Aggiungere il meta-tag di verifica Facebook** al file `index.html` all’interno della sezione `<head>` (subito dopo gli altri meta-tag esistenti):
```html
<meta name="facebook-domain-verification" content="jeh63pt6eky15n5hvauklg9q648af0" />
```
2. **Verificare che il build passi** senza errori prima di pubblicare.
3. **Pubblicare il sito** tramite il flusso Lovable (previo controllo eventuali critical security findings).
4. **Verificare il meta-tag sulla home pubblicata** recuperando il sorgente HTML di `https://heylucy.it/` e controllando che il tag sia presente nella `<head>`.