// ==UserScript==
// @name         Steam → F95Zone Search
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  Adds an F95Zone icon button in Steam's game nav bar.
// @author       vexxowo (with Claude & Gemini, inspired by FunkyJustin)
// @match        https://store.steampowered.com/app/*
// @match        https://steamcommunity.com/app/*
// @icon         https://f95zone.to/favicon.ico
// @updateURL    https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @downloadURL  https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function inject() {
        // Find the target anchor button based on the page type
        const targetLink = [...document.querySelectorAll('a')].find(a => {
            const text = a.textContent.trim();
            // On Community Hub, target "Store Page". On Store, target "Community Hub".
            return text === 'Store Page' || text === 'Community Hub';
        });

        const titleEl = document.querySelector('#appHubAppName, .apphub_AppName, .persona_name.text_white a');
        
        if (!targetLink || !titleEl) return false;

        const h = targetLink.offsetHeight;
        if (h === 0) return false;

        const navBar = targetLink.parentElement;
        if (navBar.querySelector('.f95zone-btn')) return true;

        const title = titleEl.textContent.trim();
        const searchUrl = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/search=${encodeURIComponent(title)}`;

        const btn = document.createElement('a');
        btn.href      = searchUrl;
        btn.target    = '_blank';
        btn.rel       = 'noopener noreferrer';
        btn.title     = 'View on F95Zone';
        btn.className = 'f95zone-btn ' + targetLink.className;
        
        // Consistent 46px width and 4px margin for UI alignment
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
        return true;
    }

    const interval = setInterval(() => {
        if (inject()) clearInterval(interval);
    }, 500);

    setTimeout(() => clearInterval(interval), 10000);
})();
