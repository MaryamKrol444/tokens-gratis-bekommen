# TokenKompass — Stripchat-Tokens-Ratgeber

Responsywna, statyczna strona informacyjna w języku niemieckim, przygotowana z myślą o GitHub Pages. Projekt nie wymaga frameworka, bundlera ani instalowania zależności. Treść jest obecna w HTML, więc może być indeksowana bez renderowania po stronie klienta.

## Struktura

- `index.html` — kompletna strona, treść poradnika, meta SEO, canonical i JSON-LD.
- `styles.css` — responsywny wygląd oraz obsługa prefers-reduced-motion.
- `script.js` — menu mobilne, kalkulator ceny i pasek CTA zapamiętywany w bieżącej sesji.
- `assets/site-config.js` — centralna konfiguracja linków do oficjalnej witryny i zewnętrznych ofert.
- `assets/social-card.png` — grafika Open Graph / Twitter Card (1200 × 630).
- `robots.txt`, `sitemap.xml` — podstawowe pliki indeksowania.
- `.nojekyll` — publikowanie statycznych plików bez przetwarzania Jekyll.

## Podgląd lokalny

W katalogu głównym repozytorium uruchom:

```bash
python3 -m http.server 8080
```

Następnie otwórz `http://localhost:8080/`. Serwer służy tylko do podglądu statycznych plików; nie ma osobnego procesu kompilacji.

## Publikacja w GitHub Pages

1. Przed publikacją uzupełnij placeholdery `Impressum`, `Datenschutz` i `Kontakt`, zweryfikuj charakter linków partnerskich oraz aktualność ich adresów. Potwierdź też politykę prywatności dla osadzonego filmu i treści wymagane prawem w kraju publikacji.
2. Sprawdź, czy adres canonical, adresy Open Graph, `robots.txt` i `sitemap.xml` odpowiadają docelowemu repozytorium. Obecnie ustawiono `https://maryamkrol444.github.io/tokens-gratis-bekommen/`.
3. Po zaakceptowaniu zmian opublikuj je w gałęzi skonfigurowanej dla GitHub Pages. W tym repozytorium źródłem powinien być katalog główny gałęzi publikacyjnej (np. `main`): **Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/(root)` → Save**. Zmiany z gałęzi roboczej należy najpierw włączyć do wybranej gałęzi publikacyjnej zgodnie z procesem repozytorium.
4. Poczekaj na zakończenie wdrożenia GitHub Pages i sprawdź adres strony oraz pliki `/robots.txt` i `/sitemap.xml`.
5. W Google Search Console zweryfikuj właściwość i prześlij mapę witryny: `https://maryamkrol444.github.io/tokens-gratis-bekommen/sitemap.xml`. Weryfikacyjny meta tag GSC jest już w `<head>`; pozostaw go, jeśli odpowiada właściwości.

## Aktualizacja adresów ofert

Zmień adresy w jednym miejscu: `assets/site-config.js` w obiekcie `window.TOKEN_SITE_CONFIG`. Linki zewnętrzne są w widocznym interfejsie oznaczone jako „Werbelinkung” i otwierane w nowej karcie po włączeniu JavaScript. Bez JavaScriptu przyciski prowadzą do odpowiednich sekcji tej samej strony.

Ceny, promocje, metody płatności ani działające kody nie są zakodowane na stałe — czytelnik jest kierowany do oficjalnego procesu zakupu, który należy sprawdzić w chwili podejmowania decyzji.
