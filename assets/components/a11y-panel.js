// assets/components/a11y-panel.js
class A11yPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const root = document.documentElement;

    // State keys
    const KEY = {
      THEME: 'a11y_theme',            // 'dark' | 'light'
      CONTRAST: 'a11y_contrast',      // 'high' | 'normal'
      MOTION: 'a11y_motion',          // 'reduce' | 'normal'
      FONTSCALE: 'a11y_font_scale'    // number (e.g., 1.0, 1.1, 0.9)
    };

    // Restore state
    const state = {
      theme: localStorage.getItem(KEY.THEME) || 'light',
      contrast: localStorage.getItem(KEY.CONTRAST) || 'normal',
      motion: localStorage.getItem(KEY.MOTION) || 'normal',
      fontScale: parseFloat(localStorage.getItem(KEY.FONTSCALE) || '1')
    };

    // Apply state to <html>
    const applyState = () => {
      root.dataset.theme = state.theme;                  // data-theme="dark|light"
      root.dataset.contrast = state.contrast;            // data-contrast="high|normal"
      root.dataset.motion = state.motion;                // data-motion="reduce|normal"
      root.style.setProperty('--a11y-font-scale', state.fontScale.toString());
      // Optional hard stop for animations when reduced:
      if (state.motion === 'reduce') {
        root.style.setProperty('--a11y-transitions', 'none');
      } else {
        root.style.removeProperty('--a11y-transitions');
      }
    };

    // Persist
    const save = () => {
      localStorage.setItem(KEY.THEME, state.theme);
      localStorage.setItem(KEY.CONTRAST, state.contrast);
      localStorage.setItem(KEY.MOTION, state.motion);
      localStorage.setItem(KEY.FONTSCALE, String(state.fontScale));
    };

    // Initial apply
    applyState();

    // UI template
    this.shadowRoot.innerHTML = `
      <style>
        :host { all: initial; }
        .panel {
          position: fixed;
          inset: auto 16px 16px auto;
          display: flex;
          gap: 6px;
          padding: 8px;
          background: #ffffff;
          color: #000;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.08);
          z-index: 9999;
          font-family: Calibri, Arial, sans-serif;
          font-size: 14px;
        }
        /* Buttons */
        button {
          all: unset;
          cursor: pointer;
          padding: 6px 10px;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          background: #fff;
          color: #000;
          outline-offset: 2px;
        }
        button:focus-visible {
          outline: 2px solid #1a73e8;
        }
        button[aria-pressed="true"] {
          font-weight: 700;
          border-color: #bbb;
          background: #f6f6f6;
        }
        .group {
          display: inline-flex;
          gap: 6px;
          align-items: center;
        }
        .sep { width: 1px; background:#e7e7e7; margin: 0 4px; }
        /* Small screen nudge */
        @media (max-width: 480px) {
          .panel { right: 8px; bottom: 8px; padding: 6px; }
          button { padding: 5px 8px; font-size: 13px; }
        }
      </style>
      <div class="panel" role="region" aria-label="Accessibility controls">
        <div class="group" role="group" aria-label="Theme">
          <button id="btnTheme" type="button" aria-pressed="false" aria-label="Toggle dark mode">Dark</button>
        </div>
        <div class="sep" aria-hidden="true"></div>
        <div class="group" role="group" aria-label="Contrast">
          <button id="btnContrast" type="button" aria-pressed="false" aria-label="Toggle high contrast">Contrast</button>
        </div>
        <div class="sep" aria-hidden="true"></div>
        <div class="group" role="group" aria-label="Motion">
          <button id="btnMotion" type="button" aria-pressed="false" aria-label="Reduce motion">No Motion</button>
        </div>
        <div class="sep" aria-hidden="true"></div>
        <div class="group" role="group" aria-label="Text size">
          <button id="btnSmaller" type="button" aria-label="Decrease text size">A−</button>
          <button id="btnReset" type="button" aria-label="Reset text size">A</button>
          <button id="btnLarger" type="button" aria-label="Increase text size">A+</button>
        </div>
      </div>
    `;

    const $ = (id) => this.shadowRoot.getElementById(id);
    const btnTheme = $('btnTheme');
    const btnContrast = $('btnContrast');
    const btnMotion = $('btnMotion');
    const btnSmaller = $('btnSmaller');
    const btnReset = $('btnReset');
    const btnLarger = $('btnLarger');

    // Reflect state to button pressed visuals
    const reflect = () => {
      btnTheme.setAttribute('aria-pressed', String(state.theme === 'dark'));
      btnContrast.setAttribute('aria-pressed', String(state.contrast === 'high'));
      btnMotion.setAttribute('aria-pressed', String(state.motion === 'reduce'));
    };
    reflect();

    // Handlers
    btnTheme.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyState(); save(); reflect();
    });
    btnContrast.addEventListener('click', () => {
      state.contrast = state.contrast === 'high' ? 'normal' : 'high';
      applyState(); save(); reflect();
    });
    btnMotion.addEventListener('click', () => {
      state.motion = state.motion === 'reduce' ? 'normal' : 'reduce';
      applyState(); save(); reflect();
    });
    btnSmaller.addEventListener('click', () => {
      state.fontScale = Math.max(0.8, +(state.fontScale - 0.05).toFixed(2));
      applyState(); save();
    });
    btnLarger.addEventListener('click', () => {
      state.fontScale = Math.min(1.6, +(state.fontScale + 0.05).toFixed(2));
      applyState(); save();
    });
    btnReset.addEventListener('click', () => {
      state.fontScale = 1; applyState(); save();
    });

    // Optional: keyboard shortcuts (accessible but unobtrusive)
    // Alt+Shift+D: theme, Alt+Shift+C: contrast, Alt+Shift+M: motion, Alt+Shift+=/-
    this.shortcutHandler = (e) => {
      if (!e.altKey || !e.shiftKey) return;
      if (e.key.toLowerCase() === 'd') { e.preventDefault(); btnTheme.click(); }
      if (e.key.toLowerCase() === 'c') { e.preventDefault(); btnContrast.click(); }
      if (e.key.toLowerCase() === 'm') { e.preventDefault(); btnMotion.click(); }
      if (e.key === '=' || e.key === '+') { e.preventDefault(); btnLarger.click(); }
      if (e.key === '-') { e.preventDefault(); btnSmaller.click(); }
      if (e.key.toLowerCase() === 'r') { e.preventDefault(); btnReset.click(); }
    };
  }

  connectedCallback() {
    // Attach global shortcut listener when added to DOM
    window.addEventListener('keydown', this.shortcutHandler);
    // Provide base CSS hooks on first attach (only once per page)
    if (!document.getElementById('a11y-hooks')) {
      const style = document.createElement('style');
      style.id = 'a11y-hooks';
      style.textContent = `
        /* Site-wide hooks the panel toggles */
        html { font-size: calc(16px * var(--a11y-font-scale, 1)); }
        /* Dark theme */
        html[data-theme="dark"] body { background:#111; color:#eee; }
        /* High contrast override (subtle) */
        html[data-contrast="high"] body { color: #000; background: #fff !important; }
        html[data-contrast="high"] a { text-decoration: underline; }
        /* Reduce motion (kill transitions/animations) */
        html[data-motion="reduce"] * {
          transition: var(--a11y-transitions, none) !important;
          animation: none !important;
          scroll-behavior: auto !important;
        }
        /* Keep outlines visible if author CSS removed them */
        :focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }
      `;
      document.head.appendChild(style);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.shortcutHandler);
  }
}

customElements.define('a11y-panel', A11yPanel);