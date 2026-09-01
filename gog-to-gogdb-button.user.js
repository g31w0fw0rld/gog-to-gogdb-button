// ==UserScript==
// @name         GOG to GOGDB Button
// @namespace    https://gog.com/
// @version      1.5.4
// @description  Adds three buttons to GOG.com game pages, styled like GOG's own. GOG Database links to that exact product (builds, product data, price history, store changes), built from the product id in the page. GG.deals searches GOG-DRM deals with no store-rating floor, and PCGamingWiki searches for compatibility and fixes. Both search by the English name from GOG's API, because GOG translates game names and both sites index in English; both say so in a tooltip in GOG's own hint style.
// @icon         data:image/png;base64,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
// @author       g31w0fw0rld
// @license      MIT
// @match        https://www.gog.com/*/game/*
// @match        https://www.gog.com/game/*
// @downloadURL  https://github.com/g31w0fw0rld/gog-to-gogdb-button/raw/main/gog-to-gogdb-button.user.js
// @updateURL    https://github.com/g31w0fw0rld/gog-to-gogdb-button/raw/main/gog-to-gogdb-button.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // =============================================
    // CONSTANTES
    // =============================================
    const GOGDB_BASE_URL = 'https://gogdb.org/product/';
    const GOGDB_ICON_URL = 'https://www.gogdb.org/static/img/gogdb_8f221704.svg';
    const PRODUCT_SELECTOR = 'div.layout[card-product]';
    const CONTAINER_SELECTOR = '.product-actions-body';
    const ICON_SIZE = '35px';

    // GG.deals filtra por DRM con un bitmask numérico en la query, no por nombre:
    // 1 Steam, 8 GOG, 16 sin DRM, 32 otros, 128 Microsoft Store. Aquí interesa GOG,
    // que es el DRM (o su ausencia) de todo lo que se vende en esta tienda.
    // Va a /deals/ (la lista de ofertas), que es la que acepta el filtro de DRM;
    // /games/ lo ignora. Y minRating=0 desactiva el mínimo de valoración de tienda
    // que trae por defecto, que si no esconde parte de las ofertas.
    const GGDEALS_SEARCH_URL = 'https://gg.deals/deals/';
    const GGDEALS_GOG_DRM = '8';
    const GGDEALS_MIN_RATING = '0';
    const PCGW_SEARCH_URL = 'https://www.pcgamingwiki.com/w/index.php';

    // Nombre en inglés. El de la ficha NO sirve: GOG traduce el nombre del propio
    // producto —/zh/game/cyberpunk_2077 lo anuncia como «赛博朋克 2077», mientras
    // que /en/ y /ru/ dan "Cyberpunk 2077"—, y GG.deals y PCGamingWiki están
    // indexados en inglés.
    //
    // La fuente es api.gog.com/products/{id}, que responde con CORS abierto para
    // www.gog.com (así que `@grant none` sobrevive) y devuelve SIEMPRE el título en
    // inglés: no atiende ni `?locale=` ni `Accept-Language`, comprobado con los dos.
    // Su `{id}` es el mismo `card-product` que ya alimenta el botón de GOGDB.
    //
    // Descartado catalog.gog.com/v1/catalog: su `query=slug:…` no filtra por campo,
    // es búsqueda difusa —`slug:cyberpunk_2077` devuelve Alan Wake— y además sí
    // localiza los títulos.
    const GOG_PRODUCT_API = 'https://api.gog.com/products/';
    // Juego al que pertenece el producto de la ficha. PCGamingWiki documenta el
    // juego, y no tiene artículo por DLC, por edición ni por mod, así que ese botón
    // busca siempre el juego base; GG.deals sí vende los DLC y las ediciones por
    // separado y se queda con el nombre propio.
    //
    // **Los MODS no entran aquí: se buscan por su propio nombre.** GOG los declara
    // como cualquier otro producto —los 27 del catálogo salen con `game_type` "game"
    // o "pack"— y su juego está en `_links.modifiesGames`, así que resolverlos sería
    // fácil. Se decidió NO hacerlo, y el porqué es de PCGamingWiki, no de GOG: **hay
    // mods con artículo propio en la wiki**, y mandarlos al juego base sería perder
    // justo la página que les corresponde. Se llegó a publicar así en 1.5.2 y se
    // revirtió en 1.5.3. No volver a «arreglarlo».
    //
    // Lo que sí pertenece a otro juego son los DLC y las ediciones, que la wiki
    // documenta dentro del juego y no tienen artículo propio. El v1 no basta para
    // saber a cuál: su `game_type` dice si es "dlc" o "pack", pero no de qué. Eso
    // vive en el v2, en dos sitios distintos:
    //
    //   _links.requiresGames  el juego que necesita un DLC —Phantom Liberty
    //                         (1256837418) -> 1423049311, Cyberpunk 2077— y también
    //                         el de un pack que agrupa DLC: "Songs of the Past"
    //                         (1179418179) es game_type "pack" y llega a The Witcher
    //                         3 por aquí, con la lista de ediciones VACÍA.
    //   _embedded.editions    las hermanas de un mismo juego, donde la suelta se
    //                         llama "Base Edition". Es el camino de las ediciones:
    //                         Cyberpunk 2077: Ultimate Edition (1274966284) trae
    //                         2093619782 "Base Edition" y 1274966284 "Ultimate
    //                         Edition". Se compara contra el id de la ficha porque
    //                         la MISMA lista sale al abrir la edición base, y ahí no
    //                         hay nada que cambiar.
    //
    // Los dos son excluyentes en todo lo comprobado, así que se miran en ese orden y
    // manda el primero que conteste. El v2 se pide para TODOS los productos y no solo
    // para los que el v1 marca "dlc" o "pack": el `game_type` no es buena guía de por
    // dónde buscar —"Songs of the Past" es "pack" y su juego está en `requiresGames`,
    // con la lista de ediciones vacía—.
    const GOG_GAME_API_V2 = 'https://api.gog.com/v2/games/';
    const GOG_GAME_ID_REGEX = /\/games\/(\d+)/;
    const GOG_BASE_EDITION_REGEX = /^base\b/i;
    // El nombre en inglés de un producto ya publicado no cambia casi nunca, así que
    // 30 días de caché es conservador; el tope de entradas es para que no crezca
    // sin fin.
    const NAME_CACHE_KEY = 'gog2gogdb-en-names';
    const NAME_CACHE_TTL = 30 * 24 * 60 * 60 * 1000;   // 30 días
    // Versión de lo que se guarda en la caché. **Súbela SIEMPRE que cambie lo que se
    // guarda o cómo se calcula.** Una entrada escrita por una versión anterior tiene
    // la misma forma, así que se lee como buena y devuelve el resultado VIEJO durante
    // 30 días: el arreglo se publica, el usuario actualiza y no ve ningún cambio en
    // las fichas que ya había visitado. Pasó con los mods de GOG en 1.5.2. Las
    // entradas sin este campo son de antes y cuentan como no encontradas; se vuelven
    // a pedir y se sobrescriben.
    const NAME_CACHE_SCHEMA = 2;
    const NAME_CACHE_MAX = 200;                        // entradas
    const NAME_TIMEOUT_MS = 8000;

    // Icono de GG.deals: favicon remoto (su CDN permite el hotlink). Si el CSP de
    // GOG lo bloqueara, el onerror lo quita y queda solo la etiqueta.
    const GGDEALS_ICON_URL = 'https://gg.deals/favicon.ico';
    // Icono de PCGamingWiki: SVG inline. Su favicon.ico responde 403 al hotlink
    // (Cloudflare) desde otros dominios, así que como <img> remoto no se ve; el SVG
    // inline es markup y siempre pinta, sin depender del CSP ni del hotlink.
    const PCGW_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 827 1158" width="13" height="18" aria-hidden="true" style="vertical-align:middle;flex:0 0 auto"><path d="M0 166.2 448.9-1.1 827.4 56.1l0 1023.9 0.1 28.9L452.1 1158.9 0 1008.4z" fill="#365798"/><path d="M25.3 985.5 24.1 190.5 413 46.8 412 1107.6zM478.1 1108.6 478.3 52.3 788.1 94.3l0 975.8z" fill="#a5b6d9"/><path d="M215.5 737 41.5 727 40.3 420.5 215.9 404.1zm16.7-334.5 156.1-19.4-1.2 359.8-155.2-4.8zM39.3 399.9l0-194.4 176-57.4 1.2 232.1zm350.8-317.2 0.9 274.5-158.7 20.4 0-238zm-253 909.7 0-235.1 141.7 9.3 0 268.4zm247 80.8-17.3-6.4c3.8-22.5-18.9-31.9-19.1-5.7l-18.7-5.5c-0.9-22.1-13.9-31.7-21.2-6.8l-9.7-3-0.6-277.7 12.3 0.9c-4.3 27.5 23.5 28.2 20.3 1.7L350.4 772c-4.4 28.6 23.2 28.9 20.4 1.3l12.7 0.8zM42.8 751.1l82.2 5.9-0.5 108-81.9-11.2zm83.1 129.3-0.9 110.4-82.7-20.2 0-102.4zM494.3 70l278.6 36.6 0 950-278.3 35.1z" fill="#365798"/><path d="m279 507.5c-0.1-5.1 0-10 3.2-14.2 6 0.2 4.9 9.7 5 14.3 10.3 5.1 4.9-10.8 10.2-15.3 7.6-0.8-0.6 16 6.9 15.8 4.9-0.1 3.9-2.4 3.8-6.7-0.1-3.9 0.4-7.8 3.8-10.3 8.2 3.1 0.8 18.2 11.2 15.8 0-6.4-1-14.2 5.8-17.6 2.6 5.2-0.1 14.8 5.4 16.1 7.4 1.7 8.4 3.6 10.2 10.5 0.8 3.1-0.4 4.6 2.8 6.4 3.5 2 7.6 1.4 7.7 6.1 0.1 6.4-2.7 5.5-7.6 5.5-1.8 0-2.4 3.4-2.5 4.7-0.4 4.7 0.4 5.7 5 7 5.9 1.7 4.9 3.3 4.9 8.7 0 2.7 0.5 1.2-3.1 1.9-5.7 1.1-7 0.3-6.7 6.8 0.4 7.8 13.4 1.4 9.7 12.6-1.6 4.8-9.5 1.1-9.5 5.3 0 5.3-1.1 7.7 5.4 8.2 6.4 0.5 6 9.1 0.4 11-3.4 1.2-4.6-0.1-5.8 4-1.2 4.1-1.1 8.4-2.6 12.5-6.1 4.5-11.6-1.7-11.6 8.4 0 2.7-0.6 4.7-1.1 7.3-0.9 5-2.2 0.7-5.8 1.8-1-1.2 0-7.9 0-9.5 0-4.7-1.6-5.8-7-5.4-0.3 5.8-0.2 12-4.9 16.2-2.9-1.9-4-4.8-4.2-8.1-0.3-6.5 0.2-6.7-6.5-8.3-1.2 2.9-2 11.4-1.5 14.5-5.2 2.6-6-5.4-6-8.6 0-2.7 1.1-5.7-2.3-6.7-3.4-0.9-4.6 0.8-4.7 3.9-0.2 6.1-0.5 8.8-5.3 12.2-1.9-5.4-0.3-14.7-6.6-16.4-7-1.8-7.9-6.9-8-13.6-0.1-7.3-8.9-0.3-8.9-8.2 0-0.8-0.6-4.9 0-5.5 2.9-2.1 5.8 1.2 8.5 0.1 1.3-3.6 1.8-9-2.1-9.9-4-0.9-7.8-1.4-6.9-6 1.1-5.7 0.1-5.4 6.3-5.8 4.7-0.3 3-5.2 3.1-8.4-6.2-2.9-8.8 0.8-8.8-7.4 0-5.6-0.4-5.1 5.2-5.1 4.8 0 3.4-1.7 3.4-6.3 0-5.1-9.2-0.6-9.6-7.6-0.2-3 1-5.6 3.9-6.7 5.1-2 5.7-2.3 5.9-7.8 0.3-8 5.6-8.9 12-12.1l0 0 0 0zM88.3 368.3l24.3-92.2-15.7 7.5 21.6-79 25.5-7.3-19.1 53.1 19.2-10.3-55.7 128.3 0 0z" fill="#a5b6d9"/><path d="m278.8 317.9c1.2-3.2 2.5-6.5 3.8-9.9 13.8 5.9 26.4 10.2 40.6 1.9 13.7-8 22.8-24.3 28-38.8 10.2-28.4 10.2-66.8-8.3-91.8-22.5-30.5-54.5-14.5-69.8 13.9-4.7 8.8-11.2 31.3-12.1 45.3-0.5 6.9-0.2 14.1 0.8 21.3 1 8.1 5.2 16.5 4.2 24.7-0.3 2.5-1.8 4.1-4.6 4.6-16.7-28-7.6-72.9 4.9-100.6 12.5-27.6 47.9-55.5 75.9-29 25.7 24.2 28.2 68.1 21.3 100.3-6.2 28.8-26 71.4-61.9 68.2-6.4-0.6-19.1-3.8-22.7-10l0 0zM299.3 272c-3.2-11.6 11.5-19.5 14.8-28.4 1.9-5.2-0.1-9.6-2.2-14-4.9-2.6-9-1.1-10.8 4-3.2 8.9-6.5 14.9-12.6 22.1-3.3-13.7-1.4-29.1 6.6-40.9 4.3-6.3 12.9-9.4 19.4-6.9 20.5 7.8 14.2 42.7 5.3 56.4-4.7 7.3-12.7 7.6-20.5 7.6L299.3 272zm3.4-25.8c0.5 0.7 0.5 1.4 0.2 2-9.4 21.3-18.7 42.6-28.2 64-0.9-0.4-1.4-0.4-1.7-0.7-3.3-3.9-5.6-8.5-7.8-13.1-0.9-1.8 0.1-3.6 1.2-5.1l32.8-43.7c0.9-1.3 2-2.6 3.4-3.4l0 0z" fill="#a5b6d8"/><path d="m188.7 921.7c-6.1 11.9-4.4 25.1-6 38-9.7-2.4-16.7-21.7-18.6-30 1.7-9.9 6.9-17.2 12.9-24.9 2.8-3.6 3.7-7.2 1.9-11.4-0.7-1.6-0.6-3.6-2-4.9-8.7 1.5-13.9 8.2-19.9 14-6.7-7-5.2-33.4 0.2-41.1 8.4-1.5 15.8 1 22.6 5.8 5.3-5.2 5.6-10.3 0.9-15.7-3.6-4.1-14.7-8.9-16.7-13.1-1.6-6.3 10.2-27.5 17.3-27.2 7.8 11.5 12.4 24.5 15 38.1 2.7 1.1 5.1 2.1 8.2 1.5 1.6-15.5-1.9-30.3-6.8-44.8 0.5-0.5 0.8-0.9 1-0.9 8.6 0.6 16.8 2.3 23.4 8.6 14.9 14.2-11.5 41.7 0.4 58.4 10.7-10.3 10.5-23.1 18.6-34 8 10.3 15 31 13.7 44.1-6.9 8.3-12.4 13-28.9 14.2 0.5 3.7-1.8 7.2-0.8 11.5 8.8 9.4 18.5 7.9 30.1 7.2 1.6 8.2-6.7 33.6-12.9 39.7-12.6-5.7-19.1-17.9-26.1-29.1-2.5 1.9-4.6 3.7-6.4 6.1 1.7 12.9 18 29.3 15.9 40.7-5.5 2.6-11.4 4.3-17.7 3.4-6.2-0.9-8.7-4.3-10.2-10.9-3.3-14.7 3.2-32.8-9.2-43.3zm118.5 22.1 0-63.8 67.8 10.9 0 67.4zM307.1 804.2 375 811.3 375 878.1 307.1 868.2zm67.7 165.5 0 66.8-67.6-18.6 0-63.6zm-320.5-31.7 0-28.9 13.7 2 16.5-16.6 0.7 67.6-16.3-20.9z" fill="#a5b6d9"/><path d="m89.1 914.4c1.4-0.6 2.3-0.5 3.4-0.2 2.8 6.5 3.9 13.4 3.6 20.5-0.1 2.7-1.1 5.1-1.7 7.6-0.5 1.9-1.8 3-3.4 3.9-1.3-1.3-0.9-2.5-0.6-3.8 0.8-3.7 1.6-7.3 1.7-11.1 0.2-5.8-1.6-11.2-2.9-16.9l0 0 0 0zm7 42.4c-0.3-3.3 0.9-6.2 1.6-9.1 1-4.4 2.5-8.8 3.1-13.2 0.8-5.6-1-11-2.4-16.4-0.7-2.5-1.5-5-2.2-7.5-0.4-1.6-0.7-3.1 0.2-4.5 1.3-0.1 1.8 0.6 2.1 1.3 2.1 4.3 3.6 8.6 4.5 13.3 1 5.5 0.5 10.9 0.9 16.3 0.3 3.5-0.8 6.9-1.3 10.2-0.6 3.8-2.6 7.4-6.6 9.6l0 0zm7.6 10.4c-1.9-3.7-1.4-6.5-0.1-9.8 3.1-8.1 5.9-16.4 5.3-25.2-0.5-7.7-1.8-15.2-4.6-22.4-1.2-3-2.3-6.1-3.3-9 0.8-1.2 1.7-2 3.4-1.6 1.8 4.1 3.9 8.3 5.1 12.8 5 19 5 37.4-5.7 55.3l0 0z" fill="#a5b6d9"/><path d="m598.7 1047.1-70.3 8.4-0.2-378.8 70.5-3.8zM688.5 533.1c-11 50.3-65.8 45.6-78.3 2.8l-92.4 3.1-0.2-67.9 89.4-3.3c22.8-54 64.5-46.2 81.8 0.2l66.2 0.4 1.6 61.8zm-172.4-237.1 0-24 241.7 7.5 0.1 19.4z" fill="#a5b6d9"/><path d="m52.3 827.5 62.6 9.7-19.2-43.4-8.2 15-13.4-29.3-21.8 48.1zM116.4 788c0 4.4-3.5 7.9-7.9 7.9-4.4 0-7.9-3.5-7.9-7.9 0-4.4 3.5-7.9 7.9-7.9 4.4 0 7.9 3.5 7.9 7.9z" fill="#a5b6d9"/><ellipse cx="649.4" cy="501.8" rx="31" ry="51.8" fill="#365798"/><path d="m177.7 627.1c-1.8 3-1.6 6.7 0.4 9.3l-26.3 40 6.6-0.1 25-36.7c3.2 0.6 6.6-0.9 8.5-3.8 2.4-3.9 1.2-9-2.7-11.4-3.9-2.4-9-1.2-11.5 2.7zm-110.8 29.7-9.7 12.9 4.6 4.3 7.9-11 7.1 0.3c0.4 0.7 0.9 1.4 1.5 2 3.3 3.3 8.6 3.3 11.8 0 3.3-3.3 3.3-8.6 0-11.8-3.3-3.3-8.6-3.3-11.8 0-1 1-1.7 2.3-2.1 3.6zm20.1-68.7c-4.4 0-8 3.6-8 8 0 4.4 3.6 8 8 8 3.7 0 6.8-2.5 7.7-6l44.5 1.3 17.4 21.5c-0.2 0.8-0.4 1.6-0.4 2.4 0 4.6 3.8 8.4 8.4 8.4 4.6 0 8.4-3.8 8.4-8.4 0-4.6-3.8-8.4-8.4-8.4-1.5 0-2.9 0.4-4.1 1.1l-18.9-22.9-48-1.3c-1.4-2.2-3.9-3.7-6.8-3.7zm13.5 27c-4.6 0.1-8.3 4-8.1 8.6 0.1 4.6 4 8.3 8.6 8.1 3.3-0.1 6-2.1 7.3-4.9l22.2-0.5c1.4 2.9 4.4 4.8 7.8 4.7 4.6-0.1 8.3-4 8.1-8.6-0.1-4.6-4-8.3-8.6-8.1-3.6 0.1-6.6 2.5-7.7 5.7l-21.5 0.5c-1.2-3.3-4.4-5.7-8.1-5.6zm-26 16.7c0 4.4-3.6 8-8 8-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8 4.4 0 8 3.6 8 8zM87.6 476.5c-3.5 0.2-6.4 2.5-7.5 5.6l-22.6 1 0.3 6.2 22.6-1c1.4 3 4.4 5 7.9 4.9 4.6-0.2 8.1-4.1 7.9-8.7-0.2-4.6-4.1-8.2-8.7-8zm56.3 20c-4.6 0.1-8.3 4-8.1 8.6 0.1 4.6 4 8.3 8.6 8.1 3.3-0.1 6-2.1 7.3-4.9l25.3-0.7c1.4 2.9 4.4 4.8 7.8 4.7 4.6-0.1 8.3-4 8.1-8.6-0.1-4.6-4-8.3-8.6-8.1-3.6 0.1-6.6 2.5-7.7 5.7l-24.6 0.7c-1.2-3.3-4.4-5.7-8.1-5.6zm-44.4-30.4-4.1 4.7 19.8 17.1 80.9-3-0.5-6.2-78.3 2.8zm-41.6 51.7-0.2-6 68.2-4 71.4 103.9-5.3 3.3-70.1-101.1zm132.6 25.4c2.3-2.6 2.6-6.3 1.1-9.3l6.6-9.5 0.4-9-11.7 14.4c-3.1-1.1-6.7-0.2-9 2.4-3 3.5-2.7 8.7 0.8 11.7 3.5 3 8.7 2.7 11.8-0.8zm-32.3 0.4c2 2.9 5.5 4.1 8.7 3.3l30.7 44.3-0.1-9.8-25.5-38c1.8-2.8 1.8-6.4-0.2-9.3-2.6-3.8-7.8-4.7-11.6-2-3.8 2.6-4.7 7.8-2.1 11.6zm-34.8-9.6c-3.5 0.2-6.4 2.5-7.5 5.6l-57.2 2.9 0.3 6.2 57.2-2.9c1.4 3 4.4 5 7.9 4.9 4.6-0.2 8.1-4.1 7.9-8.7-0.2-4.6-4.1-8.2-8.7-8zm17.5 33-81.3 2 0.2 6.3 78.7-2 17.5 22.3c-0.2 0.8-0.4 1.6-0.4 2.4 0 4.6 3.8 8.4 8.4 8.4 4.6 0 8.4-3.8 8.4-8.4 0-4.6-3.8-8.4-8.4-8.4-1.5 0-2.9 0.4-4.1 1.1zM179.2 672.5c1.2 2.6 5 0.2 5.7 3.6-1 4.1-8.9 0.5-11.6 0.9-1.4-4.3 8.4-15.3 10.9-18.8 2.8-1.4 9.4 0 12.6 0 0.3 2.8 0.5 5.3-1.5 7.8-3.4 0.1-6.7-1.4-10.1-1.7-2 2.7-4 5.5-6 8.2zM67.3 604.9l-8.1 0 0-6.7c6.2 0 9.7-1.6 13.2 3.9 6.6 10.3 12.8 20.9 19.1 31.4 3.1 5.2 6.3 10.4 9.5 15.5 4.6 7.4 5.8 8 14.6 8.6 6.3 0.4 12.7 0.4 19.1 0.4 6.6 0 6.4-5.5 12.7-4.9 5.4 5.1 5.4 11.7 0 16.8-6 0.4-5.3-5.8-9.8-5.8l-19.2 0c-9.5 0-12.4 2.1-17.3-5.6-11.2-17.9-22.4-35.7-33.6-53.6z" fill="#a5b6d9"/><path d="m339.3 257.1c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm14.4-13.7c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm23 0c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm-12.9 46.6c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm14.7-11.5c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm7.4-18.3c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9z" transform="matrix(0.59478444,0,0,0.93466127,95.788817,-7.8295466)" fill="#365798"/></svg>';

    const LINKS_CLASS = 'gogx-links';
    const LINK_CLASS = 'gogx-link';
    // Marca propia del botón de GOG Database, solo para poder darle los dos retoques
    // que necesita por ser un <a> vestido con clases de <button>.
    const GOGDB_LINK_CLASS = 'gogx-gogdb';
    const ICON_CLASS = 'gogx-ico';
    const STYLES_ID = 'gogx-styles';
    // Envoltorio de los tres botones. En escritorio no hace nada —los deja
    // apilados, como estaban—; existe para que en móvil los tres puedan compartir
    // un renglón, que sin un padre flex común no es posible: el botón de GOG
    // Database y la fila de enlaces son hermanos entre los hijos de la caja de
    // compra, y volver flex esa caja sería reventarle la maqueta al sitio.
    const BLOCK_CLASS = 'gogx-block';
    const LABEL_LONG_CLASS = 'gogx-long';
    const LABEL_SHORT_CLASS = 'gogx-short';
    // El punto de corte de la maqueta de móvil de GOG (bundle_min.css de la ficha
    // de producto usa max-width: 736px), copiado para cambiar en el mismo sitio en
    // el que cambia la tienda.
    const MOBILE_MAX_WIDTH = 736;

    // Clases del componente "hint" de GOG, que es como la tienda dibuja sus propios
    // tooltips (lo usa, por ejemplo, en el botón de guardar reseña). Es CSS puro, sin
    // una línea de JS: `.hint__trigger:hover + .hint__content` lo enseña, y el resto
    // —fondo, borde, flecha, tipografía— sale de sus variables de tema. Reutilizarlo
    // es lo que hace que el aviso salga con la caja de GOG en vez de con la del
    // sistema operativo. Su CSS vive en el bundle de la ficha de producto, que ya
    // está cargado; aquí no se copia ni un color.
    const HINT_CLASS = 'hint';
    const HINT_TRIGGER_CLASS = 'hint__trigger';
    const HINT_CONTENT_CLASS = 'hint__content';
    const HINT_LABEL_CLASS = 'hint__content-label';

    // Fuentes del nombre del juego, en orden de preferencia. Lo que dan puede venir
    // traducido: es el nombre que se pinta mientras llega el inglés de la API.
    const TITLE_SELECTORS = ['h1.productcard-basics__title', '.productcard-basics__title', '.header__title', 'h1'];

    // Limpieza del título antes de buscarlo fuera de GOG.
    const TRADEMARK_REGEX = /[™®©]/g;
    // Prefijo y cola que GOG añade en og:title y document.title según el idioma
    // ("Buy DOOM + DOOM II" / "DOOM + DOOM II - GOG.com").
    const TITLE_PREFIX_REGEX = /^\s*(?:comprar|compra|buy|acheter|kaufen|acquista|koop|köp|kup)\s+/i;
    const TITLE_SUFFIX_REGEX = /\s*(?:[-–|]\s*|\s+(?:on|en|sur|auf|su|em)\s+)GOG\.com.*$/i;
    // Diacríticos combinados, para quitarlos tras normalizar a NFD.
    const DIACRITICS_REGEX = /[\u0300-\u036f]/g;
    // Sufijos de empaquetado que PCGamingWiki no usa: documenta el juego base y no
    // tiene páginas por edición. "Definitive", "Anniversary", "Remastered" y "Game
    // of the Year" NO se tocan: ahí sí suelen ser lanzamientos con página propia.
    const SKU_EDITION_REGEX = /[\s:–—-]+(?:digital\s+)?(?:standard|deluxe|premium|ultimate|gold|platinum|complete|collector'?s|founder'?s)\s+edition\s*$/i;

    // =============================================
    // IDIOMA (solo para los tooltips)
    // =============================================
    // Los 7 idiomas que sirve GOG, con los MISMOS códigos que usa en la ruta y en
    // sus <link rel="alternate" hreflang>. Ojo con el chino: GOG lo sirve como
    // /zh/ (简体中文), NO como /zh-Hans/.
    const SUPPORTED_LANGS = ['en', 'de', 'es', 'fr', 'pl', 'ru', 'zh'];

    // Reduce un código BCP-47 ('de-DE', 'zh-Hans-CN') al idioma soportado más
    // cercano; '' si no hay ninguno, para que la cascada siga al siguiente paso.
    function normalizeLang(raw) {
        const code = (raw || '').toLowerCase().replace(/_/g, '-');
        if (!code) return '';
        if (SUPPORTED_LANGS.includes(code)) return code;
        const base = code.split('-')[0];
        return SUPPORTED_LANGS.includes(base) ? base : '';
    }

    // Cascada, de la señal más fiel a la menos. Lo importante es el paso 1: si el
    // usuario eligió un idioma en el selector de GOG, el script habla ESE idioma,
    // en vez de adivinar por navegador y contradecir a la página que lo rodea.
    //   1) segmento de idioma de la ruta (/de/game/…): elección explícita, y
    //      además viaja en el enlace que el usuario comparta.
    //   2) <html lang>: GOG lo fija al idioma con el que sirvió la página, así
    //      que cubre las rutas sin segmento (/game/slug), negociadas por cabecera.
    //   3) navigator.languages, si la página no dijo nada.
    //   4) inglés.
    function detectLang() {
        const fromPath = normalizeLang(location.pathname.split('/')[1]);
        if (fromPath) return fromPath;
        const fromDoc = normalizeLang(document.documentElement.getAttribute('lang'));
        if (fromDoc) return fromDoc;
        for (const l of [navigator.language, ...(navigator.languages || [])]) {
            const n = normalizeLang(l);
            if (n) return n;
        }
        return 'en';
    }

    const I18N = {
        en: {
            ggTip: 'Searches the title on GG.deals with the GOG DRM filter. Being a title search, it may not hit the exact game.',
            pcgwTip: 'Searches PCGamingWiki (compatibility and fixes) for the game itself: without the edition suffix, and for DLC and packs, by their base game. Being a name search, it may not hit the exact article.'
        },
        es: {
            ggTip: 'Busca el título en GG.deals con el filtro de DRM de GOG. Al buscar por nombre, puede no dar con el juego exacto.',
            pcgwTip: 'Busca en PCGamingWiki (compatibilidad y arreglos) el juego en sí: sin el sufijo de edición y, en DLC y paquetes, por su juego base. Al buscar por nombre, puede no dar con el artículo exacto.'
        },
        de: {
            ggTip: 'Sucht den Titel auf GG.deals mit dem GOG-DRM-Filter. Da es eine Titelsuche ist, wird nicht immer das exakte Spiel getroffen.',
            pcgwTip: 'Sucht auf PCGamingWiki (Kompatibilität und Fixes) nach dem Spiel selbst: ohne Editions-Zusatz und bei DLC und Paketen nach dem Hauptspiel. Da nach dem Namen gesucht wird, trifft es nicht immer den genauen Artikel.'
        },
        fr: {
            ggTip: 'Recherche le titre sur GG.deals avec le filtre DRM GOG. S’agissant d’une recherche par titre, le jeu exact peut ne pas être trouvé.',
            pcgwTip: 'Recherche sur PCGamingWiki (compatibilité et correctifs) le jeu lui-même : sans le suffixe d\'édition et, pour les DLC et les packs, par leur jeu de base. S\'agissant d\'une recherche par nom, elle peut ne pas tomber sur l\'article exact.'
        },
        pl: {
            ggTip: 'Wyszukuje tytuł w GG.deals z filtrem DRM GOG. Ponieważ to wyszukiwanie po tytule, może nie trafić w dokładną grę.',
            pcgwTip: 'Szuka w PCGamingWiki (zgodność i poprawki) samej gry: bez dopisku edycji, a w przypadku DLC i pakietów — po grze podstawowej. Ponieważ to wyszukiwanie po nazwie, może nie trafić w dokładny artykuł.'
        },
        ru: {
            ggTip: 'Ищет название на GG.deals с фильтром DRM GOG. Это поиск по названию, поэтому нужная игра может не найтись.',
            pcgwTip: 'Ищет в PCGamingWiki (совместимость и исправления) саму игру: без суффикса издания, а для DLC и наборов — по базовой игре. Это поиск по названию, поэтому он может не попасть в нужную статью.'
        },
        zh: {
            ggTip: '在 GG.deals 上按 GOG DRM 筛选搜索该标题。由于是按标题搜索，可能无法精确匹配到该游戏。',
            pcgwTip: '在 PCGamingWiki（兼容性与修复）上搜索游戏本体：去掉版本后缀，DLC 和捆绑包则按其本体游戏搜索。由于是按名称搜索，可能无法精确对应到该条目。'
        }
    };
    // Merge sobre `en`: una clave que falte en un idioma cae al inglés en vez de
    // quedar en undefined. Así se pueden añadir idiomas incompletos sin romper nada.
    const t = { ...I18N.en, ...(I18N[detectLang()] || {}) };

    // El segmento de idioma es OPCIONAL: GOG sirve la misma ficha como
    // /game/slug, /en/game/slug, /de/game/slug, /zh/game/slug… Por eso el
    // @match cubre todo www.gog.com y es esta expresión la que decide dónde
    // actuar (mismo enfoque que epic-games-store-to-egdata).
    const GAME_PATH_REGEX = /^\/(?:[^\/]+\/)?game\/.+/;

    // Marca del botón inyectado. Guarda el slug para detectar el botón que
    // quedó de otro producto al navegar dentro de la SPA.
    const BUTTON_ATTR = 'data-gog2gogdb';

    // Retardo del debounce del observer (agrupa ráfagas de mutaciones).
    const OBSERVER_DEBOUNCE_MS = 300;

    // =============================================
    // ESTADO GLOBAL
    // =============================================
    let observer = null;
    let observerDebounce = null;
    let actualPath = '';

    // =============================================
    // FUNCIONES
    // =============================================

    /**
     * Indica si la ruta actual es una ficha de juego, en cualquier idioma.
     * @returns {boolean} true si la URL es una página de juego.
     */
    function isGamePage() {
        return GAME_PATH_REGEX.test(location.pathname);
    }

    /**
     * Obtiene el slug del producto desde el atributo 'card-product' del layout principal.
     * @returns {string|null} El slug del juego o null si no se encuentra.
     */
    function getGameSlug() {
        return document.querySelector(PRODUCT_SELECTOR)?.getAttribute('card-product') || null;
    }

    /**
     * Crea el botón de GOGDB con icono y texto, usando las clases nativas de GOG
     * para mantener la coherencia visual con el botón "Add to cart".
     * @param {string} slug - El identificador del juego en GOG.
     * @returns {HTMLButtonElement} El botón listo para insertar en el DOM.
     */
    function createGOGDBButton(slug) {
        // Es un <a> de verdad, no un <button> con onclick: así funcionan el clic
        // central, "abrir en pestaña nueva" y "copiar dirección del enlace", como en
        // los otros dos botones de esta misma fila. Se puede porque las reglas de GOG
        // son POR CLASE (.button, .button--big, .go-to-library-button), no por
        // elemento (button.button), así que visten un <a> exactamente igual; su reset
        // global (* { box-sizing: border-box } y a { text-decoration: none }) remata
        // las dos únicas diferencias que trae el navegador.
        const button = document.createElement('a');
        button.className = `button button--big go-to-library-button ${GOGDB_LINK_CLASS}`;
        button.href = `${GOGDB_BASE_URL}${slug}`;
        button.target = '_blank';
        button.rel = 'nofollow noopener external';
        button.setAttribute('selenium-id', 'GOGDBButton');
        button.setAttribute(BUTTON_ATTR, slug);
        button.style.marginTop = '16px';

        // Contenedor interno del botón (wrapper + icono + texto)
        const wrapper = document.createElement('span');
        wrapper.className = 'cart-button__wrapper';

        // Icono de GOGDB posicionado a la izquierda del texto
        const icon = document.createElement('img');
        icon.src = GOGDB_ICON_URL;
        icon.alt = 'GOGDB';
        icon.style.width = ICON_SIZE;
        icon.style.height = ICON_SIZE;
        icon.style.position = 'absolute';
        icon.style.left = `-${ICON_SIZE}`;
        icon.style.top = '50%';
        icon.style.transform = 'translateY(-50%)';

        // Texto del botón, con sus DOS etiquetas puestas: el CSS enseña una u otra
        // según el ancho. En móvil los tres botones comparten renglón y ahí no cabe
        // "GOG Database"; "GOGDB" es como se llama el sitio de destino.
        const label = document.createElement('span');
        label.className = 'cart-button__state-default';
        const long = document.createElement('span');
        long.className = LABEL_LONG_CLASS;
        long.textContent = 'GOG Database';
        const short = document.createElement('span');
        short.className = LABEL_SHORT_CLASS;
        short.textContent = 'GOGDB';
        label.appendChild(long);
        label.appendChild(short);

        wrapper.appendChild(icon);
        wrapper.appendChild(label);
        button.appendChild(wrapper);

        return button;
    }

    /**
     * Nombre del juego tal y como lo trae la ficha: los encabezados primero y, como
     * respaldo, og:title y document.title —a los que hay que quitarles el
     * "… - GOG.com"—. Puede venir traducido; para las búsquedas manda el que
     * devuelve fetchEnglishTitle(), y este solo es lo que se pinta mientras llega.
     *
     * Ya NO cae al identificador del producto. Ese respaldo se escribió creyendo que
     * `card-product` era el slug, y no lo es: es el id numérico (Cyberpunk 2077 =
     * 2093619782), así que cuando entraba mandaba a buscar "2093619782" a los dos
     * sitios. Sin encabezado legible es mejor no poner los dos botones de búsqueda.
     * @returns {string} Título limpio, o cadena vacía si no se pudo leer.
     */
    function getGameTitle() {
        const heading = TITLE_SELECTORS
            .map((sel) => document.querySelector(sel)?.textContent)
            .find((text) => text && text.trim());
        const og = document.querySelector('meta[property="og:title"]')?.content;
        return (heading || og || document.title || '')
            .trim()
            .replace(TITLE_PREFIX_REGEX, '')
            .replace(TITLE_SUFFIX_REGEX, '')
            .replace(TRADEMARK_REGEX, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // =============================================
    // NOMBRE EN INGLÉS (API de GOG)
    // =============================================

    function readNameCache(id) {
        try {
            const all = JSON.parse(localStorage.getItem(NAME_CACHE_KEY) || '{}');
            const hit = all[id];
            if (hit && hit.v === NAME_CACHE_SCHEMA && Date.now() - hit.ts < NAME_CACHE_TTL) return hit.names;
        } catch (e) { /* caché corrupta: se ignora y se vuelve a pedir */ }
        return null;
    }

    function writeNameCache(id, names) {
        try {
            let all = {};
            try { all = JSON.parse(localStorage.getItem(NAME_CACHE_KEY) || '{}'); } catch (e) { all = {}; }
            all[id] = { names, ts: Date.now(), v: NAME_CACHE_SCHEMA };
            const keys = Object.keys(all);
            if (keys.length > NAME_CACHE_MAX) {
                keys.sort((a, b) => (all[a].ts || 0) - (all[b].ts || 0))
                    .slice(0, keys.length - NAME_CACHE_MAX)
                    .forEach((k) => delete all[k]);
            }
            localStorage.setItem(NAME_CACHE_KEY, JSON.stringify(all));
        } catch (e) { console.error('(gog2gogdb): writeNameCache error:', e); }
    }

    /** Misma limpieza que getGameTitle() aplica al nombre de la ficha. */
    function cleanApiName(name) {
        return (name || '').replace(TRADEMARK_REGEX, '').replace(/\s+/g, ' ').trim();
    }

    /**
     * GET con corte por tiempo. Devuelve el JSON, o null ante cualquier fallo.
     * @param {string} url - URL a pedir.
     * @returns {Promise<any|null>} El JSON, o null.
     */
    async function fetchJson(url) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), NAME_TIMEOUT_MS);
        try {
            const res = await fetch(url, { credentials: 'omit', signal: ctrl.signal });
            return res.ok ? await res.json() : null;
        } catch (e) {
            console.warn('(gog2gogdb): API de GOG sin respuesta:',
                e.name === 'AbortError' ? 'tiempo agotado' : e.message);
            return null;
        } finally { clearTimeout(timer); }
    }

    /**
     * Identificador del juego al que pertenece el producto: el que necesita un DLC o
     * la edición base de una edición. Los dos caminos viven en el v2 y son distintos;
     * el porqué de cada uno, y por qué los mods quedan fuera, en el comentario de
     * GOG_GAME_API_V2.
     *
     * De la lista se toma la primera entrada. Puede haber varias —"Songs of the Past"
     * declara dos ediciones de The Witcher 3—, y ahí no hay una respuesta única que
     * elegir: PCGamingWiki tiene un artículo por juego.
     * @param {string} id - Identificador del producto en GOG.
     * @returns {Promise<string>} Id del juego base, o cadena vacía.
     */
    async function findBaseProductId(id) {
        const v2 = await fetchJson(GOG_GAME_API_V2 + encodeURIComponent(id));
        if (!v2) return '';

        const related = v2._links?.requiresGames || [];
        const relatedId = ((related[0]?.href || '').match(GOG_GAME_ID_REGEX) || [])[1] || '';
        if (relatedId) return relatedId;

        const editions = v2._embedded?.editions || [];
        const base = editions.find((e) => GOG_BASE_EDITION_REGEX.test(e?.name || '')
            && String(e.id) !== String(id));
        return base ? String(base.id) : '';
    }

    /**
     * Nombres en inglés del producto, pedidos a la API de GOG. Una petición colgada
     * dejaría los enlaces sin corregir y sin nada en consola que lo explique, de ahí
     * el corte por tiempo. Devuelve null ante cualquier fallo, que es lo que deja
     * los botones con el título de la ficha.
     *
     * Cuesta dos peticiones (producto y v2 del producto) y tres cuando hay juego
     * base (más el producto del base), pero solo la primera vez: la caché guarda por
     * id, así que el título del juego base se reaprovecha entre todos sus DLC. Y el
     * orden importa: si el v2 no contesta o el producto no declara juego
     * base, se devuelve igualmente el nombre propio en vez de no devolver nada.
     * @param {string} id - Identificador del producto en GOG (el `card-product`).
     * @returns {Promise<{name: string, baseName: string}|null>} Nombre propio y, si
     *     es un DLC o una edición, el del juego base; null si no se pudo obtener.
     */
    async function fetchEnglishNames(id) {
        const cached = readNameCache(id);
        if (cached) return cached;

        const product = await fetchJson(GOG_PRODUCT_API + encodeURIComponent(id));
        const name = cleanApiName(product?.title);
        if (!name) return null;

        let baseName = '';
        const baseId = await findBaseProductId(id);
        if (baseId) {
            const base = await fetchJson(GOG_PRODUCT_API + baseId);
            baseName = cleanApiName(base?.title);
        }

        const names = { name, baseName };
        writeNameCache(id, names);
        return names;
    }

    /**
     * Normaliza el título para la búsqueda de GG.deals quitando los acentos:
     * GG.deals translitera en su índice, así que "Pokémon" se busca como "Pokemon".
     * @param {string} title - Título limpio del juego.
     * @returns {string} Título sin diacríticos.
     */
    function normalizeForGgDeals(title) {
        return title.normalize('NFD').replace(DIACRITICS_REGEX, '');
    }

    /**
     * Estilos de la fila de enlaces externos: dos botones tan altos como el de GOG
     * Database, repartiéndose a partes iguales el ancho de la columna de compra.
     * El aspecto se define aquí y NO con las clases de GOG: su `button` no viste un
     * <a> (queda como texto suelto). Se replica el botón claro de su tarjeta de
     * compra, con su sombra.
     * La altura llega como variable desde matchSiblingHeight(), medida del botón de
     * GOG Database: la suya la pone `button--big`, así que cualquier valor fijo aquí
     * se desalinearía en cuanto GOG cambie su CSS. El 40px es solo el respaldo.
     */
    function injectStyles() {
        if (document.getElementById(STYLES_ID)) return;
        const style = document.createElement('style');
        style.id = STYLES_ID;
        style.textContent = `
            .${LINKS_CLASS} { display: flex; align-items: stretch; gap: 8px; margin-top: 8px; }
            .${LINKS_CLASS} .${LINK_CLASS} {
                flex: 1 1 0; min-width: 0; box-sizing: border-box;
                min-height: var(--gogx-h, 40px);
                display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                padding: 5px 8px; border: 1px solid rgba(0, 0, 0, .08); border-radius: 4px;
                background: #f2f2f2; color: #2b2b2b;
                box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
                font-size: 12px; font-weight: 700; line-height: 1.3;
                text-decoration: none; white-space: nowrap; overflow: hidden;
                cursor: pointer; transition: background 150ms ease, box-shadow 150ms ease;
            }
            .${LINKS_CLASS} .${LINK_CLASS}:hover {
                background: #e4e4e4; color: #2b2b2b; text-decoration: none;
                box-shadow: 0 2px 6px rgba(0, 0, 0, .22);
            }
            /* El botón de GOG Database es un <a> con las clases de botón de GOG. Su
               reset ya deja los <a> sin subrayado y en border-box, pero eso vive en
               su hoja: si un día cambia, esto evita que el botón salga subrayado o
               desbordado por el padding. */
            a.${GOGDB_LINK_CLASS}, a.${GOGDB_LINK_CLASS}:hover { text-decoration: none; box-sizing: border-box; }

            .${ICON_CLASS} { display: inline-flex; align-items: center; flex: 0 0 auto; }
            img.${ICON_CLASS} { width: 14px; height: 14px; object-fit: contain; }
            /* El logo de PCGamingWiki es más alto que ancho (viewBox 827x1158): se
               fija el alto y se deja el ancho automático para no deformarlo. */
            .${ICON_CLASS} svg { height: 14px; width: auto; display: block; }

            /* Lo mínimo para encajar el hint de GOG en esta fila. El hint pasa a ser
               el hijo flexible —antes lo era el propio enlace— y el trigger tiene que
               ocupar toda su caja para que el enlace siga midiendo lo mismo. */
            .${LINKS_CLASS} .${HINT_CLASS} { flex: 1 1 0; min-width: 0; }
            .${LINKS_CLASS} .${HINT_TRIGGER_CLASS} { display: flex; height: 100%; }
            /* Dos retoques a su caja, con un selector más específico que el suyo:
               - text-wrap: GOG la deja en nowrap porque sus avisos son de tres o
                 cuatro palabras; los de aquí pasan de cien caracteres y saldrían en
                 una sola línea fuera de la pantalla.
               - bottom: su 40px fijo da por hecha la altura de sus botones. Aquí la
                 altura se copia del botón de GOGDB (--gogx-h), así que el hueco se
                 calcula con ella y el tooltip nunca pisa el botón. */
            .${LINKS_CLASS} .${HINT_CLASS} .${HINT_CONTENT_CLASS} {
                text-wrap: wrap; white-space: normal; text-align: center;
                width: max-content; max-width: 240px;
                bottom: calc(var(--gogx-h, 40px) + 8px);
            }

            /* En escritorio el envoltorio no pinta nada: los dos bloques siguen
               apilados, que es como caben en una columna de compra de 380 px. */
            .${LABEL_SHORT_CLASS} { display: none; }
            @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
                /* En móvil la caja de compra ocupa el ancho de la pantalla, y ahí
                   sí dan los tres botones en un renglón. El de GOGDB pesa uno y la
                   fila de enlaces dos, que es lo que la deja con dos botones del
                   mismo ancho que él. */
                .${BLOCK_CLASS} { display: flex; align-items: stretch; gap: 8px; }
                .${BLOCK_CLASS} > .${GOGDB_LINK_CLASS} { flex: 1 1 0; min-width: 0; }
                .${BLOCK_CLASS} > .${LINKS_CLASS} { flex: 2 1 0; min-width: 0; }
                /* Los dos tienen que arrancar a la misma altura, y el del botón de
                   GOGDB es un estilo en línea: solo se le gana con !important. */
                .${BLOCK_CLASS} > .${GOGDB_LINK_CLASS} { margin-top: 16px !important; }
                .${BLOCK_CLASS} > .${LINKS_CLASS} { margin-top: 16px; }
                /* Botón de GOGDB a la medida de los otros dos: su padding de 15px y
                   su cuerpo heredado lo hacían el doble de ancho de lo que cabe. */
                .${BLOCK_CLASS} > .${GOGDB_LINK_CLASS} {
                    padding: 5px 8px; font-size: 12px; line-height: 1.3;
                    display: inline-flex; align-items: center; justify-content: center;
                    white-space: nowrap; overflow: hidden;
                }
                /* Su icono va posicionado FUERA del texto (left: -35px) para colgar
                   a la izquierda de la etiqueta centrada. Con el botón estrecho eso
                   lo sacaba del propio botón, así que aquí vuelve al flujo, como en
                   los otros dos. Son estilos en línea: hace falta !important. */
                .${BLOCK_CLASS} > .${GOGDB_LINK_CLASS} .cart-button__wrapper {
                    display: inline-flex; align-items: center; gap: 6px;
                }
                .${BLOCK_CLASS} > .${GOGDB_LINK_CLASS} img {
                    position: static !important; transform: none !important;
                    left: auto !important; top: auto !important;
                    width: 16px !important; height: 16px !important;
                }
                .${LABEL_LONG_CLASS} { display: none; }
                .${LABEL_SHORT_CLASS} { display: inline; }
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    /**
     * Crea un enlace con el icono dentro y a la izquierda de la etiqueta, con el
     * aspecto que le da injectStyles(). Es un <a> real, así que funcionan el clic
     * central y "copiar dirección del enlace".
     * El `title` se pone siempre: es la caída para cuando el hint de GOG no se pueda
     * montar. wrapInHint() lo retira cuando sí lo monta.
     * Con `shortLabel` el enlace lleva las DOS etiquetas puestas y es el CSS el que
     * enseña una u otra según el ancho, para que el cambio siga al girar el teléfono
     * sin escuchar `resize`.
     * @param {{ label: string, shortLabel?: string, url: string, iconSvg?: string, iconUrl?: string, tooltip: string }} opts
     * @returns {HTMLAnchorElement} El enlace listo para insertar.
     */
    function createLinkButton({ label, shortLabel, url, iconSvg, iconUrl, tooltip }) {
        const a = document.createElement('a');
        a.className = LINK_CLASS;
        a.href = url;
        a.target = '_blank';
        a.rel = 'nofollow noopener external';
        a.title = tooltip;

        if (iconSvg) {
            const box = document.createElement('span');
            box.className = ICON_CLASS;
            box.innerHTML = iconSvg;
            a.appendChild(box);
        } else if (iconUrl) {
            const img = document.createElement('img');
            img.className = ICON_CLASS;
            img.src = iconUrl;
            img.alt = '';
            img.addEventListener('error', () => img.remove());  // sin icono si el CSP lo bloquea
            a.appendChild(img);
        }
        if (shortLabel) {
            const long = document.createElement('span');
            long.className = LABEL_LONG_CLASS;
            long.textContent = label;
            const short = document.createElement('span');
            short.className = LABEL_SHORT_CLASS;
            short.textContent = shortLabel;
            a.appendChild(long);
            a.appendChild(short);
        } else {
            a.appendChild(document.createTextNode(label));
        }
        return a;
    }

    // Resultado de hintStylesAreLive(), que solo hace falta una vez por página: el
    // CSS de GOG no va a cambiar entre una inyección y la siguiente, y el observer
    // de la SPA llama a esto cada vez que vuelve a montar la ficha.
    let hintIsLive = null;

    /**
     * Comprueba que el componente hint de GOG siga vivo, midiendo un ejemplar suyo.
     * No es un lujo: lo que esconde el texto del tooltip es el `display: none` de SU
     * hoja de estilos. Si GOG renombrara las clases, el aviso se quedaría escrito en
     * mitad de la ficha, siempre visible; mejor no montarlo y quedarse con el `title`
     * del navegador, que nunca se ve mal.
     * @returns {boolean} true si `.hint__content` sigue naciendo oculto.
     */
    function hintStylesAreLive() {
        if (hintIsLive !== null) return hintIsLive;

        const probe = document.createElement('div');
        probe.className = HINT_CLASS;
        const trigger = document.createElement('div');
        trigger.className = HINT_TRIGGER_CLASS;
        const content = document.createElement('div');
        content.className = HINT_CONTENT_CLASS;
        probe.appendChild(trigger);
        probe.appendChild(content);
        // Fuera de la vista mientras se mide, por si el CSS ya no estuviera.
        probe.style.position = 'absolute';
        probe.style.left = '-9999px';
        document.body.appendChild(probe);
        hintIsLive = getComputedStyle(content).display === 'none';
        probe.remove();
        return hintIsLive;
    }

    /**
     * Envuelve un enlace en el hint de GOG, con el texto del aviso dentro. El `title`
     * se retira aquí: con el hint puesto sobrarían los dos, uno encima del otro.
     * @param {HTMLAnchorElement} link - El enlace ya creado, con su title puesto.
     * @param {string} text - El mismo texto del title.
     * @returns {HTMLElement} El hint listo para insertar, o el enlace tal cual si el
     *   CSS de GOG ya no está.
     */
    function wrapInHint(link, text) {
        if (!hintStylesAreLive()) return link;

        const box = document.createElement('div');
        box.className = HINT_CLASS;

        const trigger = document.createElement('div');
        trigger.className = HINT_TRIGGER_CLASS;
        trigger.appendChild(link);

        const content = document.createElement('div');
        content.className = HINT_CONTENT_CLASS;
        const label = document.createElement('span');
        label.className = HINT_LABEL_CLASS;
        label.textContent = text;
        content.appendChild(label);

        box.appendChild(trigger);
        box.appendChild(content);
        link.removeAttribute('title');
        return box;
    }

    /**
     * URL de la búsqueda de GG.deals por título, filtrada al DRM de GOG. Está
     * aparte del botón porque el href se reescribe cuando llega el nombre en inglés.
     * @param {string} title - Título del juego.
     * @returns {string} La URL de búsqueda.
     */
    function ggDealsUrl(title) {
        const params = new URLSearchParams({
            drm: GGDEALS_GOG_DRM,
            minRating: GGDEALS_MIN_RATING,
            title: normalizeForGgDeals(title)
        });
        return `${GGDEALS_SEARCH_URL}?${params}`;
    }

    /**
     * URL de la búsqueda de PCGamingWiki por título. Aparte por el mismo motivo
     * que ggDealsUrl().
     * @param {string} title - Título del juego.
     * @returns {string} La URL de búsqueda.
     */
    function pcgwUrl(title) {
        return `${PCGW_SEARCH_URL}?${new URLSearchParams({ search: pcgwSearchTitle(title) })}`;
    }

    /**
     * Recorta lo que PCGamingWiki no indexa: los sufijos de edición. Si el recorte
     * dejara la cadena vacía —un producto llamado solo "Deluxe Edition"— se queda
     * el título entero, que es peor buscar que nada.
     * @param {string} title - Título del producto.
     * @returns {string} Título sin el sufijo de edición.
     */
    function pcgwSearchTitle(title) {
        return title.replace(SKU_EDITION_REGEX, '').trim() || title;
    }

    /**
     * Fila con los enlaces a GG.deals y PCGamingWiki. Lleva la misma marca de
     * producto que el botón de GOGDB para que removeStaleButtons() la limpie al
     * navegar por la SPA; si no, quedaría la fila del producto anterior.
     * @param {string} slug - Identificador del producto en GOG (el `card-product`,
     *     que pese al nombre de la variable es el id numérico).
     * @returns {HTMLDivElement|null} El contenedor con los dos enlaces, o null si
     *     la ficha no da ningún nombre con el que buscar.
     */
    function createExternalLinks(slug) {
        const title = getGameTitle();
        if (!title) return null;   // sin nombre legible no hay búsqueda que ofrecer

        const box = document.createElement('div');
        box.className = LINKS_CLASS;
        box.setAttribute(BUTTON_ATTR, slug);

        const ggLink = createLinkButton({
            label: 'GG.deals',
            url: ggDealsUrl(title),
            iconUrl: GGDEALS_ICON_URL,
            tooltip: t.ggTip
        });
        const pcgwLink = createLinkButton({
            label: 'PCGamingWiki',
            // En móvil los tres botones comparten renglón y "PCGamingWiki" es la
            // etiqueta que no cabe; el logo de al lado ya dice de qué sitio es.
            shortLabel: 'PCGW',
            url: pcgwUrl(title),
            iconSvg: PCGW_ICON_SVG,
            tooltip: t.pcgwTip
        });
        box.appendChild(wrapInHint(ggLink, t.ggTip));
        box.appendChild(wrapInHint(pcgwLink, t.pcgwTip));

        // El nombre en inglés se pide DESPUÉS de pintar y solo reescribe los dos
        // href. Esperarlo antes retrasaría toda la fila, y la dejaría sin aparecer
        // cada vez que la API no contestara; así el peor caso es quedarse con el
        // título de la ficha, que es exactamente lo de antes.
        // El isConnected es por la SPA: si el usuario navega a otro producto antes
        // de que llegue la respuesta, removeStaleButtons() ya se llevó esta fila y
        // reescribirla sería tocar nodos huérfanos.
        fetchEnglishNames(slug).then((names) => {
            if (!names) return;
            if (!ggLink.isConnected || !pcgwLink.isConnected) return;
            ggLink.href = ggDealsUrl(names.name);
            // En un DLC o una edición, PCGamingWiki va al juego base: no tiene
            // artículo para el empaquetado. Los mods NO: se quedan con su nombre,
            // porque muchos sí tienen artículo propio en la wiki.
            pcgwLink.href = pcgwUrl(names.baseName || names.name);
        });

        return box;
    }

    /**
     * Iguala la altura de la fila a la del botón hermano, midiéndola ya en el DOM y
     * CADA VEZ que ese botón cambie de tamaño. Silencioso si no se puede medir: la
     * fila se queda con el respaldo del CSS.
     *
     * Una sola medida no basta. La altura del botón de GOGDB la pone `button--big`,
     * de la hoja de estilos de GOG, así que si se mide antes de que esté aplicada
     * `offsetHeight` vale 0 y la fila se queda desalineada para siempre. Es el mismo
     * fallo que se vio y se corrigió en el script de Epic, donde la primera fila de la
     * página salía a 40 px contra los 48 de su hermano.
     * @param {HTMLElement} links - Fila de enlaces externos.
     * @param {HTMLElement} sibling - Botón cuya altura hay que copiar.
     */
    function matchSiblingHeight(links, sibling) {
        let observer = null;
        const apply = () => {
            try {
                // Al navegar por la SPA la fila se retira; seguir observando su botón
                // dejaría un observer colgado por cada ficha visitada.
                if (!links.isConnected) {
                    if (observer) { observer.disconnect(); observer = null; }
                    return;
                }
                const h = sibling.offsetHeight;
                if (h > 0) links.style.setProperty('--gogx-h', `${h}px`);
            } catch (e) { /* sin medida: manda el valor por defecto del CSS */ }
        };

        apply();
        if (typeof ResizeObserver === 'function') {
            try {
                observer = new ResizeObserver(apply);
                observer.observe(sibling);
            } catch (e) { observer = null; }
        }
    }

    /**
     * Elimina los botones ya inyectados cuyo slug no sea el indicado (o todos,
     * si no se pasa ninguno). Evita que tras navegar dentro de la SPA quede en
     * pantalla un botón apuntando al producto anterior.
     * @param {string|null} keepSlug - Slug que debe conservarse, o null para borrar todos.
     */
    function removeStaleButtons(keepSlug) {
        document.querySelectorAll(`[${BUTTON_ATTR}]`).forEach((btn) => {
            if (!keepSlug || btn.getAttribute(BUTTON_ATTR) !== keepSlug) btn.remove();
        });
    }

    /**
     * Inserta el botón de GOGDB si estamos en una ficha de juego y el DOM ya
     * tiene slug y contenedor de acciones. Es idempotente: si el botón correcto
     * ya está puesto no hace nada, así que el observer puede llamarla sin límite.
     */
    function injectButton() {
        if (!isGamePage()) {
            removeStaleButtons(null);
            return;
        }

        const slug = getGameSlug();
        const container = document.querySelector(CONTAINER_SELECTOR);
        if (!slug || !container) return;

        removeStaleButtons(slug);
        injectStyles();

        // Envoltorio de los dos bloques. Lleva la misma marca de producto, así que
        // removeStaleButtons() se lo lleva entero al navegar por la SPA —con sus
        // hijos dentro— y no queda un envoltorio vacío del producto anterior.
        let block = container.querySelector(`.${BLOCK_CLASS}[${BUTTON_ATTR}="${slug}"]`);
        if (!block) {
            block = document.createElement('div');
            block.className = BLOCK_CLASS;
            block.setAttribute(BUTTON_ATTR, slug);
            container.appendChild(block);
        }

        // Cada pieza se comprueba POR SEPARADO, y no con un "¿hay algo marcado con
        // este producto?". Las dos llevan la misma marca, así que el botón de GOGDB
        // bastaba para dar el trabajo por terminado: si la fila no se podía construir
        // en esa pasada —la ficha todavía sin encabezado legible mientras la SPA la
        // rehace—, la siguiente pasada del observer se volvía atrás en la guarda y la
        // fila se perdía para siempre, dejando el botón de GOGDB solo. Comprobando por
        // separado, el observer que ya existe la añade en cuanto se pueda.
        let gogdbButton = block.querySelector(`.${GOGDB_LINK_CLASS}[${BUTTON_ATTR}="${slug}"]`);
        if (!gogdbButton) {
            gogdbButton = createGOGDBButton(slug);
            block.appendChild(gogdbButton);
        }

        if (!block.querySelector(`.${LINKS_CLASS}[${BUTTON_ATTR}="${slug}"]`)) {
            const links = createExternalLinks(slug);
            if (links) {
                block.appendChild(links);
                matchSiblingHeight(links, gogdbButton);
            }
        }
    }

    /**
     * Detiene el observer del DOM y su debounce pendiente.
     */
    function stopObserver() {
        if (observer) { observer.disconnect(); observer = null; }
        if (observerDebounce) { clearTimeout(observerDebounce); observerDebounce = null; }
    }

    /**
     * Observa el DOM mientras estemos en una ficha de juego. GOG es una SPA:
     * la columna de compra se vuelve a renderizar después de la navegación (y a
     * veces llega más tarde que el resto de la página), así que reinyectar al
     * detectar cambios es lo que garantiza que el botón esté siempre presente.
     */
    function startObserver() {
        if (observer) return;
        observer = new MutationObserver(() => {
            if (observerDebounce) return;
            observerDebounce = setTimeout(() => {
                observerDebounce = null;
                try {
                    injectButton();
                } catch (e) {
                    console.error('(gog2gogdb): Error al crear el botón GOGDB:', e);
                }
            }, OBSERVER_DEBOUNCE_MS);
        });
        observer.observe(document.body || document.documentElement, {
            childList: true, subtree: true,
        });
    }

    /**
     * Punto de entrada por ruta: en una ficha de juego inyecta y se queda
     * observando; en cualquier otra página limpia y deja de observar.
     */
    function syncToLocation() {
        if (!isGamePage()) {
            stopObserver();
            removeStaleButtons(null);
            return;
        }
        injectButton();
        startObserver();
    }

    /**
     * Intercepta los cambios de URL de la SPA sobrescribiendo history.pushState
     * y history.replaceState, y escuchando popstate (atrás/adelante).
     * @param {Function} callback - Función a ejecutar cuando cambia la URL.
     */
    function onUrlChange(callback) {
        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = function () {
            pushState.apply(this, arguments);
            callback();
        };
        history.replaceState = function () {
            replaceState.apply(this, arguments);
            callback();
        };

        window.addEventListener('popstate', callback);
    }

    // =============================================
    // INICIALIZACIÓN
    // =============================================
    window.addEventListener('beforeunload', stopObserver);

    onUrlChange(() => {
        try {
            const newPath = location.pathname;
            if (newPath === actualPath) return;
            actualPath = newPath;
            syncToLocation();
        } catch (e) {
            console.error('(gog2gogdb): Error en el handler de cambio de URL:', e);
        }
    });

    try {
        actualPath = location.pathname;
        syncToLocation();
    } catch (e) {
        console.error('(gog2gogdb): Error al crear el botón GOGDB:', e);
    }
})();
