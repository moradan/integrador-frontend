
class Senialador {
    #links = [];
    #secciones = [];
 
    constructor () {
        #obtenerSecciones();
        #obtenerLinks();
        //asignar click listener a cada link de navegacion
        //asignar click listener a ventana
        #inicializarObserver();
    }
    
    #asignarListeners() {
        for (const link of this.#links) {
            link.addEventListener("click", this.#onClick.bind(this));
        }
        window.addEventListener("click", this.#onClick.bind(this));
    };

    // se llama asincronicamente gracias al Intersection Observer definido en el constructor, cuando alguna seccion cambia su visibilidad y hay que determinar si hay que cambiar el menu activo
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