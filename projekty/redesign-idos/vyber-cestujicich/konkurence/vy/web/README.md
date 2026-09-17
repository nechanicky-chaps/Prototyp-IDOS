# Vy – webový výběr cestujících

Zápis 15. 9. 2026. Zdroj: pět screenshotů a komentář uživatele. Uživatel službu označuje jako norské Vy, dříve NSB; historii značky jsme samostatně neověřovali. Originály zachovány a shoda kopií ověřena SHA-256. Bez samostatného testu webu.

## Hlavní poznatky

1. **Postupné zobrazení formuláře:** podle uživatele se nejprve zadávají destinace, teprve pak jsou dostupní cestující a čas. Snímky ukazují oba stavy. Uživatel pochybuje o vhodnosti tohoto postupu pro IDOS; nejde o potvrzené technické omezení.
2. **Kategorie bez číselných hranic:** viditelné názvy Adult, Senior citizen, Child/youth, Student a Military neuvádějí věkové rozsahy. U Child/youth se po přidání zobrazí Age at departure* a vysvětlení rozdílných hranic mezi dopravci. Zadávání věku u Student uvádí uživatel, snímek této varianty zatím chybí.
3. **Doplňky u osob:** u dospělého a dítěte je vidět Select addon. Otevřená nabídka dospělého obsahuje kolo / pulk, zvířata podle velikosti a kočárek. Dostupnost u všech kategorií vychází z popisu uživatele; kombinace více doplňků není ověřena.
4. **Vozík a bezbariérovost:** vidět je samostatná zavřená sekce Information about wheelchairs. Výběr vozíku ani automatické filtrování bezbariérových spojení není v podkladech předvedeno. Položka Pram or pushchair je dětský kočárek, nikoli invalidní vozík.

## Náměty pro IDOS

- Uživatel navrhuje zadat potřebu cestovat s vozíkem už u cestujícího a navázat ji na vyhledávání bezbariérových spojení.
- Návrh k rozpracování: volba „Cestuji na vozíku“ u osoby a viditelný souhrn účinku na hledání. Před návrhem konkrétního chování ověřit dostupná data pro vozidla, zastávky a přestupy. Rezervace místa pro vozík, asistence a filtr dostupnosti jsou různé požadavky; nezaměňovat je v popiscích. Neznámou dostupnost nepovažovat automaticky za potvrzenou bezbariérovost.
- Věk k datu odjezdu může pomoci napříč dopravci: uživatel zadá údaj, systém určí odpovídající kategorii. Jde o návrh k ověření s tarifními pravidly IDOS.
- Doplňky přiřadit srozumitelně konkrétní osobě. Zachovat jednoduchý základ a další údaje zobrazit podle potřeby.

## Další užitečný podklad

Rozbalená sekce Information about wheelchairs: ověřit, zda poskytuje jen informace, nebo umožňuje zadat požadavek, a jak ovlivní výsledky hledání. Dále zachytit přidání studenta a souhrn skupiny po uložení.

## Snímky

- [Úvodní výběr trasy](2026-09-15_001_uvodni-vyber-trasy.png) · [poznámky](2026-09-15_001_uvodni-vyber-trasy.md)
- [Trasa, čas a cestující](2026-09-15_002_trasa-cas-cestujici.png) · [poznámky](2026-09-15_002_trasa-cas-cestujici.md)
- [Kategorie](2026-09-15_003_dialog-kategorie.png) · [poznámky](2026-09-15_003_dialog-kategorie.md)
- [Věk při odjezdu](2026-09-15_004_dite-vek-pri-odjezdu.png) · [poznámky](2026-09-15_004_dite-vek-pri-odjezdu.md)
- [Doplňky](2026-09-15_005_doplnky-cestujiciho.png) · [poznámky](2026-09-15_005_doplnky-cestujiciho.md)
