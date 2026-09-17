# ÖBB Tickets – Android

Zápis 15. 9. 2026. Zdroj: tři screenshoty a komentář uživatele. Android dle rozsahu testů; zobrazená pojmenovaná osoba sama nepotvrzuje přihlášení. Verze aplikace a OS neznámé. Originály zachovány, kopie ověřeny SHA-256. Bez samostatného testu aplikace.

## Hlavní zjištění

- Uživatel potvrzuje a první snímek dokládá výběr cestujících přímo ve formuláři před Find. Dříve popsaný postup ÖBB až po hledání se týkal webové testované cesty; nelze jej přenášet na aplikaci.
- Přidávání kategorií přes plus nahoře a karty osob níže odpovídá vzoru zachycenému na webu. Uživatel tuto podobnost výslovně uvádí.
- Uživatel oceňuje zadání samotného věku místo data narození. Karta dítěte ukazuje Age 12 ke konkrétnímu dni cesty a vysvětlení hledání vhodných slev. Toto nedokládá, že aplikace nikdy nevyžaduje datum narození v jiném kroku.
- U osoby jsou dostupné sleva a asistence; u dítěte také přidání do oblíbených. Účinek těchto akcí nebyl předveden.

## Inspirace pro IDOS

Věk ke dni cesty žádat tam, kde pro daný účel stačí, s konkrétním datem a důvodem. U uložené osoby následně vyřešit aktuálnost věku při opakovaném použití; mechanismus ÖBB zatím neznáme. Zachovat stejné pojmy a podobné ovládání napříč webem a aplikací.

Ověřit orientaci ve dvou potvrzeních: vlastní OK u věku a společné OK nad kartami. Na snímku je společné OK šedé, příčinu nelze spolehlivě určit. Při více osobách také ověřit potřebné posouvání mezi kartami a horním přidáváním.

## Podklady

- [Formulář s cestujícím](2026-09-15_001_formular-s-cestujicim.jpg) · [poznámky](2026-09-15_001_formular-s-cestujicim.md)
- [Plusy a karta](2026-09-15_002_plusy-a-karta-profilu.jpg) · [poznámky](2026-09-15_002_plusy-a-karta-profilu.md)
- [Věk a oblíbené](2026-09-15_003_vek-ditete-a-oblibene.jpg) · [poznámky](2026-09-15_003_vek-ditete-a-oblibene.md)
