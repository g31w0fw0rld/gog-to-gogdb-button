// ==UserScript==
// @name         GOG to GOGDB Button
// @namespace    https://gog.com/
// @version      1.2.0
// @description  Adds a GOG Database button (builds, product data, price history, store changes) to GOG.com game pages, styled like GOG's own buttons and linking to that exact product. Works on the store in any language, with or without the locale segment in the URL.
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

        container.appendChild(createGOGDBButton(slug));
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
