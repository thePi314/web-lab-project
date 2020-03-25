class SPAComponent {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    async load() {
        return (await ajax('GET', this.link));
    }
}

class SPA {
    constructor(target_id = 'root') {
        this.components = [];
        this.root       = 0;

        this.target     = document.getElementById(target_id);
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

    async load(lf_component) {
        let component = this.find(lf_component);
        this.target.innerHTML = await component.load();
    }

    init() { 
        this.load(this.components[this.root].name);
    }
}