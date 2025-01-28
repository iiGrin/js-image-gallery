document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = document.querySelector('.slide .active');

    // for (const slide of slides) {
    //     slide.addEventListener('click', () => {
    //         clearActiveClasses();
    //         slide.classList.add('active');
    //     });
    // }

    slides.forEach((slide) => {
        slide.addEventListener('click', () => {
            clearActiveClasses();
            slide.classList.add('active');
        });
    });

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
    }
});