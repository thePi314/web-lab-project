class SPAComponent {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    async load() {
        return (await ajax('GET', this.link));
    }

    async exitEvent(root) {
        let self = root.querySelector('#'+this.name); 
        self.classList.add('exit');
    }

    load_events(spa_controller = null) {}
}

class SPA {
    constructor(target_id = 'root') {
        this.components = [];
        this.root       = 0;

        this.target     = document.getElementById(target_id);
        this.current_component = null;
    }

    append( component ) {
        this.components.push(component);
    }

    find(lf_component) {
        for (let ind=0;ind<this.components.length;ind++) {
            if( this.components[ind].name === lf_component ) {
                return this.components[ind]; 
            }
        }

        return null;
    }

    appendExitEvent() {
        let component = this.target.querySelector('.component');
        component.addEventListener('animationend',()=>{
            if(component.classList.contains('exit')) {
                component.remove();
            }
        });
    }

    async load(lf_component) {
        if( this.current_component != null )
            this.current_component.exitEvent(this.target);

        window.location.hash = '#' + lf_component;

        let component = this.find(lf_component);
        if( component == null )
            return;

        this.target.innerHTML += await component.load();
        this.current_component = component;
        await component.load_events(this);

        this.appendExitEvent();
    }

    init() { 
        this.load(this.components[this.root].name);
    }
}