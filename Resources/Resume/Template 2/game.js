// console.log("game.js loaded");

// function createShootingStars() {
//     console.log("Creating shooting stars");
//     const shootingStarsContainer = document.querySelector('.shooting-stars');
//     if (!shootingStarsContainer) {
//         console.error("Shooting stars container not found");
//         return;
//     }
//     shootingStarsContainer.innerHTML = ''; // Clear existing stars
//     for (let i = 0; i < 10; i++) {
//         const shootingStar = document.createElement('div');
//         shootingStar.className = 'shooting-star';
//         shootingStar.style.top = `${Math.random() * 100}%`;
//         shootingStar.style.left = `${Math.random() * 100}%`;
//         shootingStar.style.animationDuration = `${2 + Math.random() * 3}s`;
//         shootingStar.style.animationDelay = `${Math.random() * 5}s`;
//         shootingStarsContainer.appendChild(shootingStar);
//     }
// }

// function selectCharacter(characterClass) {
//     selectedCharacter = characterClass;
//     document.querySelectorAll('.character').forEach(el => el.classList.remove('selected'));
//     document.querySelector('.' + characterClass).classList.add('selected');
//     if (startGameBtn) startGameBtn.style.display = "block";
//     console.log("Character selected: " + characterClass);
// }

// function startGame() {
//     if (!selectedCharacter) {
//         alert("Please select a character to start the game.");
//         return;
//     }
//     console.log("Game started with character: " + selectedCharacter);
//     score = 0;
//     if (startGameBtn) startGameBtn.style.display = "none";
//     if (gameArea) gameArea.style.display = "block";
//     if (gameOverContainer) gameOverContainer.style.display = "none";
//     gameRunning = true;
//     gamePaused = false;
//     player = new Player(selectedCharacter);
//     asteroids = [];
//     powerUps = [];
//     spawnAsteroids();
//     gameInterval = setInterval(updateGame, 1000 / 60);
// }

// function spawnAsteroids() {
//     console.log("Spawning asteroids");
//     for (var i = 0; i < 5 + Math.floor(score / 100); i++) {
//         asteroids.push(new Asteroid(Math.random() * canvas.width, Math.random() * -canvas.height, 20, 2 + Math.random() * 3));
//     }
// }

// function updateGame() {
//     if (gameRunning && !gamePaused) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         player.update();
//         player.draw();
//         asteroids.forEach(function(asteroid) {
//             asteroid.update();
//             asteroid.draw();
//             if (checkCollision(player, asteroid)) {
//                 endGame(false);
//             }
//         });
//         // Draw and update power-ups
//         if (Math.random() < 0.01) {
//             var powerUp = new PowerUp(Math.random() * canvas.width, Math.random() * -canvas.height, 'speed');
//             powerUps.push(powerUp);
//         }
//         powerUps.forEach(function(powerUp, index) {
//             powerUp.update();
//             powerUp.draw();
//             if (checkCollision(player, powerUp)) {
//                 powerUp.applyEffect(player);
//                 powerUps.splice(index, 1); // Remove power-up after collection
//             }
//         });
//         score++;
//         scoreDisplay.innerText = score;

//         // Increase difficulty by adding more asteroids
//         if (score % 1000 === 0) {
//             spawnAsteroids();
//         }
//     }
// }

// function checkCollision(player, obj) {
//     var distX = Math.abs(obj.x - player.x - player.width / 2);
//     var distY = Math.abs(obj.y - player.y - player.height / 2);
//     if (distX > (player.width / 2 + obj.size)) return false;
//     if (distY > (player.height / 2 + obj.size)) return false;
//     if (distX <= (player.width / 2)) return true;
//     if (distY <= (player.height / 2)) return true;
//     var dx = distX - player.width / 2;
//     var dy = distY - player.height / 2;
//     return (dx * dx + dy * dy <= (obj.size * obj.size));
// }

// function endGame(success) {
//     gameRunning = false;
//     clearInterval(gameInterval);
//     if (score > highScore) {
//         highScore = score;
//         localStorage.setItem('highScore', highScore);
//     }
//     gameMessage.innerHTML = `Game Over! You scored ${score} points.<br>High Score: ${highScore}`;
//     if (playAgainBtn) playAgainBtn.style.display = "block";
//     if (gameOverContainer) gameOverContainer.style.display = "block";
// }

// function togglePause() {
//     if (gameRunning) {
//         gamePaused = !gamePaused;
//         gameMessage.innerText = gamePaused ? "Game Paused" : "";
//     }
// }
