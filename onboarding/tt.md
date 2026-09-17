# TT – pracovní nástroj pro přehled dat IDOS

Zaznamenáno: 14. 9. 2026. Zdroj: sdělení uživatele.

## Spuštění

| Příkaz | Použití podle uživatele |
| --- | --- |
| `R:\aplikace\TT\Instal\TT.exe /k` | Běžně používané spuštění pracovního nástroje TT. Přesný význam přepínače `/k` zatím nebyl popsán. |
| `R:\aplikace\TT\Instal\TT.exe /w:t` | Spuštění s okamžitým otevřením nabídky odjezdů. |

## Práce se soubory

V aplikaci TT se budou otevírat všechny potřebné soubory `.tt`. Poskytují přehled toho, co je vygenerované a vstupuje do aplikace IDOS.

Konkrétní umístění a názvy souborů `.tt` zatím nebyly uvedeny.

Pro hledání adresářů je k dispozici [lokální výpis složky R:\TTData](podklady/tree-ttdata.txt), dodaný uživatelem 14. 9. 2026. Obsahuje například větev `R:\TTData\TT`. Konkrétní soubory `.tt` je stále potřeba určit z dalších podkladů uživatele.

## Vzhled aplikace – přehled spojů

Zdroj: snímek obrazovky dodaný uživatelem 14. 9. 2026. Popis vychází pouze z obrázku.

[Snímek aplikace TT](podklady/tt-prehled-spoju.png)

- Titulek okna: `rj 50 Vindobona - spoje - Vlaky 2026 (CIS JŘ)`.
- Horní nabídka: Soubor, Zobrazit, Vyhledat, Okno, Nápověda.
- Panel nástrojů: Jízd. řád, Možnosti, Tisk, Kopírovat, Spojení, Odjezdy a Spoje.
- Levý panel obsahuje seznam spojů, jejich druh, číslo, název a další značky. Vybrán je spoj **rj 50 Vindobona**.
- Pravý panel zobrazuje stanice vybraného spoje a sloupce Pozn., Příj., Odj. a km.
- Spodní panel **Poznámky** obsahuje údaje o dopravcích a vybavení či službách spoje, například možnost zakoupit místenku, restaurační vůz, palubní portál, internet, přípojku 230 V, tichý oddíl, oddíly pro cestující s dětmi, dětské kino a přepravu kol.
- Stavový řádek uvádí `Spoj 1 z 16675`.

### Příklad detailu z obrázku

| Stanice | Příjezd | Odjezd | km |
| --- | --- | --- | --- |
| Wien Hbf | — | 21:10 | 0 |
| Břeclav | 22:04 | 22:12 | 90 |
| Brno hl.n. | 22:41 | — | 149 |

Jde o zachycený obsah aplikace, nikoli ověřený aktuální jízdní řád. Název otevřeného souboru `.tt` ani jeho cesta nejsou na snímku vidět.

## Omezení pro agenty

Síťové cesty a příkazy jsou pouze referenční zápis pro uživatele. **Agenti nesmí přistupovat na síťové disky**, tedy ani spouštět uvedenou aplikaci nebo otevírat soubory ze síťových umístění. Příkazy nebyly spuštěny ani ověřovány.
