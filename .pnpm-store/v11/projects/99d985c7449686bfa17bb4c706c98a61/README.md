# Prototyp výběru cestujících

Lokálně spustitelný export z Figma Make, upravený 17. 9. 2026.

## Spuštění

Ve složce tohoto projektu (Node.js 22.18+ nebo 24+, pnpm):

```powershell
pnpm install
pnpm dev
```

Otevřete http://127.0.0.1:5174/ nebo přímo výběr cestujících na http://127.0.0.1:5174/#cestujici.

Kontroly: `pnpm typecheck` a `pnpm build`. Sestavenou verzi lze spustit příkazem `pnpm preview` po zastavení vývojového serveru.

## Obrazovky přidání

1. **Cestující** — přehled výběru, odebrání, úprava a oblíbení.
2. **Kategorie** — samostatná obrazovka s výběrem kategorie.
3. **Průkaz** — výběr průkazu nebo pokračování bez něj.
4. **Kontrola** — souhrn a volitelné uložení jména do oblíbených.

Zpět zachovává rozpracované údaje, Zrušit zahodí rozpracované přidání. Výběr se do nákupu přenese tlačítkem Potvrdit výběr; prázdný výběr potvrdit nelze. Kliknutím na cestujícího lze upravit jeho kategorii a průkaz. Oblíbení i potvrzený výběr zůstávají při přecházení mezi obrazovkami, obnovení stránky obnoví ukázková data.

Celý průchod: Hledat → Koupit → Upravit (u cestujících) → Potvrdit výběr → Platba → Simulovat platbu.

## Rozsah prototypu

Vzhled vychází z dodaného exportu. Ostatní části původního návrhu (například doplňky, nastavení nebo alternativní tarify) zůstávají ukázkové. Kategorie a průkazy jsou převzaté z návrhu, nejsou ověřeným tarifním číselníkem. Cena je pouze demonstrace 33 Kč za osobu bez výpočtu slev. Platba je simulovaná, není připojená platební brána ani backend.

Konfigurace už nevyžaduje prostředí Figmy. Skript `scripts/vite-local.mjs` používá nativní načítání konfigurace a vypíná volitelný dotaz Vite na mapované disky (`net use`) v souladu s pravidly workspace. Server naslouchá pouze na lokální adrese 127.0.0.1. Provoz nevyžaduje externí fonty.

## Ověření

- TypeScript a produkční sestavení.
- Průchod přidáním studenta s ISIC, návrat mezi kroky a zachování údajů.
- Validace jména, uložení a opětovný výběr oblíbeného.
- Přenos počtu, cestujících a modelové ceny do souhrnu a simulace platby.
- Odebrání všech cestujících a blokování prázdného potvrzení.


## Přístup z mobilu ve stejné síti

Síťový náhled: http://192.168.0.128:5175/#cestujici (adresa počítače se může změnit).
Spuštěn jako sestavená verze příkazem `node scripts/vite-local.mjs preview --host 192.168.0.128 --port 5175`.
Počítač musí zůstat zapnutý a dostupný v síti. Osobní údaje z původního exportu byly nahrazeny ukázkovými. Generování ID cestujícího funguje i přes HTTP na lokální síťové adrese.
Ověřena HTTP odpověď 200 na LAN adrese a existující povolující pravidla firewallu pro Node v aktivním profilu Domain. Dostupnost přímo z telefonu musí potvrdit uživatel.
