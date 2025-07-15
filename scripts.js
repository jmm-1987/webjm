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

    // Menú hamburguesa para móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');
    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', function() {
            menuList.classList.toggle('menu-visible');
        });
        // Cerrar menú al hacer clic en un enlace
        menuList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuList.classList.remove('menu-visible');
            });
        });
    }

    // --- Galería de Proyectos (Slider Modal) ---
    // Datos de ejemplo para cada proyecto (puedes personalizar)
    const galeriaProyectos = [
        {
            titulo: 'CRM inmobiliaria',
            imagenes: [
                { src: 'assets/images/inmobiliaria.png', desc: 'Panel principal del CRM inmobiliario.' },
                { src: 'assets/images/inmobiliaria.png', desc: 'Gestión de propiedades y clientes.' },
                { src: 'assets/images/inmobiliaria.png', desc: 'Agenda de visitas y tareas.' },
                { src: 'assets/images/inmobiliaria.png', desc: 'Estadísticas y reportes.' }
            ]
        },
        {
            titulo: 'Gestión expediciones',
            imagenes: [
                { src: 'assets/images/sfm.png', desc: 'Vista general de expediciones.' },
                { src: 'assets/images/sfm.png', desc: 'Detalle de rutas y entregas.' },
                { src: 'assets/images/sfm.png', desc: 'Control de incidencias.' },
                { src: 'assets/images/sfm.png', desc: 'Panel de estadísticas.' }
            ]
        },
        {
            titulo: 'Control de vehículos',
            imagenes: [
                { src: 'assets/images/vehiculos.png', desc: 'Listado de vehículos.' },
                { src: 'assets/images/vehiculos.png', desc: 'Historial de mantenimientos.' },
                { src: 'assets/images/vehiculos.png', desc: 'Alertas y notificaciones.' },
                { src: 'assets/images/vehiculos.png', desc: 'Resumen de gastos.' }
            ]
        },
        {
            titulo: 'Contol de horarios',
            imagenes: [
                { src: 'assets/images/horarios.png', desc: 'Panel de horarios de empleados.' },
                { src: 'assets/images/horarios.png', desc: 'Registro de fichajes.' },
                { src: 'assets/images/horarios.png', desc: 'Gestión de turnos.' },
                { src: 'assets/images/horarios.png', desc: 'Resumen mensual.' }
            ]
        },
        {
            titulo: 'Dashboard GeoKpi',
            imagenes: [
                { src: 'assets/images/analitica.png', desc: 'Mapa interactivo de KPIs.' },
                { src: 'assets/images/analitica.png', desc: 'Filtros avanzados.' },
                { src: 'assets/images/analitica.png', desc: 'Comparativas temporales.' },
                { src: 'assets/images/analitica.png', desc: 'Exportación de datos.' }
            ]
        },
        {
            titulo: 'Análisis de datos',
            imagenes: [
                { src: 'assets/images/gasoil.png', desc: 'Panel de análisis de consumo.' },
                { src: 'assets/images/gasoil.png', desc: 'Gráficas interactivas.' },
                { src: 'assets/images/gasoil.png', desc: 'Alertas automáticas.' },
                { src: 'assets/images/gasoil.png', desc: 'Exportación de informes.' }
            ]
        }
    ];

    const tarjetasProyectos = document.querySelectorAll('.tarjeta-proyecto');
    const modalGaleria = document.getElementById('modal-galeria');
    const cerrarGaleria = document.getElementById('cerrar-galeria');
    const galeriaImagen = document.getElementById('galeria-imagen');
    const galeriaDescripcion = document.getElementById('galeria-descripcion');
    const galeriaPrev = document.getElementById('galeria-prev');
    const galeriaNext = document.getElementById('galeria-next');
    const galeriaPuntos = document.getElementById('galeria-puntos');

    let galeriaActual = 0;
    let slideActual = 0;

    function mostrarSlide(index) {
        const proyecto = galeriaProyectos[galeriaActual];
        const imgData = proyecto.imagenes[index];
        galeriaImagen.src = imgData.src;
        galeriaDescripcion.textContent = imgData.desc;
        // Actualizar puntos
        galeriaPuntos.innerHTML = '';
        proyecto.imagenes.forEach((_, i) => {
            const punto = document.createElement('button');
            punto.className = 'slider-punto' + (i === index ? ' activo' : '');
            punto.addEventListener('click', () => {
                slideActual = i;
                mostrarSlide(slideActual);
            });
            galeriaPuntos.appendChild(punto);
        });
    }

    tarjetasProyectos.forEach((tarjeta, idx) => {
        tarjeta.addEventListener('click', () => {
            galeriaActual = idx;
            slideActual = 0;
            mostrarSlide(slideActual);
            modalGaleria.classList.add('activo');
        });
    });

    galeriaPrev.addEventListener('click', () => {
        const proyecto = galeriaProyectos[galeriaActual];
        slideActual = (slideActual - 1 + proyecto.imagenes.length) % proyecto.imagenes.length;
        mostrarSlide(slideActual);
    });
    galeriaNext.addEventListener('click', () => {
        const proyecto = galeriaProyectos[galeriaActual];
        slideActual = (slideActual + 1) % proyecto.imagenes.length;
        mostrarSlide(slideActual);
    });
    cerrarGaleria.addEventListener('click', () => {
        modalGaleria.classList.remove('activo');
    });
    // Cerrar modal al hacer clic fuera del contenido
    modalGaleria.addEventListener('click', (e) => {
        if (e.target === modalGaleria) {
            modalGaleria.classList.remove('activo');
        }
    });
}); 