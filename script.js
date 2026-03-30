/* =========================================
   INTERACTIVE LOGIC
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. INITIALIZE LUCIDE ICONS
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // 1. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. THEME TOGGLE (Dark/Light)
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mob');
    const body = document.body;
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');
            
            const isLight = body.classList.contains('light-mode');
            
            // Update all icons
            document.querySelectorAll('#theme-toggle i, #theme-toggle-mob i').forEach(icon => {
                if (isLight) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            });
            
            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    });

    // Initialize theme from storage
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        document.querySelectorAll('#theme-toggle i, #theme-toggle-mob i').forEach(icon => {
            icon.classList.replace('fa-moon', 'fa-sun');
        });
    }

    // 4. RTL TOGGLE
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mob');
    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRtl = document.documentElement.dir === 'rtl';
            document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
            document.documentElement.lang = isRtl ? 'en' : 'ar';
        });
    });

    // 4b. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. CONTACT FORM HANDLING
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'SENDING...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Message sent! Looking forward to collaborating.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // 6b. NEWSLETTER (Demo Submit)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = (emailInput?.value || '').trim();
            if (!email) return;
            alert('Subscribed! Watch your inbox for new drops.');
            newsletterForm.reset();
        });
    }

    // 7. SMOOTH INTERACTIVE HOVER ON CHARACTER CARDS (Tilt Effect)
    // Handled purely via CSS for performance as requested, but we can add subtle follow logic here if needed.

    // 8. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. SCROLL SPY (Highlight Active Nav Link)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');

    const scrollSpyOptions = {
        threshold: 0.2,
        rootMargin: "-10% 0px -70% 0px" // Trigger when section is in the top portion of viewport
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        // Only process if we are NOT at the very top (let the scroll listener handle the top)
        if (window.scrollY < 100) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${id}` || href === `index.html#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Special case: Highlight Home if we are at the very top
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '#home' || href === 'index.html#home') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    // Initial check on load
    if (window.scrollY < 100) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home' || link.getAttribute('href') === 'index.html#home') {
                link.classList.add('active');
            }
        });
    }

    // 10. COVERS SLIDER
    const coversScroll = document.querySelector('.covers-scroll-container');
    const prevBtn = document.querySelector('.slider-btn.prev-btn');
    const nextBtn = document.querySelector('.slider-btn.next-btn');

    if (coversScroll && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            coversScroll.scrollBy({ left: -400, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            coversScroll.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }
});
