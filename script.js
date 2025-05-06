document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const hamburguesa = document.querySelector('.hamburguesa');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('nav');
    
    // Función para abrir el sidebar
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita el scroll cuando el sidebar está abierto
    }
    
    // Función para cerrar el sidebar
    function closeSidebarMenu() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll
    }
    
    // Event listeners para abrir/cerrar el sidebar
    hamburguesa.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
    
    // Cerrar sidebar al hacer clic en un enlace del mismo
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebarMenu);
    });
    
    // Función para manejo de scroll y navbar fija
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('fixed-nav');
        } else {
            navbar.classList.remove('fixed-nav');
        }
    }
    
    // Listener para el scroll para la navbar fija
    window.addEventListener('scroll', handleScroll);
    
    // Resaltar enlace activo en la navegación según la sección visible
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        const scrollPosition = window.scrollY + 150; // Ajuste para mejor detección
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar enlaces activos en navbar
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        // Actualizar enlaces activos en sidebar
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Activar animación en las tarjetas de habilidades al ser visibles
    function animateOnScroll() {
        const elementosAnimados = document.querySelectorAll('.skill-card, .portfolio-item, .certification-item, .timeline-item, .contact-item');
        
        elementosAnimados.forEach(elemento => {
            const elementoPosition = elemento.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementoPosition < screenPosition) {
                elemento.classList.add('animated');
            }
        });
    }
    
    // Inicializar efectos de animación
    function initAnimations() {
        const elementosAnimados = document.querySelectorAll('.skill-card, .portfolio-item, .certification-item, .timeline-item, .contact-item');
        
        // Configuración inicial para animaciones
        elementosAnimados.forEach(elemento => {
            elemento.style.opacity = '0';
            elemento.style.transform = 'translateY(30px)';
            elemento.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Añadir clase para elementos animados
        document.querySelectorAll('.animated').forEach(elemento => {
            elemento.style.opacity = '1';
            elemento.style.transform = 'translateY(0)';
        });
    }

    // Implementar observador de intersección para animaciones más eficientes
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, {
            threshold: 0.15
        });

        document.querySelectorAll('.skill-card, .portfolio-item, .certification-item, .timeline-item, .contact-item').forEach(elemento => {
            observer.observe(elemento);
        });
    }
    
    // Validación del formulario de contacto con feedback mejorado
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');
            
            // Limpiar errores previos
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Array para almacenar errores
            let errors = [];
            
            // Validación de campos requeridos
            if (!nombre.value.trim()) {
                showError(nombre, 'El nombre es requerido');
                errors.push('nombre');
            }
            
            if (!email.value.trim()) {
                showError(email, 'El email es requerido');
                errors.push('email');
            } else {
                // Validación de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    showError(email, 'Por favor, ingresa un email válido');
                    errors.push('email-format');
                }
            }
            
            if (!asunto.value.trim()) {
                showError(asunto, 'El asunto es requerido');
                errors.push('asunto');
            }
            
            if (!mensaje.value.trim()) {
                showError(mensaje, 'El mensaje es requerido');
                errors.push('mensaje');
            }
            
            // Si hay errores, detener el envío
            if (errors.length > 0) {
                return;
            }
            
            // Mostrar mensaje de carga
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (aquí iría la llamada al backend)
            setTimeout(() => {
                // Mostrar mensaje de confirmación
                showConfirmationMessage();
                
                // Resetear formulario
                this.reset();
                
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Función para mostrar errores de validación
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#ff3860';
        errorMessage.style.fontSize = '0.85rem';
        errorMessage.style.marginTop = '5px';
        formGroup.appendChild(errorMessage);
        
        // Destacar input con error
        inputElement.style.borderColor = '#ff3860';
        
        // Escuchar cambios para quitar mensaje de error
        inputElement.addEventListener('input', function() {
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
                inputElement.style.borderColor = '';
            }
        }, {once: true});
    }
    
    // Función para mostrar mensaje de confirmación
    function showConfirmationMessage() {
        // Crear elemento para mensaje de confirmación
        const confirmationMessage = document.createElement('div');
        confirmationMessage.className = 'confirmation-message';
        confirmationMessage.innerHTML = `
            <div style="background-color: #48c774; color: white; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px;">
                <i class="bi bi-check-circle-fill" style="font-size: 1.5rem; margin-right: 10px;"></i>
                ¡Gracias por tu mensaje! Te responderé pronto.
            </div>
        `;
        
        // Insertar antes del formulario
        const contactForm = document.querySelector('.contact-form form');
        contactForm.parentNode.insertBefore(confirmationMessage, contactForm);
        
        // Eliminar mensaje después de unos segundos
        setTimeout(() => {
            confirmationMessage.style.opacity = '0';
            confirmationMessage.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                confirmationMessage.remove();
            }, 500);
        }, 4000);
    }
    
    // Animación suave al hacer clic en enlaces de navegación
    function smoothScroll() {
        const allNavLinks = document.querySelectorAll('a[href^="#"]');
        
        allNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    
                    window.scrollTo({
                        top: targetPosition - navHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Añadir efectos para las imágenes del portafolio
    function setupPortfolioEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.portfolio-overlay');
            
            // Mejorar la interacción hover
            item.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transform = '';
                overlay.style.opacity = '';
            });
        });
    }
    
    // Añadir estilos para la barra de navegación fija
    function setupFixedNavbar() {
        const style = document.createElement('style');
        style.textContent = `
            .fixed-nav {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 15px 4vh;
                z-index: 1000;
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                }
                to {
                    transform: translateY(0);
                }
            }
            
            .animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Función para cargar contenido de manera progresiva (lazy loading)
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img');
        
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            if (image.getAttribute('src').includes('placeholder')) {
                lazyImageObserver.observe(image);
            }
        });
    }
    
    // Añadir funcionalidad de modo oscuro/claro
    function setupThemeToggle() {
        // Crear botón de cambio de tema
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        themeToggle.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #000;
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: background-color 0.3s ease;
        `;
        
        document.body.appendChild(themeToggle);
        
        // Funcionalidad de cambio de tema
        let darkMode = localStorage.getItem('darkMode') === 'true';
        
        // Aplicar tema inicial
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
            themeToggle.style.backgroundColor = '#fff';
            themeToggle.style.color = '#000';
        }
        
        themeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            
            if (darkMode) {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
                themeToggle.style.backgroundColor = '#fff';
                themeToggle.style.color = '#000';
            } else {
                document.body.classList.remove('dark-mode');
                themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
                themeToggle.style.backgroundColor = '#000';
                themeToggle.style.color = '#fff';
            }
        });
        
        // Estilos para modo oscuro
        const darkModeStyles = document.createElement('style');
        darkModeStyles.textContent = `
            .dark-mode {
                background-color: #1a1a1a;
                color: #f0f0f0;
            }
            
            .dark-mode h2, .dark-mode h3 {
                color: #f0f0f0;
            }
            
            .dark-mode .section {
                background-color: #1a1a1a;
            }
            
            .dark-mode .about, .dark-mode .skills {
                background-color: #1a1a1a;
            }
            
            .dark-mode .education, .dark-mode .experience, .dark-mode .portfolio {
                background-color: #222;
            }
            
            .dark-mode .skill-card, .dark-mode .contact-form, .dark-mode .contact-item {
                background-color: #2d2d2d;
                color: #f0f0f0;
            }
            
            .dark-mode .certification-item, .dark-mode .portfolio-item {
                background-color: #2d2d2d;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .dark-mode .form-group input, .dark-mode .form-group textarea {
                background-color: #333;
                border-color: #444;
                color: #f0f0f0;
            }
            
            .dark-mode .timeline::after {
                background-color: #555;
            }
            
            .dark-mode .timeline-date::after {
                background-color: #555;
                border-color: #222;
            }
            
            .dark-mode .portfolio-info {
                background-color: #2d2d2d;
            }
            
            .dark-mode .section-title h2::after {
                background-color: #f0f0f0;
            }
        `;
        document.head.appendChild(darkModeStyles);
    }

    // Función para mostrar la hora actual
    function setupCurrentTime() {
        const footerBottom = document.querySelector('.footer-bottom');
        const timeElement = document.createElement('p');
        timeElement.className = 'current-time';
        footerBottom.appendChild(timeElement);
        
        function updateTime() {
            const now = new Date();
            const options = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            timeElement.textContent = now.toLocaleDateString('es-DO', options);
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // Añadir botón para volver arriba
    function setupScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollToTopBtn.style = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #000;
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            transition: opacity 0.3s ease, transform 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.transform = 'translateY(20px)';
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contador de visitas simulado con localStorage
    function setupVisitCounter() {
        // Solo en la página de inicio
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            let visits = localStorage.getItem('portfolioVisits') || 0;
            visits = parseInt(visits) + 1;
            localStorage.setItem('portfolioVisits', visits);
            
            const visitCounter = document.createElement('div');
            visitCounter.className = 'visit-counter';
            visitCounter.innerHTML = `<i class="bi bi-eye"></i> Visitas: ${visits}`;
            visitCounter.style = `
                position: absolute;
                bottom: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
            `;
            
            heroSection.appendChild(visitCounter);
        }
    }
    
    // Listener para el scroll
    window.addEventListener('scroll', () => {
        highlightActiveSection();
        handleScroll();
    });
    
    // Inicializar funciones
    setupFixedNavbar();
    initAnimations();
    setupIntersectionObserver();
    smoothScroll();
    highlightActiveSection();
    handleScroll();
    setupPortfolioEffects();
    setupLazyLoading();
    setupThemeToggle();
    setupCurrentTime();
    setupScrollToTop();
    setupVisitCounter();
});