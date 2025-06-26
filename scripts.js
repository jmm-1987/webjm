document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.index * (entry.target.classList.contains('tarjeta-proyecto') ? 250 : 200);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay); 
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.tarjeta-proyecto, .burbuja');
    elementsToAnimate.forEach((el, index) => {
        el.dataset.index = index % 10; // Reset index for each type if needed, but this works for now.
        observer.observe(el);
    });

    // Scroll to top button logic
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto máquina de escribir para el texto de la portada (varias frases)
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        const frases = [
            'software a medida',
            'chatbots',
            'análisis de datos',
            'dashboards interactivos'
        ];
        let fraseIndex = 0;
        let charIndex = 0;
        let escribiendo = true;

        function escribirBorrar() {
            const fraseActual = frases[fraseIndex];
            if (escribiendo) {
                if (charIndex < fraseActual.length) {
                    typewriter.textContent += fraseActual.charAt(charIndex);
                    charIndex++;
                    setTimeout(escribirBorrar, 90);
                } else {
                    escribiendo = false;
                    setTimeout(escribirBorrar, 1200);
                }
            } else {
                if (charIndex > 0) {
                    typewriter.textContent = fraseActual.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(escribirBorrar, 40);
                } else {
                    escribiendo = true;
                    fraseIndex = (fraseIndex + 1) % frases.length;
                    setTimeout(escribirBorrar, 400);
                }
            }
        }
        typewriter.textContent = '';
        escribirBorrar();
    }

    // Enlace inteligente para WhatsApp: web en escritorio, app en móvil
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = '34619639616';
            const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
            if (isMobile) {
                window.open('https://wa.me/' + phone, '_blank');
            } else {
                window.open('https://web.whatsapp.com/send?phone=' + phone, '_blank');
            }
        });
    }

    // Tooltip de automatización al pasar el ratón
    const burbujas = document.querySelectorAll('.burbuja');
    const tooltip = document.getElementById('tooltip-automatizacion');
    const tooltipImg = document.getElementById('tooltip-img');
    const tooltipTitulo = document.getElementById('tooltip-titulo');
    const tooltipDesc = document.getElementById('tooltip-desc');

    burbujas.forEach(burbuja => {
        burbuja.addEventListener('mouseenter', (e) => {
            tooltipImg.src = burbuja.getAttribute('data-img');
            tooltipTitulo.textContent = burbuja.getAttribute('data-titulo');
            tooltipDesc.textContent = burbuja.getAttribute('data-desc');
            tooltip.classList.add('visible');
            positionTooltip(e);
        });
        burbuja.addEventListener('mousemove', (e) => {
            positionTooltip(e);
        });
        burbuja.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });

    function positionTooltip(e) {
        const padding = 18;
        let x = e.clientX + padding;
        let y = e.clientY + padding;
        const tooltipRect = tooltip.getBoundingClientRect();
        if (x + tooltipRect.width > window.innerWidth) {
            x = window.innerWidth - tooltipRect.width - padding;
        }
        if (y + tooltipRect.height > window.innerHeight) {
            y = window.innerHeight - tooltipRect.height - padding;
        }
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
}); 