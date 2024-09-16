// gallery.js

// Carousel variables
let currentImgIndex = 0;
let images;
const totalImages = 5;  // Assuming each project has 5 images

// Project details object
const projectDetails = {
    'project1': {
            title: 'Boulder Garden in Durham, NC',
            description: 'Modern living with classic charm, offering residents a unique blend of comfort and style.',
            images: ['project1-1.jpg', 'project1-2.jpg', 'project1-3.jpg', 'project1-4.jpg', 'project1-5.jpg'],
            info: [
                'Location: Durham, NC',
                'Completion Date: March 2024',
                'Key Features: Sustainable materials, energy-efficient design, landscaped gardens.',
                'Client Testimonial: "A true gem in the heart of Durham. The attention to detail is unmatched."'
            ]
        },
'project2': {
            title: 'Geer House Apartments in Durham, NC',
            description: 'A blend of style and comfort, providing residents with an elegant and modern living experience.',
            images: ['project2-1.jpg', 'project2-2.jpg', 'project2-3.jpg', 'project2-4.jpg', 'project2-5.jpg'],
            info: [
                'Location: Durham, NC',
                'Completion Date: January 2024',
                'Key Features: State-of-the-art fitness center, rooftop lounge, smart home technology.',
                'Client Testimonial: "Living here has been a dream. The amenities are top-notch."'
            ]
},
'project3': {
    title: 'Oakwood Residences in Chapel Hill, NC',
    description: 'Experience luxury living in a serene environment, combining modern amenities with classic charm.',
    images: ['project3-1.jpg', 'project3-2.jpg', 'project3-3.jpg', 'project3-4.jpg', 'project3-5.jpg'],
    info: [
        'Location: Chapel Hill, NC',
        'Completion Date: March 2024',
        'Key Features: Infinity pool, private garden spaces, cutting-edge security systems.',
        'Client Testimonial: "This place is a true retreat from the hustle and bustle of city life."'
    ]
},
'project4': {
    title: 'Riverfront Towers in Wilmington, NC',
    description: 'An urban oasis offering breathtaking river views and unparalleled comfort.',
    images: ['project4-1.jpg', 'project4-2.jpg', 'project4-3.jpg', 'project4-4.jpg', 'project4-5.jpg'],
    info: [
        'Location: Wilmington, NC',
        'Completion Date: June 2024',
        'Key Features: Panoramic balconies, on-site gourmet dining, energy-efficient designs.',
        'Client Testimonial: "Living here feels like a permanent vacation by the river."'
    ]
},
'project5': {
    title: 'Harbor View Condominiums in Beaufort, NC',
    description: 'Coastal living at its finest, where modern architecture meets historic charm.',
    images: ['project5-1.jpg', 'project5-2.jpg', 'project5-3.jpg', 'project5-4.jpg', 'project5-5.jpg'],
    info: [
        'Location: Beaufort, NC',
        'Completion Date: September 2024',
        'Key Features: Private marina access, seaside walking trails, smart home automation.',
        'Client Testimonial: "A perfect blend of luxury and tranquility. The view is unbeatable."'
    ]
},
'project6': {
    title: 'Maple Ridge Villas in Cary, NC',
    description: 'Sophisticated suburban living with the convenience of urban amenities.',
    images: ['project6-1.jpg', 'project6-2.jpg', 'project6-3.jpg', 'project6-4.jpg', 'project6-5.jpg'],
    info: [
        'Location: Cary, NC',
        'Completion Date: December 2024',
        'Key Features: Community clubhouse, outdoor cinema, eco-friendly designs.',
        'Client Testimonial: "Maple Ridge Villas offers the perfect blend of community and privacy."'
    ]
},
'project7': {
    title: 'Pinehurst Estates in Raleigh, NC',
    description: 'Luxury redefined in a gated community, offering the best in modern living.',
    images: ['project7-1.jpg', 'project7-2.jpg', 'project7-3.jpg', 'project7-4.jpg', 'project7-5.jpg'],
    info: [
        'Location: Raleigh, NC',
        'Completion Date: February 2025',
        'Key Features: Private swimming pool, expansive green spaces, top-tier security systems.',
        'Client Testimonial: "An exceptional place to call home with amenities that cater to all."'
    ]
},
'project8': {
    title: 'Elmwood Gardens in Greensboro, NC',
    description: 'Urban living meets nature with these modern apartments set in lush gardens.',
    images: ['project8-1.jpg', 'project8-2.jpg', 'project8-3.jpg', 'project8-4.jpg', 'project8-5.jpg'],
    info: [
        'Location: Greensboro, NC',
        'Completion Date: May 2025',
        'Key Features: Zen garden, rooftop terrace, on-site wellness center.',
        'Client Testimonial: "The perfect blend of nature and modernity. I love coming home to Elmwood Gardens."'
    ]
},
'project9': {
    title: 'The Summit at Blue Ridge in Asheville, NC',
    description: 'Mountain retreat living with modern conveniences and stunning views.',
    images: ['project9-1.jpg', 'project9-2.jpg', 'project9-3.jpg', 'project9-4.jpg', 'project9-5.jpg'],
    info: [
        'Location: Asheville, NC',
        'Completion Date: August 2025',
        'Key Features: Mountain-view balconies, hiking trails, sustainable building materials.',
        'Client Testimonial: "Waking up to the mountain views every day is truly magical."'
    ]
},
'project10': {
    title: 'Lakeside Manor in Charlotte, NC',
    description: 'Exclusive lakeside living with high-end amenities and stunning architecture.',
    images: ['project10-1.jpg', 'project10-2.jpg', 'project10-3.jpg', 'project10-4.jpg', 'project10-5.jpg'],
    info: [
        'Location: Charlotte, NC',
        'Completion Date: November 2025',
        'Key Features: Private lake access, luxury spa, smart home features.',
        'Client Testimonial: "Lakeside Manor offers unparalleled luxury in a beautiful setting."'
    ]
}


    // Continue with other project details...
};

