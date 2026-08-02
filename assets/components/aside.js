// <page-aside> + <aside-note>: drop one <page-aside> anywhere on a page, then
// sprinkle <aside-note>...</aside-note> inline in your main content. Each note's
// content is relocated into the aside rail, positioned at the same y-coordinate
// as the spot it was written at. Works regardless of which tag connects first.

(function () {
  const pending = []; // { anchorEl, contentHTML, note, attached }
  let pageAsideEl = null;
  let rafId = null;

  function scheduleReposition() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      repositionAll();
    });
  }

  function repositionAll() {
    if (!pageAsideEl) return;

    const hasNotes = pending.some((item) => item.attached);
    pageAsideEl.style.display = hasNotes ? '' : 'none';
    if (!hasNotes) return;

    const containerRect = pageAsideEl.getBoundingClientRect();
    const gap = 14;
    let prevBottom = 0;

    pending
      .filter((item) => item.attached)
      .sort((a, b) => a.anchorEl.getBoundingClientRect().top - b.anchorEl.getBoundingClientRect().top)
      .forEach((item) => {
        const anchorRect = item.anchorEl.getBoundingClientRect();
        let top = anchorRect.top - containerRect.top;
        if (top < prevBottom + gap) top = prevBottom + gap;
        item.note.style.top = `${top}px`;
        prevBottom = top + item.note.offsetHeight;
      });

    pageAsideEl.style.minHeight = `${prevBottom}px`;
  }

  function attach(item) {
    if (!pageAsideEl || item.attached) return;

    const note = document.createElement('div');
    note.className = 'aside-note-content';
    note.style.cssText = `
      position: absolute;
      left: 0;
      right: 0;
      font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif;
      font-size: 11px;
      line-height: 1.45;
      color: #444;
      padding-left: 10px;
      border-left: 1px dashed #33333340;
      box-sizing: border-box;
    `;
    note.innerHTML = item.contentHTML;

    pageAsideEl.appendChild(note);
    item.note = note;
    item.attached = true;
    scheduleReposition();
  }

  class PageAside extends HTMLElement {
    connectedCallback() {
      this.style.cssText = `
        position: relative;
        flex: 0 0 240px;
        margin-left: 1.5in;
      `;

      const label = this.getAttribute('label');
      if (label !== '') {
        const heading = document.createElement('div');
        heading.style.cssText = `
          position: absolute;
          top: 0;
          left: 10px;
          font-family: Helvetica;
          font-size: 10px;
          letter-spacing: 0.5px;
          color: #999;
        `;
        this.appendChild(heading);
        this.style.paddingTop = '18px';
      }

      pageAsideEl = this;
      pending.forEach(attach);

      window.addEventListener('resize', scheduleReposition);
      window.addEventListener('load', scheduleReposition);
      this._ro = new ResizeObserver(scheduleReposition);
      this._ro.observe(document.body);

      scheduleReposition();
    }

    disconnectedCallback() {
      this._ro?.disconnect();
      if (pageAsideEl === this) pageAsideEl = null;
    }
  }

  class AsideNote extends HTMLElement {
    connectedCallback() {
      const contentHTML = this.innerHTML;
      this.innerHTML = '';
      // Zero-size in-flow marker: stays exactly where it was written so its
      // y-position can be read, without visually disturbing the main content.
      this.style.cssText = 'display: inline-block; width: 0; height: 0; overflow: hidden; vertical-align: top;';

      const item = { anchorEl: this, contentHTML, note: null, attached: false };
      pending.push(item);
      attach(item);
    }
  }

  customElements.define('page-aside', PageAside);
  customElements.define('aside-note', AsideNote);

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 900px) {
      page-aside { display: none !important; }
    }
  `;
  document.head.appendChild(style);
})();
