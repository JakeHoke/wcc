/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

// Logging configuration
const LOGGING_ENABLED = true; // Set to false to disable logging
const LOG_LEVEL = 'INFO'; // DEBUG, INFO, WARN, ERROR

// Logging utility function
function log(level, message, data = null) {
    if (!LOGGING_ENABLED) return;
    
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
    const currentLevel = levels[LOG_LEVEL] || 1;
    const messageLevel = levels[level] || 1;
    
    if (messageLevel >= currentLevel) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] Worcester County Counselling: ${message}`;
        
        if (data) {
            console.log(logMessage, data);
        } else {
            console.log(logMessage);
        }
    }
}

window.addEventListener('DOMContentLoaded', event => {
    log('INFO', 'Website initialized - Worcester County Counselling');

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            log('WARN', 'Navbar element not found');
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
            log('DEBUG', 'Navbar expanded - at top of page');
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
            log('DEBUG', 'Navbar shrunk - scrolled down');
        }

    };

    // Shrink the navbar 
    navbarShrink();
    log('INFO', 'Navbar shrink function initialized');

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
    log('DEBUG', 'Scroll event listener added for navbar');

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
        log('INFO', 'Bootstrap ScrollSpy activated for navigation');
    } else {
        log('WARN', 'Main navigation element not found for ScrollSpy');
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    
    log('INFO', `Found ${responsiveNavItems.length} responsive navigation items`);
    
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                log('DEBUG', 'Mobile navigation item clicked, collapsing menu');
                navbarToggler.click();
            }
        });
    });
    
    log('INFO', 'Responsive navigation event listeners added');

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            log('INFO', 'Contact form submitted');
            
            // Show loading state
            const submitButton = document.getElementById('submitButton');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitButton.disabled = true;
            
            // Create FormData and submit via fetch
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                log('INFO', 'Form submission response received');
                if (response.ok) {
                    // Show thank you modal
                    const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                    thankYouModal.show();
                    
                    // Reset form
                    contactForm.reset();
                    log('INFO', 'Form reset after successful submission');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                log('ERROR', 'Form submission failed', error);
                alert('Sorry, there was an error sending your message. Please try again or call us at (508) 555-0123.');
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    } else {
        log('WARN', 'Contact form not found');
    }

});
