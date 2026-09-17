# DUKapka – Android

Zápis 15. 9. 2026. Zdroj: tři screenshoty a komentář uživatele. Android dle potvrzeného rozsahu testů; přihlášení ani verze aplikace nejsou známy. Originály JPG zachovány, shoda kopií ověřena SHA-256. Bez samostatného testu aplikace.

## Pozorování a hodnocení uživatele

- Hledání nevyžaduje výběr cestujících; osoby se přidávají až při nákupu plusem.
- Uživatel to považuje za logické kvůli zákazníkům s předplatními jízdenkami. Jde o jeho vysvětlení, nikoli ověřený údaj o zákaznících nebo záměru návrhářů.
- Výběr je podle uživatele minimalistický, ale vyžaduje volbu jízdného, jehož význam zákazník nemusí znát.

## Doložený stav

Vyhledávání nemá viditelný výběr cestujících. Nákup obsahuje karty jízdenek s počtem, jízdným a platností. Vedle zvýšení počtu v kartě existuje zvláštní akce Cestující s plus; třetí snímek ukazuje dvě samostatné karty.

Nabídka jízdného obsahuje plné, zvýhodněné 50 %, jízdní kolo, pes/zavazadlo a zvýhodněné 25 %. Podmínky slev nejsou v této nabídce vysvětleny. U Jízdné je informační ikona; její obsah zatím nemáme, proto nelze tvrdit, že vysvětlení v aplikaci chybí úplně. Platnost nebo nárok na jednotlivé tarify jsme neověřovali.

Na vyhledávací obrazovce je ikona vozíku, ale její chování není doloženo. Nevyvozovat z ní automatické filtrování bezbariérových spojů.

## Inspirace pro IDOS

Minimalistické rozhraní hodnotit také podle srozumitelnosti názvů. Návrh k testování: doplnit přímo k variantě jízdného krátké vysvětlení, pro koho platí, případně odvodit tarif z věku a průkazu. Konkrétní nároky neodhadovat podle procenta slevy. Samotné zadání více průkazů IDOS již podporuje.

Rozlišit zvýšení počtu stejných jízdenek od přidání osoby s jiným jízdným. Jednoduché hledání pro uživatele s předplatným je podnět ke srovnání s nákupním scénářem.

## Další ověření

Obsah informační ikony u Jízdné, chování obou způsobů přidávání, přehlednost skupiny s různým jízdným a funkce ikony vozíku.

## Podklady

- [Hledání](2026-09-15_001_hledani-bez-cestujicich.jpg) · [poznámky](2026-09-15_001_hledani-bez-cestujicich.md)
- [Nákup](2026-09-15_002_nakup-pridani-cestujiciho.jpg) · [poznámky](2026-09-15_002_nakup-pridani-cestujiciho.md)
- [Nabídka jízdného](2026-09-15_003_nabidka-jizdneho.jpg) · [poznámky](2026-09-15_003_nabidka-jizdneho.md)

## Doplnění uživatele – 15. 9. 2026: jednotný samostatný nákup

Uživatel v diktátu uvádí „CAPTCHA“; podle předchozího kontextu pracovně přiřazujeme poznámku k DUKapce. Nový screenshot nedodán. Při případném upřesnění aplikace zápis opravit.

Podle uživatele lze nakupovat i bez předchozího vyhledání spoje. Tento postup se uživatelsky prakticky neliší od nákupu ze spojení: v obou se volí relace a cestující. Uživatel jednotnost hodnotí pozitivně. Dřívější popis cestujících až při nákupu tím zůstává platný, ale nákup ze spojení není jediným vstupem. Nejde o ověření tarifní nevázanosti každého produktu na konkrétní spoj.

**Inspirace pro IDOS:** různé vstupy do nákupu mohou vést ke společnému formuláři se stejnými pojmy a ovládáním. Při příchodu ze spojení dává smysl převzít již známé údaje; zda a které údaje DUKapka skutečně přebírá, zatím nebylo popsáno. Jednotnost postupu neznamená, že uživatel musí již zadané údaje vyplňovat znovu.

**K ověření:** rozsah předvyplnění relace a cestujících při obou vstupech, zachování voleb při návratu a počet skutečných akcí. Tvrzení o podobnosti vychází z uživatelova testu, nikoli nově zachycené sekvence.
