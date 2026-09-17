# ČD / cd.cz – web, přihlášený uživatel

Zápis: 15. 9. 2026. Zdroj: dva snímky a popis uživatele; bez samostatného testu webu. Originály zachovány a kopie ověřeny SHA-256.

## Zjištění

- Podle uživatele se po přihlášení automaticky vybere jeho uložený cestující. Snímek ukazuje pojmenovanou osobu s IN 25.
- Dialog obsahuje pojmenované oblíbené osoby s plnými hvězdami a typové kombinace s obrysovými hvězdami. Nápověda popisuje vytvoření oblíbeného kliknutím na hvězdičku.
- Uživatel hlásí, že druhého cestujícího nelze opětovným kliknutím na hvězdu odebrat z oblíbených. Jde o hlášené chování v tomto dialogu, nikoli důkaz, že odstranění není dostupné nikde v aplikaci.
- Tlačítka Přidat / Odebrat jsou zobrazena u osob v kontextu výběru pro cestu. Jejich přesný účinek nebyl v této sekvenci předveden; samotné tlačítko Odebrat nedokládá možnost smazat oblíbeného.

## Inspirace pro IDOS

Předvyplňovat uloženého cestujícího s viditelnou slevou. Odlišit dvě akce: výběr pro aktuální cestu a správu oblíbených. Hypotéza: hvězda bude srozumitelnější jako přepínač s popiskem Přidat do oblíbených / Odebrat z oblíbených, případně s jasně dostupnou správou uložených osob. Aktuálně hlášené chování může být problémem dohledatelnosti, záměrem nebo chybou; příčina není ověřena.

## Další ověření

Kde se oblíbený odstraňuje; co udělá plná hvězda; zda odebrání z oblíbených ponechá osobu v aktuální cestě; jak se určuje výchozí osoba; jaký účinek má Výchozí stav po přihlášení.

## Podklady

- [Výchozí uložený cestující](2026-09-15_007_vychozi-ulozeny-cestujici.png) · [poznámky](2026-09-15_007_vychozi-ulozeny-cestujici.md)
- [Oblíbení a hvězdičky](2026-09-15_008_oblibeni-a-hvezdicky.png) · [poznámky](2026-09-15_008_oblibeni-a-hvezdicky.md)

## Doplnění 15. 9. 2026 – tvorba oblíbeného a nepovinný telefon

Další tři screenshoty od uživatele; originály zkopírovány beze změny a ověřeny SHA-256. Celkem tato složka obsahuje pět screenshotů.

- **Pozorování uživatele:** telefon při přidávání oblíbeného cestujícího není povinný; uživatel by uvítal výraznější označení. Není doloženo samostatné ověření povinnosti polí pro obě varianty dokladu.
- **Viditelné na snímcích:** varianta Osobní průkaz má pole pro jméno a telefon; varianta In Karta má číslo karty, datum narození a telefon. Ani jedna neukazuje u telefonu označení nepovinnosti. Snímky samy neprokazují validaci formuláře.
- **Návrh pro IDOS:** trvalý popisek „Mobilní telefon (nepovinné)“ přímo u pole. Účel telefonu případně vysvětlit až podle skutečné funkce, kterou nyní neznáme. Hypotéza: jasné označení sníží nejistotu při vyplňování.
- **Další vstup do oblíbených:** Jiný cestující obsahuje checkbox „Uložit do oblíbených cestujících“. Uživatel potvrzuje možnost uložení touto cestou; navazující kroky nejsou zachyceny. Inspirace: nabídnout zapamatování vlastní kombinace ve chvíli jejího vytváření.

### Nové podklady

- [Osobní průkaz](2026-09-15_009_oblibeny-osobni-prukaz.png) · [poznámky](2026-09-15_009_oblibeny-osobni-prukaz.md)
- [In Karta](2026-09-15_010_oblibeny-in-karta.png) · [poznámky](2026-09-15_010_oblibeny-in-karta.md)
- [Jiný cestující – oblíbené](2026-09-15_011_jiny-cestujici-ulozit-oblibene.png) · [poznámky](2026-09-15_011_jiny-cestujici-ulozit-oblibene.md)
