document.addEventListener("DOMContentLoaded", () => {
    // Handle dynamic loading of records on Buy, Sell, and Trade pages
    const recordGrid = document.querySelector('.record-grid');

    if (recordGrid) {
        const records = [
            { title: "Classic Rock Album", description: "A timeless classic rock album from the 70s.", image: "record1.jpg", price: "$20" },
            { title: "Jazz Vinyl", description: "A smooth jazz vinyl perfect for any collection.", image: "record2.jpg", price: "$15" },
            { title: "Pop Hits", description: "Top pop hits from the early 2000s.", image: "record3.jpg", price: "$10" },
            { title: "Vintage Soul Record", description: "A soulful record with vintage vibes.", image: "record4.jpg", price: "$25" }
        ];

        records.forEach(record => {
            const recordCard = document.createElement('div');
            recordCard.classList.add('record-card');
            recordCard.innerHTML = `
                <img src="${record.image}" alt="${record.title}">
                <h3>${record.title}</h3>
                <p>${record.description}</p>
                <p><strong>${record.price}</strong></p>
                <button class="btn-primary buy-button">Buy Now</button>
            `;
            recordGrid.appendChild(recordCard);
        });
    }

    // Handle Buy Now button click
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Thank you for your purchase! Your record will be shipped soon.');
        });
    });

    // Handle Sell Form submission
    const sellForm = document.getElementById("sell-form");
    if (sellForm) {
        sellForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for submitting your record! Our team will review it and get back to you with an offer.");
            sellForm.reset();
        });
    }

    // Handle Trade Form submission (if applicable)
    const tradeForm = document.getElementById("trade-form");
    if (tradeForm) {
        tradeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for submitting your trade request! We will contact you shortly with potential matches.");
            tradeForm.reset();
        });
    }
});
