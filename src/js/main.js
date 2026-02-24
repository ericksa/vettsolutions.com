/**
 * VET Tech Solutions - Interactive & Motion
 * Using 2026 design trends: Advanced Motion, Kinetic Type, Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNoiseBackground();
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initTiltEffect();
    initSmoothScroll();
    initFormHandler();
});

/**
 * Noise Background - Tactile texture
 */
function initNoiseBackground() {
    const canvas = document.getElementById('noise');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function generateNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = 255;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Generate noise once (static texture - more performant)
    generateNoise();
}

/**
 * Navigation - Scroll behavior + mobile toggle
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');
    
    // Scroll behavior
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            
            // Animate toggle
            const spans = toggle.querySelectorAll('span');
            if (links.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
}

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.service-card, .about-content, .about-visual, .cta-content').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Counter Animation - Numbers that count up
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const animateCount = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * 3D Tilt Effect - Tactile feel
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Smooth Scroll - For anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handler - Contact form
 */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Loading state
        btn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        btn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        btn.innerHTML = `
            <span>Message Sent!</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
        `;
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 3000);
    });
}

/**
 * Kinetic Typography - Text that moves
 * Optional: Add to hero title for extra motion
 */
function addKineticType() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const words = title.querySelectorAll('.title-line');
    
    words.forEach(word => {
        word.addEventListener('mouseenter', () => {
            word.style.transform = 'translateX(10px)';
            word.style.transition = 'transform 0.3s ease';
        });
        
        word.addEventListener('mouseleave', () => {
            word.style.transform = 'translateX(0)';
        });
    });
}

// Initialize kinetic type on larger screens
if (window.innerWidth > 768) {
    addKineticType();
}

/**
 * Parallax Effect - Subtle depth
 */
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        orbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax
initParallax();

/**
 * Intersection Observer for fade-in animations
 */
const fadeInCSS = `
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
`;

// Add CSS to page
const style = document.createElement('style');
style.textContent = fadeInCSS;
document.head.appendChild(style);

// Add staggered delays to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});