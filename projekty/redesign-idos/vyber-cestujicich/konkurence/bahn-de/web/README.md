# Bahn.de / DB – web

Zápis 15. 9. 2026. Zdroj: čtyři screenshoty a komentář uživatele. Stav přihlášení není znám. Originály zkopírovány beze změny a shoda ověřena SHA-256. Bez samostatného testu webu.

## Hodnocení uživatele

Web mu přijde jednoduchý na překlikávání. Líbí se mu designová jednoduchost dialogu pro přidání cestujících. Rozbalovací nabídky slev vnímá jako podobné ČD, ale graficky minimalističtější. Jde o jeho hodnocení, nikoli měření použitelnosti.

## Pozorování a srovnání s dodanými snímky ČD

| Oblast | Bahn.de | ČD |
| --- | --- | --- |
| Souhrn před hledáním | Počet, věková kategorie a sleva | Kategorie nebo jméno uloženého cestujícího a průkaz |
| Základní dialog | Počet, kategorie a sleva v jednom řádku | Seznam předpřipravených kombinací s tlačítky Přidat |
| Vlastní kombinace | Nabídky přímo v řádku | Samostatný dialog Jiný cestující |
| Vizuální provedení | Neutrální plochy, volný prostor, bez avatarů u řádku | Avatary a barevně odlišené texty kategorií a průkazů |
| Rozšířený výběr | Posuvná nabídka, sekce a checkboxy slev | Posuvná nabídka průkazů, mimo jiné sekce podle zemí |
| Reset | Zurücksetzen v dialogu, účinek neověřen | Výchozí stav ve formuláři; uživatel popsal návrat k dospělému bez průkazu bez přihlášení |

Tabulka porovnává zachycené stavy; úplnost nabídky, počty kroků a rychlost dokončení nejsou ověřeny. Ve výřezech DB 003 a 004 je součet dvou cestujících, ale není zachycen celý obsah ani samotné přidání druhé osoby.

## Inspirace pro IDOS – návrhy k testování

- Jednotná struktura „počet – věk/kategorie – sleva“ a viditelný součet mohou pomoci při sestavování skupiny.
- Minimalistický vzhled oddělit od rozsahu funkčnosti: dlouhou nabídku průkazů lze členit i při střídmé grafice.
- Porovnat efektivitu řádkového výběru DB s rychlými kombinacemi ČD na stejném scénáři. Nelze zatím tvrdit, že jedno řešení vyžaduje méně kliknutí.
- Viditelné věkové hranice DB (např. 15–26 a 27–64) se liší od ČD (např. 18–25 a 26–64). Pro IDOS nekopírovat hranice bez návaznosti na tarif.
- Sdružení kol a psů s věkovými kategoriemi a souběžné posuvníky ověřit na menší obrazovce.

## Podklady

- [Souhrn ve vyhledávání](2026-09-15_001_vyhledavani-souhrn.png) · [poznámky](2026-09-15_001_vyhledavani-souhrn.md)
- [Dialog cestujících](2026-09-15_002_dialog-cestujici.png) · [poznámky](2026-09-15_002_dialog-cestujici.md)
- [Nabídka slev](2026-09-15_003_nabidka-slev.png) · [poznámky](2026-09-15_003_nabidka-slev.md)
- [Nabídka kategorií](2026-09-15_004_nabidka-kategorii.png) · [poznámky](2026-09-15_004_nabidka-kategorii.md)

## Doplnění 15. 9. 2026 – uložená sleva a předvyplnění hledání

Další dva screenshoty, kopie ověřeny SHA-256. Celkem šest screenshotů Bahn.de. Nové podklady se týkají zákaznického účtu a navazujícího vyhledávání; stav přihlášení u původních čtyř snímků tím není zpětně potvrzen.

- **Uživatel potvrzuje:** sleva uložená v zákaznickém účtu se automaticky zobrazí ve vyhledávání.
- **Snímky dokládají:** uloženou BahnCard 25, 2. třída v účtu a stejnou slevu v souhrnu hledání. Účet nabízí Přidat slevu, Změnit a odstranit; text uvádí možnost uložit až čtyři slevy. Automatický přenos vychází z popisu uživatele; účinek na cenu nebyl zachycen.
- **Inspirace pro IDOS:** uložit preferovanou slevu v profilu a předvyplnit ji do hledání s jasným souhrnem. Umožnit dočasnou změnu pro konkrétní cestu; její podporu u DB zatím neznáme.
- **Rozdíl proti dosavadním podkladům ČD:** u ČD uživatel popsal předvýběr uloženého cestujícího s průkazem, zde uložení slevy v účtu. Modely nelze bez dalších důkazů považovat za totožné.
- **K ověření:** výběr při více uložených slevách, přiřazení k osobám, chování při nákupu pro někoho jiného a po odstranění slevy.
- České texty na nových snímcích evidujeme jako viditelný stav; původ překladu není znám.

### Nové podklady

- [Účet – uložené slevy](2026-09-15_005_ucet-ulozene-slevy.png) · [poznámky](2026-09-15_005_ucet-ulozene-slevy.md)
- [Vyhledávání – uložená sleva](2026-09-15_006_vyhledavani-ulozena-sleva.png) · [poznámky](2026-09-15_006_vyhledavani-ulozena-sleva.md)
