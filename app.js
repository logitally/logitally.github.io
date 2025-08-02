// LogiTally Landing Page JavaScript
// Author: GitHub Copilot
// Description: Interactive features and animations for the LogiTally landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initAnimations();
    initCounters();
    initSmoothScrolling();
    initFormHandlers();
    
    console.log('LogiTally Landing Page Loaded Successfully! 🚀');
});

/**
 * Navbar functionality and scroll effects
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/**
 * Initialize scroll animations and intersection observer
 */
function initAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .about-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Animated counters for statistics
 */
function initCounters() {
    const counters = [
        { id: 'businessCount', target: 500, suffix: '+', duration: 2000 },
        { id: 'invoiceCount', target: 10000, suffix: 'K+', format: (val) => Math.floor(val/1000) + 'K+', duration: 2500 },
        { id: 'savingsCount', target: 2000000, suffix: 'M+', format: (val) => '$' + Math.floor(val/1000000) + 'M+', duration: 3000 }
    ];

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterId = entry.target.id;
                const counter = counters.find(c => c.id === counterId);
                if (counter && !entry.target.classList.contains('counted')) {
                    animateCounter(counter);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            counterObserver.observe(element);
        }
    });
}

/**
 * Animate individual counter
 */
function animateCounter(counter) {
    const element = document.getElementById(counter.id);
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / counter.duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (counter.target * easeOutQuart));
        
        if (counter.format) {
            element.textContent = counter.format(currentValue);
        } else {
            element.textContent = currentValue + (counter.suffix || '');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            if (counter.format) {
                element.textContent = counter.format(counter.target);
            } else {
                element.textContent = counter.target + (counter.suffix || '');
            }
        }
    }
    
    requestAnimationFrame(updateCounter);
    element.parentElement.classList.add('animate');
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form handlers and CTA button actions
 */
function initFormHandlers() {
    // Add click tracking and analytics for CTA buttons
    const ctaButtons = document.querySelectorAll('[onclick*="handle"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            this.disabled = true;
            
            // Reset button after 2 seconds (simulate processing)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
            
            // Track button click (you can integrate with analytics here)
            trackButtonClick(this.textContent.trim());
        });
    });
}

/**
 * Handle "Try Free" button clicks
 */
function handleTryFree() {
    console.log('Try Free button clicked');
    
    // Show success message
    showNotification('🎉 Redirecting to free trial signup...', 'success');
    
    // In a real application, redirect to signup page
    setTimeout(() => {
        // window.location.href = '/signup?plan=free';
        console.log('Would redirect to: /signup?plan=free');
    }, 1500);
}

/**
 * Handle "Book Demo" button clicks
 */
function handleBookDemo() {
    console.log('Book Demo button clicked');
    
    // Show success message
    showNotification('📅 Opening demo scheduling...', 'info');
    
    // In a real application, open calendly or booking widget
    setTimeout(() => {
        // window.open('https://calendly.com/logitally/demo', '_blank');
        console.log('Would open demo booking calendar');
    }, 1500);
}

/**
 * Handle "Start Trial" button clicks
 */
function handleStartTrial() {
    console.log('Start Trial button clicked');
    
    // Show success message
    showNotification('🚀 Starting your free trial...', 'success');
    
    // In a real application, redirect to onboarding
    setTimeout(() => {
        // window.location.href = '/onboarding';
        console.log('Would redirect to: /onboarding');
    }, 1500);
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : type === 'info' ? 'info' : 'warning'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        border-radius: 12px;
        animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="me-2">${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 4000);
}

/**
 * Track button clicks for analytics
 */
function trackButtonClick(buttonText) {
    // In a real application, send to analytics service
    console.log('Button clicked:', buttonText);
    
    // Example: Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'CTA',
            event_label: buttonText,
            value: 1
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: buttonText,
            content_category: 'CTA Button'
        });
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Add keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) {
                document.querySelector('.navbar-toggler').click();
            }
        }
        
        // Enter or Space on CTA buttons
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    });
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                event_category: 'Performance',
                value: Math.round(loadTime)
            });
        }
    });
    
    // Log Core Web Vitals if supported
    if ('web-vital' in window) {
        // This would require the web-vitals library
        // You can add it via: npm install web-vitals
    }
}

/**
 * Error handling and fallbacks
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Report to error tracking service
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(e.error);
    }
});

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable btn btn-primary';
    skipLink.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10000;
        transform: translateY(-100px);
        transition: transform 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.transform = 'translateY(0)';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.transform = 'translateY(-100px)';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Initialize additional features on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initKeyboardNavigation();
    initPerformanceMonitoring();
    initAccessibility();
});

// Export functions for global access (useful for testing)
if (typeof window !== 'undefined') {
    window.LogiTally = {
        handleTryFree,
        handleBookDemo,
        handleStartTrial,
        showNotification,
        trackButtonClick
    };
}
