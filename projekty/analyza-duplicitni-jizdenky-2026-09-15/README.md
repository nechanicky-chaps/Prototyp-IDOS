# Dva nákupy – Aristippos@yahoo.com – 15. 9. 2026

## Závěr

Log zachycuje dva samostatné nákupní průchody ze stejné instalace mIDOS CZ pro Android a stejného zákaznického ID. Každý má vlastní košík, vlastní zahájení a zpracování platby a výsledek `Tickets: 1`. Po druhém nákupu vrací `GetTicketsCommon` dvě jízdenky. Nejde tedy pouze o dva záznamy téhož požadavku nad jedním košíkem.

**Podstatná stopa:** po prvním `ProcessPaymentCommon` je zaznamenáno načtení historie (`GetHistoryTicketsCommon`), ale do druhého nákupu není pro tyto identifikátory zaznamenáno nové volání `GetTicketsCommon`. První takové volání po nákupech přichází až po druhém nákupu a vrací `2 (8228)`. To je slučitelné s hypotézou, že uživatel první jízdenku v aplikaci neviděl a nákup zopakoval. Samotný request log však neukazuje obrazovku ani obsah odpovědi prvního zpracování platby, a proto příčinu ani chybu obnovování UI neprokazuje.

Log neobsahuje v přiřazených záznamech trasu, cenu ani obsah obou jízdenek. Nelze z něj ověřit, že byly obě na stejný spoj, ani doložit dvě bankovní zaúčtování. Odlišné interní `connHandleThere`/`connIdThere` samy neprokazují rozdílný reálný spoj.

## Časová osa

### Zpřesnění podle uživatele z 17. 9. 2026

Významy operací jsou vedeny v [průběžném slovníku](../idos-logy/README.md). Podle uživatele `Common` označuje úspěšnou operaci a `ProcessPaymentCommon` znamená proběhlou platbu s vráceným počtem jízdenek. `CreateBasketCommon` odpovídá souhrnu jízdenek a `AddToBasketCommon` úspěšnému přidání všech jízdenek pro vybrané spojení, které může vyžadovat více dokladů; nejde o skládání různých spojení do společného košíku.

**Událost 17:21:51.689 nyní interpretujeme jako dočítání starších jízdenek při procházení seznamu.** Nejde o obnovení aktuálních jízdenek. Tím se zpřesňuje původní formulace „načetla se historie“; stále nevíme, zda uživatel první novou jízdenku viděl. `GetReturnOperationMaskCommon` zjišťuje možnost vrácení; skutečné fáze jsou `RefundTicket1Common` (inicializace) a `RefundTicket2Common` (potvrzení). Ty v tomto výřezu nejsou.

Časy jsou přesně podle logu dne 15. 9. 2026; časové pásmo v logu není uvedeno. Čísla řádků odkazují na rozbalený původní soubor `logy/260915_Request.log`.

| Čas | Událost | Výsledek / význam | Řádek |
|---|---|---|---:|
| 17:21:01.315 | `GetTicketsCommon` | `0 (0)`; seznam v daném dotazu nevrátil jízdenky | 2700648 |
| 17:21:32.801 | `CreateBasketCommon` | Vytvořen první košík A | 2702474 |
| 17:21:32.857 | `AddToBasketCommon` | Vložení položky do A | 2702479 |
| 17:21:35.743 | `GetPaymentTypes2Common` | Zjištění platebních možností | 2702656 |
| 17:21:37.843 | `PaymentStart2Common` | E-mail Aristippos@yahoo.com, `iPaymentType=14` | 2702767 |
| 17:21:39.561 | `PaymentInitCommon` | `WithoutFingerprint` | 2702876 |
| **17:21:40.500** | **`ProcessPaymentCommon`** | **`Tickets: 1` pro A** | **2702941** |
| 17:21:51.689 | `GetHistoryTicketsCommon` | Výsledek `3`, požadováno `itemCount:3`; jde o historii | 2703583 |
| 17:22:41.371 | `CreateBasketCommon` | Vytvořen druhý košík B, 60,871 s po prvním výsledku `Tickets: 1` | 2706787 |
| 17:22:41.428 | `AddToBasketCommon` | Vložení položky do B | 2706789 |
| 17:22:44.326 | `GetPaymentTypes2Common` | Zjištění platebních možností | 2706968 |
| 17:22:46.447 | `PaymentStart2Common` | Tentýž e-mail a `iPaymentType=14`; 68,604 s od prvního zahájení | 2707129 |
| 17:22:47.621 | `PaymentInitCommon` | `RequiredFingerprint` | 2707191 |
| **17:23:01.561** | **`ProcessPaymentCommon`** | **`Tickets: 1` pro B**, předána data 3DS SDK | **2708100** |
| **17:23:07.730** | **`GetTicketsCommon`** | **`2 (8228)` – dvě jízdenky** | **2708510** |
| 17:23:17.598 | `GetReturnOperationMaskCommon` | Jízdenka `6IRV-MNXM-KTN3`, výsledek `0` | 2709150 |
| 17:23:30.170 | Stejný dotaz na možnosti vrácení | Tatáž jízdenka, opět `0` | 2709974 |
| 17:23:49.166 | Stejný dotaz na možnosti vrácení | Tatáž jízdenka, opět `0` | 2711151 |
| 17:23:55.841 | Stejný dotaz na možnosti vrácení | Tatáž jízdenka, opět `0` | 2711577 |
| 17:29:20.187 | Stejný dotaz na možnosti vrácení | Tatáž jízdenka, opět `0` | 2731378 |
| 17:30:02.693 | `GetTicketsCommon` | Stále `2 (8228)` | 2733984 |
| 17:36:10.348 | `GetTicketsCommon` | Stále `2 (8228)` | 2756019 |
| 18:10:21.035 | `GetTicketsCommon` | Stále `2 (8228)`; poslední přiřazený záznam | 2874803 |

