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