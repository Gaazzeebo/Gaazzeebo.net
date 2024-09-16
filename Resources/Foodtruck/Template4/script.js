document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.nav-dot');
    const menuItemsContainer = document.getElementById('menuItems');
    const reviewList = document.getElementById('reviewList');

    // Sample menu items
    const menuItems = [
        { name: "Burger Bliss", price: "$5.99" },
        { name: "Taco Tornado", price: "$4.50" },
        { name: "Fries Fiesta", price: "$3.00" },
        { name: "Shake Surprise", price: "$3.50" }
    ];

    // Sample reviews
    const sampleReviews = [
        { name: "John D.", review: "Best tacos in town!" },
        { name: "Sarah L.", review: "The burgers are amazing!" }
    ];

    // Populate menu items
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = "bg-white bg-opacity-20 p-4 rounded-lg mb-4 text-white";
        menuItem.innerHTML = `
            <h3 class="text-2xl font-semibold">${item.name}</h3>
            <p>${item.price}</p>
        `;
        menuItemsContainer.appendChild(menuItem);
    });

    // Display sample reviews
    sampleReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = "bg-white bg-opacity-20 p-4 rounded-lg mb-4 text-white";
        reviewItem.innerHTML = `
            <p class="font-semibold">${review.name}</p>
            <p>${review.review}</p>
        `;
        reviewList.appendChild(reviewItem);
    });

    // Simple interactive map placeholder
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.216289352722!2d-73.9352424843014!3d40.75452697932777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sCentral%20Park%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1694234706237!5m2!1sen!2suk" 
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

    // Navigation with dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveDot(targetId);
            }
        });
    });

    // Update active dot based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - window.innerHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        updateActiveDot(current);
    });

    function updateActiveDot(currentId) {
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === currentId) {
                dot.classList.add('active');
            }
        });
    }

    // Initial check for active section on load
    updateActiveDot('home'); // Assuming 'home' is the first section to be active on load
});