# Architektura prodeje jízdenek v IDOSu/CP.sk

Zaznamenáno: 14. 9. 2026.

Zdroj: fotografie schématu dodaná uživatelem, který ji označil jako architekturu prodeje jízdenek IDOS. Níže je přepis čitelných tištěných částí, nikoli nezávislé ověření aktuálního systému. Datum a verze schématu nejsou známy.

[Původní fotografie](podklady/architektura-prodeje-jizdenek-idos.jpg)

## Součásti a jejich role podle schématu

| Součást | Popis |
| --- | --- |
| Klienti | Mobilní IDOS/CP, webový IDOS/CP, aplikace IDOS/CP pro Android a pro iOS. |
| CRWS | Vyhledání spojení; ve schématu uveden timeout 8 s. |
| Data o prodejnosti spojů | Podklad pro základní cenovou nabídku; drobný popisek aktualizace dat je vhodné ověřit z kvalitnější předlohy. |
| Ticket Server | Vytváření cenové nabídky a jízdenky; ve schématu uveden timeout 10 s. |
| E-shopWS | Prodej jízdenek. |
| Pluginy | AMS, ARR (Ileto), ČD, FB, LE, RJ, DÚK, JK, JMK, OK, PK, ZK. |
| Rezervační API | Rozhraní pro prodej/koupi jízdenky a její rezervaci u dopravců. Ve spodním bloku jsou uvedeny také APV, ČE a Alpine. |
| Platební brány | Samostatná součást připojená k prodejnímu toku. |
| Žurnál ČD | Samostatná součást propojená s prodejní částí schématu. |

## Oblasti procesu

Schéma barevně vyznačuje tyto oblasti:

1. Vytvoření základní cenové nabídky – CRWS a data o prodejnosti spojů.
2. Vytvoření kompletní cenové nabídky a její editace – Ticket Server a E-shopWS.
3. Rezervace, zaplacení a vytvoření jízdenky – oblast klientů a platebních bran.
4. Vrácení jízdenky – oblast navázaná na E-shopWS.

Diagram rozlišuje klienty, součásti pod správou CHAPSu a rezervační API. Ticket Server je propojen s pluginy, které zprostředkovávají napojení na rezervační API. Detailní pořadí volání, směry všech šipek a chybové stavy nejsou v tomto zápisu dovozovány.

## K ověření při onboardingu

- Platnost a verze schématu, zejména uvedené timeouty.
- Význam zkratek pluginů a jejich konkrétní protistrany.
- Přesné rozdělení odpovědností mezi Ticket Server a E-shopWS.
- Role Žurnálu ČD a návaznost při nákupu a vrácení jízdenky.
- Význam žlutého zvýraznění některých rezervačních API.
- Ruční poznámky a drobné popisky: fotografie je místy obtížně čitelná, proto nejsou považovány za spolehlivě přepsané informace.
