// Aviation Dashboard Demo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAviationDashboard();
});

function initAviationDashboard() {
    updateDashboardTime();
    generateFlightData();
    animateMetrics();
    
    // Update time every second
    setInterval(updateDashboardTime, 1000);
    
    // Update flight data every 30 seconds
    setInterval(generateFlightData, 30000);
    
    // Update metrics every 10 seconds
    setInterval(animateMetrics, 10000);
}

function updateDashboardTime() {
    const timeElement = document.getElementById('dashboard-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            timeZone: 'Africa/Cairo'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'Africa/Cairo'
        });
        timeElement.textContent = `${dateString} ${timeString} EET`;
    }
}

function generateFlightData() {
    const flightList = document.getElementById('flight-list');
    if (!flightList) return;
    
    const flights = [
        {
            number: 'AM101',
            route: 'CAI → DXB',
            status: 'En Route',
            departure: '14:30',
            arrival: '18:45',
            aircraft: 'A320',
            altitude: '37,000 ft',
            speed: '485 kts'
        },
        {
            number: 'AM205',
            route: 'CAI → LHR',
            status: 'Boarding',
            departure: '16:15',
            arrival: '20:30',
            aircraft: 'B777',
            altitude: 'Ground',
            speed: '0 kts'
        },
        {
            number: 'AM312',
            route: 'JED → CAI',
            status: 'Approaching',
            departure: '13:20',
            arrival: '15:45',
            aircraft: 'A321',
            altitude: '8,500 ft',
            speed: '320 kts'
        },
        {
            number: 'AM428',
            route: 'CAI → IST',
            status: 'Departed',
            departure: '15:00',
            arrival: '17:20',
            aircraft: 'A320',
            altitude: '25,000 ft',
            speed: '450 kts'
        }
    ];
    
    flightList.innerHTML = flights.map(flight => `
        <div class="flight-item ${flight.status.toLowerCase().replace(' ', '-')}">
            <div class="flight-header">
                <div class="flight-number">${flight.number}</div>
                <div class="flight-status status-${flight.status.toLowerCase().replace(' ', '-')}">${flight.status}</div>
            </div>
            <div class="flight-details">
                <div class="flight-route">
                    <i class="fas fa-route"></i>
                    ${flight.route}
                </div>
                <div class="flight-times">
                    <span class="departure">
                        <i class="fas fa-plane-departure"></i>
                        ${flight.departure}
                    </span>
                    <span class="arrival">
                        <i class="fas fa-plane-arrival"></i>
                        ${flight.arrival}
                    </span>
                </div>
                <div class="flight-info">
                    <span class="aircraft">
                        <i class="fas fa-plane"></i>
                        ${flight.aircraft}
                    </span>
                    <span class="altitude">
                        <i class="fas fa-arrow-up"></i>
                        ${flight.altitude}
                    </span>
                    <span class="speed">
                        <i class="fas fa-tachometer-alt"></i>
                        ${flight.speed}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function animateMetrics() {
    // Simulate real-time metric updates
    const metrics = {
        departures: { element: 'departures', min: 20, max: 30 },
        arrivals: { element: 'arrivals', min: 18, max: 28 },
        onTime: { element: 'on-time', min: 90, max: 98, suffix: '%' },
        fuelEfficiency: { element: 'fuel-efficiency', min: 8, max: 15, suffix: '%' }
    };
    
    Object.values(metrics).forEach(metric => {
        const element = document.getElementById(metric.element);
        if (element) {
            const currentValue = parseInt(element.textContent);
            const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            let newValue = currentValue + variation;
            
            // Keep within bounds
            newValue = Math.max(metric.min, Math.min(metric.max, newValue));
            
            // Animate the change
            animateValue(element, currentValue, newValue, 1000, metric.suffix || '');
        }
    });
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.round(start + (difference * progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Add CSS for flight dashboard
const dashboardStyles = `
<style>
.service-hero {
    position: relative;
    min-height: 70vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.aviation-hero {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.service-hero-content {
    position: relative;
    z-index: 2;
    color: var(--white);
}

.service-breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: var(--font-size-sm);
    opacity: 0.8;
}

.service-breadcrumb a {
    color: var(--white);
    text-decoration: none;
}

.service-hero-title {
    font-size: var(--font-size-4xl);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.service-hero-title i {
    color: var(--accent-light);
}

.service-hero-subtitle {
    font-size: var(--font-size-lg);
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 600px;
}

.service-hero-stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.service-hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.aviation-services {
    padding: var(--section-padding);
    background: var(--light-gray);
}

.aviation-services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
}

.aviation-service-card {
    background: var(--white);
    border-radius: var(--border-radius-large);
    padding: 2rem;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    border-top: 4px solid var(--accent-gray);
}

.aviation-service-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-heavy);
}

.service-features {
    list-style: none;
    margin: 1.5rem 0;
}

.service-features li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: var(--font-size-sm);
}

