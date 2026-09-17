# ÖBB – webový výběr cestujících

Zápis 15. 9. 2026. Zdroj: tři screenshoty a popis uživatele. První snímek dokládá nepřihlášený stav. Originály zachovány, kopie ověřeny SHA-256. Bez samostatného testu webu.

## Zjištění a hodnocení uživatele

- Uživatel popisuje výběr cestujících až po vyhledání spojení a vzpomíná, že to tak mohlo být i dříve. Snímek dokládá editovatelný souhrn ve výsledcích; výlučnost tohoto pořadí ani historie nejsou ověřeny.
- Oceňuje jednoduchost přidávání druhů cestujících přes plus. Viditelné kategorie jsou dospělý, dítě/mládež, senior, pes a kolo.
- Každá zobrazená karta osoby obsahuje možnosti přidat slevu a cestování s postižením; zapamatování osoby je vidět na plně zachycených kartách. Jejich účinek není doložen.
- Podle uživatele se vyplňuje věk, pokud je sleva závislá na věku. Snímek ukazuje povinně označené pole Alter* s konkrétním datem cesty a vysvětlením správného určení slevy. Pole je vidět u dítěte/mladistvého i jedné karty dospělého; důvod u dospělého není znám.

## Inspirace pro IDOS – k testování

1. Přidat osobu jedním kliknutím na jasně označenou kategorii a další nastavení soustředit do její karty.
2. Věk požadovat podle potřeby a uvést konkrétní datum, ke kterému se posuzuje. Krátce vysvětlit důvod; stejný princip věku k odjezdu byl zachycen u Vy.
3. Slevy a potřeby při cestování přiřazovat konkrétní osobě. Akce REISEN MIT BEHINDERUNG sama nedokládá filtr bezbariérových spojení.
4. Změnu cestujících u výsledků doprovodit jasnou aktualizací ceny a souhrnu. Zda ÖBB takto aktualizaci provádí, se teprve ověří.

## Co ověřit dál

Reakci cen a výsledků na změnu skupiny, pole věku u dospělého, přidání slevy, obsah REISEN MIT BEHINDERUNG, zapamatování osoby bez přihlášení a přehlednost delšího seznamu karet. Nevyvozovat počet kliknutí celého nákupu ze statických snímků.

## Podklady

- [Výsledky a cestující](2026-09-15_001_vysledky-a-cestujici.png) · [poznámky](2026-09-15_001_vysledky-a-cestujici.md)
- [Přidávání a karta osoby](2026-09-15_002_pridavani-a-karta-osoby.png) · [poznámky](2026-09-15_002_pridavani-a-karta-osoby.md)
- [Věk ke dni cesty](2026-09-15_003_vek-ke-dni-cesty.png) · [poznámky](2026-09-15_003_vek-ke-dni-cesty.md)

## Srovnání s aplikací – 15. 9. 2026

Nové podklady [ÖBB Tickets na Androidu](../android/README.md) dokládají cestující přímo ve formuláři před hledáním. Dřívější popis výběru po hledání se vztahuje k testované webové cestě. Princip přidávání plusy a karet je podobný na obou platformách.
