
class Senialador {
    #secciones = [];
    #links = [];
    #visibilidades = {};
    #seccionCentrada;
 
    // el constructor del objeto senialador llama a las funciones que inicializan los distintos campos asi como crear e inicializar el Intersection Observer
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
        const homeLink = document.querySelector(".navbar-brand");
        homeLink.addEventListener("click", this.#onClick.bind(this));
        
        window.addEventListener("click", this.#onClick.bind(this));
        
        for (const link of this.#links) {
            link.addEventListener("click", this.#onClick.bind(this));
        }
    }
    
    #inicializarObserver() {
        const opciones = {
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
    
    // refresca los menu para reflejar los cambios de cual link esta activo
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

    // estos metodos son los responsables de navegar por el documento y plegar la barra de navegacion
    #onClick(event) {
        this.#colapsarMenu();
        
        const elementoClicado = event.currentTarget;
        if (elementoClicado != window) {
            if (elementoClicado.classList.contains("nav-link")) {
                const link = elementoClicado;
                const objetivo = document.querySelector(link.dataset.target);
                objetivo.scrollIntoView();    
            } else if (elementoClicado.classList.contains("navbar-brand")) {
                window.scrollTo(0, 0);
            }
        }
    }

    #colapsarMenu() {
        let menu = document.querySelector(".navbar-collapse");
        let boton = document.querySelector(".navbar-toggler");
        
        if (menu.classList.contains("show")) {
            boton.click();
        }

    }
}

const miSenialador = new Senialador();