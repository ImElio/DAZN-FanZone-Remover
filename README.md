# DAZN FanZone Remover

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-v4%2B-green)](https://www.tampermonkey.net/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📌 Description
This userscript automatically **removes the DAZN FanZone sidebar** (chat/community panel) in all views (fullscreen, minimized, homepage).  
It prevents the panel from reappearing when the DOM reloads, while ensuring the video player remains unaffected.

The goal is to provide a **cleaner, distraction-free streaming experience**.

---

## ✨ Features
- 🚫 Hides the FanZone panel on DAZN.  
- 🛡️ Safer detection to avoid hiding the player container (no more blank screens).  
- 🔄 Keeps working even if DAZN dynamically reloads UI elements.  
- 🕵️‍♂️ Lightweight and transparent (MutationObserver + fallback interval).  
- ⚡ Automatic updates via GitHub.

---

## 📥 Installation
1. Install a userscript manager extension:
   - [Tampermonkey](https://www.tampermonkey.net/) (recommended)  
   - [Violentmonkey](https://violentmonkey.github.io/)  
   - [Greasemonkey](https://www.greasespot.net/)  

2. Click here to install the script:  
   👉 [**DAZN FanZone Remover**](https://github.com/ImElio/dazn-fanzone-remover/raw/main/dazn-fanzone-remover.user.js)

3. Confirm the installation when prompted by Tampermonkey/Violentmonkey.

---

## 🛠️ Development
- Language: **JavaScript (ES6)**  
- Manager tested: **Tampermonkey v4.19+**  
- Compatible with: **Chrome, Edge, Firefox, Brave, Opera**

---

## ❓ FAQ
**Q: Will this affect the video player?**  
A: No. The script is designed to target only the FanZone sidebar, not the player.

**Q: Can I re-enable the FanZone?**  
A: Not in this version. The script hides it automatically. You can disable the script from your userscript manager.

**Q: Is this allowed?**  
A: It only hides UI elements locally in your browser. It doesn’t interfere with DRM or bypass DAZN’s streaming rules.

---

## 🤝 Support
- Report issues or improvements here: [Issues](https://github.com/ImElio/dazn-fanzone-remover/issues)  
- Contributions are welcome! Feel free to open PRs.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).
