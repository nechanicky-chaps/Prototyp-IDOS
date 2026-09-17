"""Rebuild the portable reference catalogue from local evidence. No network access."""
from pathlib import Path
import json, shutil, hashlib
from PIL import Image

ROOT = Path(__file__).resolve().parent
EVIDENCE = ROOT.parent / 'vyber-cestujicich' / 'konkurence'
VIDEO_EVIDENCE = ROOT.parent / 'Videa z appek'
ATTACH = ROOT.parents[2] / '.codex-remote-attachments' / '01a0a3b7-1525-70f3-83cd-42686cdad972'
VIDEO_CONFIG = {
 'sbb': [('Screen_Recording_20260916_083134_SBB Mobile.mp4','Průchod aplikací')],
 'iredo': [('Screen_Recording_20260916_083645_IREDO.mp4','Průchod aplikací')],
 'muj-vlak': [('Screen_Recording_20260916_084008_My Train.mp4','Průchod aplikací')],
 'dukapka': [('Screen_Recording_20260916_085954_DKapka.mp4','Průchod aplikací')],
 'oebb': [('Screen_Recording_20260916_091708_BB Tickets.mp4','Průchod aplikací')],
 'db-navigator': [('Screen_Recording_20260916_092628_DB Navigator.mp4','Průchod aplikací')],
 'vy': [('Screen_Recording_20260916_093008_Vy.mp4','Průchod aplikací')],
}
CONFIG = [
 # state: number, title, category, show on the main page
 ('idzk','IDZK','idzk/android','#101934',[(1,'Předplatní jízdenka','Předplatné',True),(2,'Výběr tarifní kategorie','Cestující',True)]),
 ('sbb','SBB Mobile','sbb/android','#e2001a',[(2,'Kdo cestuje','Cestující',True),(1,'Nový spolucestující','Cestující',True)]),
 ('odisappka','ODISapka','odisappka/android','#d71920',[(1,'Nákup jízdenek pod spojením','Cestující',True),(2,'Volba většího počtu','Cestující',True)]),
 ('virtualni-plzenska-karta','Virtuální Plzeňská karta','virtualni-plzenska-karta/android','#25ad67',[(1,'Otevřená volba tarifu','Cestující',True),(2,'Spolucestující pod formulářem','Cestující',True)]),
 ('vor','VOR','vor/android','#a3cc00',[(1,'Druh jízdenky a ceny','Cestující',True)]),
 ('iredo','IREDO','iredo/android','#009be6',[(1,'Otevřená volba tarifu','Cestující',True),(2,'Přidávání cestujících','Cestující',True)]),
 ('trenitalia','Trenitalia','trenitalia/android','#cc0033',[(1,'Úvodní vyhledání','Hledání',False),(3,'Formulář cesty','Hledání',False),(2,'Dialog cestujících','Cestující',True)]),
 ('muj-vlak','Můj vlak','muj-vlak/android/prihlaseny','#009ed0',[(3,'Hledání se souhrnem cestujících','Hledání',False),(2,'Výběr cestujících','Cestující',True),(1,'Nabídka průkazů','Slevy',False),(4,'Více průkazů u osoby','Cestující',True)]),
 ('dukapka','DUKapka','dukapka/android','#8ec63f',[(1,'Hledání spojení','Hledání',False),(2,'Přidání cestujícího v nákupu','Nákup',False),(3,'Výběr jízdného pro cestujícího','Cestující',True)]),
 ('ideska','IDESKA','ideska/android','#92e51d',[(2,'Výsledky spojení','Výsledky',False),(1,'Cestující a doplňky','Cestující',False),(3,'Souhrn s cenou','Souhrn',False),(4,'Výběr cestujících','Cestující',True),(5,'Souhrn dospělého a psa','Souhrn',False),(7,'Vstup do samostatného nákupu','Hledání',False),(6,'Cestující v samostatném nákupu','Cestující',False)]),
 ('idolka','Idolka','idolka/android','#b32245',[(4,'Vstup do nákupu jízdenek','Hledání',False),(1,'Časové jízdenky a ceny','Nákup',False),(2,'Vybraný kus bez ceny','Nákup',False),(3,'Síťové jízdenky','Nákup',False),(5,'Nový nákup z historie','Hledání',False),(6,'Historie relací','Historie',False),(7,'Kategorie a počet jízdenek','Cestující',True)]),
 ('pid-litacka','PID Lítačka','pid-litacka/android','#33105d',[(3,'Výsledky hledání s cenou','Výsledky',False),(2,'Doporučená jízdenka pro vás','Výběr jízdenky',False),(1,'Počet jízdenek pro vybranou kategorii','Cestující',True),(4,'Seznam všech variant jízdenek','Cestující',True)]),
 ('oebb','ÖBB Tickets','oebb/android','#e90024',[(1,'Formulář s cestujícím','Hledání',False),(2,'Přidávání osob','Cestující',True),(3,'Věk dítěte','Cestující',True)]),
 ('regiojet','RegioJet','regiojet/android','#ffbf00',[(1,'Formulář hledání','Hledání',False),(3,'Základní kategorie','Cestující',True),(2,'Další tarify','Cestující',True)]),
 ('flixbus','FlixBus','flixbus/android','#98d500',[(1,'Formulář hledání','Hledání',False),(2,'Cestující a jízdní kolo','Cestující',True)]),
 ('db-navigator','DB Navigator','db-navigator/android','#ef3340',[(4,'Formulář před zadáním trasy','Hledání',False),(5,'Zvolení cestující','Cestující',True),(2,'Věková kategorie a slevy','Cestující',True),(1,'Dítě – věk a slevy','Cestující',False),(3,'Další zachycený stav dospělého','Cestující',False)]),
 ('vy','Vy','vy/android','#a8dad5',[(1,'Úvodní vyhledání','Hledání',False),(2,'Výsledky spojení','Výsledky',False),(3,'Detailnější záběr výsledků','Výsledky',False),(5,'Kategorie a věk dítěte','Cestující',True),(4,'Věk dítěte a studenta','Cestující',True)]),
 ('idos','IDOS','android','#0878bd',[(1,'Vyhledání spojení','Hledání',False),(2,'Výsledky a vstup do nákupu','Výsledky',False),(3,'Cestující','Cestující',True),(4,'Nabídka jízdného','Jízdné',False),(5,'Souhrn jízdenek','Souhrn',False),(6,'Platba','Platba',False)]),
]
DESCRIPTIONS = {
 'idos-001':'Aktuální formulář spojení s oblastí, výchozím a cílovým místem, časem odjezdu a souhrnem jedné osoby v horní liště.',
 'idos-002':'Výsledky zobrazují průběh spojení, cenu a přímý vstup Koupit do navazujícího nákupního toku.',
 'idos-003':'Aktuální obrazovka jedné dospělé osoby obsahuje údaje držitele, vstup do slevových průkazů, přidání další osoby a pokračování k nabídce jízdného.',
 'idos-004':'Dvě nabídky jízdného s cenami, odkazy na detail, zvolenou variantou a pokračováním do souhrnu.',
 'idos-005':'Souhrn spojuje vybrané spojení, aktivaci, tarif a cenu; před platbou lze přidat psa nebo kolo.',
 'idos-006':'Závěrečná volba platby zobrazuje účet, e-mail, smluvní podmínky, Google Pay, platbu kartou a pokračování Zaplatit.',
 'idzk-001':'Nákup předplatní jízdenky zobrazuje relaci a zóny, počátek platnosti, zvolenou tarifní kategorii a tři délky platnosti s cenami.',
 'idzk-002':'Tarifní kategorie jsou přehledně oddělené na samostatné obrazovce do ověřené a ostatních kategorií.',
 'sbb-002':'Spodní dialog zobrazuje uložené cestující jako jednoduché řádky s volbou a editací. Pod nimi lze přidat spolucestujícího, psa nebo jízdní kolo.',
 'sbb-001':'Formulář spolucestujícího žádá jméno, příjmení a datum narození; pod základními údaji následuje výběr švýcarského cestovního průkazu.',
 'odisappka-001':'Pod detailem vybraného spojení následuje dlouhý seznam tarifních kategorií s cenou a tlačítkem Koupit. Na stejné stránce pokračuje souhrn platnosti a platba.',
 'odisappka-002':'Po zvolení jízdenky lze dalším klepnutím otevřít systémový číselný volič a nastavit vyšší počet kusů.',
 'virtualni-plzenska-karta-001':'Otevřený seznam tarifních kategorií pro cestujícího „Já“ překrývá horní část stejné stránky; pod ním zůstávají vidět počítadla spolucestujících.',
 'virtualni-plzenska-karta-002':'Výběr osoby „Já“ a počty spolucestujících jsou rozbalené přímo pod poli trasy, data a času. Seznam pokračuje až k nastavení přestupů a tlačítku pro vyhledání.',
 'vor-001':'Tarifní varianty v jednom seznamu s cenami a informačními ikonami. Cena zůstává vidět i u vybrané položky.',
 'iredo-002':'Cestující se přidává přímo v nákupu. Každá karta má vlastní počet, tarif, platnost a cenu.',
 'iredo-001':'Rozbalená nabídka tarifu překrývá karty jízdenek; kategorie se vybírá na stejné stránce.',
 'db-navigator-005':'Přehled zvolené osoby s editací, přidáním dalšího cestujícího a celkovým počtem. Nabízí také třídu, Deutschland-Ticket a reset.',
 'trenitalia-002':'Počítadla dospělých a dětí, informace pro děti do čtyř let a potvrzení s počtem osob.',
 'trenitalia-001':'Úvodní obrazovka nákupu obsahuje pole odjezdu a příjezdu se společným tlačítkem hledání.',
 'trenitalia-003':'Rozbalený formulář ukazuje relaci, datum cesty, přidání návratu, souhrn cestujících, typ cesty a další volby před hledáním.',
 'muj-vlak-001':'Seznam průkazů a slev pro zvoleného cestujícího; jednotlivé možnosti se přidávají k jeho profilu.',
 'muj-vlak-002':'Předpřipravené kombinace věku a průkazu s ovládáním počtu pomocí plus a minus.',
 'muj-vlak-003':'Formulář hledání obsahuje souhrnný řádek cestujících, ze kterého se otevírá jejich nastavení.',
 'muj-vlak-004':'Jedna osoba se třemi průkazy. Každý má vlastní křížek; další se přidává samostatnou akcí.',
 'dukapka-001':'Úvodní hledání pracuje s relací a časem; samostatná volba cestujících na zachycené obrazovce není vidět.',
 'dukapka-002':'V nákupu jízdenky se další osoba přidává akcí pro cestujícího; obrazovka současně ukazuje průběžnou cenu.',
 'dukapka-003':'Druh jízdného se vybírá v kartě jízdenky. Nabídka zahrnuje procentní slevy i kolo a psa či zavazadlo.',
 'ideska-001':'Společný seznam osob a doplňků s počítadly slouží k nastavení skupiny před pokračováním.',
 'ideska-002':'Výsledky vyhledání zobrazují nalezené spojení a navazující vstup do nákupu; cena na tomto snímku není vidět.',
 'ideska-003':'Souhrn nákupu zobrazuje relaci, zvolený tarif, platnost a cenu a umožňuje upravit cestující.',
 'ideska-004':'Společný seznam kategorií osob a doplňků, u každé počet. Zachycený stav po registraci má všechny počty nulové.',
 'ideska-005':'Souhrn společné jízdenky uvádí dospělého a psa samostatně, jejich ceny i celkovou cenu.',
 'ideska-006':'Výběr cestujících v samostatném nákupu používá stejná počítadla osob a doplňků.',
 'ideska-007':'Vstup do samostatného nákupu nabízí relaci a volby síťových nebo městských jízdenek.',
 'idolka-001':'Seznam časových jízdenek zobrazuje tarifní kategorie s cenami před volbou počtu.',
 'idolka-002':'Po výběru jedné varianty je u ní ovladač počtu; původní cena zvoleného řádku není vidět.',
 'idolka-003':'Síťové jízdenky jsou oddělené záložkou a používají stejný seznam kategorií a cen.',
 'idolka-004':'Vstupní obrazovka nákupu umožňuje přejít k časovým nebo síťovým jízdenkám.',
 'idolka-005':'Obrazovka jízdenek nabízí nový nákup a zároveň zobrazuje historii či oblíbené relace.',
 'idolka-006':'Historie uchovává dříve použitou relaci jako rychlý vstup k dalšímu nákupu.',
 'idolka-007':'Výběr kategorie jízdenky a počtu. U zvoleného dospělého je místo ceny ovladač jednoho kusu.',
 'pid-litacka-002':'Aplikace označuje jednu variantu jako „Jízdenka pro Vás“ a vysvětluje její pokrytí podle nalezené trasy.',
 'pid-litacka-003':'Ve výsledku spojení je přímo tlačítko k nákupu doporučené jízdenky s uvedenou cenou.',
 'pid-litacka-001':'Zachycený nákup nabízí počet stejných jízdenek posuvníkem 1–10. Samostatný výběr různých osob zde není vidět.',
 'pid-litacka-004':'Dlouhý seznam variant zobrazuje v řádcích cenu, časovou platnost, počet pásem a tarifní kategorii. Samostatné oddíly zahrnují také zvýhodněné a ZTP jízdenky.',
 'oebb-001':'Formulář hledání zobrazuje zvoleného cestujícího a jeho slevový stav přímo mezi údaji cesty.',
 'oebb-002':'Kategorie se přidávají tlačítky nahoře; pod nimi jsou karty jednotlivých osob se slevami a dalšími možnostmi.',
 'oebb-003':'Karta dítěte s věkem ke dni cesty, vysvětlením účelu a vlastním potvrzením.',
 'regiojet-001':'Formulář hledání obsahuje relaci, data a souhrnný řádek s počtem a kategorií cestujících.',
 'regiojet-003':'Základní věkové kategorie s počítadly, celkovým počtem a možností zobrazit další tarify.',
 'regiojet-002':'Rozbalené další tarify doplňují původní seznam a u některých položek uvádějí podmínku nebo nápovědu.',
 'flixbus-001':'Formulář hledání má relaci, datum a samostatný řádek se souhrnem cestujících a jízdních kol.',
 'flixbus-002':'Krátký seznam: dospělý, dítě a jízdní kolo. Počet se mění plus a minus.',
 'db-navigator-004':'Formulář hledání zobrazuje souhrn počtu osob a vozové třídy v jednom řádku pro cestující a jízdní kola.',
 'db-navigator-001':'Stejná obrazovka nastavení s vybranou věkovou kategorií dítěte 6–14 let a navazujícími skupinami slev.',
 'db-navigator-002':'Nejprve věková kategorie, pod ní tři rozbalovací skupiny slev. Dole je souhrn a počet.',
 'db-navigator-003':'Další dodaný snímek zachycuje stejný stav dospělého 27–64 let a stejnou nabídku slev.',
 'vy-001':'Úvodní obrazovka nabízí zadání výchozího a cílového místa a přidání dalšího bodu cesty.',
 'vy-002':'Po vyhledání zůstává souhrn trasy, cestujícího a času nahoře; výsledky spojení pokračují pod ním v jednom proudu.',
 'vy-003':'Detailnější výřez stejného seznamu ukazuje časy, dopravní prostředek, podrobnosti a cenu jednotlivých spojení.',
 'vy-005':'Kategorie s počítadly. Po přidání dítěte je vidět pole věku a vysvětlení rozdílných věkových hranic.',
 'vy-004':'Vybrané dítě a student mají vlastní pole věku a vysvětlující text.',
}

