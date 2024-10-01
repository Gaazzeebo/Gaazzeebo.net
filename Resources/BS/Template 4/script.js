document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");
    const serviceItems = document.querySelectorAll(".service-item");
    const membershipItems = document.querySelectorAll(".membership-item");

    function handleScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = sectionTop < window.innerHeight - 100;
            if (sectionVisible) {
                section.classList.add("active");
            }
        });

        serviceItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                setTimeout(() => item.classList.add("active"), index * 100); // Staggered animation
            }
        });

        membershipItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 100) {
                setTimeout(() => item.classList.add("active"), index * 100); // Staggered animation
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // For initial load
});
