// ==UserScript==
// @name         Steam → F95Zone Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a dedicated F95Zone search button to Steam Store and Community Hub pages
// @author       vexxowo
// @match        https://store.steampowered.com/app/*
// @match        https://steamcommunity.com/app/*
// @icon         https://f95zone.to/favicon.ico
// @license      MIT
// @updateURL    https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @downloadURL  https://raw.githubusercontent.com/vexxowo/Steam-F95Zone-Search/main/steam-f95zone-search.user.js
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
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

        const searchUrl = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/search=${encodeURIComponent(title)}`;
        const btn = document.createElement('a');
        btn.href      = searchUrl;
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
        return true;
    }
    const interval = setInterval(() => {
        if (inject()) clearInterval(interval);
    }, 500);
    setTimeout(() => clearInterval(interval), 10000);
})();
