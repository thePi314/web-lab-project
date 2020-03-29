class PrepareHeader {
    constructor() {
        this.target         = document.querySelector('.header');
        this.toolbar        = null;
        this.header_buttons = null;

        this.prepareToolbar();
        this.prepareButtons();
    }

    createButton(icon,id=null) {
        let button = document.createElement('a');
        button.classList.add('button');
        button.innerHTML = '<span class="material-icons">'+icon+'</span>';
        if (id != null) 
            button.id = id;
        
        return button;
    }

    prepareButtons() {
        this.header_buttons = document.createElement('div');
        this.header_buttons.classList.add('header-buttons');

        this.header_buttons.append(this.createButton('exit_to_app'));
        this.header_buttons.append(this.createButton('menu','component-settings-toggler'));
        
        this.target.append(this.header_buttons);
    }

    prepareToolbar() {
        this.toolbar = document.createElement('div');
        this.toolbar.classList.add('header-toolbar');

        this.target.append(this.toolbar);
    }
}

class ComponentApplication extends SPAComponent {
    constructor() {
        super('application','/components/application');
        this.header = null;
    }

    load_events(spa_controller = null) {
        //init_loadingLayer(1);
        this.hideElements();
        this.prepareHeader();
    }

    load_toggler_events() {
        let togglers = document.querySelectorAll('#component-settings-toggler');
        togglers.forEach( toggler => {
            toggler.addEventListener('mousedown',() => {
                let sidebar = document.querySelector('.component-settings');
                if( sidebar.classList.contains('collapsed') )
                    sidebar.classList.remove('collapsed');
                else
                sidebar.classList.add('collapsed');
            })
        })
    }

    hideElements() {
        document.querySelector('body > wl-image-slider').classList.add('hide');
        document.querySelector('body > #scroll-target').classList.add('hide');
    }

    prepareHeader() {
        this.header = new PrepareHeader();
        this.load_toggler_events();
    }
}