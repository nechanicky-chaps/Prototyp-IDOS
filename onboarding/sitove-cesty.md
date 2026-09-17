# Síťové cesty a IDOSProdeje

Zaznamenáno: 14. 9. 2026.

Zdroj: dva snímky obrazovky a sdělení uživatele. Cesty byly pouze přepsány, bez přístupu na síť a bez ověřování dostupnosti.

## Lokální výpis adresářového stromu

Pro nové hledání přednostně používat [lokální mapu disku](mapa-disku/README.md), vytvořenou z novějších úplných cest dodaných uživatelem. Starší `tree` níže je historický podklad.

- [Dodaný výpis tree](podklady/tree-sitoveho-disku-r.txt) – uložen 14. 9. 2026 v původním znění pro pozdější hledání složek.
- Zdroj: uživatelem dodaný textový soubor; podle uživatele jde o strom síťového disku, kam má přístup. Datum vytvoření výpisu a jeho úplnost nejsou ověřeny.
- Při hledání používat pouze tuto lokální kopii. Nalezená cesta neprokazuje aktuální existenci, dostupnost ani přístupová práva.
- Upřesnění 14. 9. 2026: uživatel potvrdil, že výpis pochází ze složky **`R:\aplikace`**. [Doplňující snímek](podklady/tree-zakladni-cesta-aplikace.png) ukazuje `cd r:\aplikace\` a následně `PS R:\aplikace> tree`. Dřívější nejistota ohledně kořene je tím vyřešena.
- Při sestavování úplných cest z výpisu připojovat větve k `R:\aplikace`, například `R:\aplikace\IDOSProdeje\DataPlugins`. Úvodní `R:.` v uloženém výpisu zde nevykládat jako kořen disku `R:\`.
- Ve větvi `IDOSProdeje` jsou například `DataEshopWS`, `DataEshopWS Core`, `DataPlugins`, `Arriva` a `Archív`; jde o názvy z výpisu, nikoli ověřený popis jejich účelu.

## Lokální výpis R:\TTData

- [Výpis tree složky R:\TTData](podklady/tree-ttdata.txt) – uložen 14. 9. 2026 v původním znění z textového podkladu uživatele.
- Základní cesta je **`R:\TTData`**, doložená řádky `cd r:\TTData\` a `PS R:\TTData> tree` v dodaném textu. Všechny větve tohoto výpisu vztahovat k této cestě.
- Příklady zachycených složek: `R:\TTData\Chaps\CIS\ZIP`, `R:\TTData\Chaps\Update\Jrcd_2026\ZIP`, `R:\TTData\TT\Bin` a `R:\TTData\TT\BusC_26`.
- Účel konkrétních složek ani umístění jednotlivých souborů `.tt` zatím nejsou potvrzeny. Výpis slouží jako lokální reference adresářů, nikoli jako doklad jejich aktuálního obsahu či dostupnosti.
- Hledat pouze v uložené lokální kopii; zákaz přístupu na síťové disky nadále platí.

## Pravidlo pro agenty

**AGENTI NESMÍ PŘISTUPOVAT NA SÍŤOVÉ DISKY.** Jde o výslovný pokyn uživatele. Níže uvedené cesty slouží jen jako reference pro uživatele.

## Mapování ze snímku

| Disk | Síťová cesta |
| --- | --- |
| O: | `\\chaps\share\all` |
| R: | `\\CHAPS\share` |
| S: | `\\CHAPS\share\all` |

Velikost písmen je zachována podle snímku.

## Hlavní pracovní složka

Uživatel uvedl, že zde bude nejvíce používat **IDOS prodeje**. Na snímku je v adresáři `R:\aplikace` vybrána složka `IDOSProdeje`.

- Cesta přes mapovaný disk: `R:\aplikace\IDOSProdeje`
- Odpovídající UNC cesta odvozená z uvedeného mapování: `\\CHAPS\share\aplikace\IDOSProdeje`

Obsah složky IDOSProdeje není na snímku zobrazen a nebyl zjišťován.

## Aplikace TT

- Umístění: `R:\aplikace\TT\Instal\TT.exe`.
- [Spouštěcí příkazy a práce se soubory .tt](tt.md).

## Lokálně uložené snímky

- [Mapování síťových disků](podklady/sitove-disky.png)
- [Adresář aplikace s vybranou složkou IDOSProdeje](podklady/aplikace-idos-prodeje.png)
