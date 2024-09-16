// console.log("events.js loaded");

// document.addEventListener('DOMContentLoaded', function() {
//     console.log("DOM fully loaded and parsed in events.js");

//     if (startGameBtn) {
//         startGameBtn.onclick = function() {
//             console.log("Start Game button clicked");
//             startGame();
//         }
//     } else {
//         console.log("Start Game button not found");
//     }

//     if (playAgainBtn) {
//         playAgainBtn.onclick = function() {
//             console.log("Play Again button clicked");
//             score = 0;
//             scoreDisplay.innerText = score;
//             if (playAgainBtn) playAgainBtn.style.display = "none";
//             if (startGameBtn) startGameBtn.style.display = "block";
//             if (gameArea) gameArea.style.display = "none";
//             if (gameOverContainer) gameOverContainer.style.display = "none";
//             startGame();
//         }
//     } else {
//         console.log("Play Again button not found");
//     }

//     if (backToHomeBtn) {
//         backToHomeBtn.onclick = function() {
//             console.log("Back to Home button clicked");
//             window.location.href = 'index.html';
//         }
//     } else {
//         console.log("Back to Home button not found");
//     }

//     document.addEventListener('keydown', function(e) {
//         if (player) {
//             if (e.key === 'ArrowLeft') player.direction = -1;
//             if (e.key === 'ArrowRight') player.direction = 1;
//             if (e.key === 'Escape') togglePause();
//         }
//     });

//     document.addEventListener('keyup', function(e) {
//         if (player) {
//             if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') player.direction = 0;
//         }
//     });
// });
