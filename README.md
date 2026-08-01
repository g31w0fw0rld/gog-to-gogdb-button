# GOG to GOGDB Button

Tampermonkey userscript that adds a GOGDB button to GOG.com game pages. / Userscript de Tampermonkey que añade un botón a GOGDB en las páginas de juego de GOG.com.

![The GOG Database button below the purchase options on a GOG game page](docs/screenshot-game.png)

*Game page: the button closes the purchase column, styled like GOG's own buttons and with the GOGDB logo to its left. / Página de juego: el botón cierra la columna de compra, con el estilo de los botones propios de GOG y el logo de GOGDB a su izquierda.*

## English

### What it does

- Adds a **GOG Database** button to **[GOGDB](https://www.gogdb.org/)** — builds, product data, price history and store changes — on GOG.com game pages.
- It links to **that exact product**. The slug comes from the page's own `card-product` attribute, so the button lands on the game's GOGDB entry rather than on a search.
- Built with GOG's own `button--big` classes so it matches "Add to cart" instead of looking bolted on, and it carries the GOGDB logo, positioned to the left of the label.
- It closes the purchase column: whatever GOG shows there — buy, add to cart or "Go to my library" if you already own the game — the button sits below it.
- Opens in a new tab, leaving the store page as you left it.

**Language:** none needed — the button reads `GOG Database`, a brand name, in every language.

> [!NOTE]
> The script only runs on the **English** URLs (`gog.com/en/game/…`). If you browse GOG in another language the path changes and the button will not appear. Switching the store to English, or editing the `@match` line in Tampermonkey, both fix it.

**Install:**
1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open the installer: [gog-to-gogdb-button.user.js](https://github.com/g31w0fw0rld/gog-to-gogdb-button/raw/main/gog-to-gogdb-button.user.js) (also on [GreasyFork](https://greasyfork.org/es-419/users/1590477-g31w) and [OpenUserJS](https://openuserjs.org/users/g31w0fw0rldgmail.com/scripts)).

**Site:** `gog.com/en/game/*`

## Español

### Qué hace

- Añade un botón **GOG Database** hacia **[GOGDB](https://www.gogdb.org/)** —builds, datos de producto, historial de precios y cambios en la tienda— en las páginas de juego de GOG.com.
- Enlaza a **ese producto concreto**. El slug sale del propio atributo `card-product` de la página, así que el botón cae en la ficha del juego en GOGDB y no en una búsqueda.
- Construido con las clases propias de GOG (`button--big`) para que combine con "Add to cart" en vez de parecer un añadido, y lleva el logo de GOGDB colocado a la izquierda de la etiqueta.
- Cierra la columna de compra: sea lo que sea que muestre GOG ahí —comprar, añadir al carrito o "Go to my library" si ya tienes el juego—, el botón queda debajo.
- Abre en una pestaña nueva y deja la página de la tienda como estaba.

**Idioma:** no hace falta — el botón dice `GOG Database`, que es una marca, en cualquier idioma.

> [!NOTE]
> El script solo corre en las URLs en **inglés** (`gog.com/en/game/…`). Si navegas GOG en otro idioma la ruta cambia y el botón no aparece. Se arregla poniendo la tienda en inglés, o editando la línea `@match` en Tampermonkey.

**Instalación:**
1. Instala [Tampermonkey](https://www.tampermonkey.net/).
2. Abre el instalador: [gog-to-gogdb-button.user.js](https://github.com/g31w0fw0rld/gog-to-gogdb-button/raw/main/gog-to-gogdb-button.user.js) (también en [GreasyFork](https://greasyfork.org/es-419/users/1590477-g31w) y [OpenUserJS](https://openuserjs.org/users/g31w0fw0rldgmail.com/scripts)).

**Sitio:** `gog.com/en/game/*`

## Privacy / Privacidad

**EN:** the script makes no network requests and stores nothing: it only reads from the page itself what it needs to build the link, and inserts the GOGDB button. It declares `@grant none`, so it has no access to the userscript manager's privileged APIs (storage, cross-origin requests). Nothing is sent to third parties or to the author, and you only visit GOGDB if you click the button.

**ES:** el script no hace ninguna petición de red ni guarda nada: solo lee de la propia página los datos necesarios para construir el enlace e inserta el botón hacia GOGDB. Declara `@grant none`, así que no tiene acceso a las APIs privilegiadas del gestor de userscripts (almacenamiento, peticiones entre dominios). No se envía nada a terceros ni al autor, y solo visitas GOGDB si haces clic en el botón.

## Support / Apoyar

This is part of something I'm building to grow. If it helps you and you'd like to support it, you can tip me on **[Ko-fi](https://ko-fi.com/g31w0fw0rld)** —only if you want—; and if a cause needs it more than I do, help that one instead.

Esto es parte de algo que estoy construyendo para crecer. Si te sirve y quieres apoyar, puedes invitarme un café en **[Ko-fi](https://ko-fi.com/g31w0fw0rld)** —solo si quieres—; y si hay una causa que lo necesite más que yo, ayúdala a ella.

---
Author / Autor: **g31w0fw0rld** · License / Licencia: **MIT**
