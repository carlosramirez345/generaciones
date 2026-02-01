document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos todas las tarjetas
    const cards = document.querySelectorAll('.card');

    // Configuración del Observador
    const observerOptions = {
        threshold: 0.2, // Se activa cuando el 20% del elemento es visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' cuando entra en pantalla
                entry.target.classList.add('visible');
                
                // Opcional: Dejar de observar una vez animado
                // observer.unobserve(entry.target); 
            } else {
                // Si quieres que la animación se repita al salir y volver a entrar:
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Aplicar el observador a cada tarjeta
    cards.forEach(card => {
        observer.observe(card);
    });
});