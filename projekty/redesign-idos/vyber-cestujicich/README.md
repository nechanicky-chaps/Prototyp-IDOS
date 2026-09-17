# IDOS – průzkum výběru cestujících

Založeno: 15. 9. 2026. Zdroj zadání: uživatel v konverzaci.

## Cíl a pokyn uživatele

Pro redesign IDOS průběžně zkoumat výběr cestujících při nákupu jízdenky u konkurence, navrhovat UX inspiraci a dodané screenshoty třídit a ukládat lokálně pro další práci.

## Ukládání podkladů

- Snímky ukládat do `konkurence/<aplikace>/<platforma>/`, např. `konkurence/db-navigator/android/`. Platformy: `android`, `ios`, `web`, `nezjisteno`. Snímky současného IDOS ukládat do `idos/<platforma>/`.
- Neurčené aplikace ukládat do `k-roztrideni/`; původ neodhadovat jako fakt.
- Název souboru: `RRRR-MM-DD_001_popis-kroku.png` (zachovat skutečnou příponu). Datum je datum přijetí, není-li doloženo datum pořízení. Pořadové číslo musí zabránit přepsání staršího podkladu.
- Zachovat původní obrazový soubor. Případné anotace ukládat jako samostatnou odvozenou kopii.
- Ke každému snímku vytvořit stejnojmenný `.md`: zdroj, datum přijetí, aplikace, platforma, verze a země/tarif (neznámé označit), krok procesu, co je přímo vidět, UX interpretace, inspirace pro IDOS a otázky k ověření.
- Doplnit odkaz do `index.md`. U sekvence zachovat pořadí. Nepřepisovat starší závěry bez označení opravy.
- Screenshot dokládá viditelný stav; počet kroků, chování po kliknutí a použitelnost vyžadují další podklady nebo test. Oddělovat pozorování, názor uživatele a hypotézy agenta.
- Uložení potvrdit až po ověření lokálního souboru. Pokud příloha není jako soubor dostupná, sdělit to; samotný popis nenahrazuje uložený screenshot.
- Pracovat pouze lokálně, nikdy nepřistupovat na síťové disky. Do poznámek nepřepisovat přihlašovací údaje.

## Kandidáti na průzkum

Pracovní výběr, zatím bez hodnocení rozhraní: Můj vlak / ČD, RegioJet, Leo Express, FlixBus, DB Navigator, ÖBB, Trainline, Omio. Začít českými službami a doplnit zahraniční inspiraci DB a Trainline.

## Společné scénáře a kritéria

Scénáře: jeden dospělý; dva dospělí; dospělý s dítětem; dva cestující s odlišnými slevami; návrat a úprava výběru; opakovaný nákup. Zvlášť ověřit věkovou hranici k datu cesty a kombinaci více dopravců.

U každého sledovat:

1. Jak snadno se najde výběr a jak zní výchozí souhrn.
2. Přidání, odebrání a editace osoby, počet skutečně ověřených kroků.
3. Srozumitelnost věkových kategorií, slev a přiřazení ke konkrétní osobě.
4. Kdy se žádá jméno, datum narození či průkaz a zda je vysvětlen důvod.
5. Zachování výběru při návratu a změně spoje, viditelnost změny ceny.
6. Čitelnost, ovládání jednou rukou, popisky tlačítek a dostupné důkazy o přístupnosti.

Hypotézy pro IDOS: předvolit jednoho dospělého; zobrazovat konkrétní souhrn skupiny; ptát se na další údaje až podle potřeby; přiřazovat slevu srozumitelně k osobě; uchovávat výběr při návratu. Ověřit na scénářích, nejde o hotové návrhové rozhodnutí.

## První rešerše – 15. 9. 2026

Zdroj: oficiální webové návody, nikoli přímý test aplikací.

