# IDOS v1 – výběr jízdenek ve spodním panelu

Samostatná varianta klikacího mocku. Po stisku **Koupit** se nad výsledky vysune spodní panel inspirovaný řešením SBB. Původní mock zůstává beze změny.

## Hlavní myšlenka

- Pro anonymní tarif se nezadává jméno cestujícího.
- Panel ukazuje konkrétní produkt: **IDS JMK Základní**, **3 zóny**, **90 minut**.
- Uživatel zvolí počet jízdenek a pokračuje rovnou do souhrnu.
- Osobní údaje se mají objevit až tehdy, když je konkrétní tarif skutečně vyžaduje.

## Spuštění

Otevřít `index.html` v prohlížeči nebo spustit `spustit-mock.cmd`.

## Co lze zkoušet

- vyhledat zachycené spojení,
- otevřít výběr jízdenek tlačítkem **Koupit**,
- měnit počet jízdenek a sledovat přepočet ceny,
- přejít do souhrnu bez formuláře se jménem,
- přidat psa nebo kolo,
- vybrat platební metodu a ověřit kontrolu smluvních podmínek,
- přepnout tmavý a světlý motiv.

## Omezení

- Mock zná pouze doložený produkt IDS JMK za 33 Kč; nabídku dalších tarifů zatím nenavrhuje.
- Neprovádí síťové volání ani platbu.
- Pravidla, kdy dopravce vyžaduje osobní údaje, zatím nejsou součástí výpočtu.
