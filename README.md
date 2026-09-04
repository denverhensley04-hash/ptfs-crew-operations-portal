# PTFS Crew Operations Portal

A comprehensive crew operations and flight management portal for **Pilot Training Flight Simulator (PTFS)** on Roblox, featuring Singapore Airlines aircraft fleet data.

## Features

✈️ **Aircraft Fleet Management**
- Airbus A330 (116 seats: 20 Business / 96 Economy)
- Airbus A350 (106 seats: 41 Business / 65 Economy)
- Boeing 747 (134 seats: 31 Business / 103 Economy)
- Boeing 787 (98 seats: 20 Business / 78 Economy)
- Boeing 707 (62 seats: Economy only)
- Boeing 737 (60 seats: Economy only)

🔐 **Secure Crew Authentication**
- Password-protected operations portal
- Crew callsign verification
- Operational message transmission

⏱️ **Live Flight Countdown Timer**
- Real-time departure timer
- Scheduled for Sunday @ 3:40 PM
- Route: Greater Rockford ➔ Tokyo (Orenji)

🎨 **Modern, Professional UI**
- Singapore Airlines branded styling
- Navy and gold color scheme
- Responsive design for all devices
- Interactive aircraft selection

## Usage

1. Open `index.html` in your browser
2. Browse aircraft fleet using the selection buttons
3. View seat configurations for each aircraft
4. Enter the operational password to access the crew portal:
   - Password: `Singapore Airlines airbus A380`
5. Submit operational messages and reports

## Files

- `index.html` - Main portal structure
- `styles.css` - Styling and responsive design
- `script.js` - Interactive features and flight logic

## Customization

### Adding Aircraft
Edit the `aircraftFleet` object in `script.js`:
```javascript
aircraft_id: {
    name: 'Aircraft Name',
    totalSeats: 150,
    business: 30,
    economy: 120,
    premiumEconomy: 0,
    image: '✈️'
}
```

### Changing Flight Details
Modify the target date/time in `computeFlightClock()` function:
```javascript
const targetDay = 0;     // 0 = Sunday, 1 = Monday, etc.
const targetHour = 15;   // 24-hour format
const targetMinute = 40; // Minutes
```

### Updating Password
Change the `CREW_GATEWAY_PASSWORD` in `script.js`:
```javascript
const CREW_GATEWAY_PASSWORD = 'your-new-password';
```

## License

Created for PTFS (Pilot Training Flight Simulator) on Roblox - Singapore Airlines Virtual Operations.
