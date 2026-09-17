from pathlib import Path
import json
root=Path('projekty/redesign-idos/prototyp')
p=root/'build_catalog.py'
s=p.read_text(encoding='utf-8-sig').replace('CONFIG = [',"CONFIG = [\n ('vor','VOR','vor/android','#a3cc00',[(1,'Druh jízdenky a ceny','Cestující')]),")
s=s.replace('DESCRIPTIONS = {',"DESCRIPTIONS = {\n 'vor-001':'Tarifní varianty v jednom seznamu s cenami a informačními ikonami. Cena zůstává vidět i u vybrané položky.',")
p.write_text(s,encoding='utf-8')
p=root/'user-notes.json'
notes=json.loads(p.read_text(encoding='utf-8-sig'))
notes['vor-001']=['Rovnou mi nabídne výběr druhu jízdenky a ceny.']
p.write_text(json.dumps(notes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
p=root/'verify.cjs'
s=p.read_text(encoding='utf-8-sig').replace('count()!==12','count()!==13').replace('count()!==18','count()!==19').replace('count()!==16','count()!==17').replace('i<12','i<13').replace('12 apps, 18 images','13 apps, 19 images')
p.write_text(s,encoding='utf-8')
p=root/'README.md'
s=p.read_text(encoding='utf-8-sig').replace('18 reprezentativními snímky z 12 aplikací','19 reprezentativními snímky z 13 aplikací').replace('na 18;','na 19;').replace('PID Lítačka, IREDO','PID Lítačka, IREDO, VOR')
p.write_text(s,encoding='utf-8')
