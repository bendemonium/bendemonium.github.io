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

  parseDate(rawDate) {
    const monthMap = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    const normalized = String(rawDate).trim();
    const match = normalized.match(/^(\d{4})-([A-Za-z]{3}|\d{1,2})-(\d{1,2})$/);
    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const monthPart = match[2].toLowerCase();
    const day = Number(match[3]);
    const month = monthMap[monthPart] || Number(monthPart);
    if (!year || !month || month < 1 || month > 12 || !day || day < 1 || day > 31) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  formatDate(date) {
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isTodayOrFuture(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return target >= today;
  }

  async loadNews() {
    try {
      const response = await fetch('assets/news.json');
      const rawNews = await response.json();

      const newsData = rawNews
        .map(item => {
          const parsedDate = this.parseDate(item.date);
          return {
            date: item.date,
            content: item.content,
            parsedDate,
          };
        })
        .sort((a, b) => {
          if (a.parsedDate && b.parsedDate) {
            return b.parsedDate - a.parsedDate;
          }
          if (a.parsedDate) {
            return -1;
          }
          if (b.parsedDate) {
            return 1;
          }
          return 0;
        });

      const newsList = this.querySelector('#news-list');
      newsList.innerHTML = '';

      newsData.forEach(item => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.gap = '1.5rem';
        li.style.marginBottom = '4px';

        const dateDisplay = item.parsedDate ? this.formatDate(item.parsedDate) : item.date;
        const prefix = item.parsedDate && this.isTodayOrFuture(item.parsedDate) ? '! ' : '';

        li.innerHTML = `
          <span style="min-width: 100px; color: #44444483;">${prefix}${dateDisplay}</span>
          <span>${item.content}</span>
        `;

        newsList.appendChild(li);
      });
    } catch (error) {
      console.error('Error loading news:', error);
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