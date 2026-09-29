# Prompt pro pokračování v nové session

Pracuji na mobilním prototypu IDOS v repozitáři `C:\Users\nechanicky\Documents\ChatGPT\CHAPS`, projekt je ve složce `projekty\Prototyp vyberu cestujicicich`.

Nejprve načti a respektuj:

1. `C:\Users\nechanicky\Documents\ChatGPT\CHAPS\AGENTS.md`
2. `projekty\Prototyp vyberu cestujicicich\README.md`
3. `projekty\redesign-idos\design-system\README.md`
4. `projekty\redesign-idos\design-system\idos.css`

Pro pochopení aktuální implementace načti hlavně:

- `projekty\Prototyp vyberu cestujicicich\src\Final1Page.tsx` – společný obal a tok `final1`/`final2`
- `projekty\Prototyp vyberu cestujicicich\src\PassengerFlow.tsx` – V5 výběru, přidání a editace cestujících
- `projekty\Prototyp vyberu cestujicicich\src\App.tsx` – výsledky, souhrn jedné jízdenky a platba
- `projekty\Prototyp vyberu cestujicicich\src\MultiTicketSummary.tsx` – souhrn více jízdenek
- `projekty\Prototyp vyberu cestujicicich\src\FareFab.tsx` – alternativní tarifní nabídky
- `projekty\Prototyp vyberu cestujicicich\src\index.css` – sdílené styly
- `projekty\Prototyp vyberu cestujicicich\vite.config.ts` – vstupy `main`, `final1` a `final2`
- `.github\workflows\pages.yml` – nasazení GitHub Pages

Aktuální varianty:

- `final1`: po tlačítku **Koupit** jde uživatel přímo do Souhrnu jízdenek.
- `final2`: po tlačítku **Koupit** se nejdříve otevře nový výběr cestujících V5 a po jeho uložení pokračuje uživatel do Souhrnu jízdenek.
- Alternativní tarifní nabídky jsou v obou variantách stejné; výchozí je FAB menu podle nastavení na úvodním rozcestníku.
- Přepínač jedné/více jízdenek zůstává ve výsledcích.
- Definice cestujících jsou společné a pamatují se v prohlížeči. Vybrat lze maximálně 6 osob; uložit lze maximálně 6 oblíbených a 6 neoblíbených.
- Povinná jména se při potřebě rozbalí v doplňujících údajích. Už uložené jméno se v seznamu jen zobrazuje a mění se přes editaci.

Lokální adresy:

- `http://127.0.0.1:5174/`
- `http://127.0.0.1:5174/final1/`
- `http://127.0.0.1:5174/final2/`

Veřejné adresy po nasazení:

- `https://nechanicky-chaps.github.io/Prototyp-IDOS/final1/`
- `https://nechanicky-chaps.github.io/Prototyp-IDOS/final2/`

Referenční video současného průchodu IDOS je pouze lokálně v:

`projekty\Prototyp vyberu cestujicicich\inspiration\idos\pruchody\idos-pruchod-2026-09-29.mp4`

Video neposílej do veřejného repozitáře bez nového výslovného souhlasu uživatele. Při práci nepřistupuj na síťové disky ani UNC cesty.

Po změnách spusť:

```powershell
pnpm typecheck
pnpm build
git diff --check
```

V prohlížeči ověř oba toky. U `final2` musí platit: rozcestník → výsledky → Koupit → cestující → Souhrn jízdenek. U `final1` musí zůstat: rozcestník → výsledky → Koupit → Souhrn jízdenek.

Nezasahuj do nesouvisejících změn v pracovním prostoru a do commitu přidávej pouze soubory tohoto prototypu, které jsi skutečně změnil.
