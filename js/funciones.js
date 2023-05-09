function esPar(numero) {

    if (numero % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

function resto(numero1, numero2) {
    let divisionEntera = parseInt(numero1 / numero2);
    let productoEntero = divisionEntera * numero2;

    return numero1 - productoEntero;
}

function imprimirSimbolo(n, caracter) {
    let mensaje = "";

    for (let i = 0; i < n; i++) {
        mensaje += caracter;
    }

    return mensaje;
}

function esVocal(caracter) {
    const vocales = /[aeiouAEIOU]/;

    return vocales.test(caracter);
}

function quitarPuntuacion(caracteres) {
    const puntuaciones = /[!¡"#$%&'()*+,./:;<=>¿?@[\]^`{|}~]/g;

    return caracteres.replace(puntuaciones, '');
}

function sucesion(a, b) {
    let sucecion = [];

    for (let i = a; i <= b; i++) {
        sucecion.push(i);
    }

    return sucecion;
}

function esMultiplo(a, b) {
    if (a < b) {
        return false;
    }

    if (a == 0) {
        if (b == 0) {
            return true;
        } else {
            return false;
        }
    } else if (b == 0) {
        return false;
    } else if (a % b == 0) {
        return true;
    } else {
        return false;
    }
}

function listarDivisores(numero) {
    let PRIMER_DIVISOR = 1;
    let candidatos = sucesion(PRIMER_DIVISOR, numero);
    let listaDivisores = [];

    candidatos.forEach((valor) => {
        if (esMultiplo(valor, numero)) {
            listaDivisores.push(valor);
        }
    })
    return listaDivisores;
}

function cantidadDivisores(numero) {
    let listaDivisores = listarDivisores(numero);

    return listaDivisores.length;
}

function esPrimo(numero) {
    if (cantidadDivisores(numero) > 2) {
        return false;
    } else {
        return true;
    }
}

function listarPrimos(cantidad) {
    let candidato = 1;
    let listaPrimos = [];

    for (let contador = 1; contador <= cantidad; contador++) {
        while(!esPrimo(candidato)) {
            candidato++;
        }
        listaPrimos.push(candidato);
        candidato++;
    }

    return listaPrimos;
}

function mostrarPrimos(cantidad) {
    let lista = listarPrimos(cantidad);
    console.log(lista.toString());
}

function sumarLista(lista) {
    let total = 0;

    lista.forEach((valor) => {
        total += valor;
    });

    return total;
}

function esNumeroPerfecto(numero) {
    //llistamos todos los divisores de numero  
    let listaDivisores = listarDivisores(numero);
    //quitamos el numero propio de la lista de divisores
    listaDivisores.pop();
    //sumamos todos los divisores
    let suma = sumarLista(listaDivisores);
    //comparamos esa suma con el numero, si la suma es igual el numero es perfecto y se devuelve true.
    return (suma == numero)
}

function comicion () {
    const SUELDO_FIJO = 14000;
    const COMICION = 0.16;

    let ventas = calcularVentas(); 
    let sueldo;

    if (ventas == null) {
        mensaje = "No se pudieron calcular ventas.";
    } else {
        sueldo = (SUELDO_FIJO + ventas * COMICION).toFixed(2);
        mensaje = `El sueldo del vendedor es $${sueldo}`;
    }
    
    mostrar(mensaje);
}

function calcularVentas () {
    const MENSAJE_UNIDADES = "Por favor, ingrese la cantidad de unidades.";
    const MENSAJE_PRECIO = "Por favor, indique el precio por unidad.";
    const MENSAJE_SUBTOTAL = "Las ventas ingresadas hasta ahora suman";
    const MENSAJE_CONTINUAR = "Desea ingresar otra venta? [S/N]";

    let ventas = 0;
    let precioUnitario = 0;
    let unidades = 0;
    let mensaje = "";

    do {
        unidades = pedirCantidad(MENSAJE_UNIDADES);
        if (validarNumero(unidades)) {
            precioUnitario = pedirPrecio(MENSAJE_PRECIO);
            if (validarNumero(precioUnitario)) {
                ventas += precioUnitario * unidades;
            }
        }
        mensaje = `${MENSAJE_SUBTOTAL} $${ventas}.\n${MENSAJE_CONTINUAR}`;
    } while(continuar(mensaje))

    return ventas;
}

function validarNumero(candidato) {
    return (candidato != null && !isNaN(candidato));
}

function continuar(mensaje) {
    const SI = "S";
    const NO = "N";

    let respuesta = prompt(mensaje).toUpperCase();    
    while(respuesta != SI && respuesta != NO) {
        respuesta = prompt(mensaje).toUpperCase();           
    }

    return (respuesta==SI);
}

function pedirCantidad (mensaje) {
    let respuesta = pedirNumeroPositivo(mensaje);

    if (respuesta == null) {
        throw "Eligió cancelar el programa.";
    }

    return parseInt(respuesta);
}

function pedirEnteroPositivo(mensaje) {
    let respuesta = pedirNumeroPositivo(mensaje);

    if (respuesta == null) {
        throw "Eligió cancelar el programa.";
    }

    return parseInt(respuesta);
}

function pedirPrecio (mensaje) {
    return pedirNumeroPositivo(mensaje);
}

function pedirNumeroPositivo(mensaje) {
    let respuesta;
    let numero;

    do {
        respuesta = prompt(mensaje);

        if (respuesta == null) {
            throw "Eligió cancelar.";
        }
        numero = parseFloat(respuesta);    
    } while (isNaN(numero) || numero < 0)
    
    return numero;
}

function mostrar(mensaje) {
    //console.log(mensaje);
    alert(mensaje);
}

function edadJubilacion() {
    const SIN_EDAD = "No ingresó edad.";
    const SIN_GENERO = "No ingresó genero.";
    const CANCELADO = "Programa cancelado."
    const MASCULINO = "M";
    const FEMENINO = "F";
    const EDAD_MIN = 1;
    const EDAD_MAX = 120;
    const EDAD_M = 65;
    const EDAD_F = 60;

    let califica = "no ";
    let mensaje = "";

    let genero = pedirGenero(MASCULINO, FEMENINO);
    if (genero == null) {
        mensaje = `${SIN_GENERO} ${CANCELADO}`;
    } else {
        let edad = pedirEdad(EDAD_MIN, EDAD_MAX);
        if (edad == null) {
            mensaje = `${SIN_EDAD} ${CANCELADO}`;
        } else {
            if (edad > EDAD_M || (edad > EDAD_F && genero == FEMENINO)) {califica = ""}
            mensaje = `Ud. ${califica}esta en edad para jubilarse.`;
        }
    }
    mostrar(mensaje);
}

function pedirGenero(MASCULINO, FEMENINO) {
    let genero;
    do {
        try {
            genero = prompt("Por favor indique su genero [M / F].").toUpperCase();
        } catch {
            genero = null;
        }
    } while (genero != MASCULINO && genero != FEMENINO && genero != null)
    
    return genero;
}

function pedirEdad(min, max) {
    const MENSAJE = "Por favor ingrese su edad."
    
    let edad;
    do {
        edad = pedirNumeroPositivo(MENSAJE);
        if (edad == null) {
            return edad;
        }
    } while (edad < min || edad > max) 

    return edad;
}

function laCuenta() {
    let items = ingresarItems();
    let cuenta = 0;

    if (items.length > 0) {
        cuenta = sumar(items).toFixed(2);
        mensaje = `La cuenta es de $${cuenta}.`
    } else {
        mensaje = "La cuenta esta vacia.";
    }

    mostrar(mensaje);
}

function sumar(lista) {
    let suma = 0;
    lista.forEach((valor) => {
        if(!isNaN(valor)){
            suma += valor;
        }
    });
    return suma;
}

function ingresarItems() {
    const MENSAJE_CERRAR = "Desea seguir ingresando datos? [S/N]";
    const MENSAJE_PRECIO = "Ingrese el precio unitario.";
    const MENSAJE_CANTIDAD = "Ingrese la cantidad de unidades.";

    let lista = [];
    let cantidad = 0;
    let precioUnitario = 0;
    let monto = 0;

    do {
        do {
            cantidad = pedirCantidad(MENSAJE_CANTIDAD);
            if (cantidad == null && !continuar(MENSAJE_CERRAR)) {
                return lista;
            } 
        } while(cantidad == null)
        
        do {
            precioUnitario = pedirPrecio(MENSAJE_PRECIO);
            if (precioUnitario == null && !continuar(MENSAJE_CERRAR)) {
                return lista;
            }
        } while(precioUnitario == null)
        
        monto = cantidad * precioUnitario;
        lista.push(monto);
    } while (continuar(MENSAJE_CERRAR))

    return lista;
}

function buscarMaximo(arrayDeNumeros) {
    let maximo; 

    if (arrayDeNumeros == null || arrayDeNumeros.length == 0) {
        return null;
    } else {
        for (const elemento of arrayDeNumeros) {
            if (!isNaN(elemento)) {
                if (maximo == undefined) {
                    maximo = elemento;
                } else if (elemento >= maximo) {
                    maximo = elemento;
                }
            }
        }
        if (maximo == undefined) {
            return null;
        } else {
            return maximo;
        }
    }
}

function calcularFrecuencia(elemento, lista) {
    let frecuencia = 0;

    if (!lista || lista.length == 0 || (!elemento && elemento != 0)) {
        return null;
    } else {
        for (const candidato of lista) {
            if (elemento == candidato) {
                frecuencia++;
            }
        }
    }

    return frecuencia;
}

function promedioArray(array) {
    return sumarArray(array) / array.length;
}