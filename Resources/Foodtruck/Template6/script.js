document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { name: "Burger Bliss", price: "$5.99" },
        { name: "Taco Tornado", price: "$4.50" },
        { name: "Fries Fiesta", price: "$3.00" },
        { name: "Shake Surprise", price: "$3.50" }
    ];

    const menuContainer = document.getElementById('menuItems');
    const reviewList = document.getElementById('reviewList');
    const reviewForm = document.getElementById('reviewForm');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const toggleSidebar = document.getElementById('toggleSidebar');

    // Populate menu items
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = "bg-white p-4 shadow-lg rounded-lg mb-4";
        menuItem.innerHTML = `
            <h3 class="text-xl font-semibold">${item.name}</h3>
            <p class="text-gray-600">${item.price}</p>
        `;
        menuContainer.appendChild(menuItem);
    });

    // Simple interactive map placeholder
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.216289352722!2d-73.9352424843014!3d40.75452697932777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sCentral%20Park%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1694234706237!5m2!1sen!2suk" 
                width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `;

    // Sample reviews
    const sampleReviews = [
        { name: "John D.", review: "Best tacos in town! Highly recommend." },
        { name: "Sarah L.", review: "The burgers are to die for. Will definitely be back!" }
    ];

    // Display sample reviews
    sampleReviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = "bg-white p-4 shadow-lg rounded-lg mb-4";
        reviewItem.innerHTML = `
            <p class="font-semibold">${review.name}</p>
            <p class="text-gray-600">${review.review}</p>
        `;
        reviewList.appendChild(reviewItem);
    });

    // Handle review submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reviewText = e.target.review.value;
        if (reviewText) {
            const reviewItem = document.createElement('div');
            reviewItem.className = "bg-white p-4 shadow-lg rounded-lg mb-4";
            reviewItem.innerHTML = `
                <p class="font-semibold">Anonymous</p>
                <p class="text-gray-600">${reviewText}</p>
            `;
            reviewList.insertBefore(reviewItem, reviewList.firstChild);
            reviewForm.reset();
        }
    });

    // Sidebar functionality
    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
    });

    // Navigation between sections
    document.querySelectorAll('[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            document.querySelectorAll('.fade-in').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
            sidebar.classList.remove('active');
            content.classList.remove('active');
        });
    });
});