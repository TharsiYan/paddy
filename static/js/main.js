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
    initializeRealTimeUpdates();
    initializeCharts();
    initializeMobileFeatures();
    initializeNotifications();
});

// Initialize real-time updates for dashboard
function initializeRealTimeUpdates() {
    const dashboard = document.querySelector('.dashboard-container');
    if (dashboard) {
        console.log('Initializing real-time dashboard updates...');
        
        // Update data every 30 seconds
        setInterval(updateDashboardData, 30000);
        
        // Initial update
        updateDashboardData();
    }
}

// Update dashboard data from API
async function updateDashboardData() {
    try {
        const response = await fetch('/api/dashboard-data/');
        if (response.ok) {
            const data = await response.json();
            updateDashboardUI(data);
        }
    } catch (error) {
        console.error('Error updating dashboard data:', error);
    }
}

// Update dashboard UI with new data
function updateDashboardUI(data) {
    // Update sensor data
    if (data.sensor_data) {
        updateSensorDisplay(data.sensor_data);
    }
    
    // Update crop summary
    if (data.crop_summary) {
        updateCropSummary(data.crop_summary);
    }
    
    // Update weather
    if (data.weather) {
        updateWeatherDisplay(data.weather);
    }
    
    // Update recommendations count
    if (data.recommendations_count !== undefined) {
        updateRecommendationsCount(data.recommendations_count);
    }
    
    // Update last updated timestamp
    updateLastUpdated(data.last_updated);
}

// Update sensor data display
function updateSensorDisplay(sensorData) {
    // Update temperature
    const tempElement = document.querySelector('.temperature-display');
    if (tempElement) {
        tempElement.textContent = `${sensorData.temperature}°C`;
    }
    
    // Update humidity
    const humidityElement = document.querySelector('.humidity-display');
    if (humidityElement) {
        humidityElement.textContent = `${sensorData.humidity}%`;
    }
    
    // Update soil moisture
    const moistureElement = document.querySelector('.moisture-display');
    if (moistureElement) {
        moistureElement.textContent = `${sensorData.soil_moisture}%`;
    }
    
    // Update soil pH
    const phElement = document.querySelector('.ph-display');
    if (phElement) {
        phElement.textContent = sensorData.soil_ph;
    }
}

// Update crop summary
function updateCropSummary(cropSummary) {
    const totalCropsElement = document.querySelector('.total-crops');
    if (totalCropsElement) {
        totalCropsElement.textContent = cropSummary.total_crops;
    }
    
    const avgHealthElement = document.querySelector('.avg-health');
    if (avgHealthElement) {
        avgHealthElement.textContent = `${cropSummary.avg_health_score}%`;
    }
    
    const attentionElement = document.querySelector('.crops-needing-attention');
    if (attentionElement) {
        attentionElement.textContent = cropSummary.crops_needing_attention;
    }
}

// Update weather display
function updateWeatherDisplay(weather) {
    const weatherElement = document.querySelector('#weather-display');
    if (weatherElement) {
        weatherElement.innerHTML = `
            <div class="text-center">
                <p class="mb-1"><strong>${weather.temperature}°C</strong></p>
                <p class="mb-1">${weather.condition}</p>
                <p class="mb-0">Humidity: ${weather.humidity}%</p>
            </div>
        `;
    }
}

