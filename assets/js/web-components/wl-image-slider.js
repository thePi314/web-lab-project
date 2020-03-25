window.customElements.define('wl-image-slider', 
class WLImageSlider extends HTMLElement {
  constructor() {
    super();
  }

  createImageNode(src,active=false) {
    let image_wrapper = document.createElement('div');
    image_wrapper.classList.add('image');
    if( active )
      image_wrapper.classList.add('active');

    let image_node = document.createElement('img');
    image_node.src = src;

    image_wrapper.append(image_node);

    return image_wrapper;
  }

  collectImages() {
    let SRCs  = [];
    let index = 0;
    while( this.getAttribute('src['+index+']') != null ) 
      SRCs.push(this.getAttribute('src['+(index++)+']'));

    return SRCs;
  }

  connectedCallback() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('image-slider-inner');

    let image_srcs = this.collectImages();
    for(let ind = 0;ind < image_srcs.length;ind++)
      wrapper.append(this.createImageNode(image_srcs[ind], wrapper.children.length==0));

    this.append(wrapper);

    let indicators = document.createElement('ol');
    indicators.classList.add('image-slider-indicators');
    this.append(indicators);

    this.appendEvents();
  }

  appendEvents() {
    let self = this;
    let indicators_target = this.querySelector('.image-slider-indicators');
    let quotes = this.querySelectorAll('.image');
  
    for (let ind = 0; ind < quotes.length; ind++) {
      quotes.item(ind).addEventListener('animationend', () => {
        if (quotes.item(ind).classList.contains('slide-to-left'))
          quotes.item(ind).classList.remove('slide-to-left');

        if (quotes.item(ind).classList.contains('slide-to-right'))
          quotes.item(ind).classList.remove('slide-to-right');

        if (quotes.item(ind).classList.contains('closing')) {
          quotes.item(ind).classList.remove('active');
          quotes.item(ind).classList.remove('closing');
        }
      })

      let indicator_element = document.createElement('li');
      indicator_element.addEventListener('mousedown', () => {
        toggleQuote(ind, self);
      });

      if (ind == 0)
        indicator_element.classList.add('active');

      indicators_target.appendChild(indicator_element);
    }
    

    function toggleQuote(index, self) {
      let indicators_targets = self.querySelector('.image-slider-indicators').children;
      let quotes = self.querySelectorAll('.image');
  
      if (quotes.item(index).classList.contains('active'))
        return;
  
      for (let ind = 0; ind < quotes.length; ind++)
        if (quotes.item(ind).classList.contains('closing'))
          return;
  
  
      let active_index = null;
      for (let ind = 0; ind < quotes.length; ind++) {
        if (quotes.item(ind).classList.contains('active')) {
          active_index = ind;
          break;
        }
      }
  
      let animation = ((active_index > index) ? 'slide-to-right' : 'slide-to-left')
  
      quotes.item(active_index).classList.add('closing');
      quotes.item(active_index).classList.add(animation);
  
      quotes.item(index).classList.add('active');
      quotes.item(index).classList.add(animation);
  
      indicators_targets[active_index].classList.remove('active');
      indicators_targets[index].classList.add('active');
    }
  }
});