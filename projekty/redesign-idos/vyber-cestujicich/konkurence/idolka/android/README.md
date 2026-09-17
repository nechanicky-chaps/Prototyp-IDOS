# Idolka – Android

Zápis 15. 9. 2026. Zdroj: tři screenshoty a popis uživatele. Android dle pokračujícího průzkumu; přihlášení a verze nezjištěny. Originály zachovány, kopie ověřeny SHA-256. Bez samostatného testu aplikace.

## Pozorování a hodnocení uživatele

Výběr cestujících je podle uživatele až po hledání. Za hlavní problém označuje chybějící cenu u již předvyplněného jednoho cestujícího: vidí pouze 1 ks. Přepínání Časová / Síťová naopak hodnotí pozitivně. Předvyplnění a načasování výběru vycházejí z popisu; snímky samy ukazují pouze výsledné stavy nákupního panelu.

## Doložené vzory

- Nevybrané produkty mají viditelnou cenu. U vybraného dospělého je v časové i síťové variantě na odpovídajícím místě ovladač minus / 1 ks / plus bez ceny. Celková cena není v zachycených stavech vidět.
- Kategorie a doba platnosti jsou uvedeny přímo v kartách, typ jízdenky lze přepnout nahoře.
- Pokračovat je ve spodním panelu v každém snímku; trvalé ukotvení při posouvání zatím není potvrzené interaktivním testem.
- Síťová nabídka obsahuje i produkty pro pět osob. Konkrétní nároky, rozsah platnosti a chování při změně nabídky nebyly ověřeny.

## Inspirace pro IDOS

Zachovat cenu vybraného produktu současně s ovladačem počtu; při více kusech odlišit cenu za kus od částky za zvolený počet. Před pokračováním zobrazit celkovou částku. Oproti IDESCE zde není hlavním doloženým problémem nulový výběr: uživatel má jeden kus, ale nevidí jeho cenu.

Přepínání typů jízdného lze převzít jako princip snadno dostupných alternativ tam, kde odpovídají nabídce. Dále ověřit, zda přepnutí zachovává nebo mění výběr a zda je změna jasná. Skupinové produkty jsou podnět pro dříve zaznamenané zkoumání významu skupin podle dopravce.

## Další ověření

Cena a součet po přidání více kusů, následující souhrn, zachování volby při přepnutí Časová / Síťová a chování spodního potvrzení při posouvání.

## Podklady

- [Časová – kategorie a ceny](2026-09-15_001_casova-kategorie-a-ceny.jpg) · [poznámky](2026-09-15_001_casova-kategorie-a-ceny.md)
- [Vybraný kus bez ceny](2026-09-15_002_vybrany-kus-bez-ceny.jpg) · [poznámky](2026-09-15_002_vybrany-kus-bez-ceny.md)
- [Síťová a skupinové produkty](2026-09-15_003_sitova-vyber-a-skupiny.jpg) · [poznámky](2026-09-15_003_sitova-vyber-a-skupiny.md)

## Doplnění 15. 9. 2026 – nákup bez hledání spoje, oblíbené a historie

Uloženy další tři originální JPG, shoda kopií ověřena SHA-256. Celkem šest snímků Idolky.

Uživatel popisuje i nákup nezávislý na předchozím hledání spoje. Dosavadní výrok o výběru až po hledání se tedy týkal dříve testované cesty, nikoli jediné možnosti v aplikaci. Tarifní nevázanost každého produktu na konkrétní spoj z těchto podkladů nevyvozovat.

Nové snímky ukazují vstup přes Jízdenky → Koupit, panel Oblíbené a Historie a spodní Koupit jízdenku. Oblíbené se vztahují k produktům s kategorií a relací či územím, nikoli k samostatným profilům cestujících. Účinek hvězdy a nákup z historie nebyly předvedeny.

### Výklad diktované poznámky – k případnému upřesnění

Diktát je částečně nesrozumitelný. Pracovní interpretace: tlačítko Koupit jízdenku působí jako potvrzení již vybrané jízdenky, ačkoli až za ním následuje nový výběr jízdenek pro určitou relaci. Jasně oddělujeme tuto interpretaci od přímo viditelného textu tlačítka. Navazující obrazovka není dodána.

### Inspirace pro IDOS

Zpřístupnit opakovanou volbu známého produktu přes oblíbené či historii a jasně odlišit nový výběr od dokončení nákupu. Pro vstup do výběru zvážit Vybrat jízdenku nebo Vybrat jinou jízdenku podle kontextu; konečnou platební akci pojmenovat podle jejího skutečného účinku. Přínos historie a oblíbených pro rychlost nákupu ověřit na celém průchodu.

- [Vstup přes Jízdenky](2026-09-15_004_jizdenky-vstup-nakupu.jpg) · [poznámky](2026-09-15_004_jizdenky-vstup-nakupu.md)
- [Oblíbené a historie](2026-09-15_005_oblibene-historie-novy-nakup.jpg) · [poznámky](2026-09-15_005_oblibene-historie-novy-nakup.md)
- [Historie relací](2026-09-15_006_historie-relaci.jpg) · [poznámky](2026-09-15_006_historie-relaci.md)

## Doplnění 15. 9. 2026 – opakování problému ceny a nejasný tarif

Sedmý snímek, kopie ověřena SHA-256. U dvouhodinové časové jízdenky má vybraný dospělý opět jen minus / 1 ks / plus bez ceny, zatímco ostatní kategorie mají ceny. Uživatel potvrzuje opakování svého problému a doplňuje, že význam tarifu či kategorií mu není úplně jasný. Dřívější hodnocení konkrétních názvů proto nezaměňovat za prokázanou srozumitelnost nároků.

Pro IDOS evidujeme dvě oddělené otázky: viditelnost ceny vybrané položky a vysvětlení, kdo smí kategorii použít. Navržená úprava: cena vedle počtu, celková částka u pokračování a krátká nápověda ke kategorii podle ověřených tarifních pravidel. Přítomnost podrobné nápovědy jinde v Idolce zatím není známa.

- [Dvouhodinová nabídka](2026-09-15_007_dvouhodinova-cena-a-kategorie.jpg) · [poznámky](2026-09-15_007_dvouhodinova-cena-a-kategorie.md)
