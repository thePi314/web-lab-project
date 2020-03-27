class SPAComponent {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    async load() {
        return (await ajax('GET', this.link));
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

    appendEnterExitEvent() {
        let component = this.target.querySelector('#'+this.current_component.name);
        component.addEventListener('animationend',()=>{
            if(component.classList.contains('enter')) {
                component.classList.remove('enter');
            }

            if(component.classList.contains('exit')) {
                this.target.removeChild(component);
            }
        });
    }

    stringToNode(string) {
        let node       = document.createElement('div');
        node.innerHTML = string;
        return node.childNodes.item(0);
    }

    async load(lf_component) {
        if( this.current_component != null )
            this.target.querySelector('#'+this.current_component.name).classList.add('exit');

        window.location.hash = '#' + lf_component;

        let component = this.find(lf_component);
        if( component == null )
            return;

        this.target.append(this.stringToNode(await component.load()));
        await component.load_events(this);

        this.current_component = component;
        this.appendEnterExitEvent();
    }

    init() { 
        this.load(this.components[this.root].name);
    }
}