// ==UserScript==
// @name         Steam → F95Zone Search
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Adds an F95Zone icon button in Steam's game nav bar
// @author       Claude & Gemini (Inspired by FunkyJustin)
// @match        https://store.steampowered.com/app/*
// @match        https://steamcommunity.com/app/*
// @icon         https://f95zone.to/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function inject() {
        const communityLink = [...document.querySelectorAll('a')]
            .find(a => a.textContent.trim() === 'Community Hub');
        const titleEl = document.querySelector('#appHubAppName, .apphub_AppName');
        if (!communityLink || !titleEl) return false;

        // Wait until the browser has actually laid out the button
        const h = communityLink.offsetHeight;
        if (h === 0) return false;

        const navBar = communityLink.parentElement;
        if (navBar.querySelector('.f95zone-btn')) return true;

        const title     = titleEl.textContent.trim();
        const searchUrl = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/search=${encodeURIComponent(title)}`;

        const btn = document.createElement('a');
        btn.href      = searchUrl;
        btn.target    = '_blank';
        btn.rel       = 'noopener noreferrer';
        btn.title     = 'View on F95Zone';
        btn.className = 'f95zone-btn ' + communityLink.className;
        
        // Updated width to 46px and padding to 0 to align with SteamDB/CS.Rin buttons
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

        navBar.insertBefore(btn, communityLink);
        return true;
    }

    const interval = setInterval(() => {
        if (inject()) clearInterval(interval);
    }, 300);

    setTimeout(() => clearInterval(interval), 10000);
})();
