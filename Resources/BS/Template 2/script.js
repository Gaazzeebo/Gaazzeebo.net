// Define translations for static text
const translations = {
    en: {
        headerTitle: "POS Info Search",
        searchPlaceholder: "Search for POS systems, gateways, or industries...",
        searchButton: "Search",
        categoryFilter: "No Category Selected",
        gatewayFilter: "No Gateway Selected",
        industryFilter: "No Industry Selected",
        sortByName: "Sort by Name",
        sortByCategory: "Sort by Category",
        sortByRating: "Sort by Rating",
        noResults: "No results found.",
        footerText: "&copy; 2024 POS Info Search. All rights reserved.",
        description: "Description",
        keyFunctions: "Key Functions",
        applications: "Applications",
        examples: "Examples",
        category: "Category",
        gateways: "Gateways",
        industries: "Industries",
        price: "Price",
        rating: "Rating",
        gatewayDetailsTitle: "Gateway Details",
        softwareTitle: "Software",
        supportedGateways: "Supported Gateways",
        supportedIndustries: "Supported Industries",
        features: "Features",
        reviewsTitle: "Reviews",
        user: "User",
        comment: "Comment"
    },
    es: {
        headerTitle: "Búsqueda de Información de POS",
        searchPlaceholder: "Buscar sistemas POS, pasarelas o industrias...",
        searchButton: "Buscar",
        categoryFilter: "Ninguna Categoría Seleccionada",
        gatewayFilter: "Ninguna Pasarela Seleccionada",
        industryFilter: "Ninguna Industria Seleccionada",
        sortByName: "Ordenar por Nombre",
        sortByCategory: "Ordenar por Categoría",
        sortByRating: "Ordenar por Calificación",
        noResults: "No se encontraron resultados.",
        footerText: "&copy; 2024 Búsqueda de Información de POS. Todos los derechos reservados.",
        description: "Descripción",
        keyFunctions: "Funciones Clave",
        applications: "Aplicaciones",
        examples: "Ejemplos",
        category: "Categoría",
        gateways: "Pasarelas",
        industries: "Industrias",
        price: "Precio",
        rating: "Calificación",
        gatewayDetailsTitle: "Detalles de la Pasarela",
        softwareTitle: "Software",
        supportedGateways: "Pasarelas Soportadas",
        supportedIndustries: "Industrias Soportadas",
        features: "Características",
        reviewsTitle: "Reseñas",
        user: "Usuario",
        comment: "Comentario"
    },
    // Add other languages as needed
};

function translatePage() {
    const language = document.getElementById('languageSelect').value;

    // Update static text
    document.querySelector('header h1').textContent = translations[language].headerTitle;
    document.getElementById('searchBar').placeholder = translations[language].searchPlaceholder;
    document.getElementById('searchButton').textContent = translations[language].searchButton;
    document.getElementById('categoryFilter').innerHTML = `<option value="">${translations[language].categoryFilter}</option>`;
    document.getElementById('gatewayFilter').innerHTML = `<option value="">${translations[language].gatewayFilter}</option>`;
    document.getElementById('industryFilter').innerHTML = `<option value="">${translations[language].industryFilter}</option>`;
    document.getElementById('sortFilter').innerHTML = `
        <option value="name">${translations[language].sortByName}</option>
        <option value="category">${translations[language].sortByCategory}</option>
        <option value="rating">${translations[language].sortByRating}</option>
    `;
    document.querySelector('footer p').innerHTML = translations[language].footerText;

    // Re-populate filters to apply translations
    populateFilters();

    // Update displayed results based on new language
    filterAndDisplayResults();
}

