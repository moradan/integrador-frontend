const formulario = {
    valorTicket: 200,
    botonResumen: document.querySelector("#botonResumen"),
    botonReset: document.querySelector("#botonReset"),
    campoNombre: document.querySelector("#campoNombre"),
    campoApellido: document.querySelector("#campoApellido"),
    campoEmail: document.querySelector("#campoEmail"),
    campoCantidad: document.querySelector("#campoCantidad"),
    campoCategoria: document.querySelector("#campoCategoria"),
    campoTotal: document.querySelector("#campoTotal"),
    mensajeAdvertencia: document.querySelector("#advertencia"),

    descuento: {
        estudiante: 0.8,
        trainee: 0.5,
        junior: 0.15
    },

    inicializar: function() {
        this.botonResumen.onclick = this.mostrarResumen.bind(this);
        this.botonReset.onclick = this.limpiar.bind(this);
        this.campoCategoria.onkeypress = this.evaluarTecla.bind(this);
        window.onkeydown = this.evaluarTecla.bind(this);
        this.limpiar();
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

        if (this.campoNombre.value == "" || this.campoApellido.value == "" || this.campoEmail.value == "") {
            this.mensajeAdvertencia.classList.remove("d-none");
        } else {
            this.mensajeAdvertencia.classList.add("d-none");
        }
    },

    limpiar: function () {
        this.mensajeAdvertencia.classList.add("d-none");
        this.campoTotal.innerHTML = "";
        this.campoNombre.focus();
    }
}

formulario.inicializar();