class SPAComponent {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    load() {
        return await ajax('GET', this.link);
    }
}

class SPA {
    constructor(target_id = 'root') {
        this.components = [];
        this.root       = 0;

        this.target     = document.getElementById(target_id);
    }

    append( component , link = null ) {
        if( link == null ) {
            this.components.push(component);
        }
        else {
            this.components.push(new SPAComponent(component,link));
        }
    }

    find(lf_component) {
        this.components.forEach((component)=>{
            if( component.name === lf_component ) {
                return component; 
            }
        });

        return null;
    }

    load(lf_component) {
        let component = this.find(lf_component);
        
        this.target.innerHTML = component.load();
    }

    init() { 
        this.load(this.components[this.root].name);
    }
}