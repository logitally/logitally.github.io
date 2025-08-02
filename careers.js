// LogiTally Careers Page JavaScript
// Author: GitHub Copilot
// Description: Interactive features for the careers page including job modal and applications

document.addEventListener('DOMContentLoaded', function() {
    // Initialize careers page components
    initNavbar();
    initJobCards();
    initModal();
    
    console.log('LogiTally Careers Page Loaded Successfully! 💼');
});

/**
 * Navbar functionality and scroll effects (reused from main app.js)
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
 * Initialize job card interactions
 */
function initJobCards() {
    const jobCards = document.querySelectorAll('.job-card:not(.opacity-75)');
    
    jobCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('opacity-75')) {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Add click cursor
        card.style.cursor = 'pointer';
    });
}

/**
 * Initialize modal functionality
 */
function initModal() {
    const modal = document.getElementById('jobModal');
    
    // Add event listeners for modal events
    modal.addEventListener('show.bs.modal', function() {
        document.body.style.overflow = 'hidden';
    });
    
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.style.overflow = 'auto';
    });
}

/**
 * Open job details modal
 */
function openJobModal(jobId) {
    const modal = new bootstrap.Modal(document.getElementById('jobModal'));
    
    // You can customize modal content based on jobId here
    // For now, we have only one job, so we show the predefined content
    
    // Add some animation to the modal
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.style.transform = 'scale(0.8)';
    modalDialog.style.opacity = '0';
    
    modal.show();
    
    // Animate modal entrance
    setTimeout(() => {
        modalDialog.style.transition = 'all 0.3s ease';
        modalDialog.style.transform = 'scale(1)';
        modalDialog.style.opacity = '1';
    }, 100);
}

/**
 * Handle job application
 */
function handleApplyJob() {
    const applyButton = document.querySelector('.modal-footer .btn-primary');
    const originalText = applyButton.innerHTML;
    
    // Show loading state
    applyButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    applyButton.disabled = true;
    
    // Simulate application process
    setTimeout(() => {
        // Show success notification
        showNotification('🎉 Application submitted successfully! We\'ll get back to you soon.', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('jobModal'));
        modal.hide();
        
        // Reset button
        applyButton.innerHTML = originalText;
        applyButton.disabled = false;
        
        // Track application
        trackJobApplication('Full Stack Java Developer Intern');
        
    }, 2000);
}

/**
 * Handle book demo button (reused from main app.js)
 */
function handleBookDemo() {
    console.log('Book Demo button clicked from careers page');
    
    // Show success message
    showNotification('📅 Opening demo scheduling...', 'info');
    
    // In a real application, open calendly or booking widget
    setTimeout(() => {
        console.log('Would open demo booking calendar');
    }, 1500);
}

/**
 * Show notification messages (reused from main app.js)
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
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }
    }, 5000);
}

/**
 * Track job application for analytics
 */
function trackJobApplication(jobTitle) {
    console.log('Job application tracked:', jobTitle);
    
    // Example: Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'job_application', {
            event_category: 'Careers',
            event_label: jobTitle,
            value: 1
        });
    }
    
    // Example: Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: jobTitle,
            content_category: 'Job Application'
        });
    }
}

/**
 * Filter jobs (for future expansion)
 */
function filterJobs(category) {
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialize search functionality (for future expansion)
 */
function initJobSearch() {
    const searchInput = document.getElementById('jobSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const jobCards = document.querySelectorAll('.job-card');
            
            jobCards.forEach(card => {
                const jobTitle = card.querySelector('h4').textContent.toLowerCase();
                const jobDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (jobTitle.includes(searchTerm) || jobDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // ESC key closes modal
    if (e.key === 'Escape') {
        const modal = bootstrap.Modal.getInstance(document.getElementById('jobModal'));
        if (modal) {
            modal.hide();
        }
    }
    
    // Enter key on job cards
    if (e.key === 'Enter' && e.target.classList.contains('job-card')) {
        e.target.click();
    }
});

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add ARIA labels to job cards
    const jobCards = document.querySelectorAll('.job-card:not(.opacity-75)');
    jobCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View details for ${card.querySelector('h4').textContent}`);
    });
    
    // Add focus styles
    const style = document.createElement('style');
    style.textContent = `
        .job-card:focus {
            outline: 2px solid #008080;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional features on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initJobSearch();
    initAccessibility();
});

// Export functions for global access
if (typeof window !== 'undefined') {
    window.CareersPage = {
        openJobModal,
        handleApplyJob,
        handleBookDemo,
        filterJobs,
        trackJobApplication
    };
}
