function init_loadingLayer(load_rule=0) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createBubbleNode(top, left, size) {
        let bubble = document.createElement('span');
        bubble.classList.add('particle-bubble');
        bubble.style.top = top/window.innerHeight*100 + '%';
        bubble.style.left = left/window.innerWidth*100 + '%';
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.animationDuration = getRandomInt(2,4) + 's';

        return bubble;
    }

    document.querySelector('html').classList.add('loading');
    let elem_loading          = document.querySelector('.event-loading');
    if( elem_loading == null ) {
        elem_loading = document.createElement('div');
        elem_loading.classList.add('event-loading');

        let img = document.createElement('img');
        img.src = '/img/logo';
        img.classList.add('header-logo');

        elem_loading.append(img);
        document.body.prepend(elem_loading);
    }

    // Generate Bubbles
    let logo_element = elem_loading.querySelector('.header-logo');
    let generate_origin_x = logo_element.x + logo_element.clientWidth / 2;
    let generate_origin_y = logo_element.y + logo_element.clientHeight / 2;

    let offset_x = 112;
    let offset_y = 64;

    for (let ind = 0; ind < 20; ind++) {
        elem_loading.append(createBubbleNode( generate_origin_y + getRandomInt(-offset_y / 2, offset_y / 2),generate_origin_x + getRandomInt(-offset_x / 2, offset_x / 2), getRandomInt(4, 12)));
    }

    elem_loading.addEventListener('animationend', () => {
        if (elem_loading.classList.contains('done')) {
            elem_loading.classList.remove('done');
            elem_loading.remove();
        }

        document.querySelector('html').classList.remove('loading');
    })

    let run_interval = null;
    switch(load_rule) {
        case 0:
            run_interval = setInterval(() => {
                let imgslider = document.body.querySelector('wl-image-slider');
                if (imgslider.images_loaded) {
                    elem_loading.classList.add('done');
                    clearInterval(run_interval);
                }
            }, 100);
            break;

        case 1:
            setTimeout(()=>{
                elem_loading.classList.add('done');
            },3000);
            break;
    }

}

function init_scroll_button() {
    let scroll_button = document.querySelector('#button-scroll');
    let scroll_target = document.querySelector('#scroll-target');
    
    scroll_button.addEventListener('mousedown',()=>{
        scroll_target.scrollIntoView({ behavior: 'smooth', block: 'end' });
    })
}