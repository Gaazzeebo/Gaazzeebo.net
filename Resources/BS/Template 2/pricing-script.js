document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from JSON file
    fetch('pricing-data.json')
        .then(response => response.json())
        .then(data => {
            populateTable(data.devices, 'devicesTable');
            populateTable(data.starterKits, 'starterKitsTable');
            populateTable(data.accessories, 'accessoriesTable');
            populateTable(data.printers, 'printersTable');
            populateTable(data.otherDevices, 'otherDevicesTable');
        });

    // Populate table with data
    function populateTable(data, tableId) {
        const tableBody = document.getElementById(tableId);
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(item => {
            const row = document.createElement('tr');
            for (let key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        });
    }

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchBar').value.toLowerCase();
        filterTable(query);
    });

    document.getElementById('searchBar').addEventListener('keyup', function() {
        const query = this.value.toLowerCase();
        filterTable(query);
    });

    function filterTable(query) {
        const tables = ['devicesTable', 'starterKitsTable', 'accessoriesTable', 'printersTable', 'otherDevicesTable'];
        tables.forEach(tableId => {
            const rows = document.querySelectorAll(`#${tableId} tr`);
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const match = Array.from(cells).some(cell => cell.textContent.toLowerCase().includes(query));
                if (match) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
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