.service-features i {
    color: var(--accent-gray);
    font-size: var(--font-size-xs);
}

.service-metrics {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
}

.metric {
    text-align: center;
}

.metric-value {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--accent-gray);
}

.metric-label {
    font-size: var(--font-size-xs);
    color: var(--text-light);
}

.flight-dashboard-demo {
    padding: var(--section-padding);
}

.dashboard-container {
    background: var(--white);
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-medium);
    overflow: hidden;
}

.dashboard-header {
    background: var(--primary-dark);
    color: var(--white);
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dashboard-title h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dashboard-time {
    font-size: var(--font-size-sm);
    opacity: 0.8;
}

.status-indicator {
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: var(--font-size-xs);
    font-weight: 600;
}

.status-indicator.active {
    background: #10B981;
    color: var(--white);
}

.dashboard-content {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
}

.dashboard-section h4 {
    margin-bottom: 1rem;
    color: var(--text-color);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
}

.flight-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flight-item {
    background: var(--light-gray);
    border-radius: var(--border-radius);
    padding: 1rem;
    border-left: 4px solid var(--accent-gray);
}

.flight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.flight-number {
    font-weight: 600;
    color: var(--text-color);
}

.flight-status {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: var(--font-size-xs);
    font-weight: 600;
}

.status-en-route { background: #3B82F6; color: var(--white); }
.status-boarding { background: #F59E0B; color: var(--white); }
.status-approaching { background: #10B981; color: var(--white); }
.status-departed { background: #8B5CF6; color: var(--white); }

.flight-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.flight-route {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
}

.flight-times {
    display: flex;
    gap: 1rem;
}

.flight-times span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--font-size-sm);
}

.flight-info {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.flight-info span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--font-size-xs);
    color: var(--text-light);
}

.metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.metric-card {
    background: var(--light-gray);
    border-radius: var(--border-radius);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.metric-icon {
    width: 40px;
    height: 40px;
    background: var(--accent-gray);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
}

.metric-info {
    display: flex;
    flex-direction: column;
}

.weather-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.weather-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--light-gray);
    border-radius: var(--border-radius);
}

.aviation-case-studies {
    padding: var(--section-padding);
    background: var(--light-gray);
}

.case-studies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
}

.case-study-card {
    background: var(--white);
    border-radius: var(--border-radius-large);
    padding: 2rem;
    box-shadow: var(--shadow-light);
}

.case-study-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.case-study-icon {
    width: 60px;
    height: 60px;
    background: var(--accent-gray);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: var(--font-size-xl);
}

.case-study-client {
    color: var(--text-light);
    font-size: var(--font-size-sm);
    margin: 0;
}

.case-study-challenge,
.case-study-solution {
    margin-bottom: 1rem;
    line-height: 1.6;
}

.case-study-results {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
}

.result-item {
    text-align: center;
    flex: 1;
}

.result-value {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--accent-gray);
}

.result-label {
    font-size: var(--font-size-xs);
    color: var(--text-light);
}

.aviation-contact {
    padding: var(--section-padding);
}

.aviation-contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.aviation-contact-form {
    background: var(--white);
    border-radius: var(--border-radius-large);
    padding: 2rem;
    box-shadow: var(--shadow-medium);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

@media (max-width: 1024px) {
    .dashboard-content {
        grid-template-columns: 1fr;
    }
    
    .aviation-services-grid {
        grid-template-columns: 1fr;
    }
    
    .case-studies-grid {
        grid-template-columns: 1fr;
    }
    
    .aviation-contact-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .service-hero-stats {
        justify-content: center;
    }
    
    .service-hero-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .weather-info {
        grid-template-columns: 1fr;
    }
    
    .case-study-results {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', dashboardStyles);

