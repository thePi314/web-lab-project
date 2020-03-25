window.customElements.define('wl-image-slider', 
class WLImageSlider extends HTMLElement {
  constructor() {
    super();
  }

  createImageNode(src,active=false) {
    let main_node = document.createElement('div');
    main_node.classList.add('quote');
    if( active )
      main_node.classList.add('active');

    let image_node = document.createElement('img');
    image_node.src = src;

    main_node.append(image_node);
    return main_node;
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
    wrapper.classList.add('quote-slider-inner');

    let image_srcs = this.collectImages();
    for(let ind = 0;ind < image_srcs.length;ind++)
      wrapper.append(this.createImageNode(image_srcs[ind], wrapper.children.length==0));

    this.append(wrapper);

    let indicators = document.createElement('ol');
    indicators.classList.add('quote-slider-indicators');
    this.append(indicators);

    this.appendEvents();
  }

  appendEvents() {
    let self = this;
    let indicators_target = this.querySelector('.quote-slider-indicators');
    let quotes = this.querySelectorAll('.quote');
  
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
      let indicators_targets = self.querySelector('.quote-slider-indicators').children;
      let quotes = self.querySelectorAll('.quote');
  
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



/* function quotesSliderCollection() {
  let quoteSliders = document.querySelectorAll('.quote-slider');

  for (let ind = 0; ind < quoteSliders.length; ind++) {
    let indicators_target = quoteSliders.item(ind).querySelector('.quote-slider-indicators');
    let quotes = quoteSliders.item(ind).querySelectorAll('.quote');

    for (let ind2 = 0; ind2 < quotes.length; ind2++) {
      quotes.item(ind2).addEventListener('animationend', () => {
        if (quotes.item(ind2).classList.contains('slide-to-left'))
          quotes.item(ind2).classList.remove('slide-to-left');

        if (quotes.item(ind2).classList.contains('slide-to-right'))
          quotes.item(ind2).classList.remove('slide-to-right');

        if (quotes.item(ind2).classList.contains('closing')) {
          quotes.item(ind2).classList.remove('active');
          quotes.item(ind2).classList.remove('closing');
        }
      })

      let indicator_element = document.createElement('li');
      indicator_element.addEventListener('mousedown', () => {
        toggleQuote(ind2, quoteSliders.item(ind));
      });

      if (ind2 == 0)
        indicator_element.classList.add('active');

      indicators_target.appendChild(indicator_element);
    }
  }

  function toggleQuote(index, quoteSliders) {
    let indicators_targets = quoteSliders.querySelector('.quote-slider-indicators').children;
    let quotes = quoteSliders.querySelectorAll('.quote');

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
 */
