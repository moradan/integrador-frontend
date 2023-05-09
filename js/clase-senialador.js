
class Senialador {
    #secciones = [];
    #links = [];
 
    constructor () {
        this.#obtenerSecciones();
        this.#obtenerLinks();
        this.#asignarListeners();
        this.#inicializarObserver();
    }

    #obtenerSecciones() {
        this.#secciones = document.querySelectorAll(".destino-nav");
    }

    #obtenerLinks() {
        this.#links = document.querySelectorAll(".nav-link");
    }
    
    #asignarListeners() {
        for (const link of this.#links) {
            link.addEventListener("click", this.#onClick.bind(this));
        }
        window.addEventListener("click", this.#onClick.bind(this));
    }
    
    #inicializarObserver() {
        const observador = new IntersectionObserver(this.#refrescarMenus)
        for (const seccion of this.#secciones) {
            observador.observe(seccion);
        }
    }

    // se llama asincronicamente gracias al Intersection Observer definido en el constructor, cuando alguna seccion cambia su visibilidad y hay que determinar si hay que cambiar el menu activo
    #refrescarMenus(seccionesVisibles, observador) {
        const visibilidades = [];

        for (const seccion of seccionesVisibles) {
            if (seccion.isIntersecting) {
                visibilidades.push(seccion.intersectionRatio);
            } 
        }
        const indiceSeccionCentrada = maximo(visibilidades);
        const seccionCentrada = seccionesVisibles[indiceSeccionCentrada].target;
    
        this.#atenuarMenus();
        this.#resaltarMenu(seccionCentrada);
    }
    
    #atenuarMenus() {
        for (const link of this.#links) {
            link.classList.remove("active");
        }
    }
    
    #resaltarMenu(seccionCentrada) {
        let link = this.#obtenerLink(seccionCentrada);
        link.classList.add("active");
    }

    #obtenerLink(seccion) {
        let i = 0;
        while (this.#links[i].dataset.target != seccion.id) {i++}
        return this.#links[i];
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