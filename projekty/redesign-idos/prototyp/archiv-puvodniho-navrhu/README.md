# Mobilní UX Prototyp – Výběr cestujících a vyhledávání

Interaktivní webová aplikace postavená v Reactu simulující mobilní toky nákupu jízdenek u konkurence a návrh pro redesign IDOS.

## Jak prototyp spustit

1. **Nejjednodušší způsob:** Dvojklik na soubor [spustit-prototyp.cmd](spustit-prototyp.cmd), který otevře prototyp ve výchozím webovém prohlížeči.
2. **Přímo přes prohlížeč:** Otevřete soubor [index.html](index.html) v Chrome, Edge nebo Firefoxu.
3. Není potřeba žádná instalace Node.js, npm ani build – aplikace běží plně samostatně v prohlížeči (React 18 + Tailwind CSS + Babel CDN).

## Co je v prototypu obsaženo

### 1. 🇳🇴 Vy.no (Android) – Kompletní interaktivní flow
- **Krok 1: Úvodní hledání (Search)** – čistý formulář, rychlý výběr polohy (*My position*), doplňkové služby.
- **Krok 2: Výsledky spojení (Results)** – kompaktní sticky lišta s parametry cesty a souhrnem cestujících přímo nad výsledky; plynulé scrollování spojů s cenami *From NOK ...*.
- **Krok 3: Výběr cestujících a doplňků (Passengers modal)**:
  - Počítadla dospělých, dětí, studentů, seniorů a armády.
  - **Dynamické zadání věku:** U *Child/youth* a *Student* se po navýšení na 1+ dynamicky zobrazí vysvětlení a číselné pole pro věk.
  - **Integrované doplňky:** Kola, kočárky, zvířata a invalidní vozík přímo pod osobami.
  - Vazba na rodinné profily (*Family and friends*).
- **Krok 4: Košík / Souhrn a jízdenka (Cart)** – rozpad ceny na jednotlivé cestující podle slev (50 % dítě, 25 % student), doplňky a celková suma.

### 2. 🇩🇪 DB Navigator & 🇨🇿 IDOS Koncept
- Přepínání v horní liště pro srovnání architektur (dvoustupňový model DB Navigatoru vs. modulární seznam Vy vs. návrh řešení pro IDOS).

### 3. Interaktivní ovládací panel (vpravo od telefonu)
- Živé sledování stavu cestujících a doplňků.
- Dynamický přepočet kalkulované ceny.
- Tlačítka pro rychlé přednastavené scénáře (např. *1 dospělý + dítě 7 let*, *dítě + student s věkem*, *2 dospělí + 2 kola*).
- Tlačítko pro okamžitý reset do výchozího stavu.
- Analytické poznatky a doporučení pro IDOS Redesign.
