document.addEventListener('DOMContentLoaded', function() {
    // Efecto Matrix de binarios cayendo
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas para ocupar toda la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Caracteres binarios
    const binary = '01';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Array de gotas - cada gota es una posición Y
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Comienzan en posiciones aleatorias arriba
    }
    
    // Color del texto en escala de grises
    const colors = ['#ffffff', '#e0e0e0', '#b0b0b0', '#808080'];
    
    function drawMatrix() {
        // Fondo semitransparente para efecto de rastro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar los caracteres
        for (let i = 0; i < drops.length; i++) {
            const text = binary.charAt(Math.floor(Math.random() * binary.length));
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reiniciar la gota cuando llega al fondo
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Mover la gota hacia abajo
            drops[i]++;
        }
    }
    
    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Animación
    setInterval(drawMatrix, 50);
    
    // Efecto de aparición gradual al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.certificate-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar opacidad inicial para la animación
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar la página
});