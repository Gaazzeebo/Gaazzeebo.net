document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to skill and project cards for color changes
    const navLinks = document.querySelectorAll(".nav-link");
    const skillCards = document.querySelectorAll(".skill-card");
    const projectCards = document.querySelectorAll(".project-card");
  
    // Slowly change the background color of the body as user interacts with the site
    let colorIndex = 0;
    const colors = ["#f2f2f2", "#f7d794", "#ff7675", "#74b9ff", "#a29bfe", "#ffeaa7"];
  
    const changeBackgroundColor = () => {
      document.body.style.backgroundColor = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;
    };
  
    // On click, gradually change the background color
    navLinks.forEach(link => {
      link.addEventListener("click", changeBackgroundColor);
    });
  
    skillCards.forEach(card => {
      card.addEventListener("click", changeBackgroundColor);
    });
  
    projectCards.forEach(card => {
      card.addEventListener("click", changeBackgroundColor);
    });
  
    // Floating bubbles
    const bubblesContainer = document.getElementById("bubbles-container");
  
    function createBubble() {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
  
      const size = Math.random() * 50 + 20; // random size between 20px and 70px
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
  
      // Set bubble position (randomly from left, right, top, or bottom)
      const startPosition = Math.random();
      if (startPosition < 0.25) {
        // Start from left
        bubble.style.left = `${-size}px`;
        bubble.style.top = `${Math.random() * window.innerHeight}px`;
      } else if (startPosition < 0.5) {
        // Start from right
        bubble.style.right = `${-size}px`;
        bubble.style.top = `${Math.random() * window.innerHeight}px`;
      } else if (startPosition < 0.75) {
        // Start from top
        bubble.style.top = `${-size}px`;
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
      } else {
        // Start from bottom
        bubble.style.bottom = `${-size}px`;
        bubble.style.left = `${Math.random() * window.innerWidth}px`;
      }
  
      // Generate random float directions
      const directionX = Math.random() * 2 - 1; // Random number between -1 and 1
      const directionY = Math.random() * 2 - 1; // Random number between -1 and 1
      bubble.style.setProperty("--direction-x", directionX);
      bubble.style.setProperty("--direction-y", directionY);
  
      // Random color for the bubble
      bubble.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
  
      // Set random animation duration and start the animation
      bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
  
      bubblesContainer.appendChild(bubble);
  
      // Remove bubble after animation completes
      bubble.addEventListener("animationend", () => {
        bubble.remove();
      });
  
      setTimeout(createBubble, Math.random() * 3000); // create bubble at random intervals
    }
  
    createBubble();
  });
  