document.addEventListener('DOMContentLoaded', function() {
    // Elementos de video
    const video1 = document.getElementById('video1');
    const video3 = document.getElementById('video3');
    const video4 = document.getElementById('video4');
    
    // Secciones de video
    const videoReserva = document.getElementById('video-reserva');
    const videoPanel = document.getElementById('video-panel');
    const videoPanelMovil = document.getElementById('video-panel-movil');
    
    // Verificar que todos los elementos existen
    console.log('Video 1:', video1);
    console.log('Video 3:', video3);
    console.log('Video 4:', video4);
    console.log('Sección reserva:', videoReserva);
    console.log('Sección panel:', videoPanel);
    console.log('Sección panel móvil:', videoPanelMovil);
    
    // Mostrar la primera sección al cargar
    videoReserva.classList.add('visible');
    
    // Función para forzar autoplay de videos
    function forzarAutoplay(video) {
        if (video) {
            video.muted = true;
            video.play().catch(e => console.log('Error en autoplay:', e));
        }
    }
    

    
    // Función para cambiar a la siguiente sección
    function mostrarSiguienteVideo() {
        console.log('Función mostrarSiguienteVideo llamada');
        if (videoReserva.style.display !== 'none') {
            console.log('Pasando de video 1 a video 3');
            // Ocultar video 1 y mostrar video 3 (panel de control)
            videoReserva.style.display = 'none';
            videoPanel.style.display = 'block';
            setTimeout(() => {
                videoPanel.classList.add('visible');
                            // Forzar reproducción del video 3
            forzarAutoplay(video3);
            }, 100);
        } else if (videoPanel.style.display !== 'none') {
            console.log('Pasando de video 3 a video 4');
            // Ocultar video 3 y mostrar video 4 (panel móvil)
            videoPanel.style.display = 'none';
            videoPanelMovil.style.display = 'block';
            setTimeout(() => {
                videoPanelMovil.classList.add('visible');
                // Forzar reproducción del video 4
                forzarAutoplay(video4);
            }, 100);
        }
    }
    
    // Event listeners para los videos
    if (video1) {
        video1.addEventListener('ended', function() {
            console.log('Video 1 terminado');
            mostrarSiguienteVideo();
        });
    }
    
    if (video3) {
        video3.addEventListener('ended', function() {
            console.log('Video 3 terminado');
            mostrarSiguienteVideo();
        });
    }
    
    if (video4) {
        video4.addEventListener('ended', function() {
            console.log('Video 4 terminado');
            // Opcional: mostrar mensaje de finalización o reiniciar
            setTimeout(() => {
                alert('¡Demostración completada! Gracias por ver nuestro sistema de reservas.');
                // Reiniciar al primer video
                videoPanelMovil.style.display = 'none';
                videoReserva.style.display = 'block';
                videoReserva.classList.add('visible');
                if (video1) video1.currentTime = 0;
                if (video3) video3.currentTime = 0;
                if (video4) video4.currentTime = 0;
            }, 1000);
        });
    }
    
    // Función para cargar videos (cuando tengas los archivos)
    function cargarVideos() {
        // Cargar el video de reserva
        if (video1) {
            video1.src = 'assets/videos/video_reserva.mp4';
            
            // Manejar errores de carga
            video1.addEventListener('error', function(e) {
                console.error('Error cargando video:', e);
                alert('Error al cargar el video. Verifica que el archivo existe.');
            });
            
            video1.addEventListener('loadeddata', function() {
                console.log('Video de reserva cargado correctamente');
            });
            
            console.log('Video de reserva cargado: video_reserva.mp4');
        }
        
        // Cargar el video del panel de control
        if (video3) {
            video3.src = 'assets/videos/panelpc.mp4';
            console.log('Video del panel cargado: panelpc.mp4');
        }
        
        // Cargar el video del panel móvil
        if (video4) {
            video4.src = 'assets/videos/panelmovil.mp4';
            console.log('Video del panel móvil cargado: panelmovil.mp4');
        }
        
        console.log('Video de reserva listo para reproducir.');
    }
    
    // Llamar a la función de carga
    cargarVideos();
    
    // Función para reiniciar la demostración
    function reiniciarDemo() {
        // Ocultar todos los videos excepto el primero
        videoPanel.style.display = 'none';
        videoPanelMovil.style.display = 'none';
        videoReserva.style.display = 'block';
        
        // Reiniciar todos los videos
        if (video1) video1.currentTime = 0;
        if (video3) video3.currentTime = 0;
        if (video4) video4.currentTime = 0;
        
        // Mostrar solo la primera sección
        videoReserva.classList.add('visible');
        videoPanel.classList.remove('visible');
        videoPanelMovil.classList.remove('visible');
    }
    
    // Añadir botón de reinicio (opcional)
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Reiniciar Demostración';
    botonReinicio.className = 'boton-reinicio';
    botonReinicio.onclick = reiniciarDemo;
    document.querySelector('.demo-container').appendChild(botonReinicio);
    
    // Estilos para el botón de reinicio
    const style = document.createElement('style');
    style.textContent = `
        .boton-reinicio {
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            border: none;
            padding: 0.8em 1.5em;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1em;
            cursor: pointer;
            margin-top: 2em;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(66,133,244,0.3);
        }
        
        .boton-reinicio:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(66,133,244,0.4);
        }
        
        @media (max-width: 600px) {
            .boton-reinicio {
                font-size: 0.9em;
                padding: 0.6em 1.2em;
            }
        }
    `;
    document.head.appendChild(style);
}); 