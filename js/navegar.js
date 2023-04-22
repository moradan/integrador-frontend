function navegar(e) {
    const actual = document.querySelector(".nav-link.active");
    const link = e.currentTarget;
    const objetivo = document.querySelector("#" + link.dataset.target);
    const menu = document.querySelector(".navbar-collapse");
    
    menu.classList.remove("show");

    if (actual !== null) {
        actual.classList.remove("active");
    }
    
    link.classList.add("active");
    objetivo.scrollIntoView();
}

function activarMenu() {
    const REM = 16;
    const DESPLAZADO = 20 * REM;
    
    const li = document.querySelectorAll(".nav-link");
    const sec = document.querySelectorAll(".destino-nav");

    let len = sec.length;

    while(--len && window.scrollY + DESPLAZADO < sec[len].offsetTop) {}
    li.forEach((link) => {link.classList.remove("active")});
    li[len].classList.add("active");
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