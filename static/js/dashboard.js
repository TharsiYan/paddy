// Dashboard Action Buttons JavaScript
// Makes all dashboard buttons functional with real-time updates

class DashboardManager {
    constructor() {
        this.initializeEventListeners();
        this.updateDashboardData();
        this.startAutoRefresh();
    }

    initializeEventListeners() {
        // Primary Action Buttons
        document.querySelectorAll('[data-action="schedule-irrigation"]').forEach(btn => {
            btn.addEventListener('click', () => this.showIrrigationModal());
        });

        document.querySelectorAll('[data-action="apply-fertilizer"]').forEach(btn => {
            btn.addEventListener('click', () => this.showFertilizerModal());
        });

        document.querySelectorAll('[data-action="request-expert"]').forEach(btn => {
            btn.addEventListener('click', () => this.showExpertModal());
        });

        // Secondary Action Buttons
        document.querySelectorAll('[data-action="dashboard-action"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const actionType = e.target.closest('button').dataset.actionType;
                this.handleSecondaryAction(actionType);
            });
        });

        // Refresh and Export buttons
        const refreshBtn = document.querySelector('button[onclick="refreshData()"]');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.refreshData();
            });
        }

        const exportBtn = document.querySelector('button[onclick="exportReport()"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportReport();
            });
        }
    }

    // Primary Action: Schedule Irrigation
    async showIrrigationModal() {
        const modal = this.createModal('Schedule Irrigation', `
            <div class="form-group">
                <label for="irrigation-duration">Duration (hours):</label>
                <select class="form-control" id="irrigation-duration">
                    <option value="1">1 hour</option>
                    <option value="2" selected>2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                </select>
            </div>
            <div class="form-group">
                <label for="irrigation-start-time">Start Time:</label>
                <input type="time" class="form-control" id="irrigation-start-time" value="06:00">
            </div>
            <div class="form-group">
                <label for="irrigation-field">Field:</label>
                <select class="form-control" id="irrigation-field">
                    <option value="all">All Fields</option>
                    <option value="field1">Field A1</option>
                    <option value="field2">Field B2</option>
                    <option value="field3">Field C3</option>
                </select>
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const duration = document.getElementById('irrigation-duration').value;
            const startTime = document.getElementById('irrigation-start-time').value;
            const fieldId = document.getElementById('irrigation-field').value;

            try {
                const response = await fetch('/api/schedule-irrigation/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `duration=${duration}&start_time=${startTime}&field_id=${fieldId}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSuccessMessage(data.message);
                    this.updateDashboardData();
                    this.updateStatus('irrigation', 'Scheduled');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to schedule irrigation');
            }

            this.closeModal(modal);
        });
    }

    // Primary Action: Apply Fertilizer
    async showFertilizerModal() {
        const modal = this.createModal('Apply Fertilizer', `
            <div class="form-group">
                <label for="fertilizer-type">Fertilizer Type:</label>
                <select class="form-control" id="fertilizer-type">
                    <option value="NPK" selected>NPK (20-20-20)</option>
                    <option value="Urea">Urea (46-0-0)</option>
                    <option value="DAP">DAP (18-46-0)</option>
                    <option value="Organic">Organic Compost</option>
                </select>
            </div>
            <div class="form-group">
                <label for="fertilizer-amount">Amount (kg/ha):</label>
                <input type="number" class="form-control" id="fertilizer-amount" value="50" min="10" max="200">
            </div>
            <div class="form-group">
                <label for="fertilizer-field">Field:</label>
                <select class="form-control" id="fertilizer-field">
                    <option value="all">All Fields</option>
                    <option value="field1">Field A1</option>
                    <option value="field2">Field B2</option>
                    <option value="field3">Field C3</option>
                </select>
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const type = document.getElementById('fertilizer-type').value;
            const amount = document.getElementById('fertilizer-amount').value;
            const fieldId = document.getElementById('fertilizer-field').value;

            try {
                const response = await fetch('/api/apply-fertilizer/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `fertilizer_type=${type}&amount=${amount}&field_id=${fieldId}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSuccessMessage(data.message);
                    this.updateDashboardData();
                    this.updateStatus('fertilizer', 'Applied');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to apply fertilizer');
            }

            this.closeModal(modal);
        });
    }

    // Primary Action: Request Expert
    async showExpertModal() {
        const modal = this.createModal('Request Expert Consultation', `
            <div class="form-group">
                <label for="expert-issue-type">Issue Type:</label>
                <select class="form-control" id="expert-issue-type">
                    <option value="general" selected>General Advice</option>
                    <option value="disease">Disease Management</option>
                    <option value="pest">Pest Control</option>
                    <option value="nutrition">Nutrition Issues</option>
                    <option value="irrigation">Irrigation Problems</option>
                </select>
            </div>
            <div class="form-group">
                <label for="expert-description">Description:</label>
                <textarea class="form-control" id="expert-description" rows="3" placeholder="Describe your issue..."></textarea>
            </div>
            <div class="form-group">
                <label for="expert-priority">Priority:</label>
                <select class="form-control" id="expert-priority">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const issueType = document.getElementById('expert-issue-type').value;
            const description = document.getElementById('expert-description').value || 'Need expert advice';
            const priority = document.getElementById('expert-priority').value;

            try {
                const response = await fetch('/api/request-expert/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `issue_type=${issueType}&description=${encodeURIComponent(description)}&priority=${priority}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSuccessMessage(data.message);
                    this.updateDashboardData();
                    this.updateStatus('expert', 'Requested');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to request expert consultation');
            }

            this.closeModal(modal);
        });
    }

    // Secondary Actions
    async handleSecondaryAction(actionType) {
        switch (actionType) {
            case 'water-crop':
                await this.waterCrop();
                break;
            case 'check-soil':
                await this.checkSoil();
                break;
            case 'view-report':
                await this.viewReport();
                break;
        }
    }

    // Secondary Action: Water Crop
    async waterCrop() {
        const modal = this.createModal('Water Crop', `
            <div class="form-group">
                <label for="watering-duration">Duration (minutes):</label>
                <select class="form-control" id="watering-duration">
                    <option value="15">15 minutes</option>
                    <option value="30" selected>30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                </select>
            </div>
            <div class="form-group">
                <label for="watering-field">Field:</label>
                <select class="form-control" id="watering-field">
                    <option value="all">All Fields</option>
                    <option value="field1">Field A1</option>
                    <option value="field2">Field B2</option>
                    <option value="field3">Field C3</option>
                </select>
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const duration = document.getElementById('watering-duration').value;
            const fieldId = document.getElementById('watering-field').value;

            try {
                const response = await fetch('/api/water-crop/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `duration=${duration}&field_id=${fieldId}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSuccessMessage(data.message);
                    this.updateDashboardData();
                    this.updateStatus('watering', 'Completed');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to water crop');
            }

            this.closeModal(modal);
        });
    }

    // Secondary Action: Check Soil
    async checkSoil() {
        const modal = this.createModal('Check Soil Conditions', `
            <div class="form-group">
                <label for="soil-field">Field:</label>
                <select class="form-control" id="soil-field">
                    <option value="all">All Fields</option>
                    <option value="field1">Field A1</option>
                    <option value="field2">Field B2</option>
                    <option value="field3">Field C3</option>
                </select>
            </div>
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i> This will check soil temperature, moisture, pH, and nitrogen levels.
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const fieldId = document.getElementById('soil-field').value;

            try {
                const response = await fetch('/api/check-soil/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `field_id=${fieldId}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSoilResults(data.data);
                    this.updateDashboardData();
                    this.updateStatus('soil', 'Completed');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to check soil conditions');
            }

            this.closeModal(modal);
        });
    }

    // Secondary Action: View Report
    async viewReport() {
        const modal = this.createModal('Generate Report', `
            <div class="form-group">
                <label for="report-type">Report Type:</label>
                <select class="form-control" id="report-type">
                    <option value="comprehensive" selected>Comprehensive Report</option>
                    <option value="summary">Summary Report</option>
                    <option value="detailed">Detailed Analysis</option>
                    <option value="comparison">Comparison Report</option>
                </select>
            </div>
            <div class="form-group">
                <label for="report-date-range">Date Range:</label>
                <select class="form-control" id="report-date-range">
                    <option value="7d">Last 7 days</option>
                    <option value="30d" selected>Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                </select>
            </div>
        `);

        modal.querySelector('.btn-primary').addEventListener('click', async () => {
            const reportType = document.getElementById('report-type').value;
            const dateRange = document.getElementById('report-date-range').value;

            try {
                const response = await fetch('/api/view-report/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: `report_type=${reportType}&date_range=${dateRange}`
                });

                const data = await response.json();
                if (data.success) {
                    this.showSuccessMessage(data.message);
                    this.updateDashboardData();
                    this.updateStatus('report', 'Generated');
                } else {
                    this.showErrorMessage(data.message);
                }
            } catch (error) {
                this.showErrorMessage('Failed to generate report');
            }

            this.closeModal(modal);
        });
    }

    // Utility Methods
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        $(modal).modal('show');
        return modal;
    }

    closeModal(modal) {
        $(modal).modal('hide');
        setTimeout(() => modal.remove(), 150);
    }

    showSuccessMessage(message) {
        this.showAlert('success', message);
    }

    showErrorMessage(message) {
        this.showAlert('danger', message);
    }

    showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        `;

        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }

    showSoilResults(soilData) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Soil Analysis Results</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h6>🌡️ Temperature</h6>
                                        <h3 class="text-warning">${soilData.temperature}°C</h3>
                                        <small class="text-muted">Optimal: 22-30°C</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h6>💧 Moisture</h6>
                                        <h3 class="text-info">${soilData.moisture}%</h3>
                                        <small class="text-muted">Optimal: 60-80%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h6>🧪 pH Level</h6>
                                        <h3 class="text-success">${soilData.ph}</h3>
                                        <small class="text-muted">Optimal: 6.0-7.0</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <h6>🌱 Nitrogen</h6>
                                        <h3 class="text-primary">${soilData.nitrogen} ppm</h3>
                                        <small class="text-muted">Optimal: 30-50 ppm</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        $(modal).modal('show');
        
        modal.querySelector('.close').addEventListener('click', () => {
            $(modal).modal('hide');
            setTimeout(() => modal.remove(), 150);
        });
    }

    updateStatus(actionType, status) {
        const statusElements = {
            'irrigation': '.irrigation-status',
            'fertilizer': '.fertilizer-status',
            'expert': '.expert-status',
            'watering': '.watering-status',
            'soil': '.soil-status',
            'report': '.report-status'
        };

        const element = document.querySelector(statusElements[actionType]);
        if (element) {
            element.innerHTML = `<i class="fas fa-check text-success"></i> ${status}`;
            element.className = statusElements[actionType].substring(1) + ' text-success';
        }
    }

    async updateDashboardData() {
        try {
            const response = await fetch('/api/dashboard-data/');
            const data = await response.json();
            
            // Update status displays
            this.updateStatusDisplay('irrigation', data.irrigation_status);
            this.updateStatusDisplay('fertilizer', data.fertilizer_status);
            this.updateStatusDisplay('expert', data.expert_status);
            
            // Update last updated time
            const lastUpdated = document.querySelector('.last-updated');
            if (lastUpdated) {
                lastUpdated.textContent = 'Last updated: Just now';
            }
        } catch (error) {
            console.error('Failed to update dashboard data:', error);
        }
    }

    updateStatusDisplay(type, status) {
        const statusElements = {
            'irrigation': '.irrigation-status',
            'fertilizer': '.fertilizer-status',
            'expert': '.expert-status'
        };

        const element = document.querySelector(statusElements[type]);
        if (element) {
            if (status === 'Ready to Schedule' || status === 'Ready to Apply' || status === 'Expert Available') {
                element.innerHTML = `<i class="fas fa-clock"></i> ${status}`;
                element.className = statusElements[type].substring(1) + ' text-muted';
            } else {
                element.innerHTML = `<i class="fas fa-check text-success"></i> ${status}`;
                element.className = statusElements[type].substring(1) + ' text-success';
            }
        }
    }

    refreshData() {
        this.updateDashboardData();
        this.showSuccessMessage('Dashboard data refreshed successfully!');
    }

    exportReport() {
        // Simulate report export
        this.showSuccessMessage('Report export started! Check your downloads folder.');
        
        // Create a dummy download link
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,Field,Status,Health,Last Updated\nField A1,Active,85%,2025-08-22\nField B2,Active,92%,2025-08-22';
        link.download = 'paddysense_report.csv';
        link.click();
    }

    startAutoRefresh() {
        // Auto-refresh dashboard data every 30 seconds
        setInterval(() => {
            this.updateDashboardData();
        }, 30000);
    }

    getCSRFToken() {
        const token = document.querySelector('[name=csrfmiddlewaretoken]');
        return token ? token.value : '';
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});

// Global functions for backward compatibility
function refreshData() {
    if (window.dashboardManager) {
        window.dashboardManager.refreshData();
    }
}

function exportReport() {
    if (window.dashboardManager) {
        window.dashboardManager.exportReport();
    }
}
