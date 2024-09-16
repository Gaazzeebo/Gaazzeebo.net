document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponent('header', 'header.html');
    loadComponent('hero', 'hero.html');
    loadComponent('about', 'about.html');
    loadComponent('services', 'services.html');
    loadComponent('portfolio', 'portfolio.html');
    loadComponent('testimonials', 'testimonials.html');
    loadComponent('newsletter', 'newsletter.html');
    loadComponent('contact', 'contact.html');
    loadComponent('footer', 'footer.html');
    loadComponent('chatbot', 'chatbot.html', initChatbot); // Load chatbot and then initialize it

    window.addEventListener('scroll', parallaxEffect);

    // Initialize background animations
    initBackgroundAnimations();
});

function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // Execute callback after loading
        })
        .catch(err => console.error(`Failed to load ${file}:`, err));
}

// Parallax effect for hero background
function parallaxEffect() {
    const hero = document.querySelector('#hero');
    let scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
}

// Initialize Chatbot
function initChatbot() {
    const chatbotContainer = document.getElementById('edgar-chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotSend = document.getElementById('chatbot-send');
    let keywordIndex = {}; // Index for fast lookups

    // Clear local storage to ensure new data is loaded
    window.localStorage.clear();

    // Check for stored data to avoid reloading
    if (window.localStorage.getItem('chatbotData')) {
        keywordIndex = JSON.parse(window.localStorage.getItem('chatbotData'));
        console.log('Loaded chatbot data from local storage.');
    } else {
        loadResponseData().then(data => {
            keywordIndex = buildKeywordIndex(data);
            window.localStorage.setItem('chatbotData', JSON.stringify(keywordIndex));
        });
    }

    if (chatbotToggle && chatbotContainer && chatbotClose && chatbotInput && chatbotMessages && chatbotSend) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.style.display = 'flex';
            chatbotToggle.style.display = 'none';
        });

        chatbotClose.addEventListener('click', () => {
            chatbotContainer.style.display = 'none';
            chatbotToggle.style.display = 'block';
        });

        chatbotSend.addEventListener('click', () => {
            sendMessage();
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error('Chatbot elements not found in the DOM.');
    }

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatbotInput.value = '';
            setTimeout(async () => {
                const response = await generateResponse(userMessage);
                addMessage(response, 'bot');
            }, 500);
        }
    }

    function addMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to the latest message
    }

    async function loadResponseData() {
        try {
            const files = [
                'First_person.json',
                'jack_database.json',
                'companyinfo_database.json',
                'third_person.json'
            ];

            const dataPromises = files.map(file => fetch(file).then(response => response.json()));
            const allData = await Promise.all(dataPromises);

            // Combine all the data into a single array of questions
            const combinedData = allData.flatMap(data => data.questions);

            return combinedData;
        } catch (error) {
            console.error('Error loading JSON data:', error);
            return [];
        }
    }

    function buildKeywordIndex(data) {
        const index = {};
        data.forEach((entry, idx) => {
            entry.keywords.forEach(keyword => {
                const lowerKeyword = keyword.toLowerCase();
                if (!index[lowerKeyword]) {
                    index[lowerKeyword] = [];
                }
                index[lowerKeyword].push({
                    response: entry.response,
                    id: idx
                });
            });
        });
        return index;
    }

    async function generateResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        const worker = new Worker('worker.js');

        return new Promise((resolve) => {
            worker.postMessage({
                message: lowerCaseMessage,
                index: keywordIndex
            });

            worker.onmessage = function(e) {
                const { response } = e.data;

                // Check if a response was found
                if (response) {
                    resolve(response);
                } else {
                    resolve("Sorry, I didn't understand that. Could you please rephrase your question?");
                }
            };

            worker.onerror = function(e) {
                console.error('Worker error:', e);
                resolve("I'm having trouble processing your request. Please try again.");
            };
        });
    }
}

// Circuit-like 3D particle animation
function initBackgroundAnimations() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Responsive canvas resizing
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Variables for circuit-like 3D animation
    const particles = [];
    const particleCount = 120;
    const maxVelocity = 0.5;
    const particleColors = ['#00d4ff', '#00b3cc', '#ff006e'];

    // Particle constructor with 3D and circuit-like effects
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.z = Math.random() * 200 + 50; // Depth effect
        this.velocityX = (Math.random() < 0.5 ? 1 : -1) * maxVelocity;
        this.velocityY = (Math.random() < 0.5 ? 1 : -1) * maxVelocity;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.size = (Math.random() * 3 + 1) * (200 / this.z); // Size based on depth
    }

    // Draw particles with 3D effects
    Particle.prototype.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(200 / this.z, 200 / this.z); // Scaling based on depth
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    };

    // Update particle positions with circuit-like movement
    Particle.prototype.update = function() {
        if (Math.random() < 0.02) {
            // Randomly change direction to simulate circuit-like paths
            this.velocityX *= -1;
            this.velocityY *= -1;
        }
        this.x += this.velocityX * (200 / this.z);
        this.y += this.velocityY * (200 / this.z);

        // Reset particle when it goes out of bounds
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
    }

    // Animate particles with circuit-like movement and 3D effects
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}
