// ==UserScript==
// @name         DAZN FanZone Remover
// @namespace    https://github.com/ImElio/dazn-fanzone-remover
// @version      1.0.0
// @description  Hides the DAZN FanZone
// @author       Elio & Shokkino
// @license      MIT
// @homepageURL  https://github.com/ImElio/dazn-fanzone-remover
// @supportURL   https://github.com/ImElio/dazn-fanzone-remover/issues
// @updateURL    https://github.com/ImElio/dazn-fanzone-remover/raw/main/dazn-fanzone-remover.user.js
// @downloadURL  https://github.com/ImElio/dazn-fanzone-remover/raw/main/dazn-fanzone-remover.user.js
// @match        https://www.dazn.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // We tag hidden nodes to avoid repeated work/logs
  const MARK = 'data-fz-hidden';

  const isVisible = (el) => !!el && el.offsetParent !== null;

  // Heuristic: a DAZN right sidebar / FanZone-like container
  function looksLikeSidebar(el) {
    if (!el || el === document.body) return false;

    const cs   = getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    // Typical chat width; usually sits on the right and is scrollable
    const widthOk   = rect.width >= 220 && rect.width <= 560;
    const rightSide = rect.left > (window.innerWidth * 0.45);
    const scrollish = ['auto', 'scroll'].includes(cs.overflowY) || ['auto', 'scroll'].includes(cs.overflow);

    const tagOk  = el.tagName === 'ASIDE' || el.getAttribute('role') === 'complementary';
    const nameOk = /fan.?zone|chat|community/.test(
      ((el.className || '') + ' ' + (el.id || '')).toLowerCase()
    );

    // Never hide containers that include the player
    const containsPlayer = el.querySelector('video, [data-player], [data-testid*="video"]');

    return !containsPlayer && rightSide && widthOk && (tagOk || nameOk || scrollish);
  }

  // From a node that hints FanZone, climb to the most likely sidebar wrapper
  function findSidebarContainer(from) {
    let cur = from;
    for (let i = 0; i < 8 && cur; i++) {
      if (looksLikeSidebar(cur)) return cur;
      cur = cur.parentElement;
    }
    // Conservative fallback, still re-validated by looksLikeSidebar
    const fallback = from.closest('aside,[role="complementary"]') || from.closest('div,section');
    return looksLikeSidebar(fallback) ? fallback : null;
  }

  function hideSidebar(el) {
    if (!el || el.hasAttribute(MARK)) return;
    el.style.setProperty('display', 'none', 'important');
    el.setAttribute(MARK, '1');
    console.info('[DAZN FanZone Remover] Sidebar hidden.', el);
  }

  // Main sweep:
  // 1) exact “FanZone” label/aria-label (like the original script),
  // 2) backup via chat input placeholder (“Inizia a scrivere…”, “Write a message…”)
  function sweep() {
    // (1) Exact label/aria-label
    const all = document.querySelectorAll('*');
    for (const n of all) {
      if (!isVisible(n)) continue;
      const txt  = (n.textContent || '').trim();
      const aria = n.getAttribute ? (n.getAttribute('aria-label') || '') : '';
      if (txt === 'FanZone' || aria === 'FanZone') {
        const container = findSidebarContainer(n);
        if (container) hideSidebar(container);
      }
    }

    // (2) Chat input placeholder as a stable backup
    const reInput = /(scriv|messag|write)/i; // “Inizia a scrivere…”, “Write a message…”
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(inp => {
      if (!isVisible(inp)) return;
      const ph = inp.getAttribute('placeholder') || '';
      if (reInput.test(ph)) {
        const container = findSidebarContainer(inp);
        if (container) hideSidebar(container);
      }
    });
  }

  const mo = new MutationObserver(sweep);

  function start() {
    if (!document.body) return setTimeout(start, 50);
    mo.observe(document.body, { childList: true, subtree: true });
    sweep();
    // Safety net, like the original approach
    setInterval(sweep, 1500);
  }

  start();
})();