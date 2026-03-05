class Name extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div style="max-width: 9in; padding-bottom: 5px;">
      
			<div style="font-size: 2.7em; font-weight: 500; font-family: 'Calibri Light', Helvetica, Arial, sans-serif;">
        <img src="assets/name.svg" alt="Ridhi Bandaru" style="height:60px;"/>
      </div>
			<div style="font-size: 1.3em; font-weight: 400; font-family: 'Calibri Light', Helvetica, Arial, sans-serif; margin-top: -8px; margin-bottom: 15px;">/rɪdʱiː bəŋɖaːɾuː/ </div>
			<hr style="border: 0.01px solid #53535359;"/>
			<!-- <div style="font-size: 1em; font-weight: 50; font-family: 'Calibri Light', Calibri, Arial, sans-serif; margin-top: 2px;"><i>ri-dee ban-der-oo</i></div> -->
		</div>
    `;
  }
}

customElements.define('name-bar', Name);