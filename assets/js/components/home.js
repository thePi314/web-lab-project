class ComponentHome extends SPAComponent {
    constructor() {
        super('home','/components/home');
    }

    load_events(spa_controller) {
        let buttons = document.querySelectorAll('#home .button-big');
        let self = this;
        buttons.forEach( button => {
            button.addEventListener('mousedown',()=>{
                spa_controller.load(button.getAttribute('target'));
            })
        })
    }
}