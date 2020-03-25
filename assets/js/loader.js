let libs = [
    '/js/libs/ajax',
    '/js/libs/spa'
]
let web_components = [
    '/js/web-components/wl-image-slider'
]
let components = [
    '/js/components/root'
]

let main = '/js/main';

window.onload = () => {
    let head   = document.head;
    let loader = head.querySelector('script');

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

    libs.forEach(lib => head.append(scriptNode(lib)));
    web_components.forEach(component => {
        head.append(styleNode('/css/'+component.slice(4)))
        head.append(scriptNode(component));
    });
    components.forEach(component => head.append(scriptNode(component)));

    head.append(scriptNode(main));

    head.removeChild(loader);
}