// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Navbar and Scroll Effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const parallaxSections = document.querySelectorAll('.parallax');
    parallaxSections.forEach(section => {
        const speed = section.dataset.speed;
        const offset = window.pageYOffset;
        section.style.backgroundPositionY = offset * speed + "px";
    });
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy");
    
    const lazyLoad = (target) => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        };
        
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                    observer.disconnect();
                }
            });
        }, options);
        
        io.observe(target);
    };
    
    lazyImages.forEach(lazyLoad);
});

// Scroll Animations
document.addEventListener("DOMContentLoaded", function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animateOnScroll = (target) => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1
        };
        
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.disconnect();
                }
            });
        }, options);
        
        io.observe(target);
    };
    
    animatedElements.forEach(animateOnScroll);
});

// Load More Content Dynamically
const loadMoreContent = (url, targetElement) => {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.new-content');
            targetElement.appendChild(newContent);
        })
        .catch(error => console.error('Error loading content:', error));
};

document.querySelector('.load-more-button').addEventListener('click', function() {
    const targetElement = document.querySelector('.project-grid');
    loadMoreContent('more-projects.html', targetElement);
});

// Tooltip Implementation
document.querySelectorAll('.tooltip').forEach(item => {
    item.addEventListener('mouseover', function() {
        const tooltipText = this.dataset.tooltip;
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip-box';
        tooltipElement.innerText = tooltipText;
        document.body.appendChild(tooltipElement);
        
        const rect = this.getBoundingClientRect();
        tooltipElement.style.left = `${rect.left + window.pageXOffset}px`;
        tooltipElement.style.top = `${rect.top + window.pageYOffset - tooltipElement.offsetHeight}px`;
    });
    
    item.addEventListener('mouseleave', function() {
        document.querySelector('.tooltip-box').remove();
    });
});

// Save and Apply User Settings
const saveUserSettings = (key, value) => {
    localStorage.setItem(key, value);
};

const applyUserSettings = () => {
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
        document.documentElement.style.fontSize = fontSize;
    }

    const colorScheme = localStorage.getItem('colorScheme');
    if (colorScheme) {
        document.body.className = colorScheme;
    }
};

// Check if the elements exist before attaching event listeners
const fontSizeSelector = document.querySelector('#fontSizeSelector');
if (fontSizeSelector) {
    fontSizeSelector.addEventListener('change', function() {
        const newFontSize = this.value;
        document.documentElement.style.fontSize = newFontSize;
        saveUserSettings('fontSize', newFontSize);
    });
}

const colorSchemeSelector = document.querySelector('#colorSchemeSelector');
if (colorSchemeSelector) {
    colorSchemeSelector.addEventListener('change', function() {
        const newColorScheme = this.value;
        document.body.className = newColorScheme;
        saveUserSettings('colorScheme', newColorScheme);
    });
}

document.addEventListener('DOMContentLoaded', applyUserSettings);

// Form Validation and AJAX Submission
const form = document.querySelector('.contact-form');

form.addEventListener('input', (event) => {
    const input = event.target;
    const errorElement = input.nextElementSibling;

    if (!input.validity.valid) {
        input.classList.add('invalid');
        errorElement.textContent = input.validationMessage;
        errorElement.style.display = 'block';
    } else {
        input.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const actionUrl = form.action;

    fetch(actionUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            form.reset();
            alert('Message sent successfully!');
        } else {
            alert('There was an error sending your message.');
        }
    })
    .catch(error => console.error('Error:', error));
});

// Modal Functionality
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.dataset.modal;
        const modal = document.getElementById(modalId);
        modal.classList.add('visible');
    });
});

document.querySelectorAll('.modal .close').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('visible');
    });
});

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('visible');
    }
});

// Custom Cursor
const customCursor = document.createElement('div');
customCursor.classList.add('custom-cursor');
document.body.appendChild(customCursor);

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseover', () => {
        customCursor.classList.add('cursor-hover');
    });
    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('cursor-hover');
    });
});

// Dark Mode Toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('img').forEach(img => {
        img.style.filter = document.body.classList.contains('dark-mode') ? 'brightness(0.7)' : 'none';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.classList.add('btn-primary');
    darkModeButton.style.position = 'fixed';
    darkModeButton.style.bottom = '20px';
    darkModeButton.style.right = '20px';
    darkModeButton.style.zIndex = '10000';
    darkModeButton.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeButton);
});

// Basic Analytics for Click Tracking
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', function() {
        const trackingData = {
            elementType: element.tagName.toLowerCase(),
            elementText: element.innerText || element.value,
            timeStamp: new Date().toISOString()
        };
        console.log('User Interaction:', trackingData);
        // Optionally, send this data to a server or analytics tool
    });
});

// Theme Color Selector
const themeColorSelector = document.getElementById('themeColorSelector');
if (themeColorSelector) {
    themeColorSelector.addEventListener('input', function() {
        const newColor = this.value;
        document.documentElement.style.setProperty('--theme-color', newColor);
        saveUserSettings('themeColor', newColor);
    });
}

// Apply saved theme color on load
const savedThemeColor = localStorage.getItem('themeColor');
if (savedThemeColor) {
    document.documentElement.style.setProperty('--theme-color', savedThemeColor);
}

// Font Family Selector
const fontFamilySelector = document.getElementById('fontFamilySelector');
if (fontFamilySelector) {
    fontFamilySelector.addEventListener('change', function() {
        const newFontFamily = this.value;
        document.body.style.fontFamily = newFontFamily;
        saveUserSettings('fontFamily', newFontFamily);
    });
}

// Apply saved font family on load
const savedFontFamily = localStorage.getItem('fontFamily');
if (savedFontFamily) {
    document.body.style.fontFamily = savedFontFamily;
}

// Background Image Selector
const backgroundSelector = document.getElementById('backgroundSelector');
if (backgroundSelector) {
    backgroundSelector.addEventListener('change', function() {
        const newBackground = this.value;
        document.querySelector('.header-background').style.backgroundImage = `url(${newBackground})`;
        saveUserSettings('backgroundImage', newBackground);
    });
}

// Apply saved background image on load
const savedBackgroundImage = localStorage.getItem('backgroundImage');
if (savedBackgroundImage) {
    document.querySelector('.header-background').style.backgroundImage = `url(${savedBackgroundImage})`;
}

// Heading Size Selector
const headingSizeSelector = document.getElementById('headingSizeSelector');
if (headingSizeSelector) {
    headingSizeSelector.addEventListener('change', function() {
        const newHeadingSize = this.value;
        document.documentElement.style.setProperty('--heading-size', newHeadingSize);
        saveUserSettings('headingSize', newHeadingSize);
    });
}

// Body Text Size Selector
const bodySizeSelector = document.getElementById('bodySizeSelector');
if (bodySizeSelector) {
    bodySizeSelector.addEventListener('change', function() {
        const newBodySize = this.value;
        document.documentElement.style.setProperty('--body-size', newBodySize);
        saveUserSettings('bodySize', newBodySize);
    });
}

// Apply saved text sizes on load
const savedHeadingSize = localStorage.getItem('headingSize');
const savedBodySize = localStorage.getItem('bodySize');
if (savedHeadingSize) {
    document.documentElement.style.setProperty('--heading-size', savedHeadingSize);
}
if (savedBodySize) {
    document.documentElement.style.setProperty('--body-size', savedBodySize);
}
