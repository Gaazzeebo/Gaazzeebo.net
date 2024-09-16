document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from JSON file
    fetch('micamp-data.json')
        .then(response => response.json())
        .then(data => {
            populateContent(data);
        });

    // Populate content with data
    function populateContent(data) {
        const content = document.getElementById('content');
        data.forEach(section => {
            const sectionElement = document.createElement('section');
            sectionElement.classList.add('content-section');

            const title = document.createElement('h2');
            title.textContent = section.title;
            sectionElement.appendChild(title);

            const overview = document.createElement('p');
            overview.innerHTML = `<strong>Overview:</strong> ${section.overview}`;
            sectionElement.appendChild(overview);

            const featuresList = document.createElement('ul');
            section.features.forEach(feature => {
                const featureItem = document.createElement('li');
                featureItem.textContent = feature;
                featuresList.appendChild(featureItem);
            });
            sectionElement.appendChild(featuresList);

            const additionalDetails = document.createElement('p');
            additionalDetails.innerHTML = `<strong>Additional Details:</strong> ${section.additionalDetails}`;
            sectionElement.appendChild(additionalDetails);

            const sources = document.createElement('p');
            sources.innerHTML = `<strong>Sources:</strong> ${section.sources.map(source => `<a href="${source.url}" target="_blank">${source.name}</a>`).join(', ')}`;
            sectionElement.appendChild(sources);

            content.appendChild(sectionElement);
        });
    }

    // Dark mode toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const darkModeToggleButton = document.querySelector('.dark-mode-toggle');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggleButton.textContent = 'Light Mode';
        } else {
            darkModeToggleButton.textContent = 'Dark Mode';
        }
    }

    // Attach toggle function to button
    document.querySelector('.dark-mode-toggle').addEventListener('click', toggleDarkMode);
});