Dotaz na masku možností vrácení není vlastní storno. Nulová maska naznačuje, že nebyla nabídnuta žádná operace vrácení; přesnou sémantiku je potřeba ověřit v definici API. V přiřazených záznamech není vlastní požadavek na vrácení. Nelze určit, ke kterému z obou košíků jízdenka `6IRV-MNXM-KTN3` patří. Rozdíl `WithoutFingerprint`/`RequiredFingerprint` dokládá odlišný průběh inicializace plateb, nikoli sám o sobě biometrické ověření nebo konkrétní úkon uživatele.

## Identifikátory pro navazující dohledání

| Položka | Hodnota |
|---|---|
| E-mail v obou platebních požadavcích | `Aristippos@yahoo.com` |
| Zákazník | `b28a4093-3471-43be-82a7-f589af9960e2` |
| Device ID | `d3990868-8b70-4f14-0000-019a741fbb21` |
| Další identifikátor v hlavičce klienta | `83fb78ba679bf92c^unknown` |
| Klient | `mIDOS CZ (Android)`, `cz.mafra.jizdnirady`, build `526`, Samsung SM-G980F, jazyk `en`, region `US` |
| IP | `89.24.32.166` |
| Košík A | `411aa6bf-5d1e-4609-9af6-ca01469ab313` |
| Košík B | `c98bff55-9c24-45ff-91a5-521f837966fc` |
| Price handle A | `ff27d47a-5d18-44c6-9e75-bec1062b56dc` |
| Price handle B | `c6e4e8af-b57a-4733-819e-4563e97104fc` |
| Spojení A – handle / ID | `293081450` / `57349466` |
| Spojení B – handle / ID | `304318639` / `158670815` |
| Request ID prvního ProcessPayment | `130ffd2f-dfaf-4f4d-b657-885351855999` |
| Request ID druhého ProcessPayment | `460e63b7-ed57-4b35-9f8a-b7425c14e1b2` |

Pro potvrzení shodnosti jízdenek a skutečného stržení plateb jsou potřeba detaily objednávek/plateb pro oba košíky. Pro potvrzení příčiny opakování je potřeba klientský log nebo reprodukce návratu po prvním nákupu, zejména přechodu do historie a obnovení aktuálních jízdenek.

## Výřez a ověření

- [Výřez původních záznamů s čísly řádků](vyrez-uzivatele.log).
- [Časová osa jako CSV pro Excel](casova-osa.csv).
- [Kontrola integrity a použité identifikátory](overeni.json).
- [Opakovatelný lokální skript](vyrez.py).

Zdroj `260915_Request.zip` (433 655 423 bajtů) byl na výslovný pokyn uživatele zkopírován ze složky `\\CHAPS\share\all\Nechanicky` do tohoto projektu. ZIP obsahuje jediný soubor `260915_Request.log` (2 399 047 266 bajtů). Veškerá analýza proběhla nad místní kopií. Skript porovnává velikost a CRC rozbaleného souboru s metadaty ZIPu a počítá SHA-256.

Prohledán byl celý den: e-mail bez rozlišení velikosti písmen, oba košíky, zákazník, dva identifikátory zařízení, cenové a spojové handle a nalezené ID jízdenky. Shody pouze na IP byly použity jako pomocná kontrola; samotná sdílená IP není důkaz totožnosti a cizí záznamy nejsou zahrnuty do výsledného výřezu. Přímé shody e-mailu jsou dvě; ostatní záznamy jsou přiřazeny přes uvedené identifikátory. Čísla v závorkách u `GetTicketsCommon` a samostatné číselné pole za výsledkem nejsou bez dokumentace API dále interpretována.
