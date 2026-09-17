# Deník poznatků a dojmů

## 14. 9. 2026 – Lokální virtuální mapa disku

- Z nových výpisů uživatele vytvořena [lokální mapa](mapa-disku/README.md): 71 255 unikátních cest z `R:\aplikace` a 78 459 z `R:\TTData`.
- Uchovány originály výpisů, vytvořen společný index, přehled větví a skript pro hledání pouze v lokálním indexu.
- Výpisy neobsahují obsah souborů ani explicitní typ položek; nepřístupná místa mohou chybět. Na síťové disky se nepřistupovalo.

## 14. 9. 2026 – Výpis složky TTData

- Uživatel dodal další důležitý adresářový strom, tentokrát ze složky `R:\TTData`; základní cesta je přímo doložena v dodaném textu.
- Uložena [lokální kopie](podklady/tree-ttdata.txt) pro budoucí hledání bez přístupu na síťové disky a přidány odkazy do přehledu cest a poznámek k TT.

## 14. 9. 2026 – Referenční výpis síťového disku

- Uživatel dodal textový výpis adresářového stromu pro budoucí hledání.
- Uložena [lokální kopie výpisu](podklady/tree-sitoveho-disku-r.txt); při hledání se bude procházet pouze tato kopie.
- Rozdíl mezi kořenem `R:.` ve výpisu a dřívější cestou `R:\aplikace` je zaznamenán v [poznámkách k cestám](sitove-cesty.md). Síťový disk nebyl zpřístupněn ani ověřován.

### Oprava a upřesnění – základ výpisu

- Uživatel následně potvrdil snímkem PowerShellu, že `tree` spustil ve složce `R:\aplikace`. Předchozí nejistota je vyřešena: všechny větve výpisu se vztahují k této složce, nikoli ke kořeni disku.
- Podklad: [snímek spuštění tree](podklady/tree-zakladni-cesta-aplikace.png). Opraveny referenční poznámky; původní textový výpis zachován beze změny.

## 14. 9. 2026 – Veřejná data CIS JŘ

