document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const hamburguesa = document.querySelector('.hamburguesa');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const navLinks = document.querySelectorAll('.nav-links a');
    
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
    
    // Resaltar enlace activo en la navegación según la sección visible
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
        const skillCards = document.querySelectorAll('.skill-card');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        portfolioItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar efectos de animación
    function initAnimations() {
        const skillCards = document.querySelectorAll('.skill-card');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Configuración inicial para animaciones
        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        portfolioItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const asunto = document.getElementById('asunto').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Validación básica
            if (!nombre || !email || !asunto || !mensaje) {
                alert('Por favor, completa todos los campos');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido');
                return;
            }
            
            // Aquí iría el código para enviar el formulario
            alert('¡Gracias por tu mensaje! Te responderé pronto.');
            this.reset();
        });
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
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Listener para el scroll
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        animateOnScroll();
    });
    
    // Inicializar funciones
    initAnimations();
    smoothScroll();
    highlightActiveSection();
    animateOnScroll();
});