# Steam → F95Zone Search

> [!WARNING]
> **Content Advisory:** This userscript links to F95Zone, which contains Adult (NSFW) content. By using this script, you acknowledge that you are of legal age to access such content in your jurisdiction.

### 🚀 Features
* **Direct Integration**: Adds a search icon directly into the Steam navigation bar.

* **UI Consistency**: The button is specifically sized and spaced to align perfectly with other popular extensions.

### 🛠 Installation
To use this script, you need a userscript manager installed in your browser.

1. **Install a Userscript Manager:**
   - [Violentmonkey](https://violentmonkey.github.io/) (Recommended)
   - [Tampermonkey](https://www.tampermonkey.net/)

2. **Install the Script:**
   - **[Click here to install Steam-F95Zone-Search](https://github.com/vexxowo/Steam-F95Zone-Search/raw/refs/heads/main/steam-f95zone-search.user.js)**

3. **Confirm Installation:**
   - Your browser extension will open a new tab. Click **Install** to finish.

### 🔒 Permissions & Security

* This script utilizes GM_xmlhttpRequest to improve search accuracy and integration.

   * **Why is this needed?**: The script fetches a temporary session token directly from f95zone.to. This allows the script to perform searches or retrieve data as if you were browsing the site directly, ensuring results are up-to-date.

   * **What data is accessed?**: The script only communicates with f95zone.to. It does not send your data to any third-party servers.

   * **Permissions required**:

       * **@grant GM_xmlhttpRequest**: Allows the script to make requests to a different domain (Cross-Origin).

       * **@connect f95zone.to**: Restricts the script's communication solely to the F95Zone domain for your security.

### 📝 Credits & Attribution
* **Development**: Created with Claude and Gemini.

* **Inspiration**: This script was inspired by [FunkyJustin's Userscripts-collection](https://github.com/FunkyJustin/Userscripts-collection/blob/main/F95Zone%2C%20Ryuugames%2C%20and%20DLsite%20Search%20Buttons%20for%20Steam.user.js).
