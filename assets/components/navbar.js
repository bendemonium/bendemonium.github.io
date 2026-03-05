class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .sidebar {
          width: 60px;
          min-width: 60px;
          max-width: 60px;
          background: none;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          overflow: hidden;
        }
        .nav-item {
          color: #000;
          margin: 14px 0;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 1px;
          font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif;
          font-weight: 300;
          position: relative;
          min-height: 60px;
          max-height: 75px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-variation-settings: "wght" 300;
        }
      </style>
      <nav class="sidebar">
        <a class="nav-item" href="index.html">home</a>
        <!--  <a class="nav-item" href="about.html">about</a> --!>
        <a class="nav-item" href="research.html">research +artifacts</a>
        <a class="nav-item" href="papers.html">papers</a>
        <a class="nav-item" href="other.html">other artifacts</a>
        <a class="nav-item" href="call.html">call me out</a>
      </nav>
    `;
  }
}

customElements.define('nav-bar', Navbar);
