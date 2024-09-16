// console.log("power-up.js loaded");

// // Power-up object
// function PowerUp(x, y, type) {
//     this.x = x;
//     this.y = y;
//     this.size = 20;
//     this.type = type;
//     this.speed = 2;

//     this.draw = function() {
//         ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
//         ctx.shadowBlur = 20;
//         ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
//         ctx.beginPath();
//         ctx.moveTo(this.x, this.y - this.size);
//         for (let i = 0; i < 5; i++) {
//             ctx.lineTo(this.x + this.size * Math.cos((18 + i * 72) * Math.PI / 180), 
//                        this.y - this.size * Math.sin((18 + i * 72) * Math.PI / 180));
//             ctx.lineTo(this.x + this.size / 2 * Math.cos((54 + i * 72) * Math.PI / 180), 
//                        this.y - this.size / 2 * Math.sin((54 + i * 72) * Math.PI / 180));
//         }
//         ctx.closePath();
//         ctx.fill();
//         ctx.strokeStyle = "#FFEC8B";
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

//     this.applyEffect = function(player) {
//         if (this.type === 'speed') {
//             player.maxSpeed += 2;
//         }
//     }
// }
