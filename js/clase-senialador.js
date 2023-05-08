
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
       const puntosQuiebre = this.#obtenerPuntosQuiebre();

        // vamos a iterar por cada valor seccion hasta que lleguemos al valor seccion que corresponde a la seccion centrada.
       let seccion = 0;
       // una seccion esta centrada en pantalla si el scrollY de la ventana es menor que el punto de quiebre de la siguiente seccion.
       // si scroll de ventana es mayor que el punto de quiebre de la siguiente seccion hay que repetir la comparacion con seccion++
        while(window.scrollY >= puntosQuiebre[seccion + 1]) {
            seccion++;
        }
        //en este punto seccion nos dice que seccion de navegacion esta mas centrada en la pantalla
    
        //se elimina la clase active de todos los links de navegacion
        for (const link of this.#links) {
            link.classList.remove("active");
        }
    
        //se activa el link de navegacion adecuado usando seccion como indice.
        this.#links[seccion].classList.add("active");
    }

    #obtenerPuntosQuiebre() {
        const puntosQuiebre = [];

        for (const seccion of this.#secciones) {
            const alturaSeccion = seccion.offsetHeight;
            const comienzoSeccion = seccion.offsetTop;
            const alturaVentana = window.innerHeight;
            const puntoQuiebre = comienzoSeccion + (alturaSeccion / 2) - alturaVentana;
            puntosQuiebre.push(puntoQuiebre);
        }

        return puntosQuiebre;
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