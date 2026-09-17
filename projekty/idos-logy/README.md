# Slovník operací IDOS a čtení logů

Průběžná znalostní báze pro analýzu provozních logů. Poslední doplnění: 17. 9. 2026.

## Zdroje a míra jistoty

- **Potvrzeno uživatelem:** významy operací a vazby na chování aplikace níže, sdělené 17. 9. 2026. Jde o znalost konkrétního systému, nikoli obecnou interpretaci názvů funkcí.
- **Pozorováno v logu:** přesný název, parametry, výsledek a posloupnost v místním `260915_Request.log`.
- **Doloženo dokumentací:** existence endpointu, HTTP metoda a schéma ve stažené specifikaci.
- **Odvozená vazba:** přiřazení interní operace k endpointu podle významu a parametrů. Bez routy v logu nebo zdrojového kódu není potvrzeným voláním endpointu.

## Význam operací potvrzený uživatelem

Podle uživatele přípona **`Common` označuje úspěšnou operaci**. Úspěch operace není totéž co kladný obchodní výsledek: například úspěšný dotaz na možnosti vrácení může vrátit nulovou masku. Co přesně znamenají varianty bez `Common`, zatím není určeno.

| Operace v logu | Význam a kontext aplikace |
|---|---|
| `GetTicketsCommon` | Načtení seznamu jízdenek, který aplikace zobrazuje. |
| `CreateBasketCommon` | Vytvoření košíku k platbě, odpovídá obrazovce **Souhrn jízdenek** (005). |
| `AddToBasketCommon` | Úspěšné vložení všech jízdenek potřebných pro vybrané spojení do košíku / souhrnu. Jedno spojení může vyžadovat dvě či tři jízdenky. Aplikace neumožňuje postupně skládat více samostatných spojení do jednoho společně placeného košíku. |
| `GetPaymentTypes2Common` | Načtení platebních možností pro obrazovku **Platba** (006). Nabídka závisí na platformě (např. Apple Pay na Apple) a tom, co dopravci povolují. `2` označuje novější funkci, nikoli počet plateb. |
| `PaymentStart2Common` | Uživatel vybral způsob platby a chce zaplatit. |
| `PaymentInitCommon` | Začátek platby a ověření požadovaného zabezpečení. |
| `ProcessPaymentCommon` | Platba proběhla a operace vrátila počet jízdenek. |
| `GetHistoryTicketsCommon` | Dočítání starších jízdenek při procházení seznamu. Uživatel popisuje gesto „potáhnu dolů (resp. chci rolovat seznamem nahoru)“. Význam je načtení historie; nezaměňovat automaticky s obnovením aktuálních jízdenek. Přesný směr prstu a obsahu při testování zaznamenat zvlášť. |
| `GetReturnOperationMaskCommon` | Zjištění, zda je možné jízdenku vrátit. |
| `RefundTicket1Common` | Zahájení / inicializace vrácení jízdenky; uživatel označuje zkráceně „Refund1“. Přesný název ověřen v logu. |
| `RefundTicket2Common` | Potvrzení vrácení jízdenky; uživatel označuje zkráceně „Refund2“. Přesný název ověřen v logu. |

Referenční obrázky: [005 – Souhrn jízdenek](../redesign-idos/prototyp/assets/idos/005.jpg), [006 – Platba](../redesign-idos/prototyp/assets/idos/006.jpg). Jde o ilustrace obrazovek, nikoli snímky obrazovky zákazníka z analyzovaného incidentu. Na 006 jsou vidět možnosti Google Pay a platební karta; z obrázku nelze odvodit číselný platební typ v logu.

## Kandidátní vazby na endpointy

Zdroj: [Swagger testovací služby](https://eshopwstestcore.crws.cz/swagger/index.html), načteno 17. 9. 2026. Lokální snímky: [prodejní API v2](swagger/api-v2.json), [legacy API](swagger/legacy.json). Administrativní specifikace nebyla pro toto porovnání načítána. Nebyl proveden žádný obchodní požadavek ani použit Swagger „Try it out“.

Následující cesty jsou přesně klíče `paths` ve specifikacích. Tabulka označuje **kandidáty**, ne ověřený call graph. Jedna interní funkce může být sdílena více endpointy.

| Operace | Legacy kandidát | API v2 kandidát | Podklad |
|---|---|---|---|
| `CreateBasketCommon` | `POST /JSON.svc/{userId}/basket` | `POST /basket/create` | Význam vytvoření košíku, parametr `customerId`. |
| `AddToBasketCommon` | `PUT /JSON.svc/{userId}/basket/{basketId}` | `POST /basket/{basketId}/add` | U legacy se shodují i `priceHandle`, `connHandleThere`, `connIdThere`, `connHandleBack`, `connIdBack` z logu. |
| `PaymentStart2Common` | V načtené legacy specifikaci nenalezen | `POST /payment/{basketId}/start` | `basketId`, tělo `PaymentStartRequest`, odpověď `PaymentStartResponse`. |
| `GetReturnOperationMaskCommon` | `GET /JSON.svc/{userId}/tickets/{ticketId}/refund` | `POST /refund/check` | Výpočet možností vrácení; legacy má `ticketId`, `customerId` jako v logu. |
| `RefundTicket1Common` | `POST /JSON.svc/{userId}/tickets/{ticketId}/refund/{operation}` | `POST /refund/init` | Inicializace vrácení; vzorek logu obsahuje `ticketId`, `operation`, `customerId`. |
| `RefundTicket2Common` | `POST /JSON.svc/{userId}/refund/{refundHandle}` | `POST /refund/process/{refundHandle}` | Log předává `refundHandle`, odpovídá druhé fázi vrácení. |

Pro `GetTicketsCommon`, `GetHistoryTicketsCommon`, `GetPaymentTypes2Common`, `PaymentInitCommon` a `ProcessPaymentCommon` zatím v načtených dvou specifikacích není nalezen jednoznačný endpoint. To neznamená, že endpoint neexistuje. Samotná hodnota `JSON` v logu nestačí k určení legacy routy.

Dokumentace má zjevně nejednotné popisky: `/payment/{basketId}/start` má summary „Vytvoření nového košíku“, ale tělo i odpověď popisují zahájení platby. Endpointy pro druhou fázi refundace mají summary pro výpočet možností vrácení. Proto nelze mapovat pouze podle summary.

## Co už ukázal místní log

V celodenním logu z 15. 9. 2026 jsou také varianty `RefundTicket1`, `RefundTicket2` a `RefundCommon`; jejich přesný význam zatím není doplněn. Výskyt u jiných zákazníků není důkazem vrácení v řešeném případu. V jeho výřezu jsou pouze dotazy `GetReturnOperationMaskCommon`, žádná z obou refund fází.

Při dalších analýzách doplňovat: přesný název operace, potvrzený význam, parametry a výstup, související obrazovku, zdroj a datum znalosti, kandidátní endpoint a způsob ověření. Neslučovat odhad s potvrzeným faktem. Platební typ `14`, význam hodnot v závorkách u seznamu jízdenek a úplná sémantika návratové masky zatím zůstávají otevřené.

## Související analýza

[Dva nákupy 15. 9. 2026](../analyza-duplicitni-jizdenky-2026-09-15/README.md). Znalost načítání historie upřesňuje záznam v 17:21:51: odpovídá dočítání starších jízdenek při procházení seznamu. Log stále neprokazuje, co bylo na obrazovce vidět ani proč uživatel nákup zopakoval.