- Na dotaz uživatele ověřeny oficiální zdroje strojově čitelných jízdních řádů. Stažen veřejný autobusový JDF balíček do lokální složky `data/cisjr` a nahlédnuto do první vnitřní dávky. Podrobnosti a zdroje jsou v [poznámkách správce dat](spravce-dat.md#veřejná-strojově-čitelná-data-cis-jř).

## 14. 9. 2026 – Zahájení evidence

- Probíhá onboarding na správce dat, testera, vývojáře a analytika portálu IDOS společnosti CHAPS.
- Cílem je průběžně uchovávat nabyté dojmy a poznatky pro pozdější použití.
- Zdroj: sdělení uživatele v této konverzaci.

## 14. 9. 2026 – Schéma architektury prodeje jízdenek

- Uživatel dodal fotografii architektury prodeje jízdenek IDOS.
- Fotografie byla uložena mezi podklady a čitelné části zpracovány do [poznámek k architektuře](architektura-prodeje-jizdenek.md).
- Schéma zahrnuje klienty, CRWS, Ticket Server, E-shopWS, pluginy, rezervační API, platební brány a Žurnál ČD.
- Aktuálnost schématu a nejasné ruční popisky zůstávají k ověření.

## 14. 9. 2026 – Síťové cesty a IDOSProdeje

- Ze snímků byla zaznamenána mapování disků O:, R: a S: a cesta `R:\aplikace\IDOSProdeje`.
- Uživatel bude nejvíce používat IDOS prodeje.
- Výslovný pokyn uživatele: **AGENTI NESMÍ PŘISTUPOVAT NA SÍŤOVÉ DISKY.** Uloženo také do kořenového `AGENTS.md`.
- Podrobnosti a lokální snímky: [Síťové cesty a IDOSProdeje](sitove-cesty.md).

## 14. 9. 2026 – Pracovní nástroj TT

- Podle uživatele se používá `R:\aplikace\TT\Instal\TT.exe /k`, případně `R:\aplikace\TT\Instal\TT.exe /w:t` pro otevření nabídky odjezdů hned po spuštění.
- V TT se budou otevírat potřebné soubory `.tt` s přehledem toho, co je vygenerované a vstupuje do IDOSu.
- Podrobnosti: [TT – pracovní nástroj](tt.md). Zápis vychází ze sdělení uživatele; aplikace nebyla spuštěna a na síťové disky se nepřistupovalo.

## 14. 9. 2026 – Ukázka rozhraní TT

- Uživatel dodal snímek aplikace TT se seznamem spojů pro Vlaky 2026 (CIS JŘ), detailem spoje rj 50 Vindobona a panelem poznámek.
- Snímek byl uložen lokálně a popis rozhraní doplněn do [poznámek k TT](tt.md#vzhled-aplikace--přehled-spojů).

## 14. 9. 2026 – Tarify v JDF

- Ověřen rozdíl mezi tarifními údaji jízdního řádu (pásma a kilometry) a úplnými ceníky a pravidly výpočtu jízdného. Podrobnosti a zdroj doplněny do poznámek správce dat.

## 15. 9. 2026 – Průzkum výběru cestujících pro redesign IDOS

- Zadání uživatele: průběžné tipy ke konkurenci a lokální třídění dodaných screenshotů pro pozdější práci.
- Založena [evidence a pravidla průzkumu](../projekty/redesign-idos/vyber-cestujicich/README.md), společné scénáře a první rešerše oficiálních návodů DB a Trainline. UX závěry vedeny jako hypotézy; screenshoty zatím nedodány.

## 15. 9. 2026 – ČD web: výběr cestujících bez přihlášení

- Uloženo šest uživatelských screenshotů a samostatné poznámky; shoda originálů a kopií ověřena SHA-256.
- Uživatel oceňuje viditelnost zvoleného cestujícího a šíři kategorií a průkazů. Pozorování, jeho hodnocení a UX hypotézy jsou odděleny v [souhrnu ČD](../projekty/redesign-idos/vyber-cestujicich/konkurence/cd/web/neprihlaseny/README.md).

- Doplnění k ČD webu (15. 9. 2026, zdroj: uživatel): odkaz Výchozí stav vrací dospělého bez průkazu; uživatel jej hodnotí jako praktický. Zapsáno k prvnímu snímku a do souhrnu. Rozsah resetu ostatních polí neověřen.

## 15. 9. 2026 – ČD web po přihlášení

- Uloženy dva screenshoty, shoda kopií ověřena. Uživatel popisuje automatický výběr uloženého cestujícího a nefunkční odebrání z oblíbených opětovným kliknutím na hvězdu. Odděleno od výběru osoby pro aktuální cestu; jiná možnost odstranění zatím nezjištěna. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/cd/web/prihlaseny/README.md).

## 15. 9. 2026 – ČD: formulář oblíbeného cestujícího

- Uloženy tři další screenshoty a poznámky, kopie ověřeny SHA-256. Uživatel potvrzuje nepovinný telefon a žádá jeho jasnější označení. Doložen také checkbox pro uložení do oblíbených v dialogu Jiný cestující. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/cd/web/prihlaseny/README.md).

## 15. 9. 2026 – Bahn.de: webový výběr cestujících

- Uloženy čtyři screenshoty s poznámkami, kopie ověřeny SHA-256. Uživatel oceňuje snadné překlikávání a minimalistický dialog oproti ČD. Zpracováno srovnání zachycených stavů a hypotézy pro IDOS; stav přihlášení a rychlost dokončení neověřeny. [Souhrn Bahn.de](../projekty/redesign-idos/vyber-cestujicich/konkurence/bahn-de/web/README.md).

## 15. 9. 2026 – Bahn.de: sleva z účtu ve vyhledávání

- Uloženy dva další screenshoty, kopie ověřeny SHA-256. Uživatel potvrzuje automatické zobrazení uložené slevy v hledání. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/bahn-de/web/README.md).
- Výslovné upřesnění uživatele: dosavadní průzkum se týká pouze webových portálů. Rozsah doplněn do pravidel průzkumu.

## 15. 9. 2026 – Vy: webový výběr cestujících

- Uloženo pět screenshotů a poznámky, kopie ověřeny SHA-256. Zaznamenáno postupné zobrazení formuláře, věk při odjezdu a doplňky osob. Uživatel navrhuje vozík u cestujícího propojit s bezbariérovým hledáním IDOS. U Vy zatím doložena pouze zavřená informační sekce o vozících. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/vy/web/README.md).

## 15. 9. 2026 – ÖBB: výběr cestujících na webu

