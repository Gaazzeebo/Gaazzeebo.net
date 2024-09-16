// Handle smooth scroll for the about page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Header logo scaling on scroll
const logo = document.querySelector('.logo h1');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        logo.style.transform = 'scale(0.8)';
    } else {
        logo.style.transform = 'scale(1)';
    }
});

// Particle effect with glowing electric particles
function createParticles() {
    const particleCount = 80;  // Increased particle count for more visual impact
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomly assign particle colors (electric blue, orange, or rainbow)
        const randomColor = Math.random();
        if (randomColor < 0.4) {
            particle.style.backgroundColor = 'rgba(0, 191, 255, 1)'; // Electric blue
            particle.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.8), 0 0 30px rgba(0, 191, 255, 0.6)'; // Glowing effect
        } else if (randomColor < 0.8) {
            particle.style.backgroundColor = 'rgba(255, 165, 0, 1)'; // Orange
            particle.style.boxShadow = '0 0 15px rgba(255, 165, 0, 0.8), 0 0 30px rgba(255, 165, 0, 0.6)'; // Glowing effect
        } else {
            particle.style.background = 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)';
            particle.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)'; // Glowing rainbow
        }
        
        particle.style.top = `${Math.random() * window.innerHeight}px`;
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`;
        particle.style.animationDuration = `${Math.random() * 20 + 5}s`;

        document.body.appendChild(particle);
    }
}

// Call the function to generate particles when the page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Particle style adjustments for glowing animation
document.styleSheets[0].insertRule(`
    .particle {
        position: absolute;
        border-radius: 50%;
        animation: float 20s ease-in-out infinite;
        pointer-events: none;
        opacity: 0.9;
    }
`, document.styleSheets[0].cssRules.length);

document.styleSheets[0].insertRule(`
    @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-50px); }
        100% { transform: translateY(0); }
    }
`, document.styleSheets[0].cssRules.length);

// Dark mode handling to fix text disappearance
const darkModeButton = document.getElementById('dark-mode-btn');
if (darkModeButton) {
    darkModeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
    });
}

// Adjust footer and form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const type = document.getElementById('type').value;
        const template = document.getElementById('template').value;
        const details = document.getElementById('details').value;

        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Website Type: ${type}`);
        if (type === 'template') {
            console.log(`Template Selected: ${template}`);
        }
        console.log(`Additional Details: ${details}`);
        
        alert("Thank you! Your request has been submitted.");
        
        // Reset form
        document.getElementById('contactForm').reset();
        document.getElementById('template').disabled = true;
    });
}

// Responsive adjustments for different device sizes
function adjustForDevice() {
    const screenWidth = window.innerWidth;

    // Adjust logo scaling based on screen size
    if (screenWidth < 768) {
        logo.style.transform = 'scale(0.6)'; // Smaller devices
    } else if (screenWidth < 1024) {
        logo.style.transform = 'scale(0.8)'; // Tablets
    } else {
        logo.style.transform = 'scale(1)'; // Desktops
    }

    // Dynamically adjust dropdown height for small screens
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (screenWidth < 768) {
            dropdown.style.maxHeight = '200px';
        } else {
            dropdown.style.maxHeight = 'none'; // Full height for larger screens
        }
    });

    // Adjust particle density based on device
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        if (screenWidth < 768) {
            particle.style.width = particle.style.height = `${Math.random() * 5 + 2}px`; // Smaller particles for mobile
        } else {
            particle.style.width = particle.style.height = `${Math.random() * 10 + 5}px`; // Larger particles for desktops
        }
    });
}

// Call the function initially and on window resize to adjust layout for devices
window.addEventListener('resize', adjustForDevice);
document.addEventListener('DOMContentLoaded', adjustForDevice);
