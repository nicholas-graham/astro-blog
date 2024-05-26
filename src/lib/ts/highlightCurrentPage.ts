const navLinks = document.querySelectorAll("[data-navLink]");

if (navLinks) {
    navLinks.forEach((link) => {
        if (link.getAttribute("href") === window.location.pathname) {
            link.setAttribute("aria-current", "page");
        }
    })
}