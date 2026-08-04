// ==UserScript==
// @name         GOG to GOGDB Button
// @namespace    https://gog.com/
// @version      1.3.0
// @description  Adds three buttons to GOG.com game pages, styled like GOG's own. GOG Database links to that exact product (builds, product data, price history, store changes), built from the slug in the page. GG.deals searches the title among GOG-DRM deals, with no store-rating floor so nothing is hidden. PCGamingWiki searches the title for compatibility and fixes. The last two are title searches and say so in their tooltip. Works in any language, with or without the locale segment in the URL.
// @author       g31w0fw0rld
// @license      MIT
// @match        https://www.gog.com/*
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

    // Icono de GG.deals: favicon remoto (su CDN permite el hotlink). Si el CSP de
    // GOG lo bloqueara, el onerror lo quita y queda solo la etiqueta.
    const GGDEALS_ICON_URL = 'https://gg.deals/favicon.ico';
    // Icono de PCGamingWiki: SVG inline. Su favicon.ico responde 403 al hotlink
    // (Cloudflare) desde otros dominios, así que como <img> remoto no se ve; el SVG
    // inline es markup y siempre pinta, sin depender del CSP ni del hotlink.
    const PCGW_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 827 1158" width="13" height="18" aria-hidden="true" style="vertical-align:middle;flex:0 0 auto"><path d="M0 166.2 448.9-1.1 827.4 56.1l0 1023.9 0.1 28.9L452.1 1158.9 0 1008.4z" fill="#365798"/><path d="M25.3 985.5 24.1 190.5 413 46.8 412 1107.6zM478.1 1108.6 478.3 52.3 788.1 94.3l0 975.8z" fill="#a5b6d9"/><path d="M215.5 737 41.5 727 40.3 420.5 215.9 404.1zm16.7-334.5 156.1-19.4-1.2 359.8-155.2-4.8zM39.3 399.9l0-194.4 176-57.4 1.2 232.1zm350.8-317.2 0.9 274.5-158.7 20.4 0-238zm-253 909.7 0-235.1 141.7 9.3 0 268.4zm247 80.8-17.3-6.4c3.8-22.5-18.9-31.9-19.1-5.7l-18.7-5.5c-0.9-22.1-13.9-31.7-21.2-6.8l-9.7-3-0.6-277.7 12.3 0.9c-4.3 27.5 23.5 28.2 20.3 1.7L350.4 772c-4.4 28.6 23.2 28.9 20.4 1.3l12.7 0.8zM42.8 751.1l82.2 5.9-0.5 108-81.9-11.2zm83.1 129.3-0.9 110.4-82.7-20.2 0-102.4zM494.3 70l278.6 36.6 0 950-278.3 35.1z" fill="#365798"/><path d="m279 507.5c-0.1-5.1 0-10 3.2-14.2 6 0.2 4.9 9.7 5 14.3 10.3 5.1 4.9-10.8 10.2-15.3 7.6-0.8-0.6 16 6.9 15.8 4.9-0.1 3.9-2.4 3.8-6.7-0.1-3.9 0.4-7.8 3.8-10.3 8.2 3.1 0.8 18.2 11.2 15.8 0-6.4-1-14.2 5.8-17.6 2.6 5.2-0.1 14.8 5.4 16.1 7.4 1.7 8.4 3.6 10.2 10.5 0.8 3.1-0.4 4.6 2.8 6.4 3.5 2 7.6 1.4 7.7 6.1 0.1 6.4-2.7 5.5-7.6 5.5-1.8 0-2.4 3.4-2.5 4.7-0.4 4.7 0.4 5.7 5 7 5.9 1.7 4.9 3.3 4.9 8.7 0 2.7 0.5 1.2-3.1 1.9-5.7 1.1-7 0.3-6.7 6.8 0.4 7.8 13.4 1.4 9.7 12.6-1.6 4.8-9.5 1.1-9.5 5.3 0 5.3-1.1 7.7 5.4 8.2 6.4 0.5 6 9.1 0.4 11-3.4 1.2-4.6-0.1-5.8 4-1.2 4.1-1.1 8.4-2.6 12.5-6.1 4.5-11.6-1.7-11.6 8.4 0 2.7-0.6 4.7-1.1 7.3-0.9 5-2.2 0.7-5.8 1.8-1-1.2 0-7.9 0-9.5 0-4.7-1.6-5.8-7-5.4-0.3 5.8-0.2 12-4.9 16.2-2.9-1.9-4-4.8-4.2-8.1-0.3-6.5 0.2-6.7-6.5-8.3-1.2 2.9-2 11.4-1.5 14.5-5.2 2.6-6-5.4-6-8.6 0-2.7 1.1-5.7-2.3-6.7-3.4-0.9-4.6 0.8-4.7 3.9-0.2 6.1-0.5 8.8-5.3 12.2-1.9-5.4-0.3-14.7-6.6-16.4-7-1.8-7.9-6.9-8-13.6-0.1-7.3-8.9-0.3-8.9-8.2 0-0.8-0.6-4.9 0-5.5 2.9-2.1 5.8 1.2 8.5 0.1 1.3-3.6 1.8-9-2.1-9.9-4-0.9-7.8-1.4-6.9-6 1.1-5.7 0.1-5.4 6.3-5.8 4.7-0.3 3-5.2 3.1-8.4-6.2-2.9-8.8 0.8-8.8-7.4 0-5.6-0.4-5.1 5.2-5.1 4.8 0 3.4-1.7 3.4-6.3 0-5.1-9.2-0.6-9.6-7.6-0.2-3 1-5.6 3.9-6.7 5.1-2 5.7-2.3 5.9-7.8 0.3-8 5.6-8.9 12-12.1l0 0 0 0zM88.3 368.3l24.3-92.2-15.7 7.5 21.6-79 25.5-7.3-19.1 53.1 19.2-10.3-55.7 128.3 0 0z" fill="#a5b6d9"/><path d="m278.8 317.9c1.2-3.2 2.5-6.5 3.8-9.9 13.8 5.9 26.4 10.2 40.6 1.9 13.7-8 22.8-24.3 28-38.8 10.2-28.4 10.2-66.8-8.3-91.8-22.5-30.5-54.5-14.5-69.8 13.9-4.7 8.8-11.2 31.3-12.1 45.3-0.5 6.9-0.2 14.1 0.8 21.3 1 8.1 5.2 16.5 4.2 24.7-0.3 2.5-1.8 4.1-4.6 4.6-16.7-28-7.6-72.9 4.9-100.6 12.5-27.6 47.9-55.5 75.9-29 25.7 24.2 28.2 68.1 21.3 100.3-6.2 28.8-26 71.4-61.9 68.2-6.4-0.6-19.1-3.8-22.7-10l0 0zM299.3 272c-3.2-11.6 11.5-19.5 14.8-28.4 1.9-5.2-0.1-9.6-2.2-14-4.9-2.6-9-1.1-10.8 4-3.2 8.9-6.5 14.9-12.6 22.1-3.3-13.7-1.4-29.1 6.6-40.9 4.3-6.3 12.9-9.4 19.4-6.9 20.5 7.8 14.2 42.7 5.3 56.4-4.7 7.3-12.7 7.6-20.5 7.6L299.3 272zm3.4-25.8c0.5 0.7 0.5 1.4 0.2 2-9.4 21.3-18.7 42.6-28.2 64-0.9-0.4-1.4-0.4-1.7-0.7-3.3-3.9-5.6-8.5-7.8-13.1-0.9-1.8 0.1-3.6 1.2-5.1l32.8-43.7c0.9-1.3 2-2.6 3.4-3.4l0 0z" fill="#a5b6d8"/><path d="m188.7 921.7c-6.1 11.9-4.4 25.1-6 38-9.7-2.4-16.7-21.7-18.6-30 1.7-9.9 6.9-17.2 12.9-24.9 2.8-3.6 3.7-7.2 1.9-11.4-0.7-1.6-0.6-3.6-2-4.9-8.7 1.5-13.9 8.2-19.9 14-6.7-7-5.2-33.4 0.2-41.1 8.4-1.5 15.8 1 22.6 5.8 5.3-5.2 5.6-10.3 0.9-15.7-3.6-4.1-14.7-8.9-16.7-13.1-1.6-6.3 10.2-27.5 17.3-27.2 7.8 11.5 12.4 24.5 15 38.1 2.7 1.1 5.1 2.1 8.2 1.5 1.6-15.5-1.9-30.3-6.8-44.8 0.5-0.5 0.8-0.9 1-0.9 8.6 0.6 16.8 2.3 23.4 8.6 14.9 14.2-11.5 41.7 0.4 58.4 10.7-10.3 10.5-23.1 18.6-34 8 10.3 15 31 13.7 44.1-6.9 8.3-12.4 13-28.9 14.2 0.5 3.7-1.8 7.2-0.8 11.5 8.8 9.4 18.5 7.9 30.1 7.2 1.6 8.2-6.7 33.6-12.9 39.7-12.6-5.7-19.1-17.9-26.1-29.1-2.5 1.9-4.6 3.7-6.4 6.1 1.7 12.9 18 29.3 15.9 40.7-5.5 2.6-11.4 4.3-17.7 3.4-6.2-0.9-8.7-4.3-10.2-10.9-3.3-14.7 3.2-32.8-9.2-43.3zm118.5 22.1 0-63.8 67.8 10.9 0 67.4zM307.1 804.2 375 811.3 375 878.1 307.1 868.2zm67.7 165.5 0 66.8-67.6-18.6 0-63.6zm-320.5-31.7 0-28.9 13.7 2 16.5-16.6 0.7 67.6-16.3-20.9z" fill="#a5b6d9"/><path d="m89.1 914.4c1.4-0.6 2.3-0.5 3.4-0.2 2.8 6.5 3.9 13.4 3.6 20.5-0.1 2.7-1.1 5.1-1.7 7.6-0.5 1.9-1.8 3-3.4 3.9-1.3-1.3-0.9-2.5-0.6-3.8 0.8-3.7 1.6-7.3 1.7-11.1 0.2-5.8-1.6-11.2-2.9-16.9l0 0 0 0zm7 42.4c-0.3-3.3 0.9-6.2 1.6-9.1 1-4.4 2.5-8.8 3.1-13.2 0.8-5.6-1-11-2.4-16.4-0.7-2.5-1.5-5-2.2-7.5-0.4-1.6-0.7-3.1 0.2-4.5 1.3-0.1 1.8 0.6 2.1 1.3 2.1 4.3 3.6 8.6 4.5 13.3 1 5.5 0.5 10.9 0.9 16.3 0.3 3.5-0.8 6.9-1.3 10.2-0.6 3.8-2.6 7.4-6.6 9.6l0 0zm7.6 10.4c-1.9-3.7-1.4-6.5-0.1-9.8 3.1-8.1 5.9-16.4 5.3-25.2-0.5-7.7-1.8-15.2-4.6-22.4-1.2-3-2.3-6.1-3.3-9 0.8-1.2 1.7-2 3.4-1.6 1.8 4.1 3.9 8.3 5.1 12.8 5 19 5 37.4-5.7 55.3l0 0z" fill="#a5b6d9"/><path d="m598.7 1047.1-70.3 8.4-0.2-378.8 70.5-3.8zM688.5 533.1c-11 50.3-65.8 45.6-78.3 2.8l-92.4 3.1-0.2-67.9 89.4-3.3c22.8-54 64.5-46.2 81.8 0.2l66.2 0.4 1.6 61.8zm-172.4-237.1 0-24 241.7 7.5 0.1 19.4z" fill="#a5b6d9"/><path d="m52.3 827.5 62.6 9.7-19.2-43.4-8.2 15-13.4-29.3-21.8 48.1zM116.4 788c0 4.4-3.5 7.9-7.9 7.9-4.4 0-7.9-3.5-7.9-7.9 0-4.4 3.5-7.9 7.9-7.9 4.4 0 7.9 3.5 7.9 7.9z" fill="#a5b6d9"/><ellipse cx="649.4" cy="501.8" rx="31" ry="51.8" fill="#365798"/><path d="m177.7 627.1c-1.8 3-1.6 6.7 0.4 9.3l-26.3 40 6.6-0.1 25-36.7c3.2 0.6 6.6-0.9 8.5-3.8 2.4-3.9 1.2-9-2.7-11.4-3.9-2.4-9-1.2-11.5 2.7zm-110.8 29.7-9.7 12.9 4.6 4.3 7.9-11 7.1 0.3c0.4 0.7 0.9 1.4 1.5 2 3.3 3.3 8.6 3.3 11.8 0 3.3-3.3 3.3-8.6 0-11.8-3.3-3.3-8.6-3.3-11.8 0-1 1-1.7 2.3-2.1 3.6zm20.1-68.7c-4.4 0-8 3.6-8 8 0 4.4 3.6 8 8 8 3.7 0 6.8-2.5 7.7-6l44.5 1.3 17.4 21.5c-0.2 0.8-0.4 1.6-0.4 2.4 0 4.6 3.8 8.4 8.4 8.4 4.6 0 8.4-3.8 8.4-8.4 0-4.6-3.8-8.4-8.4-8.4-1.5 0-2.9 0.4-4.1 1.1l-18.9-22.9-48-1.3c-1.4-2.2-3.9-3.7-6.8-3.7zm13.5 27c-4.6 0.1-8.3 4-8.1 8.6 0.1 4.6 4 8.3 8.6 8.1 3.3-0.1 6-2.1 7.3-4.9l22.2-0.5c1.4 2.9 4.4 4.8 7.8 4.7 4.6-0.1 8.3-4 8.1-8.6-0.1-4.6-4-8.3-8.6-8.1-3.6 0.1-6.6 2.5-7.7 5.7l-21.5 0.5c-1.2-3.3-4.4-5.7-8.1-5.6zm-26 16.7c0 4.4-3.6 8-8 8-4.4 0-8-3.6-8-8 0-4.4 3.6-8 8-8 4.4 0 8 3.6 8 8zM87.6 476.5c-3.5 0.2-6.4 2.5-7.5 5.6l-22.6 1 0.3 6.2 22.6-1c1.4 3 4.4 5 7.9 4.9 4.6-0.2 8.1-4.1 7.9-8.7-0.2-4.6-4.1-8.2-8.7-8zm56.3 20c-4.6 0.1-8.3 4-8.1 8.6 0.1 4.6 4 8.3 8.6 8.1 3.3-0.1 6-2.1 7.3-4.9l25.3-0.7c1.4 2.9 4.4 4.8 7.8 4.7 4.6-0.1 8.3-4 8.1-8.6-0.1-4.6-4-8.3-8.6-8.1-3.6 0.1-6.6 2.5-7.7 5.7l-24.6 0.7c-1.2-3.3-4.4-5.7-8.1-5.6zm-44.4-30.4-4.1 4.7 19.8 17.1 80.9-3-0.5-6.2-78.3 2.8zm-41.6 51.7-0.2-6 68.2-4 71.4 103.9-5.3 3.3-70.1-101.1zm132.6 25.4c2.3-2.6 2.6-6.3 1.1-9.3l6.6-9.5 0.4-9-11.7 14.4c-3.1-1.1-6.7-0.2-9 2.4-3 3.5-2.7 8.7 0.8 11.7 3.5 3 8.7 2.7 11.8-0.8zm-32.3 0.4c2 2.9 5.5 4.1 8.7 3.3l30.7 44.3-0.1-9.8-25.5-38c1.8-2.8 1.8-6.4-0.2-9.3-2.6-3.8-7.8-4.7-11.6-2-3.8 2.6-4.7 7.8-2.1 11.6zm-34.8-9.6c-3.5 0.2-6.4 2.5-7.5 5.6l-57.2 2.9 0.3 6.2 57.2-2.9c1.4 3 4.4 5 7.9 4.9 4.6-0.2 8.1-4.1 7.9-8.7-0.2-4.6-4.1-8.2-8.7-8zm17.5 33-81.3 2 0.2 6.3 78.7-2 17.5 22.3c-0.2 0.8-0.4 1.6-0.4 2.4 0 4.6 3.8 8.4 8.4 8.4 4.6 0 8.4-3.8 8.4-8.4 0-4.6-3.8-8.4-8.4-8.4-1.5 0-2.9 0.4-4.1 1.1zM179.2 672.5c1.2 2.6 5 0.2 5.7 3.6-1 4.1-8.9 0.5-11.6 0.9-1.4-4.3 8.4-15.3 10.9-18.8 2.8-1.4 9.4 0 12.6 0 0.3 2.8 0.5 5.3-1.5 7.8-3.4 0.1-6.7-1.4-10.1-1.7-2 2.7-4 5.5-6 8.2zM67.3 604.9l-8.1 0 0-6.7c6.2 0 9.7-1.6 13.2 3.9 6.6 10.3 12.8 20.9 19.1 31.4 3.1 5.2 6.3 10.4 9.5 15.5 4.6 7.4 5.8 8 14.6 8.6 6.3 0.4 12.7 0.4 19.1 0.4 6.6 0 6.4-5.5 12.7-4.9 5.4 5.1 5.4 11.7 0 16.8-6 0.4-5.3-5.8-9.8-5.8l-19.2 0c-9.5 0-12.4 2.1-17.3-5.6-11.2-17.9-22.4-35.7-33.6-53.6z" fill="#a5b6d9"/><path d="m339.3 257.1c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm14.4-13.7c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm23 0c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm-12.9 46.6c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm14.7-11.5c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9zm7.4-18.3c0 3.2-2.6 5.9-5.9 5.9-3.2 0-5.9-2.6-5.9-5.9 0-3.2 2.6-5.9 5.9-5.9 3.2 0 5.9 2.6 5.9 5.9z" transform="matrix(0.59478444,0,0,0.93466127,95.788817,-7.8295466)" fill="#365798"/></svg>';

    const LINKS_CLASS = 'gogx-links';
    const LINK_CLASS = 'gogx-link';
    const ICON_CLASS = 'gogx-ico';
    const STYLES_ID = 'gogx-styles';

    // Fuentes del nombre del juego, en orden de preferencia. Como último recurso se
    // usa el slug, que siempre está (es el que alimenta el botón de GOGDB): pierde
    // la puntuación y las mayúsculas, pero como término de búsqueda sirve.
    const TITLE_SELECTORS = ['h1.productcard-basics__title', '.productcard-basics__title', '.header__title', 'h1'];

    // Limpieza del título antes de buscarlo fuera de GOG.
    const TRADEMARK_REGEX = /[™®©]/g;
    // Prefijo y cola que GOG añade en og:title y document.title según el idioma
    // ("Buy DOOM + DOOM II" / "DOOM + DOOM II - GOG.com").
    const TITLE_PREFIX_REGEX = /^\s*(?:comprar|compra|buy|acheter|kaufen|acquista|koop|köp|kup)\s+/i;
    const TITLE_SUFFIX_REGEX = /\s*(?:[-–|]\s*|\s+(?:on|en|sur|auf|su|em)\s+)GOG\.com.*$/i;
    // Diacríticos combinados, para quitarlos tras normalizar a NFD.
    const DIACRITICS_REGEX = /[\u0300-\u036f]/g;

    // =============================================
    // IDIOMA (solo para los tooltips: español vs. inglés)
    // =============================================
    // Manda el lang del documento: GOG sirve la ficha en el idioma que el usuario
    // eligió en la tienda, así que es su preferencia y no la UI del sitio.
    function detectLang() {
        const docLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
        const navLang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
        return (docLang || navLang).startsWith('es') ? 'es' : 'en';
    }

    const I18N = {
        es: {
            ggTip: 'Busca el título en GG.deals con el filtro de DRM de GOG. Al buscar por nombre, puede no dar con el juego exacto.',
            pcgwTip: 'Busca el título en PCGamingWiki (compatibilidad y arreglos). Al buscar por nombre, puede no dar con el artículo exacto.'
        },
        en: {
            ggTip: 'Searches the title on GG.deals with the GOG DRM filter. Being a title search, it may not hit the exact game.',
            pcgwTip: 'Searches the title on PCGamingWiki (compatibility and fixes). Being a title search, it may not hit the exact article.'
        }
    };
    const t = I18N[detectLang()];

    // El segmento de idioma es OPCIONAL: GOG sirve la misma ficha como
    // /game/slug, /en/game/slug, /de/game/slug, /zh-Hans/game/slug… Por eso el
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
        const button = document.createElement('button');
        button.className = 'button button--big go-to-library-button';
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

        // Texto del botón
        const label = document.createElement('span');
        label.className = 'cart-button__state-default';
        label.textContent = 'GOG Database';

        wrapper.appendChild(icon);
        wrapper.appendChild(label);
        button.appendChild(wrapper);

        button.onclick = () => window.open(`${GOGDB_BASE_URL}${slug}`, '_blank');

        return button;
    }

    /**
     * Nombre del juego para las búsquedas externas. Prueba los encabezados de la
     * ficha, cae a og:title y document.title —a los que hay que quitarles el
     * "… - GOG.com"— y, si nada de eso hubiera, reconstruye algo legible desde el
     * slug, que siempre está.
     * @param {string} slug - Slug del producto en GOG, como respaldo final.
     * @returns {string} Título limpio (nunca vacío si hay slug).
     */
    function getGameTitle(slug) {
        const heading = TITLE_SELECTORS
            .map((sel) => document.querySelector(sel)?.textContent)
            .find((text) => text && text.trim());
        const og = document.querySelector('meta[property="og:title"]')?.content;
        const title = (heading || og || document.title || '')
            .trim()
            .replace(TITLE_PREFIX_REGEX, '')
            .replace(TITLE_SUFFIX_REGEX, '')
            .replace(TRADEMARK_REGEX, '')
            .replace(/\s+/g, ' ')
            .trim();
        return title || (slug || '').replace(/[_-]+/g, ' ').trim();
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
            .${ICON_CLASS} { display: inline-flex; align-items: center; flex: 0 0 auto; }
            img.${ICON_CLASS} { width: 14px; height: 14px; object-fit: contain; }
            /* El logo de PCGamingWiki es más alto que ancho (viewBox 827x1158): se
               fija el alto y se deja el ancho automático para no deformarlo. */
            .${ICON_CLASS} svg { height: 14px; width: auto; display: block; }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    /**
     * Crea un enlace con el icono dentro y a la izquierda de la etiqueta, con el
     * aspecto que le da injectStyles(). Es un <a> real, así que funcionan el clic
     * central y "copiar dirección del enlace".
     * @param {{ label: string, url: string, iconSvg?: string, iconUrl?: string, tooltip: string }} opts
     * @returns {HTMLAnchorElement} El enlace listo para insertar.
     */
    function createLinkButton({ label, url, iconSvg, iconUrl, tooltip }) {
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
        a.appendChild(document.createTextNode(label));
        return a;
    }

    /**
     * Fila con los enlaces a GG.deals y PCGamingWiki. Lleva la misma marca de slug
     * que el botón de GOGDB para que removeStaleButtons() la limpie al navegar por
     * la SPA; si no, quedaría la fila del producto anterior.
     * @param {string} slug - Slug del producto en GOG.
     * @returns {HTMLDivElement} El contenedor con los dos enlaces.
     */
    function createExternalLinks(slug) {
        const title = getGameTitle(slug);
        const box = document.createElement('div');
        box.className = LINKS_CLASS;
        box.setAttribute(BUTTON_ATTR, slug);

        const ggParams = new URLSearchParams({
            drm: GGDEALS_GOG_DRM,
            minRating: GGDEALS_MIN_RATING,
            title: normalizeForGgDeals(title)
        });
        box.appendChild(createLinkButton({
            label: 'GG.deals',
            url: `${GGDEALS_SEARCH_URL}?${ggParams}`,
            iconUrl: GGDEALS_ICON_URL,
            tooltip: t.ggTip
        }));
        box.appendChild(createLinkButton({
            label: 'PCGamingWiki',
            url: `${PCGW_SEARCH_URL}?${new URLSearchParams({ search: title })}`,
            iconSvg: PCGW_ICON_SVG,
            tooltip: t.pcgwTip
        }));
        return box;
    }

    /**
     * Iguala la altura de la fila a la del botón hermano, midiéndola ya en el DOM.
     * Silencioso si no se puede medir (la fila se queda con el respaldo del CSS).
     * @param {HTMLElement} links - Fila de enlaces externos.
     * @param {HTMLElement} sibling - Botón cuya altura hay que copiar.
     */
    function matchSiblingHeight(links, sibling) {
        try {
            const h = sibling.offsetHeight;
            if (h > 0) links.style.setProperty('--gogx-h', `${h}px`);
        } catch (e) { /* sin medida: manda el valor por defecto del CSS */ }
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
        if (container.querySelector(`[${BUTTON_ATTR}="${slug}"]`)) return;

        injectStyles();
        const gogdbButton = createGOGDBButton(slug);
        const links = createExternalLinks(slug);
        container.appendChild(gogdbButton);
        container.appendChild(links);
        matchSiblingHeight(links, gogdbButton);
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
