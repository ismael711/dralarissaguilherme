// ===== NAVIGATION MENU =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== SCROLL HEADER =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
function reveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Call on page load

// ===== ADD SCROLL REVEAL CLASS TO ELEMENTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to cards and sections
    const elementsToReveal = [
        '.servico__card',
        '.diferencial__card',
        '.unidade__card',
        '.galeria__item',
        '.sobre__feature'
    ];
    
    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('scroll-reveal');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });
});

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// ===== WHATSAPP BUTTON TRACKING =====
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // Add analytics tracking here if needed
    });
});

// ===== FORM VALIDATION (if forms are added later) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone);
}

// ===== GALLERY LIGHTBOX (Simple Implementation) =====
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.galeria__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox__content">
                        <span class="lightbox__close">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                
                // Add styles
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const content = lightbox.querySelector('.lightbox__content');
                content.style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                `;
                
                const closeBtn = lightbox.querySelector('.lightbox__close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    font-size: 40px;
                    color: white;
                    cursor: pointer;
                `;
                
                const lightboxImg = lightbox.querySelector('img');
                lightboxImg.style.cssText = `
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target === closeBtn) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
                
                // Close on ESC key
                document.addEventListener('keydown', function closeOnEsc(e) {
                    if (e.key === 'Escape') {
                        if (document.body.contains(lightbox)) {
                            document.body.removeChild(lightbox);
                            document.body.style.overflow = 'auto';
                        }
                        document.removeEventListener('keydown', closeOnEsc);
                    }
                });
            }
        });
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollActive));
window.addEventListener('scroll', debounce(reveal));

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌟 Dra. Larissa Guilherme - Estética Avançada', 'color: #C9A961; font-size: 20px; font-weight: bold;');
console.log('%cSite desenvolvido com ❤️', 'color: #666; font-size: 14px;');

// ===== ERROR HANDLING FOR IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #F5F0E8 0%, #E8DCC8 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Imagem não disponível';
        });
    });
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// Focus trap for mobile menu
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

// ===== ANALYTICS READY =====
// Placeholder for Google Analytics or other tracking
function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
    // Add your analytics code here
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track service card clicks
document.querySelectorAll('.servico__button').forEach(button => {
    button.addEventListener('click', (e) => {
        const serviceName = button.closest('.servico__card').querySelector('.servico__title').textContent;
        trackEvent('Services', 'Click', serviceName);
    });
});

// Track unit card clicks
document.querySelectorAll('.unidade__card .button').forEach(button => {
    button.addEventListener('click', (e) => {
        const unitName = button.closest('.unidade__card').querySelector('.unidade__title').textContent;
        trackEvent('Units', 'Click', unitName);
    });
});

// Made with Bob
