document.addEventListener('DOMContentLoaded', () => {
    function ImageGallery(currentSlide = 1) { // default slide (passed to calling requestData())
        const slidesContainer = document.querySelector('.container');
        class Slide { // proto for img slide
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
                    const defaultClass = 'slide';
                    renderSlide.classList.add(defaultClass);
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

        const requestData = async (url) => { // get data from server function
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: HTTP request error: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Error: ${error.name}: ${error.message}`);
            }

        };

        requestData('http://localhost:3000/images')
            .then((data) => {
                data.forEach((item, index) => {
                    if (index === currentSlide) { // value from initial args, for default active slide
                        return new Slide(item.name, item.src, item.alt, '.container', 'slide', 'active').render();
                    }
                    return new Slide(item.name, item.src, item.alt, '.container', 'slide').render();
                })
            });

        slidesContainer.addEventListener('click', (event) => { // action for slides
            const slide = event.target.closest('.slide');
            if (slide) {
                clearActiveClasses();
                slide.classList.add('active');
            }
        });

        function clearActiveClasses() { // class remove function 
            const slides = document.querySelectorAll('.slide');
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
        }
    }

    ImageGallery();
});