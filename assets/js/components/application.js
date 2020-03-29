class ComponentApplication extends SPAComponent {
    constructor() {
        super('application','/components/application');
    }

    load_events(spa_controller = null) {
        //init_loadingLayer(1);
        this.hideElements();
        this.prepareHeader();
    }

    hideElements() {
        document.querySelector('body > wl-image-slider').classList.add('hide');
        document.querySelector('body > #scroll-target').classList.add('hide');
    }

    prepareHeader() {
        let header = document.querySelector('.header');

        let header_toolbar = document.createElement('div');
        header_toolbar.classList.add('header-toolbar'); 
        

        let header_buttons = document.createElement('div');
        header_buttons.classList.add('header-buttons');

        header.append(header_toolbar);
        header.append(header_buttons);
    }
}