class News extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="news-box" style="border: 2px #000000; width: 95%; max-width: 9in;color: #000000; margin-top: 50x; margin-bottom: 10px;
                    border: 1ˇ px dashed #33333324;
                    padding: 16px;
                    display: inline-block;
                    box-sizing: border-box;">
			    <h3 style="margin-top: 0; font-size: 1em; font-weight: 300; font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif; color: #000000ff;">news / upcom!ng <hr style="border: 0.001px solid #3333332a"/> </h3>
				<div id="news-content" style="max-height: 100px; overflow-y: auto; width: 100%; box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #f1f1f1 #000000;">
					<ul id="news-list" style="list-style: none; padding-left: 0; margin: 0; font-size: 0.8em; font-family: 'Calibri Light', Helvetica, Calibri, Arial, sans-serif;">
					</ul>
				</div>
			</div>
    `;

    // Load news from news.json
    this.loadNews();
  }

  async loadNews() {
    try {
      const response = await fetch('assets/news.json');
      const newsData = await response.json();

      const newsList = this.querySelector('#news-list');

      newsData.forEach(item => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.gap = '1.5rem';
        li.style.marginBottom = '4px';

        li.innerHTML = `
          <span style="min-width: 100px; color: #44444483;">${item.date}</span>
          <span>${item.content}</span>
        `;

        newsList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading news:', error);
      // Fallback to default news item
      const newsList = this.querySelector('#news-list');
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.gap = '1.5rem';
      li.style.marginBottom = '4px';

      li.innerHTML = `
        <span style="min-width: 100px; color: #44444483;">2025-Oct-23</span>
        <span>
          Talk @
          <a href="https://www.cmu.edu/dietrich/psychology/caoslab/" target="_blank" style="color: #000; text-decoration: underline;">CAOs Lab</a>, Carnegie Mellon University
        </span>
      `;

      newsList.appendChild(li);
    }
  }
}

customElements.define('news-box', News);