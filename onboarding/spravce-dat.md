# Správce dat

## Pracovní nástroje

- 14. 9. 2026: [TT a soubory .tt](tt.md) – nástroj pro přehled vygenerovaných dat, která vstupují do IDOSu; zaznamenány dvě varianty spuštění.

## Veřejná strojově čitelná data CIS JŘ

- 14. 9. 2026, ověřeno na webu Ministerstva dopravy: veřejná linková doprava je dostupná na https://portal.cisjr.cz/pub/JDF/JDF.zip, městská drážní doprava na https://portal.cisjr.cz/pub/draha/mestske/JDF.zip. Celostátní a regionální železnice používá XML: https://portal.cisjr.cz/pub/draha/celostatni/szdc/.
- Zdroj: [Ministerstvo dopravy – Jízdní řády veřejné dopravy](https://md.gov.cz/Dokumenty/Verejna-doprava/Jizdni-rady%2C-kalendare-pro-jizdni-rady%2C-metodi-%281%29/Jizdni-rady-verejne-dopravy). Stránka odkazuje také na metodické pokyny s popisem JDF.
- Lokálně stažený balíček: `data/cisjr/JDF-linkova-2026-09-14.zip` (datum stažení, nikoliv potvrzené datum publikace). Velikost 104 057 224 bajtů, 12 954 položek archivu. V první vnitřní dávce `1.zip` ověřeny tabulky Linky, Spoje, Zastavky, Zaslinky, Zasspoje, Caskody a další. Nebyla provedena kompletní kontrola všech dávek ani porovnání s obsahem IDOS.

## 14. 9. 2026 – Tarifní údaje v JDF

- Ověřeno podle přílohy 2 metodického pokynu č. 5 (JDF 1.11): Zaslinky obsahuje nepovinné pole Tarifní pásmo, Zasspoje pole Kilometry. Číslo tarifní označuje posloupnost zastávek na lince, není cenou jízdného.
- Specifikace JDF 1.11 nepředstavuje kompletní strukturovaný ceník a tarifní pravidla pro výpočet ceny jízdenky. Pro výpočet ceny je třeba doplnit příslušné ceníky a pravidla dopravce či IDS; vyplnění tarifních pásem v celém staženém balíčku nebylo kontrolováno.
- Zdroj: https://md.gov.cz/getattachment/Dokumenty/Verejna-doprava/Jizdni-rady,-kalendare-pro-jizdni-rady,-metodi-(1)/Jizdni-rady-verejne-dopravy/metodicky-pokyn-cis-5.pdf.aspx (příloha 2, zejména strany 22–23).
