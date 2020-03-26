window.customElements.define('wl-row', 
class WLRow extends HTMLElement {
  constructor() {
    super();

    this.elements_per_row = {
        desktop: 3,
        tablet:  2,
        mobile:  1
    }
  }

  connectedCallback() {
    this.children = this.childNodes;
    
  }
});