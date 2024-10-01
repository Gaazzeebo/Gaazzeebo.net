// Function to handle header scroll and show/hide scroll-to-top button
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
        scrollToTopBtn.style.display = 'block';
    } else {
        header.classList.remove('scrolled');
        scrollToTopBtn.style.display = 'none';
    }
}

// Function to handle modal opening
function openModal(id) {
    const details = propertyDetails[id];
    const imagesHtml = details.images.map(image => `<img src="${image}" alt="${details.name}" loading="lazy">`).join('');
    modalBody.innerHTML = `
        <h2>${details.name}</h2>
        <div class="carousel">
            ${imagesHtml}
        </div>
        <p><strong>Price:</strong> ${details.price}</p>
        <p><strong>Details:</strong> ${details.details}</p>
        <p>${details.description}</p>
    `;
    modal.style.display = 'flex';
}

// Function to close modal
function closeModalFunc() {
    modal.style.display = 'none';
}

// Debounce function to limit event triggering frequency
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to sort properties dynamically based on price
function sortProperties(sortBy) {
    const container = document.getElementById('propertyContainer');
    const sorted = [...container.children].sort((a, b) => {
        const priceA = parseInt(a.dataset.price, 10);
        const priceB = parseInt(b.dataset.price, 10);
        return sortBy === 'priceLow' ? priceA - priceB : priceB - priceA;
    });
    container.innerHTML = '';
    sorted.forEach(item => container.appendChild(item));
}

// Function to handle "Load More" functionality (dummy for now, can be extended to fetch more properties)
function loadMoreProperties() {
    // This function can be extended to dynamically load more properties via API or additional static data
    alert('Load more functionality can be implemented here.');
}

// Event listeners and interactions
window.addEventListener('scroll', debounce(handleHeaderScroll, 100)); // Header scroll event

document.getElementById('scrollToTopBtn').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('sortBy').addEventListener('change', function () {
    sortProperties(this.value);
});

document.getElementById('loadMoreBtn').addEventListener('click', loadMoreProperties);

const soldProperties = document.querySelectorAll('.sold-property');
const modal = document.getElementById('property-modal');
const closeModal = document.querySelector('.modal .close');
const modalBody = document.querySelector('.modal-body');

// Open modal on property click
soldProperties.forEach(property => {
    property.addEventListener('click', function () {
        const id = property.getAttribute('data-id');
        openModal(id);
    });
});

// Close modal when clicking the close button or outside the modal
closeModal.addEventListener('click', closeModalFunc);

window.onclick = function (event) {
    if (event.target == modal) {
        closeModalFunc();
    }
};

// Property details (these can be dynamically loaded from a server or API in the future)
const propertyDetails = {
    1: {
        name: 'Luxury Modern Villa',
        description: 'An expansive villa featuring a beautiful blend of modern architecture and luxurious amenities.',
        price: '$2,300,000',
        details: '5 Beds | 6 Baths | 8000 sqft',
        images: ['sold1.jpg', 'sold1-2.jpg', 'sold1-3.jpg']
    },
    2: {
        name: 'Penthouse Suite',
        description: 'A stunning penthouse with panoramic city views, offering the ultimate in urban luxury living.',
        price: '$3,800,000',
        details: '3 Beds | 4 Baths | 3000 sqft',
        images: ['sold2.jpg', 'sold2-2.jpg', 'sold2-3.jpg']
    },
    3: {
        name: 'Beachside Mansion',
        description: 'A private beachfront mansion with direct access to sandy beaches and breathtaking ocean views.',
        price: '$5,500,000',
        details: '6 Beds | 8 Baths | 10,000 sqft',
        images: ['sold3.jpg', 'sold3-2.jpg', 'sold3-3.jpg']
    },
    4: {
        name: 'Mountain Retreat',
        description: 'Nestled in the mountains, this retreat offers tranquility with modern comforts and stunning vistas.',
        price: '$4,200,000',
        details: '4 Beds | 5 Baths | 6500 sqft',
        images: ['sold4.jpg', 'sold4-2.jpg', 'sold4-3.jpg']
    },
    5: {
        name: 'Urban Loft',
        description: 'A chic, industrial-style loft in the heart of the city, perfect for modern living.',
        price: '$1,900,000',
        details: '2 Beds | 2 Baths | 2000 sqft',
        images: ['sold5.jpg', 'sold5-2.jpg', 'sold5-3.jpg']
    }
};
