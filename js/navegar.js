function navegar(e) {
    const link = e.currentTarget;
    const objetivo = document.querySelector("#" + link.dataset.target);
    const menu = document.querySelector(".navbar-collapse");
    
    menu.classList.remove("show");
    
    objetivo.scrollIntoView();
}

function activarMenu() {
    const REM = 16;
    const DESPLAZADO = 20 * REM;
    
    const linksNavegacion = document.querySelectorAll(".nav-link");
    const destinosNavegacion = document.querySelectorAll(".destino-nav");
    const quiebresY = [];

    for (const destino of destinosNavegacion) {
        const quiebreY = destino.offsetTop - DESPLAZADO;
        quiebresY.push(quiebreY);
    }

    let seccion = 0;
    while(scrollY >= quiebresY[seccion + 1]) {
        seccion++;
    }

    for (const link of linksNavegacion) {
        link.classList.remove("active");
    }

    if (seccion >= 0) {
        linksNavegacion[seccion].classList.add("active");
    }
}

function colapsarMenu()
{
    let menu = document.querySelector(".navbar-collapse");
    let boton = document.querySelector("button.navbar-toggler");

    if (menu.classList.contains("show")) {
        boton.click();
    }
}

activarMenu();
window.addEventListener("scroll", activarMenu);
window.addEventListener("click", colapsarMenu);