// console.log("player.js loaded");

// // Player object
// function Player(characterClass) {
//     this.width = 50;
//     this.height = 50;
//     this.x = canvas.width / 2 - this.width / 2;
//     this.y = canvas.height - this.height - 10;
//     this.speed = 0;
//     this.maxSpeed = 7;
//     this.acceleration = 0.2;
//     this.friction = 0.1;
//     this.direction = 0;
//     this.characterClass = characterClass;

//     // Get the exact background color of the selected character
//     var characterElement = document.querySelector('.' + this.characterClass);
//     var computedStyle = window.getComputedStyle(characterElement);
//     var backgroundColor = computedStyle.backgroundColor;

//     this.draw = function() {
//         ctx.fillStyle = backgroundColor;
//         ctx.shadowBlur = 20;
//         ctx.shadowColor = backgroundColor;

//         switch (this.characterClass) {
//             case 'char1':
//                 ctx.beginPath();
//                 ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
//                 ctx.fill();
//                 break;
//             case 'char2':
//                 ctx.fillRect(this.x, this.y, this.width, this.height);
//                 break;
//             case 'char3':
//                 ctx.beginPath();
//                 ctx.moveTo(this.x + this.width / 2, this.y);
//                 ctx.lineTo(this.x + this.width, this.y + this.height);
//                 ctx.lineTo(this.x, this.y + this.height);
//                 ctx.closePath();
//                 ctx.fill();
//                 break;
//             case 'char4':
//                 ctx.beginPath();
//                 ctx.moveTo(this.x + this.width / 4, this.y);
//                 ctx.lineTo(this.x + 3 * this.width / 4, this.y);
//                 ctx.lineTo(this.x + this.width, this.y + this.height / 2);
//                 ctx.lineTo(this.x + 3 * this.width / 4, this.y + this.height);
//                 ctx.lineTo(this.x + this.width / 4, this.y + this.height);
//                 ctx.lineTo(this.x, this.y + this.height / 2);
//                 ctx.closePath();
//                 ctx.fill();
//                 break;
//             case 'char5':
//                 ctx.beginPath();
//                 ctx.moveTo(this.x + this.width / 2, this.y);
//                 ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.height, this.width / 4);
//                 ctx.arcTo(this.x + this.width, this.y + this.height, this.x, this.y + this.height, this.width / 4);
//                 ctx.arcTo(this.x, this.y + this.height, this.x, this.y, this.width / 4);
//                 ctx.arcTo(this.x, this.y, this.x + this.width, this.y, this.width / 4);
//                 ctx.closePath();
//                 ctx.fill();
//                 break;
//         }

//         ctx.shadowBlur = 0;
//     }

//     this.update = function() {
//         if (this.direction !== 0) {
//             this.speed += this.direction * this.acceleration;
//             if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
//             if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed;
//         } else {
//             if (this.speed > 0) {
//                 this.speed -= this.friction;
//                 if (this.speed < 0) this.speed = 0;
//             }
//             if (this.speed < 0) {
//                 this.speed += this.friction;
//                 if (this.speed > 0) this.speed = 0;
//             }
//         }
//         this.x += this.speed;
//         if (this.x < 0) this.x = 0;
//         if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
//     }
// }

// // Character CSS styles
// const characterStyles = `
//     .char1 { background: linear-gradient(45deg, #ff0000, #ff7f00); border-radius: 50%; }
//     .char2 { background: linear-gradient(45deg, #00ff00, #007f00); border-radius: 0%; }
//     .char3 { background: linear-gradient(45deg, #0000ff, #007fff); clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
//     .char4 { background: linear-gradient(45deg, #ffff00, #ff007f); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
//     .char5 { background: linear-gradient(45deg, #ff00ff, #7f00ff); border-radius: 25%; }
// `;

// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = characterStyles;
// document.head.appendChild(styleSheet);
