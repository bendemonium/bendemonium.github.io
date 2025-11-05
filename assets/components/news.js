class News extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="news-box" style=" max-height: 100px; border: 2px #000000; max-width: 9in;color: #000000; padding: 2px; margin-top: 2px; margin-bottom: 24px;">
				<h3 style="margin-top: 0; font-size: 1.2em; font-weight: 300; font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif; color: #1c47a2;">news / upcoming</h3>
				<div style="max-height: 100px; overflow-y: auto; width: 100%; box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #f1f1f1 #000000;">
					<ul style="list-style: none; padding-left: 0; margin: 0; font-size: 0.9em; font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif;">
					<li style="display: flex; gap: 1.5rem; margin-bottom: 4px;">
						<span style="min-width: 100px ; color: #444;">2025-Oct-23</span>
						<span>
							Talk @
							<a href="https://www.cmu.edu/dietrich/psychology/caoslab/" target="_blank" style="color: #000; text-decoration: underline;">
								CAOS Lab</a>, Carnegie Mellon University
						</span>
					</li>
					</ul>
				</div>
			</div>
    `;
  }
}

customElements.define('news-box', News);