// Function to display project details in a modal
function viewProjectDetail(projectId) {
    const project = projectDetails[projectId];

    if (project) {
        document.getElementById('project-detail-title').innerText = project.title;
        document.getElementById('project-detail-description').innerText = project.description;

        images = project.images;
        currentImgIndex = 0;
        updateCarousel();

        const infoList = document.getElementById('project-detail-info-list');
        infoList.innerHTML = '';
        project.info.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            infoList.appendChild(li);
        });

        document.getElementById('project-detail').style.display = "flex";
    }
}

// Function to update the carousel with the current image
function updateCarousel() {
    const slide = document.querySelector('.carousel-slide');
    slide.style.transform = `translateX(-${currentImgIndex * 100}%)`;

    // Update images
    for (let i = 0; i < totalImages; i++) {
        document.getElementById(`project-detail-img-${i+1}`).src = images[i];
    }
}

// Function to close the project detail modal
function closeProjectDetail() {
    document.getElementById('project-detail').style.display = "none";
}

// Carousel navigation controls
document.addEventListener('DOMContentLoaded', () => {
    const prevControl = document.querySelector('.carousel-control-prev');
    const nextControl = document.querySelector('.carousel-control-next');
    
    if (prevControl && nextControl) {
        prevControl.addEventListener('click', () => {
            currentImgIndex = (currentImgIndex > 0) ? currentImgIndex - 1 : totalImages - 1;
            updateCarousel();
        });

        nextControl.addEventListener('click', () => {
            currentImgIndex = (currentImgIndex < totalImages - 1) ? currentImgIndex + 1 : 0;
            updateCarousel();
        });
    }
});

// Function to load the gallery items dynamically
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    for (let projectId in projectDetails) {
        const project = projectDetails[projectId];
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('onclick', `viewProjectDetail('${projectId}')`);

        galleryItem.innerHTML = `
            <img src="${project.images[0]}" alt="${project.title}">
            <div class="gallery-info">
                <h3>${project.title}</h3>
                <p>${project.description.split('.')[0]}</p>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
    }
}

// Function to filter gallery items based on search input
function filterGallery() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const galleryGrid = document.getElementById('gallery-grid');
    galleryGrid.innerHTML = '';

    for (let projectId in projectDetails) {
        const project = projectDetails[projectId];
        const searchText = (project.title + project.description + project.info.join(' ')).toLowerCase();

        if (searchText.includes(searchInput)) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('onclick', `viewProjectDetail('${projectId}')`);

            galleryItem.innerHTML = `
                <img src="${project.images[0]}" alt="${project.title}">
                <div class="gallery-info">
                    <h3>${project.title}</h3>
                    <p>${project.description.split('.')[0]}</p>
                </div>
            `;

            galleryGrid.appendChild(galleryItem);
        }
    }
}

// Initialize gallery and set up search event listener
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    const searchBar = document.getElementById('search-bar');
    
    if (searchBar) {
        searchBar.addEventListener('input', filterGallery);
    }
});
