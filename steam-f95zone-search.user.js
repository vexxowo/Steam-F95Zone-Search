// ==UserScript==
// @name         Steam → F95Zone Search
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a dedicated F95Zone search button to Steam Store and Community Hub pages
// @author       vexxowo
// @match        https://store.steampowered.com/app/*
// @match        https://steamcommunity.com/app/*
// @icon         https://f95zone.to/favicon.ico
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @downloadURL  https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @grant        GM_xmlhttpRequest
// @connect      f95zone.to
// ==/UserScript==
(function () {
    'use strict';

    function resolveSearchUrl(title, btn) {
        const fallback = `https://f95zone.to/search/?q=${encodeURIComponent(title)}&c[title_only]=1&o=relevance`;
        btn.href = fallback;

        // Step 1: grab CSRF token from F95Zone
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://f95zone.to/',
            onload: function (r1) {
                const tokenMatch = r1.responseText.match(/data-csrf="([^"]+)"/);
                if (!tokenMatch) return;

                // Step 2: POST to search — XenForo redirects to /search/{id}/
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'https://f95zone.to/search/search',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: [
                        `keywords=${encodeURIComponent(title)}`,
                        `c[title_only]=1`,
                        `order=relevance`,
                        `_xfToken=${encodeURIComponent(tokenMatch[1])}`
                    ].join('&'),
                    onload: function (r2) {
                        // finalUrl is the resolved redirect
                        if (r2.finalUrl && /\/search\/\d+\//.test(r2.finalUrl)) {
                            btn.href = r2.finalUrl;
                        }
                    },
                    onerror: function () { /* keep fallback */ }
                });
            },
            onerror: function () { /* keep fallback */ }
        });
    }

    function inject() {
        const targetLink = [...document.querySelectorAll('a')].find(a => {
            const text = a.textContent.trim();
            return text === 'Store Page' || text === 'Community Hub';
        });
        const titleEl = document.querySelector('#appHubAppName, .apphub_AppName, .persona_name.text_white a');

        if (!targetLink || !titleEl) return false;
        const h = targetLink.offsetHeight;
        if (h === 0) return false;
        const navBar = targetLink.parentElement;
        if (navBar.querySelector('.f95zone-btn')) return true;

        const rawTitle = titleEl.textContent.trim();
        const title = location.hostname === 'store.steampowered.com'
            ? rawTitle.replace(/\s*\[.*?\]\s*/g, '').trim()
            : rawTitle;

        const btn = document.createElement('a');
        btn.target    = '_blank';
        btn.rel       = 'noopener noreferrer';
        btn.title     = 'View on F95Zone';
        btn.className = 'f95zone-btn ' + targetLink.className;

        btn.style.cssText = `
            height: ${h}px !important;
            width: 46px !important;
            line-height: ${h}px !important;
            padding: 0 !important;
            margin-right: 4px !important;
            display: inline-block !important;
            vertical-align: top !important;
            text-align: center !important;
            box-sizing: border-box !important;
        `;
        const img = document.createElement('img');
        img.src    = 'https://f95zone.to/favicon.ico';
        img.width  = 16;
        img.height = 16;
        img.style.cssText = 'vertical-align: middle; pointer-events: none;';
        btn.appendChild(img);
        navBar.insertBefore(btn, targetLink);

        resolveSearchUrl(title, btn);
        return true;
    }

    const interval = setInterval(() => {
        if (inject()) clearInterval(interval);
    }, 500);
    setTimeout(() => clearInterval(interval), 10000);
})();
