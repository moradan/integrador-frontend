const formulario = {
    valorTicket: 200,
    botonResumen: document.querySelector("#botonResumen"),
    btonReset: document.querySelector("#botonReset"),
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
        this.btonReset.onclick = this.limpiar.bind(this);
        window.onkeypress = this.evaluarTecla.bind(this);
    },

    evaluarTecla: function(evento) {
        const TECLA_ENTER = 13;

        if (evento.keyCode == TECLA_ENTER) {
            this.mostrarResumen();
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
    }
}

formulario.inicializar();