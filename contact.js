// Toggle mobile menu functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close the mobile menu by default
document.addEventListener('DOMContentLoaded', () => {
    mobileMenu.classList.remove('active');
});

// Enable or disable the template dropdown based on website type selection
const typeSelect = document.getElementById('type');
const templateSelect = document.getElementById('template');

typeSelect.addEventListener('change', function () {
    if (this.value === 'template') {
        templateSelect.disabled = false;
    } else {
        templateSelect.disabled = true;
        templateSelect.value = ''; // Reset the template selection if personalized is chosen
    }
});

// Show success message after form submission
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent actual form submission
    successMessage.style.display = 'block';

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 6000); // Display message for 6 seconds

    form.reset(); // Reset the form after submission
});

// Interactive particle effect based on mouse movement
const particleBg = document.querySelector('.particle-bg');
window.addEventListener('mousemove', function (event) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const speed = particle.dataset.speed || 30;
        const x = (window.innerWidth - event.pageX * speed) / 100;
        const y = (window.innerHeight - event.pageY * speed) / 100;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Update the displayed budget value based on the range slider input
const budgetSlider = document.getElementById('budget');
const budgetValue = document.getElementById('budgetValue');

budgetSlider.addEventListener('input', function () {
    budgetValue.textContent = budgetSlider.value;
});