// Update recommendations count
function updateRecommendationsCount(count) {
    const countElement = document.querySelector('.recommendations-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Update last updated timestamp
function updateLastUpdated(timestamp) {
    const lastUpdatedElement = document.querySelector('.last-updated');
    if (lastUpdatedElement) {
        const date = new Date(timestamp);
        lastUpdatedElement.textContent = `Last updated: ${date.toLocaleTimeString()}`;
    }
}

// Initialize charts for data visualization
function initializeCharts() {
    // Check if Chart.js is available
    if (typeof Chart !== 'undefined') {
        initializeSensorDataChart();
        initializeCropHealthChart();
    }
}

// Initialize sensor data chart
function initializeSensorDataChart() {
    const ctx = document.getElementById('sensorDataChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [25, 26, 27, 28, 27, 26],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1
                }, {
                    label: 'Humidity (%)',
                    data: [65, 68, 70, 72, 70, 68],
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Sensor Data Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}

// Initialize crop health chart
function initializeCropHealthChart() {
    const ctx = document.getElementById('cropHealthChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Excellent (80-100%)', 'Good (60-79%)', 'Needs Attention (<60%)'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(220, 53, 69, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Crop Health Distribution'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Initialize mobile-specific features
function initializeMobileFeatures() {
    // Add mobile-specific event listeners
    const mobileButtons = document.querySelectorAll('[onclick^="mobileAction"]');
    mobileButtons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Initialize mobile dashboard if present
    if (document.querySelector('.mobile-dashboard')) {
        console.log('Mobile dashboard detected, initializing...');
        initializeMobileDashboard();
    }
}

// Initialize mobile dashboard
function initializeMobileDashboard() {
    // Update mobile data every 30 seconds
    setInterval(updateMobileDashboard, 30000);
    
    // Initial update
    updateMobileDashboard();
}

// Update mobile dashboard data
async function updateMobileDashboard() {
    try {
        const response = await fetch('/api/dashboard-data/');
        if (response.ok) {
            const data = await response.json();
            updateMobileDashboardUI(data);
        }
    } catch (error) {
        console.error('Error updating mobile dashboard:', error);
    }
}

// Update mobile dashboard UI
function updateMobileDashboardUI(data) {
    // Update mobile sensor displays
    if (data.sensor_data) {
        const tempMobile = document.querySelector('.temperature-display-mobile');
        if (tempMobile) tempMobile.textContent = `${data.sensor_data.temperature}°C`;
        
        const moistureMobile = document.querySelector('.moisture-display-mobile');
        if (moistureMobile) moistureMobile.textContent = `${data.sensor_data.soil_moisture}%`;
        
        const humidityMobile = document.querySelector('.humidity-display-mobile');
        if (humidityMobile) humidityMobile.textContent = `${data.sensor_data.humidity}%`;
    }
    
    // Update mobile crop summary
    if (data.crop_summary) {
        const totalCropsMobile = document.querySelector('.total-crops-mobile');
        if (totalCropsMobile) totalCropsMobile.textContent = data.crop_summary.total_crops;
        
        const avgHealthMobile = document.querySelector('.avg-health-mobile');
        if (avgHealthMobile) avgHealthMobile.textContent = `${data.crop_summary.avg_health_score}%`;
    }
    
    // Update mobile weather
    if (data.weather) {
        const weatherTempMobile = document.querySelector('.weather-temp-mobile');
        if (weatherTempMobile) weatherTempMobile.textContent = `${data.weather.temperature}°C`;
        
        const weatherConditionMobile = document.querySelector('.weather-condition-mobile');
        if (weatherConditionMobile) weatherConditionMobile.textContent = data.weather.condition;
    }
}

// Mobile action handler
function mobileAction(action) {
    console.log(`Mobile action triggered: ${action}`);
    
    switch(action) {
        case 'water':
            showMobileAlert('success', 'Watering scheduled for next 2 hours');
            break;
        case 'fertilizer':
            showMobileAlert('warning', 'Fertilizer application ready');
            break;
        case 'check':
            showMobileAlert('info', 'Field inspection scheduled');
            break;
        case 'report':
            showMobileAlert('info', 'Generating report...');
            break;
        default:
            showMobileAlert('info', 'Action completed');
    }
}

// Show mobile alert
function showMobileAlert(type, message) {
    const alertContainer = document.querySelector('.mobile-dashboard') || document.body;
    
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 20px; left: 20px; right: 20px; z-index: 1050;">
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 3000);
}

// Refresh mobile data
function refreshMobileData() {
    const refreshBtn = document.querySelector('[onclick="refreshMobileData()"]');
    if (refreshBtn) {
        refreshBtn.classList.add('loading');
        refreshBtn.disabled = true;
        
        updateMobileDashboard().finally(() => {
            refreshBtn.classList.remove('loading');
            refreshBtn.disabled = false;
        });
    }
}

// Initialize notification system
function initializeNotifications() {
    // Load notifications on page load
    loadNotifications();
    
    // Update notifications every 30 seconds
    setInterval(loadNotifications, 30000);
    
    // Add notification click handlers
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-item')) {
            const notificationId = e.target.closest('.notification-item').dataset.notificationId;
            markNotificationAsRead(notificationId);
        }
    });
}

// Load notifications from API
async function loadNotifications() {
    try {
        const response = await fetch('/api/notifications/');
        if (response.ok) {
            const data = await response.json();
            updateNotificationsUI(data);
        }
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

// Update notifications UI
function updateNotificationsUI(data) {
    const notificationsList = document.getElementById('notificationsList');
    const notificationCount = document.getElementById('notificationCount');
    
    if (!notificationsList || !notificationCount) return;
    
    // Update notification count
    if (data.unread_count > 0) {
        notificationCount.textContent = data.unread_count;
        notificationCount.style.display = 'inline';
    } else {
        notificationCount.style.display = 'none';
    }
    
    // Update notifications list
    if (data.notifications && data.notifications.length > 0) {
        const notificationsHtml = data.notifications.map(notification => `
            <div class="notification-item dropdown-item py-2" data-notification-id="${notification.id}">
                <div class="d-flex align-items-start">
                    <div class="notification-icon mr-2">
                        ${getNotificationIcon(notification.type)}
                    </div>
                    <div class="notification-content flex-grow-1">
                        <div class="notification-title font-weight-bold">${notification.title}</div>
                        <div class="notification-message small text-muted">${notification.message}</div>
                        <div class="notification-time small text-muted">
                            ${formatTimestamp(notification.timestamp)}
                        </div>
                        ${notification.action_required ? `
                            <button class="btn btn-sm btn-outline-primary mt-1" onclick="handleNotificationAction('${notification.id}')">
                                ${notification.action_text}
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        notificationsList.innerHTML = notificationsHtml;
    } else {
        notificationsList.innerHTML = `
            <div class="text-center text-muted py-3">
                <i class="fas fa-check-circle"></i> {% custom_trans "No new notifications" %}
            </div>
        `;
    }
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        'success': '<i class="fas fa-check-circle text-success"></i>',
        'warning': '<i class="fas fa-exclamation-triangle text-warning"></i>',
        'danger': '<i class="fas fa-times-circle text-danger"></i>',
        'info': '<i class="fas fa-info-circle text-info"></i>'
    };
    return icons[type] || icons['info'];
}

// Format timestamp for display
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
}

// Mark notification as read
function markNotificationAsRead(notificationId) {
    // In a real app, this would call an API to mark as read
    console.log(`Marking notification ${notificationId} as read`);
    
    // Remove the notification from the list
    const notificationElement = document.querySelector(`[data-notification-id="${notificationId}"]`);
    if (notificationElement) {
        notificationElement.remove();
    }
    
    // Update count
    updateNotificationCount();
}

// Mark all notifications as read
function markAllAsRead() {
    const notifications = document.querySelectorAll('.notification-item');
    notifications.forEach(notification => {
        notification.remove();
    });
    
    // Update UI
    const notificationsList = document.getElementById('notificationsList');
    if (notificationsList) {
        notificationsList.innerHTML = `
            <div class="text-center text-muted py-3">
                <i class="fas fa-check-circle"></i> {% custom_trans "All notifications marked as read" %}
            </div>
        `;
    }
    
    // Hide notification count
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        notificationCount.style.display = 'none';
    }
}

// Handle notification action
function handleNotificationAction(notificationId) {
    console.log(`Handling action for notification: ${notificationId}`);
    
    switch(notificationId) {
        case 'moisture_alert':
            // Navigate to irrigation scheduling
            window.location.href = '/dashboard/';
            break;
        case 'high_temp_alert':
            // Show temperature management options
            showAlert('info', 'Temperature Management', 'Consider increasing irrigation frequency or providing shade');
            break;
        default:
            showAlert('info', 'Action Completed', 'Notification action has been processed');
    }
    
    // Mark as read
    markNotificationAsRead(notificationId);
}

// Update notification count
function updateNotificationCount() {
    const notificationCount = document.getElementById('notificationCount');
    if (notificationCount) {
        const count = document.querySelectorAll('.notification-item').length;
        if (count > 0) {
            notificationCount.textContent = count;
            notificationCount.style.display = 'inline';
        } else {
            notificationCount.style.display = 'none';
        }
    }
}




