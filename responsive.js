// Function to adjust elements dynamically based on screen size
function adjustLayout() {
    const screenWidth = window.innerWidth;
    const templateGrid = document.querySelectorAll('.template-grid');
    
    // Adjust grid layout for different screen sizes
    templateGrid.forEach(grid => {
        if (screenWidth < 768) {
            grid.style.gridTemplateColumns = '1fr'; // Single column for smaller screens
        } else if (screenWidth >= 768 && screenWidth < 1024) {
            grid.style.gridTemplateColumns = '1fr 1fr'; // Two columns for medium screens
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'; // Reset to default for larger screens
        }
    });

    // Adjust font sizes for small screens
    const headings = document.querySelectorAll('h2, h3, h4');
    headings.forEach(heading => {
        if (screenWidth < 768) {
            heading.style.fontSize = '90%'; // Reduce font size for small screens
        } else {
            heading.style.fontSize = ''; // Reset for larger screens
        }
    });
}

// Add event listener for window resizing
window.addEventListener('resize', adjustLayout);

// Initial call to adjust layout on page load
document.addEventListener('DOMContentLoaded', adjustLayout);
