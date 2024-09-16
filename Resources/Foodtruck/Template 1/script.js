// Initialize Google Map with custom styles and locations
function initMap() {
    const locations = [
        { lat: 27.950575, lng: -82.4571776, title: "Central Park", color: "red", address: "123 Main St, Tampa, FL" }, // Monday
        { lat: 27.948235, lng: -82.454479, title: "Riverwalk", color: "blue", address: "456 Riverside Dr, Tampa, FL" }, // Tuesday
        { lat: 27.951230, lng: -82.459480, title: "University Plaza", color: "green", address: "789 University Ave, Tampa, FL" }, // Wednesday
        { lat: 27.944226, lng: -82.458567, title: "Downtown", color: "orange", address: "101 City Square, Tampa, FL" }, // Thursday
        { lat: 27.951880, lng: -82.456500, title: "Ybor City", color: "yellow", address: "202 Historical St, Tampa, FL" }, // Friday
        { lat: 27.934894, lng: -82.481213, title: "Hyde Park", color: "purple", address: "303 Fancy Ln, Tampa, FL" }, // Saturday
        { lat: 27.906120, lng: -82.516416, title: "Beachfront", color: "pink", address: "404 Ocean Ave, Tampa, FL" } // Sunday
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 27.950575, lng: -82.4571776 },
        mapId: 'd90ce7d0d74eec62'  // <-- Insert your actual Map ID here
    });

    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.title,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: location.color,
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "white"
            }
        });

        // Create an info window for the address
        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="font-size: 16px; color: #333;"><strong>${location.title}</strong><br>${location.address}</div>`
        });

        // Show the info window on hover
        marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
        });

        // Hide the info window when the user stops hovering
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
    });
}

// Form Submission with validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;

    if (!validateEmail(email) || name.trim() === "") {
        alert("Please enter a valid name and email.");
        return;
    }

    alert("Thank you for contacting us! We'll get back to you soon.");
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Shrinking Navbar on Scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('shrink', window.scrollY > 0);
});
