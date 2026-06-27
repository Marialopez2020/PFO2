/* ================================================
   APEX MOTORS — script.js
   Menú hamburguesa, scroll suave, validación formulario,
   header sticky, año dinámico en footer.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. AÑO DINÁMICO EN FOOTER
    ========================================= */
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* =========================================
       2. HEADER — CLASE SCROLLED AL BAJAR
    ========================================= */
    const header = document.getElementById('header');

    const manejarScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', manejarScroll, { passive: true });
    manejarScroll(); // Ejecutar al cargar por si ya está scrolleado

    /* =========================================
       3. MENÚ HAMBURGUESA MOBILE
    ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('nav-menu');
    const navLinks  = document.querySelectorAll('.nav__link');

    // Función para abrir/cerrar menú
    const toggleMenu = () => {
        const estaAbierto = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', estaAbierto);
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = estaAbierto ? 'hidden' : '';
    };

    // Función para cerrar el menú
    const cerrarMenu = () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', cerrarMenu);
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            cerrarMenu();
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarMenu();
    });

    /* =========================================
       4. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    ========================================= */
    const form        = document.getElementById('contact-form');
    const successBox  = document.getElementById('form-success');
    const btnSubmit   = document.getElementById('btn-submit');

    // Referencia a campos y errores
    const campos = {
        nombre:   { input: document.getElementById('nombre'),   error: document.getElementById('error-nombre') },
        email:    { input: document.getElementById('email'),    error: document.getElementById('error-email') },
        telefono: { input: document.getElementById('telefono'), error: document.getElementById('error-telefono') },
        mensaje:  { input: document.getElementById('mensaje'),  error: document.getElementById('error-mensaje') },
    };

    // Función para validar el formato de email
    const esEmailValido = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    };

    // Función para mostrar un error en un campo
    const mostrarError = (campo, mensaje) => {
        campo.input.classList.add('error');
        campo.error.textContent = mensaje;
    };

    // Función para limpiar el error de un campo
    const limpiarError = (campo) => {
        campo.input.classList.remove('error');
        campo.error.textContent = '';
    };

    // Validar un campo individual y retornar si es válido
    const validarCampo = (clave) => {
        const campo = campos[clave];
        const valor = campo.input.value.trim();

        limpiarError(campo);

        if (!valor) {
            const nombres = {
                nombre:   'El nombre completo es obligatorio.',
                email:    'El correo electrónico es obligatorio.',
                telefono: 'El teléfono es obligatorio.',
                mensaje:  'Por favor describí tu consulta o el vehículo de interés.',
            };
            mostrarError(campo, nombres[clave]);
            return false;
        }

        if (clave === 'email' && !esEmailValido(valor)) {
            mostrarError(campo, 'Ingresá un correo electrónico válido (ej: tu@email.com).');
            return false;
        }

        if (clave === 'telefono' && valor.length < 7) {
            mostrarError(campo, 'Ingresá un número de teléfono válido.');
            return false;
        }

        if (clave === 'nombre' && valor.length < 3) {
            mostrarError(campo, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }

        return true;
    };

    // Validar en tiempo real al salir de cada campo
    Object.keys(campos).forEach(clave => {
        campos[clave].input.addEventListener('blur', () => validarCampo(clave));
        campos[clave].input.addEventListener('input', () => {
            if (campos[clave].input.classList.contains('error')) {
                validarCampo(clave);
            }
        });
    });

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar todos los campos
            const esValido = Object.keys(campos).every(clave => validarCampo(clave));

            if (!esValido) {
                // Enfocar el primer campo con error
                const primerError = Object.values(campos).find(c => c.input.classList.contains('error'));
                if (primerError) primerError.input.focus();
                return;
            }

            // Simular carga (feedback visual)
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

            // Simular delay de envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                successBox.hidden = false;
                successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Limpiar formulario
                form.reset();
                Object.values(campos).forEach(c => limpiarError(c));

                // Restaurar botón
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Consulta';

                // Ocultar el mensaje de éxito después de 6 segundos
                setTimeout(() => {
                    successBox.hidden = true;
                }, 6000);

            }, 1500);
        });
    }

    /* =========================================
       5. ANIMACIONES DE ENTRADA AL HACER SCROLL
    ========================================= */
    const observadorOpciones = {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
    };

    const animarAlVer = (entries, observador) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observador.unobserve(entry.target);
            }
        });
    };

    const observador = new IntersectionObserver(animarAlVer, observadorOpciones);

    // Elementos a animar
    const elementosAnimados = document.querySelectorAll(
        '.service-card, .testimonial-card, .about__feature, .contact__info-item, .hero__stats'
    );

    elementosAnimados.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        observador.observe(el);
    });

    // Cuando el elemento es visible, lo hacemos aparecer
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .service-card.visible,
            .testimonial-card.visible,
            .about__feature.visible,
            .contact__info-item.visible,
            .hero__stats.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    /* =========================================
       6. SCROLL SUAVE PARA TODOS LOS ANCLAS
       (por compatibilidad con navegadores sin scroll-behavior)
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const destino = document.querySelector(anchor.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                const offsetTop = destino.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

});
