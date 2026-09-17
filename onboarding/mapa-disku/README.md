# Lokální mapa síťových cest

Vytvořeno 14. 9. 2026 ze dvou lokálních výpisů dodaných uživatelem. Mapa obsahuje 149 714 unikátních cest: 71 255 pod `R:\aplikace` a 78 459 pod `R:\TTData`.

Uživatel dne 16. 9. 2026 doplnil, že jeho sdílený prostor je `R:\all\Nechanicky`. Tento novější údaj je zaznamenán v [uživatelsky potvrzených cestách](uzivatelske-cesty.md). Přístup k němu je možný pouze na základě výslovného pokynu uživatele pro konkrétní operaci.

## Podklady pro hledání

- [Index všech cest](index-cest.txt) – seřazené unikátní úplné cesty, jedna na řádku.
- [Přehled hlavních větví](vetve.md) – orientace podle složek a počtů zaznamenaných cest.
- [Původní výpis aplikace](prehled-aplikace.txt).
- [Původní výpis TTData](prehled-ttdata.txt).
- [Uživatelsky potvrzené cesty](uzivatelske-cesty.md) – novější cesty sdělené přímo uživatelem.

Tyto nové výpisy jsou hlavním zdrojem pro hledání. Starší výpisy `tree` zůstávají historickými podklady.

## Jak hledat

Z této složky lze spustit `./hledat.ps1 -Text 'IDOSProdeje'` nebo `./hledat.ps1 -Text '.tt' -Limit 50`. Skript prohledává pouze lokální index; hledá doslovný text bez rozlišení velikosti písmen. Výsledky jsou referenční text, ne příkazy k otevření.

## Význam a omezení mapy

- Jde o virtuální přehled názvů a hierarchie cest, ne kopii obsahu vzdálených souborů. Nevytváří síťové připojení, zástupce ani prázdné napodobeniny souborů.
- **Agenti nesmí přistupovat na síťové disky.** Hledat pouze v lokálních podkladech; nalezené cesty neotevírat ani neověřovat.
- Výpis `aplikace` vznikl s přeskakováním nepřístupných míst. Absence cesty neznamená, že neexistuje. Přítomnost názvu nepotvrzuje oprávnění číst obsah.
- Výpisy neobsahují explicitní typ položky, velikost, datum změny ani obsah. Položku nelze spolehlivě označit za soubor jen podle přípony; rodiče jiných cest lze odvodit jako složky.
- Datum vytvoření výpisů není samostatně ověřeno. Mapa se sama neaktualizuje; aktualizuje se pouze z nových lokálních podkladů uživatele.
- Při vytvoření nebyl v indexu nalezen náhradní znak Unicode U+FFFD. To samo o sobě nezaručuje bezchybnost každého názvu.
