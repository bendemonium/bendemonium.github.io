class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .sidebar {
          min-width: 45px;
          max-width: 60px;
          background: #ffffff;
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
          color: #000000;
          margin: 15px 0;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-align: right;
          cursor: pointer;
          font-size: 13px;
          text-decoration: none;
          letter-spacing: 1px;
          font-family: Helvetica;
          font-weight: 300;
          position: relative;
          min-height: 35px;
          max-height: 65px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-variation-settings: "wght" 300;
        }
      </style>
      <nav class="sidebar">
        <a class="nav-item" href="index.html">0.</a>
        <!--  <a class="nav-item" href="about.html">about</a> --!>
        <a class="nav-item" href="research.html">research</a>
        <a class="nav-item" href="papers.html">publications</a>

        <a class="nav-item" href="call.html">call me out</a>
      </nav>
    `;
  }
}

customElements.define('nav-bar', Navbar);


        // <a class="nav-item" href="other.html">other artifacts</a>