user_notes = json.loads((ROOT/'user-notes.json').read_text(encoding='utf-8-sig'))
data = []
for slug, name, folder, color, states in CONFIG:
    screens = []
    for number, title, category, featured in states:
        if slug == 'vy':
            # Use explicitly supplied originals; previous agent's filenames do not map to the shown states.
            src = ATTACH / 'a6c9660e-313c-4369-98b2-302eaddaae6b' / f'{number}-Photo-{number}.jpg'
        else:
            evidence_folder = (ROOT.parent / 'vyber-cestujicich' / 'idos' / folder) if slug == 'idos' else (EVIDENCE / folder)
            matches = list(evidence_folder.glob(f'20??-??-??_{number:03d}_*.jpg'))
            if len(matches) != 1: raise RuntimeError((slug, number, matches))
            src = matches[0]
        target = ROOT / 'assets' / slug / f'{number:03d}.jpg'
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, target)
        sha = hashlib.sha256(src.read_bytes()).hexdigest()
        assert sha == hashlib.sha256(target.read_bytes()).hexdigest()
        with Image.open(src) as img: width, height = img.size
        screens.append(dict(id=f'{slug}-{number:03d}', title=title, category=category, featured=featured,
            src=target.relative_to(ROOT).as_posix(), width=width, height=height,
            source=str(src), sha256=sha, description=DESCRIPTIONS[f'{slug}-{number:03d}'], userNotes=user_notes.get(f'{slug}-{number:03d}', []), note='Další příloha stejného viditelného stavu.' if slug=='db-navigator' and number==3 else ''))
    videos = []
    for index, (filename, title) in enumerate(VIDEO_CONFIG.get(slug, []), start=1):
        src = VIDEO_EVIDENCE / filename
        if not src.is_file(): raise RuntimeError((slug, filename))
        target = ROOT / 'assets' / 'videos' / f'{slug}-{index:03d}.mp4'
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, target)
        sha = hashlib.sha256(src.read_bytes()).hexdigest()
        assert sha == hashlib.sha256(target.read_bytes()).hexdigest()
        videos.append(dict(id=f'{slug}-video-{index:03d}', title=title,
            src=target.relative_to(ROOT).as_posix(), source=str(src), sha256=sha))
    data.append(dict(id=slug, name=name, color=color, screens=screens, videos=videos))
(ROOT/'catalog.js').write_text('window.MOBILE_CATALOG = '+json.dumps(data, ensure_ascii=False, indent=2)+';\n', encoding='utf-8')
print(f'{len(data)} aplikací, {sum(len(x["screens"]) for x in data)} ověřených originálů.')

