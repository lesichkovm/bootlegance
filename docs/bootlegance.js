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
  var DEFAULT_MODE_KEY = 'cf-theme';
  var DEFAULT_MODE_ATTR = 'data-bs-theme';
  var LINK_ELEMENT_ID = 'bootlegance-theme';

  function isValidThemeName(name) {
    return typeof name === 'string' && THEME_NAME_REGEX.test(name);
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
  var initialThemesAttr = scriptEl ? scriptEl.getAttribute('data-themes') : null;

  var currentTheme = DEFAULT_THEME;
  var themeList = [];

  if (initialThemesAttr) {
    var rawList = initialThemesAttr.split(',');
    for (var i = 0; i < rawList.length; i++) {
      var t = rawList[i].trim();
      if (isValidThemeName(t) && themeList.indexOf(t) === -1) {
        themeList.push(t);
      }
    }
  }

  function resolveTheme() {
    // 1. ?theme= query param
    var queryVal = getQueryParam('theme');
    if (isValidThemeName(queryVal)) {
      return queryVal;
    }

    // 2. theme cookie
    var cookieVal = parseCookie(COOKIE_NAME);
    if (isValidThemeName(cookieVal)) {
      return cookieVal;
    }

    // 3. data-default-theme attribute
    if (isValidThemeName(defaultThemeAttr)) {
      return defaultThemeAttr;
    }

    // 4. built-in default 'vanguard'
    return DEFAULT_THEME;
  }

  function themeUrl(name) {
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

      // Populate options if list changed or options empty
      if (themeList.length > 0 && select.options.length !== themeList.length) {
        select.innerHTML = '';
        for (var j = 0; j < themeList.length; j++) {
          var t = themeList[j];
          var opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
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
          var validated = [];
          for (var i = 0; i < data.length; i++) {
            if (isValidThemeName(data[i])) {
              validated.push(data[i]);
            }
          }
          if (validated.length > 0) {
            themeList = validated;
            Bootlegance.themes = themeList;
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
    url: themeUrl,
    setMode: setMode,
    getMode: getMode,
    init: function (opts) {
      opts = opts || {};
      if (opts.endpoint !== undefined) endpoint = opts.endpoint;
      if (opts.baseUrl !== undefined) configuredBaseUrl = opts.baseUrl.replace(/\/+$/, '');
      if (opts.modeStorageKey !== undefined) modeStorageKey = opts.modeStorageKey;
      if (opts.modeAttribute !== undefined) modeAttribute = opts.modeAttribute;
      if (Array.isArray(opts.themes)) {
        themeList = opts.themes.filter(isValidThemeName);
        Bootlegance.themes = themeList;
      }
      if (opts.defaultTheme && isValidThemeName(opts.defaultTheme)) {
        defaultThemeAttr = opts.defaultTheme;
      }
      var resolved = resolveTheme();
      setTheme(resolved);
      initMode();
      updateAutoUI();
    }
  };

  // Immediate initialization on script load
  currentTheme = resolveTheme();
  applyCss(currentTheme);
  initMode();

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
