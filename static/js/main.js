// Custom JavaScript for PaddySense

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('PaddySense JavaScript loaded successfully');
    
    // Initialize all components
    initializeTooltips();
    initializePopovers();
    initializeAnimations();
    initializeFormHandling();
    initializeButtonHandlers();
    initializeWeatherWidget();
    initializeMobileMenu();
});

// Initialize Bootstrap tooltips
function initializeTooltips() {
    if (typeof $ !== 'undefined') {
        $('[data-toggle="tooltip"]').tooltip();
    }
}

// Initialize Bootstrap popovers
function initializePopovers() {
    if (typeof $ !== 'undefined') {
        $('[data-toggle="popover"]').popover();
    }
}

// Initialize fade-in animations for cards
function initializeAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize form handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
}

// Initialize button click handlers
function initializeButtonHandlers() {
    console.log('Initializing button handlers...');
    
    // Schedule Irrigation button
    const scheduleIrrigationBtn = document.querySelector('[data-action="schedule-irrigation"]');
    if (scheduleIrrigationBtn) {
        scheduleIrrigationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Schedule Irrigation button clicked!');
            handleScheduleIrrigation();
        });
    }
    
    // Apply Fertilizer button
    const applyFertilizerBtn = document.querySelector('[data-action="apply-fertilizer"]');
    if (applyFertilizerBtn) {
        applyFertilizerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Apply Fertilizer button clicked!');
            handleApplyFertilizer();
        });
    }
    
    // Request Expert button
    const requestExpertBtn = document.querySelector('[data-action="request-expert"]');
    if (requestExpertBtn) {
        requestExpertBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Request Expert button clicked!');
            handleRequestExpert();
        });
    }
    
    // Mark Complete buttons in recommendations
    const markCompleteBtns = document.querySelectorAll('[data-action="mark-complete"]');
    markCompleteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Mark Complete button clicked!');
            handleMarkComplete(this);
        });
    });
    
    // Snooze buttons in recommendations
    const snoozeBtns = document.querySelectorAll('[data-action="snooze"]');
    snoozeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Snooze button clicked!');
            handleSnooze(this);
        });
    });
    
    // Dashboard action buttons
    const dashboardActionBtns = document.querySelectorAll('[data-action="dashboard-action"]');
    dashboardActionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.dataset.actionType;
            console.log(`Dashboard action button clicked: ${action}`);
            handleDashboardAction(action);
        });
    });
}

// Handle Schedule Irrigation
function handleScheduleIrrigation() {
    console.log('Processing irrigation scheduling...');
    
    // Show loading state
    showAlert('info', 'Scheduling irrigation...', 'Please wait while we process your request.');
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Irrigation Scheduled!', 'Your irrigation has been scheduled for the next 12 hours.');
        
        // Update UI if needed
        const statusElement = document.querySelector('.irrigation-status');
        if (statusElement) {
            statusElement.textContent = 'Scheduled';
            statusElement.className = 'irrigation-status text-success';
        }
    }, 2000);
}

// Handle Apply Fertilizer
function handleApplyFertilizer() {
    console.log('Processing fertilizer application...');
    
    // Show loading state
    showAlert('info', 'Processing fertilizer application...', 'Please wait while we calculate the optimal amount.');
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Fertilizer Application Ready!', 'Recommended: 25 kg/acre of urea. Apply when soil moisture is above 60%.');
        
        // Update UI if needed
        const statusElement = document.querySelector('.fertilizer-status');
        if (statusElement) {
            statusElement.textContent = 'Ready to Apply';
            statusElement.className = 'fertilizer-status text-success';
        }
    }, 2000);
}

// Handle Request Expert
function handleRequestExpert() {
    console.log('Processing expert request...');
    
    // Show loading state
    showAlert('info', 'Requesting expert consultation...', 'Please wait while we connect you with an agricultural expert.');
    
    // Simulate API call
    setTimeout(() => {
        showAlert('success', 'Expert Request Submitted!', 'An agricultural expert will contact you within 24 hours.');
        
        // Update UI if needed
        const statusElement = document.querySelector('.expert-status');
        if (statusElement) {
            statusElement.textContent = 'Request Submitted';
            statusElement.className = 'expert-status text-success';
        }
    }, 2000);
}

// Handle Mark Complete
function handleMarkComplete(button) {
    console.log('Marking recommendation as complete...');
    
    const card = button.closest('.recommendation-card');
    if (card) {
        // Add completed styling
        card.style.opacity = '0.6';
        card.style.backgroundColor = '#f8f9fa';
        
        // Update button
        button.innerHTML = '<i class="fas fa-check"></i> Completed';
        button.className = 'btn btn-sm btn-success';
        button.disabled = true;
        
        showAlert('success', 'Recommendation Completed!', 'This item has been marked as completed.');
    }
}

// Handle Snooze
function handleSnooze(button) {
    console.log('Snoozing recommendation...');
    
    const card = button.closest('.recommendation-card');
    if (card) {
        // Add snoozed styling
        card.style.opacity = '0.8';
        card.style.backgroundColor = '#fff3cd';
        
        // Update button
        button.innerHTML = '<i class="fas fa-clock"></i> Snoozed (24h)';
        button.className = 'btn btn-sm btn-warning';
        button.disabled = true;
        
        showAlert('warning', 'Recommendation Snoozed!', 'This item will reappear in 24 hours.');
    }
}

// Handle Dashboard Actions
function handleDashboardAction(action) {
    console.log(`Processing dashboard action: ${action}`);
    
    switch(action) {
        case 'water-crop':
            showAlert('info', 'Watering crop...', 'Irrigation system activated for field A3.');
            break;
        case 'check-soil':
            showAlert('info', 'Checking soil conditions...', 'Soil sensors are being read.');
            break;
        case 'view-report':
            showAlert('info', 'Generating report...', 'Preparing detailed crop analysis report.');
            break;
        default:
            showAlert('info', 'Action initiated...', 'Processing your request.');
    }
}

// Initialize weather widget
function initializeWeatherWidget() {
    const weatherDisplay = document.getElementById('weather-display');
    if (weatherDisplay) {
        // Simulate weather data loading
        setTimeout(() => {
            weatherDisplay.innerHTML = `
                <div class="text-center">
                    <p class="mb-1"><strong>28°C</strong></p>
                    <p class="mb-1">Sunny</p>
                    <p class="mb-0">Humidity: 65%</p>
                </div>
            `;
        }, 1500);
    }
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            console.log('Mobile menu toggled');
        });
    }
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        showAlert('danger', 'Validation Error', 'Please fill in all required fields.');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('danger', 'Invalid Email', 'Please enter a valid email address.');
        return;
    }
    
    // Show success message
    showAlert('success', 'Message Sent!', 'Thank you for contacting us. We will respond within 24 hours.');
    
    // Reset form
    form.reset();
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to show alerts
function showAlert(type, title, message) {
    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${title}</strong> ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    `;
    
    alertContainer.innerHTML = alertHtml;
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

// Create alert container if it doesn't exist
function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container position-fixed';
    container.style.cssText = 'top: 20px; right: 20px; z-index: 1050; max-width: 400px;';
    document.body.appendChild(container);
    return container;
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button hover effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeButtonEffects();
});




