
class Senialador {
    #links = [];
    #secciones = [];
 
    constructor () {
        this.#links = document.querySelectorAll(".nav-link");
        this.#secciones = document.querySelectorAll(".destino-nav");
        this.#asignarListeners();
    }
    
    #asignarListeners() {
        for (const link of this.#links) {
            link.addEventListener("click", this.#onClick.bind(this));
        }
        window.addEventListener("click", this.#onClick.bind(this));
        window.addEventListener("scroll", this.activarMenu.bind(this));
    };

    activarMenu() {
        // determinar que secciones estan visibles
        // determinar la proporcion de contenido visible de cada seccion
        // determinar cual seccion tiene mas contenido visible
        // determinar el orden de esa seccion
        // determinar el orden del link
    
        //se elimina la clase active de todos los links de navegacion
        for (const link of this.#links) {
            link.classList.remove("active");
        }
    
        //se activa el link de navegacion adecuado usando seccion como indice.
        this.#links[seccion].classList.add("active");
    }

    #onClick(event) {
        this.#colapsarMenu();
        
        if (event.currentTarget != window) {
            const link = event.currentTarget;
            const objetivo = document.querySelector(link.dataset.target);

            objetivo.scrollIntoView(true);    
        }
    }

    #colapsarMenu() {
        let menu = document.querySelector(".navbar-collapse");
    
        menu.classList.remove("show");
    }
}

const miSenialador = new Senialador();
miSenialador.activarMenu();