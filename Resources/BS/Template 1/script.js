document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scroll
    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Loading Animation
    const loading = document.getElementById("loading");
    if (loading) {
        setTimeout(() => {
            loading.style.display = "none";
        }, 2000);
    }

    // Toggle Theme
    const themeToggle = document.getElementById("theme-toggle");
    let partyMode = false;
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            partyMode = !partyMode;
            if (partyMode) {
                document.body.classList.add("rainbow-party");
            } else {
                document.body.classList.remove("rainbow-party");
                document.body.classList.toggle("dark-mode");
            }
        });
    }

    // Dynamic Artist Profiles
    const artistGrid = document.querySelector('.artist-grid');
    if (artistGrid) {
        const artists = [
            { name: "Artist 1", bio: "Description of Artist 1", image: "artist1.jpg" },
            { name: "Artist 2", bio: "Description of Artist 2", image: "artist2.jpg" },
            { name: "Artist 3", bio: "Description of Artist 3", image: "artist3.jpg" },
            { name: "Artist 4", bio: "Description of Artist 4", image: "artist4.jpg" }
        ];
        artists.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.classList.add('artist-card');
            artistCard.innerHTML = `
                <img src="${artist.image}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>${artist.bio}</p>
            `;
            artistCard.addEventListener('click', () => showArtistDetails(artist));
            artistGrid.appendChild(artistCard);
        });
    }

    function showArtistDetails(artist) {
        const modal = document.createElement('div');
        modal.classList.add('artist-modal');
        modal.setAttribute('aria-label', `Details of ${artist.name}`);
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${artist.image}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>${artist.bio}</p>
                <a href="#">Visit Social Media</a>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModal = modal.querySelector('.close');
        closeModal.addEventListener('click', () => modal.remove());
    }

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', e => {
        if (cursor) {
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
        }
    });

    document.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('link-hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('link-hover'));
    });

    // Music Player with Visualizer
    const audioPlayer = document.getElementById('audio-player');
    const visualizerCanvas = document.getElementById('visualizer');
    if (audioPlayer && visualizerCanvas) {
        const canvasCtx = visualizerCanvas.getContext('2d');
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function drawVisualizer() {
            requestAnimationFrame(drawVisualizer);
            analyser.getByteFrequencyData(dataArray);
            canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

            const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                canvasCtx.fillRect(x, visualizerCanvas.height - barHeight / 2, barWidth, barHeight / 2);
                x += barWidth + 1;
            }
        }
        drawVisualizer();
    }

    // Playlist functionality
    document.querySelectorAll('.playlist a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            if (audioPlayer) {
                audioPlayer.src = this.getAttribute('data-src');
                audioPlayer.play();
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Record Grid Dynamic Loading
    const recordGrid = document.querySelector('.record-grid');
    if (recordGrid) {
        const records = [
            { title: "Record 1", description: "Description of Record 1", image: "record1.jpg" },
            { title: "Record 2", description: "Description of Record 2", image: "record2.jpg" },
            { title: "Record 3", description: "Description of Record 3", image: "record3.jpg" },
            { title: "Record 4", description: "Description of Record 4", image: "record4.jpg" }
        ];
        records.forEach(record => {
            const recordCard = document.createElement('div');
            recordCard.classList.add('record-card');
            recordCard.innerHTML = `
                <img src="${record.image}" alt="${record.title}">
                <h3>${record.title}</h3>
                <p>${record.description}</p>
            `;
            recordGrid.appendChild(recordCard);
        });
    }

    // Price Estimator (Auto-calculate on input change)
    const estimatedPriceInput = document.getElementById("estimated-price");
    const conditionInput = document.getElementById("condition");
    const yearInput = document.getElementById("year");

    function calculatePrice() {
        const condition = conditionInput.value;
        const year = parseInt(yearInput.value);
        let basePrice = 50;

        switch (condition) {
            case "mint":
                basePrice *= 1.5;
                break;
            case "near-mint":
                basePrice *= 1.3;
                break;
            case "very-good":
                basePrice *= 1.1;
                break;
            case "good":
                basePrice *= 0.9;
                break;
            case "fair":
                basePrice *= 0.7;
                break;
            case "poor":
                basePrice *= 0.5;
                break;
            default:
                basePrice = 50;
        }

        const currentYear = new Date().getFullYear();
        const age = currentYear - year;

        if (age > 50) {
            basePrice *= 1.2;
        } else if (age > 30) {
            basePrice *= 1.1;
        } else if (age > 10) {
            basePrice *= 1.05;
        }

        const estimatedPrice = Math.round(basePrice / 10) * 10;
        estimatedPriceInput.value = `$${estimatedPrice}`;
    }

    if (conditionInput && yearInput) {
        conditionInput.addEventListener("change", calculatePrice);
        yearInput.addEventListener("input", calculatePrice);
    }
});
