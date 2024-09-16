// console.log("asteroid.js loaded");

// // Asteroid object
// function Asteroid(x, y, size, speed) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.speed = speed;

//     this.draw = function() {
//         ctx.fillStyle = "#8B4513";
//         ctx.shadowBlur = 15;
//         ctx.shadowColor = "#8B4513";
//         ctx.beginPath();
//         for (let i = 0; i < 6; i++) {
//             let angle = 2 * Math.PI / 6 * i;
//             let xOffset = this.size * Math.cos(angle);
//             let yOffset = this.size * Math.sin(angle);
//             if (i === 0) {
//                 ctx.moveTo(this.x + xOffset, this.y + yOffset);
//             } else {
//                 ctx.lineTo(this.x + xOffset, this.y + yOffset);
//             }
//         }
//         ctx.closePath();
//         ctx.fill();
//         ctx.strokeStyle = "#654321";
//         ctx.stroke();
//         ctx.shadowBlur = 0;
//     }

//     this.update = function() {
//         this.y += this.speed;
//         if (this.y > canvas.height) {
//             this.y = -this.size;
//             this.x = Math.random() * canvas.width;
//         }
//     }
// }
