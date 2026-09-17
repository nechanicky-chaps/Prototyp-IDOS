from pathlib import Path
import json
root=Path('projekty/redesign-idos/prototyp')
p=root/'build_catalog.py'
s=p.read_text(encoding='utf-8-sig').replace('CONFIG = [',"CONFIG = [\n ('iredo','IREDO','iredo/android','#009be6',[(2,'Přidávání cestujících','Cestující'),(1,'Otevřená volba tarifu','Cestující')]),")
s=s.replace('DESCRIPTIONS = {',"DESCRIPTIONS = {\n 'iredo-002':'Cestující se přidává přímo v nákupu. Každá karta má vlastní počet, tarif, platnost a cenu.',\n 'iredo-001':'Rozbalená nabídka tarifu překrývá karty jízdenek; kategorie se vybírá na stejné stránce.',")
p.write_text(s,encoding='utf-8')
p=root/'user-notes.json'
notes=json.loads(p.read_text(encoding='utf-8-sig'))
notes['iredo-002']=['Přidávání člověka je docela příjemné. Je to rychlé a nemusím chodit na jinou stránku.']
notes['iredo-001']=['Volba tarifu je méně viditelná. Rozbalovací menu se mi otevírá různými směry a působí trochu zmateně.']
p.write_text(json.dumps(notes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=root/'verify.cjs'
s=p.read_text(encoding='utf-8-sig').replace('count()!==11','count()!==12').replace('count()!==16','count()!==18').replace('count()!==14','count()!==16').replace('i<11','i<12').replace('11 apps, 16 images','12 apps, 18 images')
p.write_text(s,encoding='utf-8')
p=root/'README.md'
s=p.read_text(encoding='utf-8-sig').replace('16 reprezentativními snímky z 11 aplikací','18 reprezentativními snímky z 12 aplikací').replace('ze 45 na 16','na 18').replace('DUKapka, Idolka, PID Lítačka','DUKapka, Idolka, PID Lítačka, IREDO')
p.write_text(s,encoding='utf-8')
