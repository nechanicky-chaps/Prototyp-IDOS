from pathlib import Path
p=Path('projekty/redesign-idos/prototyp/verify.cjs')
s=p.read_text(encoding='utf-8-sig').replace('count()!==45','count()!==15').replace('count()!==29','count()!==14').replace('11 apps, 45 images','11 apps, 15 images').replace('keyboard, filter, expansion','keyboard, descriptions, expansion')
s='\n'.join(line for line in s.splitlines() if not any(x in line for x in ["name:'Výsledky'", "Error('Filter count')", "name:'Všechny obrazovky'", "name:'Otevřít cestující',exact:true"]))+'\n'
s=s.replace("await page.locator('img').evaluateAll", "if(await page.locator('.caption .screen-description').count()!==15)throw Error('Description count');\nawait page.locator('img').evaluateAll")
p.write_text(s,encoding='utf-8')
p=Path('projekty/redesign-idos/prototyp/package_catalog.py')
s=p.read_text(encoding='utf-8-sig').replace('import Path','import Path')
s=s.replace('from zipfile import ZipFile, ZIP_DEFLATED','from zipfile import ZipFile, ZIP_DEFLATED\nimport json')
s=s.replace("    for dirname in ['assets','vendor']:","    catalog = json.loads((root/'catalog.js').read_text(encoding='utf-8-sig').removeprefix('window.MOBILE_CATALOG = ').rstrip(';\\n'))\n    for app in catalog:\n        for screen in app['screens']:\n            out.write(root/screen['src'], 'mobilni-rozhrani/'+screen['src'])\n    for dirname in ['vendor']:")
p.write_text(s,encoding='utf-8')