- Uloženy tři screenshoty a poznámky, kopie ověřeny SHA-256. Uživatel popisuje výběr po hledání, oceňuje přidávání kategorií přes plus a uvádí zadávání věku pro věkové slevy. Zaznamenány karty osob, věk ke konkrétnímu dni a otázky k cenám a cestování s postižením. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/oebb/web/README.md).

## 15. 9. 2026 – ZSSK: výběr cestujících při nákupu

- Uloženy dva screenshoty a poznámky, kopie ověřeny SHA-256. Uživatel popisuje volbu cestujících až v nákupu a dva dlouhé, ale pochopitelné seznamy. Odděleno od editace u výsledků ÖBB. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/zssk/web/README.md).

- Doplnění k ZSSK (15. 9. 2026, zdroj: uživatel): varianta skupiny je hodnocena pozitivně a může být relevantní podle dopravce. Do souhrnu a poznámek ke snímku doplněny otázky k ceně, kapacitě a pravidlům skupin; bez předpokladu univerzální hranice počtu osob.

## 15. 9. 2026 – Zahájení testování mobilních aplikací

- Uživatel se hlásí z mobilu a rozšiřuje průzkum z webových portálů na mobilní aplikace. Snímky a závěry evidovat odděleně podle platformy; konkrétní aplikace a OS zatím neuvedeny.

## 15. 9. 2026 – Můj vlak na Androidu

- Uživatel potvrzuje pouze Android pro mobilní testy a přihlášení v Můj vlak. Uloženy tři snímky s poznámkami, shoda kopií ověřena SHA-256. Uživatel postrádá oblíbené a oceňuje více průkazů na osobu. Rozsah doložení odlišen v [souhrnu](../projekty/redesign-idos/vyber-cestujicich/konkurence/muj-vlak/android/prihlaseny/README.md).

## 15. 9. 2026 – Můj vlak: doložení více průkazů

- Uložen čtvrtý snímek, kopie ověřena SHA-256. Editor jedné osoby zobrazuje IN 25, Průkaz ZTP a Interrail Global Pass. Doplněn důkaz do předchozích poznámek; uplatnění slev v ceně nadále neověřeno. [Poznámky](../projekty/redesign-idos/vyber-cestujicich/konkurence/muj-vlak/android/prihlaseny/2026-09-15_004_jiny-cestujici-tri-prukazy.md).

## 15. 9. 2026 – Upřesnění stávající funkce IDOS

- Zdroj: uživatel. IDOS už umožňuje více průkazů pomocí zaškrtávání. Srovnávat tedy způsob ovládání existující funkce. Uživatel chce IDOS projít až na závěr; doplněno do pravidel průzkumu i srovnání Můj vlak.

## 15. 9. 2026 – DUKapka na Androidu

- Uloženy tři snímky s poznámkami, kopie ověřeny SHA-256. Uživatel popisuje výběr cestujících až při nákupu a upozorňuje na možné neporozumění názvům jízdného. Význam předplatného veden jako jeho interpretace; obsah informační ikony zatím neznámý. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/dukapka/android/README.md).

## 15. 9. 2026 – IDESKA na Androidu

- Uložen snímek Cestující, kopie ověřena SHA-256. Uživatel dodal název bez hodnocení. Zaznamenán společný seznam osob a doplňků, počítadla a reset; účinek ovladačů a fáze procesu neověřeny. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/ideska/android/README.md).

## 15. 9. 2026 – IDESKA: cena a závěrečný souhrn

- Uloženy dva další snímky, kopie ověřeny SHA-256. Uživatel potvrzuje nepřihlášený stav, kritizuje nutnost vybrat cestující před zjištěním ceny a oceňuje souhrn s úpravou cestujících. Možné jiné chování po přihlášení neověřeno. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/ideska/android/README.md).

## 15. 9. 2026 – IDESKA po registraci

- Uložen čtvrtý snímek, kopie ověřena SHA-256. Uživatel hlásí nulový výběr i po registraci a nutnost posouvat k potvrzení; kritizuje rychlost nákupu. Aktualizována předchozí hypotéza o přínosu registrace pro tento krok. [Poznámky](../projekty/redesign-idos/vyber-cestujicich/konkurence/ideska/android/2026-09-15_004_po-registraci-nulovy-vyber.md).

## 15. 9. 2026 – Idolka na Androidu

