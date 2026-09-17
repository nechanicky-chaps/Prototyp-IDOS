# Porovnání dopravních webů v iframe

Samostatná lokální HTML stránka se 16 oficiálními weby ve dvou sloupcích.

## Ovládání

- Tažením svislého předělu se mění šířka obou sloupců ve všech řádcích.
- Tažením vodorovného předělu pod řádkem se mění jeho výška.
- Rozměry se ukládají do `localStorage` prohlížeče.
- Tlačítko **Domů** znovu načte výchozí adresu konkrétního webu.
- **Vrátit všechny weby domů** obnoví všechny iframe.
- **Obnovit rozložení** vrátí původní šířku a výšky.

## Omezení

Vlastník vzdáleného webu může vnoření blokovat pomocí `X-Frame-Options` nebo CSP `frame-ancestors`. Lokální HTML stránka toto omezení nemůže bezpečně obejít; pro takový web slouží odkaz **Otevřít zvlášť**.
