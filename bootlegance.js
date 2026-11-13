/**
 * Bootlegance Theme Switcher
 * A dependency-free vanilla JS script for dynamic theme and light/dark mode switching.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Bootlegance = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  // Slug sanitization regex: lowercase letters, numbers, and hyphens
  var THEME_NAME_REGEX = /^[a-z0-9-]+$/;
  var DEFAULT_THEME = 'vanguard';
  var COOKIE_NAME = 'theme';
  var BOOTSTRAP_THEME = 'bootstrap';
  var BOOTSTRAP_LABEL = 'Standard Bootstrap';
  var DEFAULT_MODE_KEY = 'cf-theme';
  var DEFAULT_MODE_ATTR = 'data-bs-theme';
  var LINK_ELEMENT_ID = 'bootlegance-theme';
  var DEFAULT_FONT_SIZE_KEY = 'cf-font-size';
  var FONT_SIZE_STEP = 10;
  var MIN_FONT_SIZE = 70;
  var MAX_FONT_SIZE = 200;
  var DEFAULT_FONT_SIZE = 100;

  function isBootstrapTheme(name) {
    return name === '' || name === 'bootstrap' || name === 'none' || name === 'default';
  }

  function isValidThemeName(name) {
    return typeof name === 'string' && (isBootstrapTheme(name) || THEME_NAME_REGEX.test(name));
  }

  function normalizeThemeName(name) {
    if (isBootstrapTheme(name)) {
      return BOOTSTRAP_THEME;
    }
    return name;
  }

  function getScriptElement() {
    if (typeof document === 'undefined') return null;
    if (document.currentScript) return document.currentScript;
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || '';
      if (src.indexOf('bootlegance.js') !== -1 || scripts[i].hasAttribute('data-bootlegance')) {
        return scripts[i];
      }
    }
    return null;
  }

  function parseCookie(name) {
    if (typeof document === 'undefined' || !document.cookie) return null;
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var eqPos = cookie.indexOf('=');
      if (eqPos > -1) {
        var k = cookie.substring(0, eqPos);
        if (k === name) {
          return decodeURIComponent(cookie.substring(eqPos + 1));
        }
      }
    }
    return null;
  }

  function setCookie(name, val) {
    if (typeof document === 'undefined') return;
    var maxAge = 365 * 24 * 60 * 60; // 1 year
    var cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(val) +
      '; Path=/; Max-Age=' + maxAge + '; SameSite=Lax';
    if (typeof location !== 'undefined' && location.protocol === 'https:') {
      cookieStr += '; Secure';
    }
    document.cookie = cookieStr;
  }

  function getQueryParam(name) {
    if (typeof window === 'undefined' || !window.location || !window.location.search) return null;
    var search = window.location.search.substring(1);
    var parts = search.split('&');
    for (var i = 0; i < parts.length; i++) {
      var pair = parts[i].split('=');
      if (decodeURIComponent(pair[0]) === name) {
        return decodeURIComponent(pair.slice(1).join('='));
      }
    }
    return null;
  }

  function deriveBaseUrl(scriptEl) {
    if (scriptEl && scriptEl.getAttribute('data-base-url')) {
      return scriptEl.getAttribute('data-base-url').replace(/\/+$/, '');
    }
    if (scriptEl && scriptEl.src) {
      try {
        var u = new URL(scriptEl.src, typeof window !== 'undefined' ? window.location.href : undefined);
        var pathname = u.pathname;
        var dir = pathname.substring(0, pathname.lastIndexOf('/'));
        return u.origin + dir;
      } catch (e) {
        var slashIdx = scriptEl.src.lastIndexOf('/');
        if (slashIdx > -1) {
          return scriptEl.src.substring(0, slashIdx);
        }
      }
    }
    return '';
  }

  var scriptEl = getScriptElement();
  var configuredBaseUrl = deriveBaseUrl(scriptEl);
  var endpoint = scriptEl ? scriptEl.getAttribute('data-endpoint') : null;
  var defaultThemeAttr = scriptEl ? scriptEl.getAttribute('data-default-theme') : null;
  var modeStorageKey = (scriptEl && scriptEl.getAttribute('data-mode-storage-key')) || DEFAULT_MODE_KEY;
  var modeAttribute = (scriptEl && scriptEl.getAttribute('data-mode-attribute')) || DEFAULT_MODE_ATTR;
  var fontSizeStorageKey = (scriptEl && scriptEl.getAttribute('data-font-size-storage-key')) || DEFAULT_FONT_SIZE_KEY;
  var initialThemesAttr = scriptEl ? scriptEl.getAttribute('data-themes') : null;

  var currentTheme = DEFAULT_THEME;
  var currentFontSize = DEFAULT_FONT_SIZE;
  var themeList = [];
  var themeNames = {}; // slug -> display name (populated from themes.json or init options)

  // Accepts a slug string or a {slug, name} manifest entry; returns the slug if valid
  function themeEntrySlug(entry) {
    var slug = (typeof entry === 'string') ? entry : (entry && entry.slug);
    if (typeof slug === 'string' && isValidThemeName(slug) && !isBootstrapTheme(slug)) {
      return slug;
    }
    return null;
  }

  function themeEntryName(entry) {
    if (entry && typeof entry === 'object' && typeof entry.name === 'string' && entry.name) {
      return entry.name;
    }
    return null;
  }

  // Normalizes a mixed array of slug strings / {slug, name} entries into
  // themeList (slugs) + themeNames (slug -> label)
  function setThemeEntries(entries) {
    var validated = [];
    var names = {};
    for (var i = 0; i < entries.length; i++) {
      var slug = themeEntrySlug(entries[i]);
      if (slug && validated.indexOf(slug) === -1) {
        validated.push(slug);
        var name = themeEntryName(entries[i]);
        if (name) {
          names[slug] = name;
        }
      }
    }
    themeList = validated;
    themeNames = names;
    Bootlegance.themes = themeList;
  }

  if (initialThemesAttr) {
    var rawList = initialThemesAttr.split(',');
    for (var i = 0; i < rawList.length; i++) {
      var t = rawList[i].trim();
      if (isValidThemeName(t) && !isBootstrapTheme(t) && themeList.indexOf(t) === -1) {
        themeList.push(t);
      }
    }
  }

  function resolveTheme() {
    // 1. ?theme= query param
    var queryVal = getQueryParam('theme');
    if (queryVal !== null && isValidThemeName(queryVal)) {
      return normalizeThemeName(queryVal);
    }

    // 2. theme cookie
    var cookieVal = parseCookie(COOKIE_NAME);
    if (cookieVal !== null && isValidThemeName(cookieVal)) {
      return normalizeThemeName(cookieVal);
    }

    // 3. data-default-theme attribute
    if (defaultThemeAttr !== null && isValidThemeName(defaultThemeAttr)) {
      return normalizeThemeName(defaultThemeAttr);
    }

    // 4. built-in default 'vanguard'
    return DEFAULT_THEME;
  }

  function themeUrl(name) {
    if (isBootstrapTheme(name)) {
      return '';
    }
    if (!isValidThemeName(name)) {
      name = DEFAULT_THEME;
    }
    var base = configuredBaseUrl || '';
    if (base && !base.endsWith('/')) {
      base += '/';
    }
    return base + 'themes/' + encodeURIComponent(name) + '/theme.css';
  }

  function applyCss(name) {
    if (typeof document === 'undefined') return;
    var linkEl = document.getElementById(LINK_ELEMENT_ID);

    if (isBootstrapTheme(name)) {
      if (linkEl) {
        linkEl.parentNode && linkEl.parentNode.removeChild(linkEl);
      }
      return;
    }

    var href = themeUrl(name);
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.id = LINK_ELEMENT_ID;
      linkEl.rel = 'stylesheet';
      linkEl.href = href;
      var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      head.appendChild(linkEl);
    } else {
      if (linkEl.getAttribute('href') !== href) {
        linkEl.setAttribute('href', href);
      }
    }
  }

  function applyMode(mode) {
    if (typeof document === 'undefined') return;
    var rootEl = document.documentElement;
    if (mode === 'dark' || mode === 'light') {
      rootEl.setAttribute(modeAttribute, mode);
    } else {
      rootEl.removeAttribute(modeAttribute);
    }
  }

  function getStoredMode() {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      return window.localStorage.getItem(modeStorageKey);
    } catch (e) {
      return null;
    }
  }

  function setMode(mode) {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'auto') {
      console.warn('[Bootlegance] Invalid mode: ' + mode + '. Expected "light", "dark", or "auto".');
      return;
    }

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        if (mode === 'auto') {
          window.localStorage.removeItem(modeStorageKey);
        } else {
          window.localStorage.setItem(modeStorageKey, mode);
        }
      } catch (e) {
        // Storage might be unavailable/restricted
      }
    }

    if (mode === 'auto') {
      // If auto, check system preference if available
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyMode('dark');
      } else {
        applyMode('light');
      }
    } else {
      applyMode(mode);
    }

    updateAutoUI();
  }

  function getMode() {
    var stored = getStoredMode();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (typeof document !== 'undefined') {
      var attrVal = document.documentElement.getAttribute(modeAttribute);
      if (attrVal === 'light' || attrVal === 'dark') {
        return attrVal;
      }
    }
    return 'light';
  }

  function initMode() {
    var stored = getStoredMode();
    if (stored === 'light' || stored === 'dark') {
      applyMode(stored);
    } else if (typeof document !== 'undefined') {
      // Check existing attribute on html
      var existing = document.documentElement.getAttribute(modeAttribute);
      if (!existing && typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          applyMode('dark');
        }
      }
    }
  }

  function applyFontSize(scale) {
    if (typeof document === 'undefined') return;
    var rootEl = document.documentElement;
    if (scale && scale !== DEFAULT_FONT_SIZE) {
      rootEl.style.fontSize = scale + '%';
      rootEl.style.setProperty('--bootlegance-font-scale', scale + '%');
    } else {
      rootEl.style.fontSize = '';
      rootEl.style.removeProperty('--bootlegance-font-scale');
    }
  }

  function getStoredFontSize() {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      var val = window.localStorage.getItem(fontSizeStorageKey);
      if (val !== null) {
        var parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed >= MIN_FONT_SIZE && parsed <= MAX_FONT_SIZE) {
          return parsed;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function setFontSize(scale) {
    var parsed = parseInt(scale, 10);
    if (isNaN(parsed)) {
      console.warn('[Bootlegance] Invalid font size: ' + scale);
      return;
    }
    // Clamp between MIN_FONT_SIZE and MAX_FONT_SIZE
    if (parsed < MIN_FONT_SIZE) parsed = MIN_FONT_SIZE;
    if (parsed > MAX_FONT_SIZE) parsed = MAX_FONT_SIZE;

    currentFontSize = parsed;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        if (currentFontSize === DEFAULT_FONT_SIZE) {
          window.localStorage.removeItem(fontSizeStorageKey);
        } else {
          window.localStorage.setItem(fontSizeStorageKey, currentFontSize.toString());
        }
      } catch (e) {
        // Storage unavailable
      }
    }

    applyFontSize(currentFontSize);
    updateAutoUI();

    if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('bootlegance:fontsize', {
        detail: { fontSize: currentFontSize }
      }));
    }
  }

  function getFontSize() {
    return currentFontSize;
  }

  function increaseFontSize(step) {
    var s = (typeof step === 'number' && !isNaN(step)) ? step : FONT_SIZE_STEP;
    setFontSize(currentFontSize + s);
  }

  function decreaseFontSize(step) {
    var s = (typeof step === 'number' && !isNaN(step)) ? step : FONT_SIZE_STEP;
    setFontSize(currentFontSize - s);
  }

  function resetFontSize() {
    setFontSize(DEFAULT_FONT_SIZE);
  }

  function initFontSize() {
    var stored = getStoredFontSize();
    if (stored !== null) {
      currentFontSize = stored;
      applyFontSize(currentFontSize);
    } else {
      currentFontSize = DEFAULT_FONT_SIZE;
    }
  }

  function updateAutoUI() {
    if (typeof document === 'undefined') return;

    // 1. Pickers: [data-bootlegance-picker]
    var pickers = document.querySelectorAll('[data-bootlegance-picker]');
    for (var i = 0; i < pickers.length; i++) {
      var container = pickers[i];
      var select = container.querySelector('select');
      if (!select) {
        select = document.createElement('select');
        select.className = container.getAttribute('data-picker-class') || 'form-select';
        select.setAttribute('aria-label', 'Select theme');
        container.appendChild(select);

        select.addEventListener('change', function (e) {
          Bootlegance.set(e.target.value);
        });
      }

      // Populate options if list changed or options empty (+1 for Standard Bootstrap)
      var expectedOptionCount = themeList.length > 0 ? themeList.length + 1 : 0;
      if (themeList.length > 0 && select.options.length !== expectedOptionCount) {
        select.innerHTML = '';

        // Standard Bootstrap option (no custom theme stylesheet)
        var defaultOpt = document.createElement('option');
        defaultOpt.value = BOOTSTRAP_THEME;
        defaultOpt.textContent = BOOTSTRAP_LABEL;
        if (currentTheme === BOOTSTRAP_THEME) {
          defaultOpt.selected = true;
        }
        select.appendChild(defaultOpt);

        for (var j = 0; j < themeList.length; j++) {
          var t = themeList[j];
          var opt = document.createElement('option');
          opt.value = t;
          opt.textContent = themeNames[t] || t;
          if (t === currentTheme) {
            opt.selected = true;
          }
          select.appendChild(opt);
        }
      } else {
        select.value = currentTheme;
      }
    }

    // 2. Mode buttons: [data-bootlegance-mode]
    var currentActiveMode = getMode();
    var modeBtns = document.querySelectorAll('[data-bootlegance-mode]');
    for (var k = 0; k < modeBtns.length; k++) {
      var btn = modeBtns[k];
      var targetMode = btn.getAttribute('data-bootlegance-mode');
      if (btn.getAttribute('data-bootlegance-wired') !== 'true') {
        btn.setAttribute('data-bootlegance-wired', 'true');
        btn.addEventListener('click', (function (m) {
          return function () {
            setMode(m);
          };
        })(targetMode));
      }

      if (targetMode === currentActiveMode) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }

    // 3. Font size buttons: [data-bootlegance-font-size]
    var fontBtns = document.querySelectorAll('[data-bootlegance-font-size]');
    for (var f = 0; f < fontBtns.length; f++) {
      var fBtn = fontBtns[f];
      var action = fBtn.getAttribute('data-bootlegance-font-size');
      if (fBtn.getAttribute('data-bootlegance-wired') !== 'true') {
        fBtn.setAttribute('data-bootlegance-wired', 'true');
        fBtn.addEventListener('click', (function (act) {
          return function () {
            if (act === 'up' || act === 'increase') {
              increaseFontSize();
            } else if (act === 'down' || act === 'decrease') {
              decreaseFontSize();
            } else if (act === 'reset') {
              resetFontSize();
            }
          };
        })(action));
      }

      if (action === 'up' || action === 'increase') {
        fBtn.disabled = (currentFontSize >= MAX_FONT_SIZE);
      } else if (action === 'down' || action === 'decrease') {
        fBtn.disabled = (currentFontSize <= MIN_FONT_SIZE);
      } else if (action === 'reset') {
        fBtn.disabled = (currentFontSize === DEFAULT_FONT_SIZE);
      }
    }

    // 4. Font size display value: [data-bootlegance-font-size-value]
    var fontValues = document.querySelectorAll('[data-bootlegance-font-size-value]');
    for (var v = 0; v < fontValues.length; v++) {
      fontValues[v].textContent = currentFontSize + '%';
    }
  }

  function fetchThemesRegistry() {
    if (typeof fetch === 'undefined') return;
    var base = configuredBaseUrl || '';
    if (base && !base.endsWith('/')) {
      base += '/';
    }
    var manifestUrl = base + 'themes.json';

    fetch(manifestUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (Array.isArray(data)) {
          setThemeEntries(data);
          if (themeList.length > 0) {
            updateAutoUI();
          }
        }
      })
      .catch(function () {
        // Fallback already in place or quiet failure
      });
  }

  function setTheme(name) {
    if (!isValidThemeName(name)) {
      console.warn('[Bootlegance] Invalid theme name: ' + name);
      return;
    }

    name = normalizeThemeName(name);

    currentTheme = name;
    setCookie(COOKIE_NAME, name);

    if (endpoint) {
      if (typeof window !== 'undefined' && window.location) {
        var currentUrl = window.location.pathname + window.location.search + window.location.hash;
        var sep = endpoint.indexOf('?') === -1 ? '?' : '&';
        var redirectUrl = endpoint + sep + 'theme=' + encodeURIComponent(name) + '&redirect=' + encodeURIComponent(currentUrl);
        window.location.href = redirectUrl;
        return;
      }
    }

    applyCss(name);
    updateAutoUI();

    if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
      window.dispatchEvent(new CustomEvent('bootlegance:change', {
        detail: { theme: name }
      }));
    }
  }

  var Bootlegance = {
    themes: themeList,
    current: function () {
      return currentTheme;
    },
    set: setTheme,
    removeTheme: function () {
      setTheme(BOOTSTRAP_THEME);
    },
    clearTheme: function () {
      setTheme(BOOTSTRAP_THEME);
    },
    url: themeUrl,
    setMode: setMode,
    getMode: getMode,
    getFontSize: getFontSize,
    setFontSize: setFontSize,
    increaseFontSize: increaseFontSize,
    decreaseFontSize: decreaseFontSize,
    resetFontSize: resetFontSize,
    init: function (opts) {
      opts = opts || {};
      if (opts.endpoint !== undefined) endpoint = opts.endpoint;
      if (opts.baseUrl !== undefined) configuredBaseUrl = opts.baseUrl.replace(/\/+$/, '');
      if (opts.modeStorageKey !== undefined) modeStorageKey = opts.modeStorageKey;
      if (opts.modeAttribute !== undefined) modeAttribute = opts.modeAttribute;
      if (opts.fontSizeStorageKey !== undefined) fontSizeStorageKey = opts.fontSizeStorageKey;
      if (Array.isArray(opts.themes)) {
        setThemeEntries(opts.themes);
      }
      if (opts.defaultTheme !== undefined && isValidThemeName(opts.defaultTheme)) {
        defaultThemeAttr = opts.defaultTheme;
      }
      var resolved = resolveTheme();
      setTheme(resolved);
      initMode();
      initFontSize();
      updateAutoUI();
    }
  };

  // Immediate initialization on script load
  currentTheme = resolveTheme();
  applyCss(currentTheme);
  initMode();
  initFontSize();

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        updateAutoUI();
        fetchThemesRegistry();
      });
    } else {
      updateAutoUI();
      fetchThemesRegistry();
    }
  }

  return Bootlegance;
}));
