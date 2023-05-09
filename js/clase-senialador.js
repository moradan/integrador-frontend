
class Senialador {
    #secciones = [];
    #links = [];
    #seccionesCambiadas;
    #seccionCentrada;
 
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
    #refrescarMenus(seccionesCambiadas) {
        this.#determinarSeccionCentrada(seccionesCambiadas);
        this.#atenuarMenus();
        this.#resaltarMenu(seccionCentrada);
    }

    #determinarSeccionCentrada(seccionesCambiadas) {
        this.#seccionesCambiadas = seccionesCambiadas;
        const visibilidades = this.#obtenerVisibilidades();
        const maximaVisibilidad = Math.max(...visibilidades);
        const indiceSeccionCentrada = visibilidades.indexOf(maximaVisibilidad);
        this.#seccionCentrada = this.#seccionesCambiadas[indiceSeccionCentrada].target;
    }
    
    #obtenerVisibilidades() {
        const visibilidades = [];
        for (const seccion of this.#seccionesCambiadas) {
            if (seccion.isIntersecting) {
                visibilidades.push(seccion.intersectionRatio);
            } 
        }
        return visibilidades;
    }

    #atenuarMenus() {
        for (const link of this.#links) {
            link.classList.remove("active");
        }
    }
    
    #resaltarMenu() {
        let link = this.#obtenerLink(this.#seccionCentrada);
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