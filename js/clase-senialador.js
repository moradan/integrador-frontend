
class Senialador {
    #secciones = [];
    #links = [];
    #visibilidades = {};
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
        this.#links = document.querySelectorAll(".nav-link:not(.externo)");
    }
    
    #asignarListeners() {
        for (const link of this.#links) {
            link.addEventListener("click", this.#onClick.bind(this));
        }
        window.addEventListener("click", this.#onClick.bind(this));
    }
    
    #inicializarObserver() {
        const opciones = {
            root: null,
            margin: "0px",
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }
        const observador = new IntersectionObserver(this.#alCambiarVisibilidad.bind(this), opciones);
        for (const seccion of this.#secciones) {
            observador.observe(seccion);
        }
    }

    // se llama asincronicamente gracias al Intersection Observer definido en el constructor, cuando alguna seccion cambia su visibilidad y hay que determinar si hay que cambiar el menu activo
    #alCambiarVisibilidad(objetivosCambiados) {
        this.#actualizarVisibilidades(objetivosCambiados);
        this.#determinarSeccionCentrada();
        this.#refrescarMenus();
    }

    #actualizarVisibilidades(objetivosCambiados) {
        for (const objetivo of objetivosCambiados) {
            const clave = `#${objetivo.target.id}`;
            const visibilidad = objetivo.intersectionRatio;
            this.#visibilidades[clave] = visibilidad;
        }
    }
    
    #determinarSeccionCentrada() {
        let seccionCentrada;
        for (const clave in this.#visibilidades) {
            if (!seccionCentrada) {
                seccionCentrada = clave;
            } else if (this.#visibilidades[clave] > this.#visibilidades[seccionCentrada] ) {
                seccionCentrada = clave;
            }
        }
        this.#seccionCentrada = seccionCentrada;
    }
    
    #refrescarMenus() {
        this.#atenuarMenus();
        this.#resaltarMenu();
    }
   
    #atenuarMenus() {
        for (const link of this.#links) {
            link.classList.remove("active");
        }
    }
    
    #resaltarMenu() {
        if (this.#seccionCentrada) {
            let link = this.#obtenerNavLink(this.#seccionCentrada);
            link.classList.add("active");
        }
    }
    
    #obtenerNavLink(seccion) {
        let i = 0;
        let len = this.#links.length;
        while (i < len && this.#links[i].dataset.target != seccion) {i++}
        return this.#links[i];
    }

    #onClick(event) {
        this.#colapsarMenu();
        
        if (event.currentTarget != window) {
            const elementoClicado = event.currentTarget;
            if (elementoClicado.classList.contains("nav-link")) {
                const link = elementoClicado;
                const objetivo = document.querySelector(link.dataset.target);
                objetivo.scrollIntoView();    
            }
        }
    }

    #colapsarMenu() {
        let menu = document.querySelector(".navbar-collapse");
    
        menu.classList.remove("show");
    }
}

const miSenialador = new Senialador();