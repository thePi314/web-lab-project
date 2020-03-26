let libs = [
    '/js/libs/ajax',
    '/js/libs/spa',
]
let web_components = [
    '/js/web-components/wl-image-slider'
]
let components = [
    '/js/components/about',
    '/js/components/askme',
    '/js/components/home',
    '/js/components/manual'
]

let main = '/js/main';

async function init_loadingLayer() {
    let elem_content          = document.querySelector('.event-content');
    let elem_loading          = document.querySelector('.event-loading');

    // Generate Bubbles
    let logo_element = elem_loading.querySelector('.header-logo');
    let generate_origin_x = logo_element.x + logo_element.clientWidth / 2;
    let generate_origin_y = logo_element.y + logo_element.clientHeight / 2;

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

        return bubble;
    }

    let offset_x = 92;
    let offset_y = 64;

    for (let ind = 0; ind < 25; ind++) {
        elem_loading.append(createBubbleNode( generate_origin_y + getRandomInt(-offset_y / 2, offset_y / 2),generate_origin_x + getRandomInt(-offset_x / 2, offset_x / 2), getRandomInt(5, 12)));
    }

    elem_loading.addEventListener('animationstart',()=>{
        elem_content.classList.remove('hide');
        document.body.style.overflowY = 'hidden';
    });
    elem_loading.addEventListener('animationend', () => {
        if (elem_loading.classList.contains('done')) {
            elem_loading.classList.remove('done');

            let body_element = document.body;
            while(elem_content.childNodes.length > 0)
                body_element.append(elem_content.childNodes[0]);
                
            elem_content.remove();

            elem_loading.classList.add('hide');
            document.body.style.overflowY = 'auto';
        }
    })

    let run_interval = setInterval(() => {
        let imgslider = elem_content.querySelector('wl-image-slider');
        if (imgslider.images_loaded) {
            elem_loading.classList.add('done');
            clearInterval(run_interval);
        }
    }, 100);
}

async function load_event() {
    let head = document.head;

    function scriptNode(src) {
        let node = document.createElement('script');
        node.src = src;
        node.async = false;
        return node;
    }
    function styleNode(src) {
        let node = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = src;
        return node;
    }

    libs.forEach(lib => {
        head.append(scriptNode(lib));
    });
    web_components.forEach(component => {
        head.append(styleNode('/css/' + component.slice(4)))
        head.append(scriptNode(component));
    });
    components.forEach(component => head.append(scriptNode(component)));
    head.append(scriptNode(main));
}

window.onload = async () => {
    let loader = document.head.querySelector('script');
    await load_event();
    document.head.removeChild(loader);

    init_loadingLayer();
}