# Dítě – dynamické pole pro zadání věku

- ID: VY-ANDROID-004
- Přijato: 15. 9. 2026; čas ze snímku: 11:24.
- Zdroj: screenshot a komentář uživatele.
- Aplikace: Vy; platforma: Android.
- Krok: Přidání dítěte a výzva k zadání věku.
- Originál: [2026-09-15_004_dite-pole-pro-vek.jpg](2026-09-15_004_dite-pole-pro-vek.jpg).

## Přímo viditelné

- Zvolen 1x **Adult** a 1x **Child/youth**.
- Po nastavení počtu dítěte na 1 se karta rozbalí a zobrazí:
  - Vysvětlující text: *Different companies impose different age limits on their child tickets. Please enter your age to be shown the correct price.*
  - Tmavé vstupní pole: **Age**.
- Ostatní kategorie (Student, Senior, Military) zůstávají sbalené na hodnotě 0.
- Dole tlačítko **Save**.

## Pozorování a hodnocení uživatele

Uživatel zdůrazňuje přehlednost a jednoduchost: opět se zde používá přímé zadání věku.

## UX interpretace a inspirace pro IDOS – hypotéza

- Progresivní odhalování (progressive disclosure): pole pro věk se zobrazí až v momentě, kdy uživatel kategorii reálně zvolí (počet > 0). Nezatěžuje formulář zbytečnými vstupy předem.
- Transparentní zdůvodnění: aplikace přímo vysvětluje *proč* věk potřebuje (různí dopravci mají odlišné věkové hranice pro děti). To snižuje nedůvěru uživatele.

## Otázky k ověření

- Co se stane, pokud uživatel klikne na Save bez vyplnění věku? Bude pole označeno červeně, nebo se použije výchozí hodnota?