$(document).ready(function () {
    let posData = [];
    let gatewayDetails = [];
    let currentPage = 1;
    const itemsPerPage = 5;

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            posData = data.posSystems;
            gatewayDetails = data.gatewayDetails;
            populateFilters();
            displayResults(posData);
            setupPagination(posData.length);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    $('#searchBar').on('input', function () {
        filterAndDisplayResults();
    });

    $('#searchButton').on('click', function () {
        filterAndDisplayResults();
    });

    $('#categoryFilter, #gatewayFilter, #industryFilter, #sortFilter').on('change', function () {
        filterAndDisplayResults();
    });

    $('#languageSelect').on('change', function () {
        translatePage();
    });

    $('#prevPage').on('click', function (e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            filterAndDisplayResults();
        }
    });

    $('#nextPage').on('click', function (e) {
        e.preventDefault();
        const totalItems = posData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterAndDisplayResults();
        }
    });

    function populateFilters() {
        const language = document.getElementById('languageSelect').value;
        const categories = [...new Set(posData.map(item => item.category[language]))];
        const gateways = [...new Set(gatewayDetails.map(item => item.name))];
        const industries = [...new Set(posData.flatMap(item => item.industries[language]))];

        populateFilter($('#categoryFilter'), categories, translations[language].category);
        populateFilter($('#gatewayFilter'), gateways, translations[language].gateways);
        populateFilter($('#industryFilter'), industries, translations[language].industries);
    }

    function populateFilter(filterElement, items, filterType) {
        filterElement.empty(); // Ensure the filter is emptied before populating
        filterElement.append(`<option value="">No ${filterType} Selected</option>`);
        items.forEach(item => {
            filterElement.append(`<option value="${item}">${item}</option>`);
        });
    }

    function filterAndDisplayResults() {
        const language = document.getElementById('languageSelect').value;
        const query = $('#searchBar').val().toLowerCase();
        const category = $('#categoryFilter').val().toLowerCase();
        const gateway = $('#gatewayFilter').val().toLowerCase();
        const industry = $('#industryFilter').val().toLowerCase();
        const sort = $('#sortFilter').val();

        let results = posData.filter(item => {
            return (
                (item.name[language].toLowerCase().includes(query) ||
                    item.category[language].toLowerCase().includes(query) ||
                    item.gateways.some(gw => gw.toLowerCase().includes(query)) ||
                    item.industries[language].some(ind => ind.toLowerCase().includes(query)) ||
                    item.software.some(software => software.name[language].toLowerCase().includes(query))) &&
                (category === '' || item.category[language].toLowerCase() === category) &&
                (gateway === '' || item.gateways.some(gw => gw.toLowerCase() === gateway)) &&
                (industry === '' || item.industries[language].some(ind => ind.toLowerCase() === industry))
            );
        });

        results = sortResults(results, sort);
        displayResults(results);
        setupPagination(results.length);
    }

    function sortResults(results, sort) {
        const language = document.getElementById('languageSelect').value;
        if (sort === 'name') {
            return results.sort((a, b) => a.name[language].localeCompare(b.name[language]));
        } else if (sort === 'category') {
            return results.sort((a, b) => a.category[language].localeCompare(b.category[language]));
        } else if (sort === 'rating') {
            return results.sort((a, b) => b.rating - a.rating);
        }
        return results;
    }

    function displayResults(results) {
        const resultsContainer = $('#results');
        resultsContainer.empty();

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedResults = results.slice(start, end);

        if (paginatedResults.length === 0) {
            const language = document.getElementById('languageSelect').value;
            const translation = translations[language];
            resultsContainer.html(`<p>${translation.noResults}</p>`);
            return;
        }

        paginatedResults.forEach(item => {
            const language = document.getElementById('languageSelect').value;
            const gatewayInfo = item.gateways.map(gateway => {
                const details = gatewayDetails.find(detail => detail.name === gateway);
                if (!details) {
                    console.warn(`Details for gateway "${gateway}" not found.`);
                    return ''; // Check if details are found
                }

                // Add additional checks for undefined properties
                const description = details.description && details.description[language] ? details.description[language] : 'N/A';
                const keyFunctions = details.keyFunctions && details.keyFunctions[language] ? details.keyFunctions[language].join(', ') : 'N/A';
                const applications = details.applications && details.applications[language] ? details.applications[language].join(', ') : 'N/A';
                const examples = details.examples ? details.examples.join(', ') : 'N/A';

                return `
                    <div class="gateway-details">
                        <h5>${details.name}</h5>
                        <p><strong>${translations[language].description}:</strong> ${description}</p>
                        <p><strong>${translations[language].keyFunctions}:</strong> ${keyFunctions}</p>
                        <p><strong>${translations[language].applications}:</strong> ${applications}</p>
                        <p><strong>${translations[language].examples}:</strong> ${examples}</p>
                    </div>
                `;
            }).join('');

            const resultItem = $(`
                <div class="result-item">
                    <h2>${item.name[language]}</h2>
                    <p><strong>${translations[language].category}:</strong> ${item.category[language]}</p>
                    <p><strong>${translations[language].gateways}:</strong> ${item.gateways.join(', ')}</p>
                    <p><strong>${translations[language].industries}:</strong> ${item.industries[language].join(', ')}</p>
                    <p><strong>${translations[language].description}:</strong> ${item.description[language]}</p>
                    <p><strong>${translations[language].price}:</strong> ${item.price[language]}</p>
                    <p><strong>${translations[language].rating}:</strong> ${item.rating}</p>
                    <h3>${translations[language].gatewayDetailsTitle}</h3>
                    ${gatewayInfo}
                    <h3>${translations[language].softwareTitle}</h3>
                    ${item.software.map(software => `
                        <div class="software-item">
                            <h4>${software.name[language]}</h4>
                            <p><strong>${translations[language].supportedGateways}:</strong> ${software.supportedGateways.join(', ')}</p>
                            <p><strong>${translations[language].supportedIndustries}:</strong> ${software.supportedIndustries[language].join(', ')}</p>
                            <p><strong>${translations[language].features}:</strong> ${software.features[language].join(', ')}</p>
                        </div>
                    `).join('')}
                    <h3>${translations[language].reviewsTitle}</h3>
                    ${item.reviews.map(review => `
                        <div class="review-item">
                            <p><strong>${review.user}</strong>: ${review.comment[language]} (${review.rating}/5)</p>
                        </div>
                    `).join('')}
                </div>
            `);
            resultsContainer.append(resultItem);
        });
    }

    function setupPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pagination = $('.pagination');
        pagination.find('.page-item:not(:first-child, :last-child)').remove();

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = $(`
                <li class="page-item"><a class="page-link" href="#">${i}</a></li>
            `);
            pageItem.on('click', function (e) {
                e.preventDefault();
                currentPage = i;
                filterAndDisplayResults();
            });
            pagination.find('.page-item:last-child').before(pageItem);
        }
    }

    // Admin login handling
    $('#adminLoginForm').on('submit', function (e) {
        e.preventDefault();
        const username = $('#adminUsername').val();
        const password = $('#adminPassword').val();

        // Perform authentication (this is just a placeholder, implement your own logic)
        if (username === 'admin' && password === 'password') {
            $('#adminLoginModal').modal('hide');
            $('#adminDashboard').show();
        } else {
            alert('Invalid credentials!');
        }
    });

    // Admin logout handling
    $('#logoutButton').on('click', function () {
        $('#adminDashboard').hide();
    });

    // Add new item (placeholder function)
    $('#addNewItem').on('click', function () {
        alert('Functionality to add a new item goes here.');
    });
});

/* Dark Mode Toggle */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
