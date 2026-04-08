class Name extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div style="max-width: 9in; padding-bottom: 5px;">
      
            <div style="font-size: 2.7em; font-weight: 500; font-family: 'Calibri Light', Helvetica, Arial, sans-serif;">
        <img id="name-image" src="assets/name_brahmi.svg" alt="Ridhi Bandaru" style="height:50px; cursor: pointer;"/>
      </div>
            <div style="font-size: 1.2em; font-weight: 400; font-family: 'Calibri Light', Helvetica, Arial, sans-serif; margin-top: -10px; margin-bottom: 10px;">/rɪdʱiː bəŋɖaːɾuː/ </div>
            <hr style="border: 0.01px solid #53535359;"/>
            <!-- <div style="font-size: 1em; font-weight: 50; font-family: 'Calibri Light', Calibri, Arial, sans-serif; margin-top: 2px;"><i>ri-dee ban-der-oo</i></div> -->
        </div>
    `;

    // Add click event listener to toggle between SVG files
    this.querySelector('#name-image').addEventListener('click', () => {
      const img = this.querySelector('#name-image');
      const newSrc = img.src.includes('name_brahmi.svg') ? 'assets/name_latin.svg' : 'assets/name_brahmi.svg';
      
      // Preload the new image to check if it exists
      const preloadImg = new Image();
      preloadImg.onload = () => {
        img.src = newSrc;
      };
      preloadImg.onerror = () => {
        // Do nothing if the file isn't found
      };
      preloadImg.src = newSrc;
    });
  }
}

customElements.define('name-bar', Name);