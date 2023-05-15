const formulario = {
    valorTicket: 200,
    botonResumen: document.querySelector("#botonResumen"),
    botonReset: document.querySelector("#botonReset"),
    campoNombre: document.querySelector("#campoNombre"),
    campoCantidad: document.querySelector("#campoCantidad"),
    campoCategoria: document.querySelector("#campoCategoria"),
    campoTotal: document.querySelector("#campoTotal"),

    descuento: {
        estudiante: 0.8,
        trainee: 0.5,
        junior: 0.15
    },

    inicializar: function() {
        this.botonResumen.onclick = this.mostrarResumen.bind(this);
        this.botonReset.onclick = this.limpiar.bind(this);
        window.onkeydown = this.evaluarTecla.bind(this);
        this.campoCategoria.onkeypress = this.evaluarTecla.bind(this);
    },

    evaluarTecla: function(evento) {
        switch (evento.key) {
            case "Enter":
                evento.preventDefault();
                this.mostrarResumen();
                break;
            case "Escape":
                evento.preventDefault();
                this.botonReset.click();
            default:
        }
    },

    mostrarResumen: function() {
        const cantidad = this.campoCantidad.value;
        const categoria = this.campoCategoria.value;
        const costoTotal = this.valorTicket * cantidad * (1 - this.descuento[categoria]);
        this.campoTotal.innerHTML = `$${costoTotal.toFixed(2)}`;
    },

    limpiar: function () {
        this.campoTotal.innerHTML = "";
        this.campoNombre.focus();
    }
}

formulario.inicializar();