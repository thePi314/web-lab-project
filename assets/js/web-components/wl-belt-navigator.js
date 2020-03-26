window.customElements.define('wl-belt-navigator', 
class WLBeltNavigator extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let self = this ;
    for (let ind = 0;ind < this.childNodes.length; ind++) {
        this.childNodes.item(ind).addEventListener('mouseenter',()=>{

            this.childNodes.item(ind).classList.add('grow');
        });
        this.childNodes.item(ind).addEventListener('mouseleave',()=>{
            if(this.childNodes.item(ind).classList.contains('growen')){
                this.childNodes.item(ind).classList.add('shrink');
            }

            if(this.childNodes.item(ind).classList.contains('grow')){
                this.childNodes.item(ind).classList.add('shrink');
                this.childNodes.item(ind).classList.remove('grow')
            }
        });
        this.childNodes.item(ind).addEventListener('animationend',()=>{
            if(this.childNodes.item(ind).classList.contains('grow')){
                this.childNodes.item(ind).classList.remove('grow');
                this.childNodes.item(ind).classList.add('growen');
            }

            if(this.childNodes.item(ind).classList.contains('shrink')){
                this.childNodes.item(ind).classList.remove('shrink');
                this.childNodes.item(ind).classList.remove('growen');
            }
        });
    }
  }
});