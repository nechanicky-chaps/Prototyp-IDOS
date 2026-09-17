from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
root = Path(__file__).resolve().parent
with ZipFile(root/'mobilni-rozhrani.zip', 'w', ZIP_DEFLATED) as out:
    for name in ['index.html','styles.css','app.js','catalog.js','user-notes.json','README.md','spustit-prototyp.cmd','build_catalog.py','verify.cjs']:
        out.write(root/name, 'mobilni-rozhrani/'+name)
    catalog = json.loads((root/'catalog.js').read_text(encoding='utf-8-sig').removeprefix('window.MOBILE_CATALOG = ').rstrip(';\n'))
    for app in catalog:
        for screen in app['screens']:
            out.write(root/screen['src'], 'mobilni-rozhrani/'+screen['src'])
    for dirname in ['vendor']:
        for p in (root/dirname).rglob('*'):
            if p.is_file(): out.write(p, 'mobilni-rozhrani/'+p.relative_to(root).as_posix())
print((root/'mobilni-rozhrani.zip').stat().st_size)

