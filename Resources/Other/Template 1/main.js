document.addEventListener('DOMContentLoaded', function() {
    // Existing code for form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('input[type="text"]')?.value;
            const email = document.querySelector('input[type="email"]')?.value;
            const message = document.querySelector('textarea')?.value;
            
            if (!name || !email || !message) {
                alert('Please fill in all the fields.');
            } else {
                alert('Thank you, ' + name + '! Your message has been sent.');
            }
        });
    }

    // Existing slider functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;

    if (slider && slides.length) {
        document.querySelector('.next-btn')?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        });

        document.querySelector('.prev-btn')?.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    // Existing Back-to-Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        };

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Existing filter functionality
    const filterSelect = document.getElementById('filter');
    const propertyCards = document.querySelectorAll('.property-card');

    if (filterSelect && propertyCards.length) {
        filterSelect.addEventListener('change', function() {
            const selectedFilter = this.value;

            propertyCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (selectedFilter === 'all' || selectedFilter === cardType) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    } else {
        console.warn('Filter select or property cards not found.');
    }

    // New code for property details modal
    const modal = document.getElementById('propertyModal');
    const modalImg = document.querySelector('.modal-img');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalFeatures = document.getElementById('modalFeatures');
    const closeBtn = document.querySelector('.close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    let currentPropertyIndex = 0;
    let propertyImages = [];

    if (modal && modalImg && modalTitle && modalPrice && modalFeatures && closeBtn) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const propertyCard = this.closest('.property-card');
                if (propertyCard) {
                    const images = [
                        propertyCard.querySelector('img') ? propertyCard.querySelector('img').src : '',
                        propertyCard.getAttribute('data-img2') || '',
                        propertyCard.getAttribute('data-img3') || ''
                    ];
                    propertyImages = images.filter(img => img); // Remove any empty strings
                    currentPropertyIndex = 0;
                    
                    if (modalTitle) modalTitle.textContent = propertyCard.querySelector('h3') ? propertyCard.querySelector('h3').textContent : 'Title Not Found';
                    if (modalPrice) modalPrice.textContent = propertyCard.querySelector('.price') ? propertyCard.querySelector('.price').textContent : 'Price Not Found';
                    if (modalFeatures) modalFeatures.innerHTML = propertyCard.querySelector('.features') ? propertyCard.querySelector('.features').innerHTML : 'Features Not Found';
                    if (modalImg) modalImg.src = images[0] || 'placeholder.jpg'; // Use a placeholder if no image
                    modal.style.display = "block";
                } else {
                    console.error('Property card not found for button:', button);
                }
            });
        });

        closeBtn.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        document.querySelector('.next-photo')?.addEventListener('click', function() {
            if (propertyImages.length > 1) {
                currentPropertyIndex = (currentPropertyIndex + 1) % propertyImages.length;
                modalImg.src = propertyImages[currentPropertyIndex];
            }
        });

        document.querySelector('.prev-photo')?.addEventListener('click', function() {
            if (propertyImages.length > 1) {
                currentPropertyIndex = (currentPropertyIndex - 1 + propertyImages.length) % propertyImages.length;
                modalImg.src = propertyImages[currentPropertyIndex];
            }
        });
    } else {
        console.error('One or more modal elements not found');
    }

    // Responsive functions with null checks
    function setViewport() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
            document.head.appendChild(viewport);
        }
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }

    function adjustFontSize() {
        const width = window.innerWidth;
        const baseFontSize = width > 768 ? 16 : width > 480 ? 14 : 12;
        document.documentElement.style.fontSize = baseFontSize + 'px';
    }

    function handleImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Implementation for srcset or size adjustment would go here
        });
    }

    function adjustLayout() {
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }

    function isTouchDevice() {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    // Initial setup for responsive features
    setViewport();
    adjustFontSize();
    handleImages();
    adjustLayout();

    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }

    // Event listener for responsive changes
    window.addEventListener('resize', function() {
        adjustFontSize();
        adjustLayout();
    });

    // Ensure all interactive elements exist before adding event listeners
    const interactiveElements = ['.next-btn', '.prev-btn', '#back-to-top', 'form', '#filter'];
    interactiveElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element with selector ${selector} not found.`);
        }
    });
});