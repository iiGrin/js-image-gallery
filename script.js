document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.container');
    class Slide { // proto for every new img
        constructor(name, src, alt, parentSelector, ...classes) {
            this.name = name;
            this.src = src;
            this.alt = alt;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        render() { // function for image render
            const renderSlide = document.createElement('div');
            if (!this.classes.length) { // if classes has not given in constructor
                this.renderSlide = 'renderSlide';
                renderSlide.classList.add(this.renderSlide);
            } else { // if classes has given 
                this.classes.forEach((className) => {
                    renderSlide.classList.add(className);
                });
            }
            renderSlide.style.backgroundImage = `url(${this.src})`;
            renderSlide.innerHTML = `
                    <h3>${this.name}</h3>
            `;
            this.parent.append(renderSlide);
        }
    }

    const requestData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };

    requestData('http://localhost:3000/images')
        .then((data) => {
            data.forEach((item) => {
                return new Slide(item.name, item.src, item.alt, '.container', 'slide').render();
            })
        });

    slidesContainer.addEventListener('click', (event) => {
        const slide = event.target.closest('.slide');
        if (slide) {
            clearActiveClasses();
            slide.classList.add('active');
        }
    });

    function clearActiveClasses() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
    }
});