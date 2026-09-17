# Onboarding – IDOS / CHAPS

Průběžné poznámky z onboardingu na správce dat, testera, vývojáře a analytika portálu IDOS společnosti CHAPS.

Založeno: 14. 9. 2026

## Obsah

- [Lokální mapa disku – hlavní zdroj pro hledání](mapa-disku/README.md) – 149 714 cest z nových výpisů `R:\aplikace` a `R:\TTData`, přehled větví a vyhledávání.

- [Výpis stromu složky R:\TTData](podklady/tree-ttdata.txt) – další lokální podklad pro hledání adresářů; základní cesta `R:\TTData`.

- [Výpis stromu složky R:\aplikace](podklady/tree-sitoveho-disku-r.txt) – lokální podklad pro hledání adresářů bez přístupu na síť; větve vztahovat k `R:\aplikace`.

- [TT – pracovní nástroj](tt.md) – spouštěcí příkazy a účel souborů `.tt`.

- [Síťové cesty a IDOSProdeje](sitove-cesty.md) – referenční cesty a zákaz přístupu agentů na síťové disky.

- [Architektura prodeje jízdenek](architektura-prodeje-jizdenek.md) – popis dodaného schématu a původní fotografie.

- [Deník poznatků a dojmů](denik.md) – chronologické zápisy, zkušenosti a souvislosti.
- [Správce dat](spravce-dat.md) – datové zdroje, správa a kontrola kvality dat.
- [Tester](tester.md) – testovací postupy, scénáře a hlášení chyb.
- [Vývojář](vyvojar.md) – prostředí, architektura a vývojové postupy.
- [Analytik](analytik.md) – požadavky, procesy a analytické poznatky.
- [Otevřené otázky](otazky.md) – nejasnosti a věci k ověření.

## Jak vést zápisy

**Agenti nesmí přistupovat na síťové disky.** Síťové cesty pouze evidovat z podkladů uživatele; neotevírat je ani neověřovat jejich dostupnost. Pravidlo je uloženo také v kořenovém `AGENTS.md`.

U každého zápisu uvádět datum a případně zdroj či kontext. Odlišovat ověřené informace, osobní dojmy a domněnky. Chybějící informace nedoplňovat jako fakta. Do tohoto adresáře patří pouze prvotní zaučení; aktivní projekty jsou v [`projekty`](../projekty/README.md) a nový pracovní deník v [`aktivity`](../aktivity/README.md). Starší onboardingové zápisy zachovávat a opravy výslovně označovat.

Do poznámek neukládat hesla, přístupové tokeny ani jiné přihlašovací údaje.
