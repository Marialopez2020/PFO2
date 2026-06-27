document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Hamburguesa Mobile ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar icono
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menu al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- 2. Header Sticky Background ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-soft)';
            header.style.background = 'var(--bg-surface)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'var(--glass-bg)';
        }
    });

    // --- 3. Validación de Formulario ---
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Obtener campos
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const msgInput = document.getElementById('message');
            
            // Limpiar errores previos
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            document.querySelectorAll('.error-input').forEach(el => el.classList.remove('error-input'));
            
            // Validar Nombre
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'nameError', 'Por favor, ingresá tu nombre completo.');
                isValid = false;
            }
            
            // Validar Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'emailError', 'El correo electrónico es requerido.');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'emailError', 'Ingresá un formato de correo válido.');
                isValid = false;
            }
            
            // Validar Teléfono
            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'phoneError', 'El número de teléfono es obligatorio.');
                isValid = false;
            }
            
            // Validar Mensaje
            if (msgInput.value.trim() === '') {
                showError(msgInput, 'messageError', 'Por favor, detallá tu consulta.');
                isValid = false;
            }
            
            // Si es válido, mostrar éxito
            if (isValid) {
                const btn = form.querySelector('.btn-submit');
                const originalText = btn.innerHTML;
                
                // Simular envío
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
                btn.disabled = true;
                
                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    
                    successMsg.style.display = 'block';
                    
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });
    }

    function showError(inputElement, errorElementId, message) {
        inputElement.classList.add('error-input');
        document.getElementById(errorElementId).textContent = message;
    }

    // --- 4. Año Dinámico Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
