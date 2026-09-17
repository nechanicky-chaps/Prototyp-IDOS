"""Lokální, proudové ověření a výřez logu; žádný síťový přístup."""
from pathlib import Path
import csv
import hashlib
import json
import zlib
import zipfile

base = Path(__file__).resolve().parent
source = base / 'logy/260915_Request.log'
keys = [
    b'aristippos@yahoo.com', b'd3990868-8b70-4f14-0000-019a741fbb21',
    b'83fb78ba679bf92c', b'b28a4093-3471-43be-82a7-f589af9960e2',
    b'411aa6bf-5d1e-4609-9af6-ca01469ab313', b'c98bff55-9c24-45ff-91a5-521f837966fc',
    b'ff27d47a-5d18-44c6-9e75-bec1062b56dc', b'c6e4e8af-b57a-4733-819e-4563e97104fc',
    b'293081450', b'304318639', b'6irv-mnxm-ktn3',
]
sha = hashlib.sha256()
crc = 0
count = 0
email_count = 0
with source.open('rb') as src, (base / 'vyrez-uzivatele.log').open('wb') as dst, (base / 'casova-osa.csv').open('w', encoding='utf-8-sig', newline='') as tab:
    writer = csv.writer(tab, delimiter=';')
    writer.writerow(['Radek_zdroje', 'Cas', 'Operace', 'Vysledek', 'Ciselne_pole_logu', 'Parametry'])
    for number, raw in enumerate(src, 1):
        sha.update(raw)
        crc = zlib.crc32(raw, crc)
        lower = raw.lower()
        email_count += b'aristippos@yahoo.com' in lower
        if any(key in lower for key in keys):
            count += 1
            dst.write(str(number).encode() + b':' + raw)
            fields = raw.decode('utf-8').rstrip('\r\n').split('\t')
            writer.writerow([number, fields[0], fields[8], fields[9], fields[10], fields[11]])
with zipfile.ZipFile(base / '260915_Request.zip') as archive:
    entry = archive.getinfo(source.name)
    assert entry.file_size == source.stat().st_size
    assert entry.CRC == crc, 'CRC rozbaleného souboru nesouhlasí se ZIPem'
result = dict(source=source.name, bytes=source.stat().st_size, lines=number, matches=count,
              email_matches=email_count, sha256=sha.hexdigest(), crc32=f'{crc:08x}', zip_crc_verified=True,
              selectors=[key.decode() for key in keys])
(base / 'overeni.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(result, ensure_ascii=False, indent=2))
