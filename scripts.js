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

    // --- Galería de Proyectos (Modal simple) ---
    // Datos de ejemplo para cada proyecto (puedes personalizar)
    const galeriaProyectos = [
        {
            titulo: 'CRM inmobiliaria',
            imagen: 'assets/images/inmobiliaria.png',
            descripcion: [
                'Agenda interactiva con avisos por email, Telegram y Google Calendar',
                'Gestión de clientes con funciones de envío de Whatsapp y comunicación de oportunidades',
                'Registro de actividades comerciales con gestión de tareas',
                'Seguimiento de oportunidades',
                'Organización de tareas diarias'
            ]
        },
        {
            titulo: 'Gestión expediciones',
            imagen: 'assets/images/sfm.png',
            descripcion: [
                'Control y valoración automática de expediciones y clientes',
                'Calculadora para generación de presupuestos',
                'Avisos de vencimientos de documentación e itv de vehículos',
                'Exportación de datos en pdf y excel',
                'Seguimiento de procesos logísticos con impresión de albaranes de entrega',
                'Generación de albaranes de entrega y etiquetas'
            ]
        },
        {
            titulo: 'Control de vehículos',
            imagen: 'assets/images/vehiculos.png',
            descripcion: [
                'Avisos de vencimientos de pólizas, ITV, etc.',
                'Control de consumos de combustible',
                'Mantenimiento y visitas al taller',
                'Gestión de documentación',
                'Notificaciones automáticas por email y Telegram'
            ]
        },
        {
            titulo: 'Control de horarios',
            imagen: 'assets/images/horarios.png',
            descripcion: [
                'Registro de horarios y turnos',
                'Fichajes de empleados',
                'Resumen mensual',
                'Gestión de incidencias'
            ]
        },
        {
            titulo: 'Dashboard GeoKpi',
            imagen: 'assets/images/analitica.png',
            descripcion: [
                'KPIs geolocalizados',
                'Resultados por zonas',
                'Gráficas personalizadas',
                'Dashboard interactivo para toma de decisiones'
            ]
        },
        {
            titulo: 'Análisis de datos',
            imagen: 'assets/images/gasoil.png',
            descripcion: [
                'Análisis avanzado de consumos',
                'Generación de alertas automáticas',
                'Exportación de informes personalizados'
            ]
        }
    ];

    const tarjetasProyectos = document.querySelectorAll('.tarjeta-proyecto');
    const modalGaleria = document.getElementById('modal-galeria');
    const cerrarGaleria = document.getElementById('cerrar-galeria');
    const galeriaImagen = document.getElementById('galeria-imagen');
    const galeriaTitulo = document.getElementById('galeria-titulo');
    const galeriaDescripcion = document.getElementById('galeria-descripcion');

    let galeriaActual = 0;

    function mostrarProyecto() {
        const proyecto = galeriaProyectos[galeriaActual];
        galeriaImagen.src = proyecto.imagen;
        galeriaTitulo.textContent = proyecto.titulo;
        // Mostrar la descripción como lista
        galeriaDescripcion.innerHTML = '<ul>' + proyecto.descripcion.map(punto => `<li>${punto}</li>`).join('') + '</ul>';
    }

    tarjetasProyectos.forEach((tarjeta, idx) => {
        tarjeta.addEventListener('click', () => {
            galeriaActual = idx;
            mostrarProyecto();
            modalGaleria.classList.add('activo');
        });
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