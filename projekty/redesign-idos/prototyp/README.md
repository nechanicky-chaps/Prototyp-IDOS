# Výběr cestujících – mobilní aplikace

Jedna lokální React stránka s 29 reprezentativními snímky a 7 videi z 18 aplikací. Tlačítko Prohlížet stavy zpřístupňuje všech 63 doložených screenshotů, včetně aktuálního toku IDOS od hledání po volbu platby. Otevřete index.html nebo spusťte spustit-prototyp.cmd. Funguje offline; React je přiložen ve vendor.

## Obsah

Pouze výběr osob, jejich kategorií, počtu a průkazů. Každý snímek má stručný věcný popis a případné Tvoje poznámky – označené parafráze skutečných postřehů uživatele. Žádné nové návrhy rozhraní. Tam, kde aplikace volí tarif nebo počet dokladů přímo v nákupu (DUKapka, Idolka, PID Lítačka, IREDO, VOR), je zachována příslušná originální obrazovka.

Hlavní stránka je omezená na výběr osob, tarifních kategorií a počtu jízdenek. U aplikací s dodaným záznamem je video umístěné vedle screenshotů. Formuláře hledání, výsledky, souhrny, historie a další dodané stavy jsou dostupné jen přes Prohlížet stavy. ZIP obsahuje všechny použité originály.

## Ovládání

Aplikace jsou pod sebou na jedné stránce. Kliknutím na snímek ho zvětšíte. V prohlížeči snímků lze přepínat šipkami, Escape zavírá. Dlouhý snímek lze rozbalit. RegioJet má zachován doložený přechod rozbalení a sbalení dalších tarifů; odkazy na vyřazené obrazovky nejsou aktivní.

Obrazovky tvoří původní JPG, ne rekonstrukce formulářů. Nelze domýšlet nové stavy změnou počtů ani vypočítávat ceny. Popisy a poznámky jsou mimo originál. Přihlašovací stav ani tarifní platnost nelze dovozovat jen z viditelného snímku.

## Údržba

- build_catalog.py: výběr snímků a věcné popisy, kopie ověřené SHA-256.
- user-notes.json: uživatelské postřehy podle ID snímku; poznámky k nyní nezobrazeným originálům zachovány.
- app.js, styles.css: React katalog a jeho vzhled.
- catalog.js, assets: vygenerovaná data a kopie snímků.
- verify.cjs: kontrola vykreslení, popisů, poznámek, prohlížeče a mobilní šířky v lokálním Edge.
- package_catalog.py: přenosný ZIP aktuálního výběru.

Sestavení vyžaduje Python s Pillow. Pro otevření hotové stránky instalace není potřeba.

