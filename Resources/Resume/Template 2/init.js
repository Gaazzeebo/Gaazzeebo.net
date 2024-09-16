// console.log("init.js loaded");

// document.addEventListener('DOMContentLoaded', function() {
//     console.log("DOM fully loaded and parsed");

//     // Game variables
//     window.score = 0;
//     window.highScore = localStorage.getItem('highScore') || 0;
//     window.gameRunning = false;
//     window.gamePaused = false;
//     window.asteroids = [];
//     window.powerUps = [];
//     window.player = null;
//     window.gameInterval = null;
//     window.selectedCharacter = null;

//     // DOM elements
//     window.startGameBtn = document.getElementById("startGameBtn");
//     window.gameArea = document.getElementById("gameArea");
//     window.gameMessage = document.getElementById("gameMessage");
//     window.playAgainBtn = document.getElementById("playAgainBtn");
//     window.scoreDisplay = document.getElementById("score");
//     window.highScoreDisplay = document.getElementById("highScore");
//     window.canvas = document.getElementById("gameCanvas");
//     window.gameOverContainer = document.getElementById("gameOverContainer");
//     window.backToHomeBtn = document.getElementById("backToHomeBtn");
//     window.ctx = canvas.getContext('2d');

//     console.log("DOM elements initialized");

//     // Initialize the shooting stars
//     if (typeof createShootingStars === 'function') {
//         createShootingStars();
//     } else {
//         console.error("createShootingStars function not found");
//     }
// });