- Uloženy tři snímky a poznámky, shoda kopií ověřena SHA-256. Uživatel kritizuje cenu nahrazenou údajem 1 ks u vybrané jízdenky a oceňuje přepínání Časová / Síťová. Zachyceny také síťové produkty pro pět osob. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/idolka/android/README.md).

## 15. 9. 2026 – Idolka: samostatný nákup a názvy akcí

- Uloženy tři další snímky, kopie ověřeny SHA-256. Doložen vstup z Jízdenek a nabídka Oblíbené/ Historie. Popsána další cesta bez hledání spoje. Nejasný diktát k tlačítku Koupit jízdenku zaznamenán jako pracovní interpretace. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/idolka/android/README.md).

## 15. 9. 2026 – Idolka: opakovaně chybějící cena a význam tarifu

- Uložen sedmý snímek, kopie ověřena SHA-256. Uživatel znovu postrádá cenu vybraného kusu a popisuje nejistotu ohledně tarifní nabídky. Evidováno jako doplnění stejného problému ceny a samostatná otázka srozumitelnosti podmínek. [Poznámky](../projekty/redesign-idos/vyber-cestujicich/konkurence/idolka/android/2026-09-15_007_dvouhodinova-cena-a-kategorie.md).

## 15. 9. 2026 – IDESKA: samostatné nákupní cesty

- Uloženy tři další snímky, kopie ověřeny SHA-256. Uživatel oceňuje volbu druhů jízdenek a souhrn; opět kritizuje nutný průchod cestujícími. Zaznamenán nákup bez hledání spoje a rozlišen souhrn od dokladu zaplacení. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/ideska/android/README.md).

## 15. 9. 2026 – DUKapka: jednotnost nákupních cest

- Bez nového snímku. Diktované CAPTCHA pracovně interpretováno jako DUKapka. Uživatel uvádí i nákup bez hledání spoje a oceňuje prakticky stejný výběr relace a cestujících jako při nákupu ze spojení. [Doplněný souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/dukapka/android/README.md).

## 15. 9. 2026 – PID Lítačka na Androidu

- Uloženy čtyři snímky s poznámkami, kopie ověřeny SHA-256. Uživatel popisuje automatickou nabídku podle profilu a obtížnost nákupu pro jiného; samostatný katalog vyžaduje znalost nároku. Doložena cena u výsledku a vysvětlení doporučené jízdenky. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/pid-litacka/android/README.md).

## 15. 9. 2026 – ÖBB Tickets na Androidu

- Uloženy tři snímky a poznámky, kopie ověřeny SHA-256. Cestující dostupní před hledáním, přidávání plusy a karty podobné webu. Uživatel oceňuje věk místo data narození. Doplněno rozlišení webu a aplikace. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/oebb/android/README.md).

## 15. 9. 2026 – FlixBus a RegioJet na Androidu

- Uživatel znovu dodal pět snímků původně zaslaných do jiného chatu. Dva uloženy k FlixBusu, tři k RegioJetu, kopie ověřeny SHA-256. Uživatel oceňuje minimalismus a připisuje jej menší šíři slev; tento důvod veden jako jeho interpretace. U RegioJetu zachyceno rozbalení dalších tarifů. [FlixBus](../projekty/redesign-idos/vyber-cestujicich/konkurence/flixbus/android/README.md), [RegioJet](../projekty/redesign-idos/vyber-cestujicich/konkurence/regiojet/android/README.md).

## 15. 9. 2026 – DB Navigator na Androidu

- Uloženy čtyři snímky a poznámky, shoda kopií ověřena SHA-256. Uživatel oceňuje jednoduchost, dostatek možností a pořadí věková kategorie → slevy. Přílohy 2 a 3 jsou vizuálně stejného stavu, ale jejich SHA-256 se liší. Oba originály zachovány; rozdíl souborů není důkazem rozdílného chování UI. [Souhrn](../projekty/redesign-idos/vyber-cestujicich/konkurence/db-navigator/android/README.md).

## 15. 9. 2026 – Vy na Androidu: moderní mobilní flow

