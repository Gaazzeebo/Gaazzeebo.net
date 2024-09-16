document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll functionality for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive animations for menu items
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'scale(1.05)';
            item.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = 'none';
        });
    });

    // Flip card functionality for menu items
    document.querySelectorAll('.learn-more-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            menuItems[index].classList.add('flipped');
        });
    });

    document.querySelectorAll('.go-back-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            menuItems[index].classList.remove('flipped');
        });
    });

    // Animation for hero button
    document.querySelector('.cta-button').addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0px 4px 20px rgba(255, 64, 129, 0.8)';
    });

    document.querySelector('.cta-button').addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0px 4px 20px rgba(255, 64, 129, 0.6)';
    });

    // Hero image carousel
    const heroImages = [
        'https://source.unsplash.com/1600x900/?gourmet-food-truck',
        'https://source.unsplash.com/1600x900/?burger',
        'https://source.unsplash.com/1600x900/?street-food'
    ];

    let currentImageIndex = 0;
    const heroSection = document.querySelector('.hero');

    function changeHeroImage() {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
    }

    setInterval(changeHeroImage, 5000);

    // Hero background color transition
    const colors = ['#ff6f61', '#ff9478', '#ffca85', '#ffb74d'];
    let currentColorIndex = 0;

    function changeHeroBackground() {
        heroSection.style.background = `linear-gradient(135deg, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`;
        currentColorIndex = (currentColorIndex + 1) % colors.length;
    }

    setInterval(changeHeroBackground, 5000);
    heroSection.style.transition = 'background 2s ease-in-out';

    // Google Maps Integration
    function initMap() {
        if (!window.google || !window.google.maps) {
            console.error('Google Maps API not loaded');
            return;
        }

        const mapOptions = {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12,
            mapId: 'd90ce7d0d74eec62',
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
                // Your map styles here
            ]
        };

        const map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Custom marker with CSS styled pin
        const marker = new google.maps.Marker({
            position: { lat: 40.7128, lng: -74.0060 },
            map: map,
            title: "Mobile Munchies Truck",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#FF6347',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF'
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "<h4>Mobile Munchies Truck</h4><p>Come taste our gourmet street food!</p>"
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }

    // Your existing CSS for .location-map remains unchanged

// Google Maps Integration
function initMap() {
    if (!window.google || !window.google.maps) {
        console.error('Google Maps API not loaded');
        return;
    }

    const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        mapId: 'd90ce7d0d74eec62',
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            // Your map styles here
        ]
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// Function to load Google Maps script dynamically
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            console.log('Google Maps API already loaded.');
            resolve();
            return;
        }

        const callbackName = `initMap_${Date.now()}`; // Generate a unique callback name
        window[callbackName] = function() {
            console.log('Google Maps API loaded.');
            resolve();
            if (typeof initMap === 'function') {
                initMap();
            }
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhJGwnMqiTDnAXM3hXk0iB9zU7hJcoE8s&callback=${callbackName}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onerror = () => {
            reject(new Error('Failed to load Google Maps API'));
        };
    });
}



document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerContainer = document.querySelector('.header-container');

    if(menuToggle && navLinks) {
        // Function to toggle the menu
        function toggleMenu() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body overflow to prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }

        // Event listener for the menu toggle
        menuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking outside of it
        document.addEventListener('click', function(event) {
            const isClickInside = headerContainer.contains(event.target);
            if (!isClickInside && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Optional: Close the menu when a nav link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                if(window.innerWidth <= 768) { // Mobile breakpoint
                    toggleMenu();
                }
            });
        });
    }

    // Optional: Add class to header when scrolled
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            headerContainer.classList.add('scrolled');
        } else {
            headerContainer.classList.remove('scrolled');
        }
    });
});


// Load Google Maps
document.addEventListener('DOMContentLoaded', function() {
    loadGoogleMapsScript().then(() => {
        console.log('Google Maps initialized');
    }).catch(error => {
        console.error('Error loading Google Maps:', error);
    });
});

    // Additional functionality for form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        console.log('Form data:', Object.fromEntries(formData.entries()));
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Lazy loading for images
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Responsive menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(navItem => {
            navItem.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    } else {
        console.error('Menu toggle or nav menu not found');
    }
});