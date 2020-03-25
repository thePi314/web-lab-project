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

async function load_event(){
    let head   = document.head;

    function scriptNode(src) {
        let node = document.createElement('script');
        node.src = src;
        return node;
    }
    function styleNode(src) {
        let node  = document.createElement('link');
        node.rel = 'stylesheet';
        node.href = src;
        return node;
    }

    libs.forEach(lib => {
        head.append(scriptNode(lib));
    });
    web_components.forEach(component => {
        head.append(styleNode('/css/'+component.slice(4)))
        head.append(scriptNode(component));
    });
    components.forEach(component => head.append(scriptNode(component)));
    head.append(scriptNode(main));
}

window.onload = async () => {
    let loader = document.head.querySelector('script');
    await load_event();
    document.head.removeChild(loader);
}