// Aircraft Fleet Data for Singapore Airlines PTFS
const aircraftFleet = {
    a330: {
        name: 'Airbus A330',
        totalSeats: 116,
        business: 20,
        economy: 96,
        premiumEconomy: 0,
        image: '✈️'
    },
    a350: {
        name: 'Airbus A350',
        totalSeats: 106,
        business: 41,
        economy: 65,
        premiumEconomy: 0,
        image: '✈️'
    },
    a380: {
        name: 'Airbus A380',
        totalSeats: 172,
        business: 0,
        economy: 0,
        premiumEconomy: 0,
        upper: 82,
        lower: 90,
        crew: 2,
        isDual: true,
        image: '✈️'
    },
    b747: {
        name: 'Boeing 747',
        totalSeats: 134,
        business: 31,
        economy: 103,
        premiumEconomy: 0,
        image: '✈️'
    },
    b787: {
        name: 'Boeing 787',
        totalSeats: 98,
        business: 20,
        economy: 78,
        premiumEconomy: 0,
        image: '✈️'
    },
    b707: {
        name: 'Boeing 707',
        totalSeats: 62,
        business: 0,
        economy: 62,
        premiumEconomy: 0,
        image: '✈️'
    },
    b737: {
        name: 'Boeing 737',
        totalSeats: 60,
        business: 0,
        economy: 60,
        premiumEconomy: 0,
        image: '✈️'
    }
};

// Authentication Configuration
const CREW_GATEWAY_PASSWORD = 'Singapore Airlines airbus A380';

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    displayAircraftInfo('a330');
    computeFlightClock();
    setInterval(computeFlightClock, 1000);
    setupFormSubmission();
});

// Select aircraft and display info
function selectAircraft(aircraftId) {
    // Remove active class from all buttons
    document.querySelectorAll('.aircraft-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    document.querySelector(`[data-aircraft="${aircraftId}"]`).classList.add('active');
    
    // Display aircraft info
    displayAircraftInfo(aircraftId);
}

// Display aircraft information
function displayAircraftInfo(aircraftId) {
    const aircraft = aircraftFleet[aircraftId];
    const container = document.getElementById('aircraft-info');
    
    let html = `
        <div class="aircraft-card">
            <h3>${aircraft.image} ${aircraft.name}</h3>
            <div class="cabin-info">
                <label>Total Seats</label>
                <div class="seats">${aircraft.totalSeats}</div>
            </div>
    `;
    
    // Special handling for A380 dual-deck layout
    if (aircraft.isDual) {
        html += `
            <div class="cabin-info">
                <label>Upper Deck Passengers</label>
                <div class="seats" style="color: var(--sia-gold);">${aircraft.upper}</div>
                <span class="seat-badge business">Upper Deck</span>
            </div>
            <div class="cabin-info">
                <label>Lower Deck Passengers</label>
                <div class="seats" style="color: #10b981;">${aircraft.lower}</div>
                <span class="seat-badge economy">Lower Deck</span>
            </div>
            <div class="cabin-info">
                <label>Flight Crew</label>
                <div class="seats" style="color: #6366f1;">${aircraft.crew}</div>
                <span class="seat-badge" style="background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;">Cockpit Crew</span>
            </div>
        `;
    } else {
        if (aircraft.business > 0) {
            html += `
                <div class="cabin-info">
                    <label>Business Class</label>
                    <div class="seats" style="color: var(--sia-gold);">${aircraft.business}</div>
                    <span class="seat-badge business">First Class Seating</span>
                </div>
            `;
        }
        
        html += `
                <div class="cabin-info">
                    <label>Economy Class</label>
                    <div class="seats" style="color: #10b981;">${aircraft.economy}</div>
                    <span class="seat-badge economy">Standard Seating</span>
                </div>
        `;
        
        if (aircraft.premiumEconomy > 0) {
            html += `
                <div class="cabin-info">
                    <label>Premium Economy</label>
                    <div class="seats" style="color: #f59e0b;">${aircraft.premiumEconomy}</div>
                    <span class="seat-badge" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white;">Premium Seating</span>
                </div>
            `;
        }
    }
    
    html += `</div>`;
    container.innerHTML = html;
}

// Verify crew gateway password
function verifyCrewGateway() {
    const enteredKey = document.getElementById('gate-pass-field').value;
    const errorElement = document.getElementById('gate-error');
    const lockBox = document.getElementById('gate-lock');
    const formBox = document.getElementById('gate-form-panel');

    if (enteredKey === CREW_GATEWAY_PASSWORD) {
        lockBox.style.display = 'none';
        formBox.style.display = 'block';
        errorElement.style.display = 'none';
    } else {
        errorElement.style.display = 'block';
        document.getElementById('gate-pass-field').value = '';
    }
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passField = document.getElementById('gate-pass-field');
    if (passField) {
        passField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                verifyCrewGateway();
            }
        });
    }
});

// Compute flight departure countdown timer
function computeFlightClock() {
    const now = new Date();
    const target = new Date();
    
    const targetDay = 0; // Sunday (index 0)
    const targetHour = 15; // 3:00 PM military time
    const targetMinute = 40; // 40-minute offset
    
    let shiftsNeeded = (targetDay - now.getDay() + 7) % 7;
    
    // If today is Sunday and time is past 15:40, advance to next week
    if (shiftsNeeded === 0 && (now.getHours() > targetHour || (now.getHours() === targetHour && now.getMinutes() >= targetMinute))) {
        shiftsNeeded = 7;
    }
    
    target.setDate(now.getDate() + shiftsNeeded);
    target.setHours(targetHour, targetMinute, 0, 0);
    
    const chronologicalGap = target - now;
    
    // Handle flight departure
    if (chronologicalGap <= 0) {
        document.getElementById('live-timer').innerHTML = '✈️ FLIGHT ACTIVATED / IN DEPARTURE';
        const badge = document.getElementById('flight-status');
        if (badge) {
            badge.innerHTML = 'Boarding';
            badge.style.color = 'var(--sia-gold)';
            badge.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            badge.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        }
        return;
    }
    
    // Calculate time components
    const displayDays = Math.floor(chronologicalGap / (1000 * 60 * 60 * 24));
    const displayHours = Math.floor((chronologicalGap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const displayMinutes = Math.floor((chronologicalGap % (1000 * 60 * 60)) / (1000 * 60));
    const displaySeconds = Math.floor((chronologicalGap % (1000 * 60)) / 1000);
    
    // Format with leading zeros
    const cleanD = String(displayDays).padStart(2, '0');
    const cleanH = String(displayHours).padStart(2, '0');
    const cleanM = String(displayMinutes).padStart(2, '0');
    const cleanS = String(displaySeconds).padStart(2, '0');
    
    document.getElementById('live-timer').innerHTML = `${cleanD}d : ${cleanH}h : ${cleanM}m : ${cleanS}s`;
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('crew-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const callsign = document.getElementById('callsign').value;
            const message = document.getElementById('message').value;
            
            // Log submission (in a real app, send to server)
            console.log('Crew Report Submitted:', { callsign, message, timestamp: new Date() });
            
            // Show success message
            alert(`Operational message from ${callsign} transmitted successfully to Director.`);
            
            // Reset form
            form.reset();
        });
    }
}