- **DB:** návod popisuje zadání počtu a věku dětí v části „Reisende, Fahrräder, Bahncards“ na webu a v DB Navigator. Inspirace k ověření: propojení věku, cestujících a slev v jednom místě; sledovat, zda šíře nabídky nezhoršuje nalezitelnost. [Zdroj](https://www.bahn.de/service/individuelle-reise/kinder/fahrkarten-fuer-kinder).
- **Trainline:** návod k digitální Railcard uvádí, že kartu je při hledání třeba ručně přidat pro uplatnění slevy. Otázka pro průzkum: je dostatečně zřejmé, komu se sleva uplatnila a že vlastnictví karty samo o sobě nestačí? [Zdroj](https://support.thetrainline.com/hc/en-gb/articles/5149450258335-Buying-a-Digital-Railcard).

Uživatelskou přívětivost těchto řešení zatím nelze z návodů potvrdit.

## Upřesnění rozsahu uživatelem – 15. 9. 2026

Dosavadní průzkum se týká výhradně webových portálů (ČD / cd.cz a Bahn.de), nikoli mobilních aplikací. Dosavadní screenshoty a závěry nepřenášet na Můj vlak ani DB Navigator. Úvodní rešerše návodů zůstává historickým kontextem, není testem mobilních aplikací. Pokračovat ve webovém rozsahu, dokud uživatel nezadá jinak.

## Rozšíření rozsahu uživatelem – 15. 9. 2026: mobilní aplikace

Uživatel se připojil z mobilu a začíná testovat mobilní aplikace. Tím rozšiřuje dosavadní webový průzkum; starší omezení na web platilo pro předchozí fázi. Nové snímky aplikací ukládat odděleně podle aplikace a platformy (android / ios). Není-li OS znám, použít nezjisteno a v poznámkách výslovně uvést mobilní aplikaci, OS nezjištěn. Mobilní web nezaměňovat za aplikaci. Evidovat stav přihlášení a verzi, pokud je uživatel dodá nebo je podklad doloží. Dosavadní webové závěry zachovat jako webové.

## Upřesnění mobilní platformy – 15. 9. 2026

Uživatel bude mobilní aplikace testovat výhradně na Androidu. Pro další mobilní přílohy v této sérii používat Android, pokud uživatel kontext nezmění. První aplikace je Můj vlak, přihlášený stav; přihlášení nepřenášet automaticky na další aplikace.

## Upřesnění uživatele – 15. 9. 2026: více průkazů v IDOS

IDOS již podle uživatele umožňuje více průkazů u cestujícího pomocí zaškrtávání. Nejde tedy o návrh nové funkce; při srovnávání konkurence hodnotit způsob výběru, přehlednost a úpravy více průkazů. Konkrétní platforma a obrazovky IDOS zatím nedoloženy. Uživatel chce IDOS projít až na konci průzkumu; nyní jeho test nepředbíhat.

## Závazné upřesnění výstupu – 15. 9. 2026

Uživatel žádá jedinou scrollovací React stránku s věrnými ukázkami screenshotovaných mobilních rozhraní jako podklad pro diskusi. Nežádá návrh nového řešení, domýšlení chybějících kroků ani změny UI operátorů. Samotné obrazovky v katalogu tvoří originály; přidána pouze navigace mezi doloženými stavy. [Lokální katalog](../prototyp/index.html) je dostupný v sousední složce prototyp.


## Poznámky u snímků – pokyn uživatele 15. 9. 2026

Do společné React stránky doplňovat pod příslušné screenshoty relevantní uživatelovy postřehy. Uživatelské hodnocení odlišit od vlastních interpretací; parafráze označit, nejistoty zachovat. Vzhled samotných screenshotů neměnit. Poznámky jsou vedeny v prototyp/user-notes.json.

## Zúžení katalogu – 15. 9. 2026

Na přání uživatele zobrazovat pouze skutečný výběr cestujících s popisem a relevantními uživatelskými poznámkami. Aktuální výběr 15 snímků z 11 aplikací; hledání, výsledky, souhrny a opakující se stavy nepatří do přehledu. Původní evidence zůstává zachována.
