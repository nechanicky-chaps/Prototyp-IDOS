from pathlib import Path
p=Path('projekty/redesign-idos/prototyp/build_catalog.py')
s=p.read_text(encoding='utf-8-sig')
start=s.index('CONFIG = [')
end=s.index('\nuser_notes =',start)
s=s[:start]+'''CONFIG = [
 ('trenitalia','Trenitalia','trenitalia/android','#cc0033',[(2,'Dialog cestujících','Cestující')]),
 ('muj-vlak','Můj vlak','muj-vlak/android/prihlaseny','#009ed0',[(2,'Výběr cestujících','Cestující'),(4,'Více průkazů u osoby','Cestující')]),
 ('dukapka','DUKapka','dukapka/android','#8ec63f',[(3,'Výběr jízdného pro cestujícího','Cestující')]),
 ('ideska','IDESKA','ideska/android','#92e51d',[(4,'Výběr cestujících','Cestující')]),
 ('idolka','Idolka','idolka/android','#b32245',[(7,'Kategorie a počet jízdenek','Cestující')]),
 ('pid-litacka','PID Lítačka','pid-litacka/android','#33105d',[(1,'Počet jízdenek pro vybranou kategorii','Cestující')]),
 ('oebb','ÖBB Tickets','oebb/android','#e90024',[(2,'Přidávání osob','Cestující'),(3,'Věk dítěte','Cestující')]),
 ('regiojet','RegioJet','regiojet/android','#ffbf00',[(3,'Základní kategorie','Cestující'),(2,'Další tarify','Cestující')]),
 ('flixbus','FlixBus','flixbus/android','#98d500',[(2,'Cestující a jízdní kolo','Cestující')]),
 ('db-navigator','DB Navigator','db-navigator/android','#ef3340',[(2,'Věková kategorie a slevy','Cestující')]),
 ('vy','Vy','vy/android','#a8dad5',[(5,'Kategorie a věk dítěte','Cestující'),(4,'Věk dítěte a studenta','Cestující')]),
]
DESCRIPTIONS = {
 'trenitalia-002':'Počítadla dospělých a dětí, informace pro děti do čtyř let a potvrzení s počtem osob.',
 'muj-vlak-002':'Předpřipravené kombinace věku a průkazu s ovládáním počtu pomocí plus a minus.',
 'muj-vlak-004':'Jedna osoba se třemi průkazy. Každý má vlastní křížek; další se přidává samostatnou akcí.',
 'dukapka-003':'Druh jízdného se vybírá v kartě jízdenky. Nabídka zahrnuje procentní slevy i kolo a psa či zavazadlo.',
 'ideska-004':'Společný seznam kategorií osob a doplňků, u každé počet. Zachycený stav po registraci má všechny počty nulové.',
 'idolka-007':'Výběr kategorie jízdenky a počtu. U zvoleného dospělého je místo ceny ovladač jednoho kusu.',
 'pid-litacka-001':'Zachycený nákup nabízí počet stejných jízdenek posuvníkem 1–10. Samostatný výběr různých osob zde není vidět.',
 'oebb-002':'Kategorie se přidávají tlačítky nahoře; pod nimi jsou karty jednotlivých osob se slevami a dalšími možnostmi.',
 'oebb-003':'Karta dítěte s věkem ke dni cesty, vysvětlením účelu a vlastním potvrzením.',
 'regiojet-003':'Základní věkové kategorie s počítadly, celkovým počtem a možností zobrazit další tarify.',
 'regiojet-002':'Rozbalené další tarify doplňují původní seznam a u některých položek uvádějí podmínku nebo nápovědu.',
 'flixbus-002':'Krátký seznam: dospělý, dítě a jízdní kolo. Počet se mění plus a minus.',
 'db-navigator-002':'Nejprve věková kategorie, pod ní tři rozbalovací skupiny slev. Dole je souhrn a počet.',
 'vy-005':'Kategorie s počítadly. Po přidání dítěte je vidět pole věku a vysvětlení rozdílných věkových hranic.',
 'vy-004':'Vybrané dítě a student mají vlastní pole věku a vysvětlující text.',
}
''' + s[end:]
s=s.replace("source=str(src), sha256=sha, userNotes=", "source=str(src), sha256=sha, description=DESCRIPTIONS[f'{slug}-{number:03d}'], userNotes=")
p.write_text(s,encoding='utf-8')
p=Path('projekty/redesign-idos/prototyp/app.js')
s=p.read_text(encoding='utf-8-sig')
s=s.replace(" const [category,setCategory] = useState('Všechny obrazovky');\n",'')
s=s.replace('Mobilní aplikace vedle sebe. Hledání, cestující a nákup tak, jak byly zachyceny při testování.','Jen výběr cestujících: reprezentativní obrazovky, stručný popis a tvoje poznámky.')
start=s.index("    h('div',{className:'toolbar'}")
end=s.index('\n    apps.map',start)
s=s[:start]+"    h('div',{className:'toolbar'},h('span',{className:'selection-summary'},total+' vybraných snímků · '+apps.length+' aplikací'),h('label',{className:'size-label'},'Velikost ',h('select',{value:size,onChange:e=>setSize(e.target.value),'aria-label':'Velikost ukázek'},h('option',{value:'normal'},'Standardní'),h('option',{value:'large'},'Větší')))),"+s[end:]
s=s.replace("const screens=a.screens.filter(s=>category==='Všechny obrazovky'||s.category===category);","const screens=a.screens;")
s=s.replace("+' dodaných obrazovek'","+' vybraných snímků'")
s=s.replace("h('h3',null,s.title),s.note", "h('h3',null,s.title),h('p',{className:'screen-description'},s.description),s.note")
s=s.replace("(hotspots[selected.id]||[]).map", "(hotspots[selected.id]||[]).filter(spot=>viewer.app.screens.some(s=>s.id===spot.to)).map")
s=s.replace("h('div',{className:'viewer-notes'},h(UserNotes,{screen:selected}))", "h('div',{className:'viewer-notes'},h('p',{className:'screen-description'},selected.description),h(UserNotes,{screen:selected}))")
s=s.replace("'DODANÉ STAVY'","'VYBRANÉ SNÍMKY'")
p.write_text(s,encoding='utf-8')