- Uživatel dodal pět nových screenshotů aplikace Vy na Androidu. Všechny originály JPG uloženy lokálně a jejich shoda s dodanými soubory ověřena SHA-256.
- Uživatel vyzdvihuje moderní design: po vyhledání spojení stačí jen scrollovat dolů a vybírat ze spojů. Výběr pasažérů hodnotí jako jednoduchý a oceňuje opětovné využití zadání konkrétního věku u kategorií vyžadujících ověření (dítě, student).
- Doložen kompletní tok: úvodní hledání (s rychlou polohou) -> výsledky s kompaktní hlavičkou parametrů cesty a cenami spojů -> dialog výběru osob, doplňků (kolo, kočárek, zvířata, vozík) a vazba na Family and friends -> progresivní odhalení pole pro věk u dětí a studentů.
- Podrobnosti a poznámky: [Souhrn Vy Android](../projekty/redesign-idos/vyber-cestujicich/konkurence/vy/android/README.md).

## 15. 9. 2026 – Vytvoření interaktivního React prototypu mobilních rozhraní

- Na žádost uživatele byl vytvořen interaktivní webový prototyp ([projekty/redesign-idos/prototyp/index.html](../projekty/redesign-idos/prototyp/index.html)) simulující mobilní aplikace v realistickém rámu telefonu.
- Běží přímo v prohlížeči bez nutnosti instalace Node.js (využívá React 18, Tailwind CSS a Babel).
- Plně implementováno interaktivní flow pro **Vy.no (Android)**:
  1. Úvodní vyhledávací formulář (*Find journey*) s rychlou volbou polohy.
  2. Výsledky spojení (*Select departure*) s kompaktním záhlavím parametrů cesty a okamžitým scrollováním spojů s cenami.
  3. Modální dialog výběru cestujících (*Passengers selected*) s dynamickým odhalením pole pro věk u dítěte a studenta, doplňky (kola, zvířata, vozík) a tlačítkem Save.
  4. Košík / nákupní rekapitulace s rozpadem slev a konečnou cenou.
- Součástí je boční ovládací panel s živým stavem, rychlými testovacími scénáři a UX doporučeními pro IDOS. Připraven spouštěcí skript spustit-prototyp.cmd.

## 15. 9. 2026 – Věrné mobilní podklady v Reactu

- Podle výslovného upřesnění uživatele nahrazen hlavní návrhový prototyp obrazovým katalogem 10 mobilních aplikací, 42 originálních snímků. Starý návrh archivován. Žádné domyšlené obrazovky nebo výpočty cen.
- Přidána společná scrollovací stránka, prohlížení stavů, zvětšení, filtry a omezené klikací přechody mezi doloženými stavy. [Stránka](../projekty/redesign-idos/prototyp/index.html), [popis a ověření](../projekty/redesign-idos/prototyp/README.md).

## 15. 9. 2026 – Trenitalia na Androidu

- Uloženy tři snímky, kopie ověřeny SHA-256. Uživatel oceňuje minimalismus a plánuje pokračovat v průzkumu. Senior není v zachyceném dialogu; širší tarifní nabídka neověřena. Snímky doplněny do React katalogu. [Poznámky](../projekty/redesign-idos/vyber-cestujicich/konkurence/trenitalia/android/README.md).

## 15. 9. 2026 – Uživatelské poznámky v katalogu

- Na přání uživatele doplněny relevantní dosavadní postřehy pod konkrétní snímky ve společné React stránce. Označeny jako parafráze uživatelských poznámek; žádné nové návrhy UI. Doplněny také do zvětšeného prohlížeče.

## 15. 9. 2026 – Zjednodušení přehledu

- Dle pokynu uživatele zúžen React katalog na 15 reprezentativních snímků samotného výběru cestujících z 11 aplikací. Přidány stručné popisy, zachovány uživatelské poznámky; původní snímky neodstraněny.

## 15. 9. 2026 – Doplnění DB Navigatoru

- Na žádost uživatele uložen přehled zvolených cestujících a doplněn do zúženého katalogu před detail věku a slev. Kopie ověřena SHA-256. Katalog má nyní 16 snímků.

## 15. 9. 2026 – IREDO na Androidu

- Uloženy dva snímky a komentáře. Uživatel oceňuje rychlé přidávání bez změny stránky, kritizuje méně viditelný tarif a směr rozbalování. Kopie ověřeny SHA-256. Do katalogu přidány dva stavy, celkem 18 snímků z 12 aplikací.

## 15. 9. 2026 – VOR na Androidu

- Uložen snímek výběru druhu jízdenky s cenami, kopie ověřena SHA-256. Doplněn do katalogu s uživatelovým postřehem o okamžité nabídce variant a cen. Celkem 19 snímků z 13 aplikací.
