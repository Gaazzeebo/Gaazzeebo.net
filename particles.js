document.addEventListener('DOMContentLoaded', () => {
    // Set a reduced number of particles
    const particleCount = window.innerWidth > 768 ? 50 : 30;

    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = 0;
    particleContainer.style.left = 0;
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '10000';
    document.body.appendChild(particleContainer);

    // Function to create individual particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Customize size for a smaller particle effect (5px to 15px)
        const size = Math.random() * 10 + 5; // Particles between 5px and 15px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Customize color and glow
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random vibrant color
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%'; // Circular particles
        particle.style.boxShadow = `0 0 8px ${color}, 0 0 12px ${color}`; // Glowing effect

        // Set random starting positions
        particle.style.position = 'absolute';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.opacity = Math.random() * 0.8 + 0.2; // Random transparency

        // Add particle to the container
        particleContainer.appendChild(particle);

        // Move and animate the particle
        animateParticle(particle);
    }

    // Create all particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Function to animate particle in a lava lamp-like motion
    function animateParticle(particle) {
        const maxAmplitudeX = 60; // Maximum horizontal movement range
        const maxAmplitudeY = 100; // Maximum vertical movement range
        const speed = 0.002 + Math.random() * 0.002; // Randomize speed (slightly faster for more fluid motion)

        let angleX = Math.random() * Math.PI * 2; // Start with random angles for the movement
        let angleY = Math.random() * Math.PI * 2;

        function moveParticle() {
            // Calculate new positions with a sine wave for smoother, fluid motion
            const newTop = parseFloat(particle.style.top) + Math.sin(angleY) * maxAmplitudeY * speed;
            const newLeft = parseFloat(particle.style.left) + Math.sin(angleX) * maxAmplitudeX * speed;

            // Update position
            particle.style.top = `${newTop}px`;
            particle.style.left = `${newLeft}px`;

            // Update angles for smooth oscillation
            angleX += speed;
            angleY += speed * 1.2; // Different speeds for X and Y for more organic motion

            // Boundary check: If particle leaves screen, reposition it smoothly
            if (newTop > window.innerHeight || newTop < 0 || newLeft > window.innerWidth || newLeft < 0) {
                particle.style.top = Math.random() * window.innerHeight + 'px';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                angleX = Math.random() * Math.PI * 2; // Reset angle for new movement path
                angleY = Math.random() * Math.PI * 2;
            }

            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(moveParticle);
        }

        // Start animation
        moveParticle();
    }

    // Change particle colors every 5 seconds for a dynamic effect
    setInterval(() => {
        document.querySelectorAll('.particle').forEach(particle => {
            const newColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            particle.style.backgroundColor = newColor;
            particle.style.boxShadow = `0 0 8px ${newColor}, 0 0 12px ${newColor}`;
        });
    }, 5000);
});
