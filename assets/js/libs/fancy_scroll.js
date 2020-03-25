/* WIP */

(async function () {
    let current_scrollY = window.scrollY;
    let element_root = document.querySelector('#root');
    let element_header = document.querySelector('.header');
    let scrolling = false;

    window.onscroll = () => {
        if (!scrolling) {
            if (window.scrollY == 0) {
                element_root.scrollIntoView({ behavior: 'smooth', block: 'end' });
                scrolling = false ;
            }
            else {
                element_header.scrollIntoView({ behavior: 'smooth', block: 'end' });
                scrolling = false ;
            }
            scrolling = true;
        }
    }
})();