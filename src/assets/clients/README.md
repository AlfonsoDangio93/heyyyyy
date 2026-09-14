# Loghi clienti

Lasciare qui un file per cliente, nominato con lo `slug` che si trova in
`src/lib/constants.ts`:

    qonto.svg
    caffeina.svg
    santeria.svg
    sevat-group.svg
    synesthesia-group.svg
    mamazen.svg
    growens.svg

Formati accettati: `.svg` (preferito), `.png`, `.webp`.

`ClientsSection` li raccoglie da sola con `import.meta.glob`: non serve
importarli né modificare il componente. Finché un file manca, al suo posto
viene reso il nome testuale, quindi la sezione non si rompe mai.

**Preparazione dei file.** I loghi vengono resi monocromatici via CSS
(`brightness-0`), che azzera il colore mantenendo la trasparenza. Quindi
servono file **con sfondo trasparente**: un PNG con il bianco cotto dentro
diventerebbe un rettangolo nero. Vale la stessa insidia documentata al § 16
del design system per `logo.png`.
