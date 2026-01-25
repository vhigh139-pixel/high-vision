const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lastTime = 0;
let worldTimeScale = 1.0;
const floorY = canvas.height - 100;

const input = { left: false, right: false, up: false };
window.onkeydown = (e) => { if(e.key.includes("Arrow")) input[e.key.replace("Arrow","").toLowerCase()] = true; };
window.onkeyup = (e) => { if(e.key.includes("Arrow")) input[e.key.replace("Arrow","").toLowerCase()] = false; };

class Player {
    constructor() {
        this.x = 100; this.y = 0; this.w = 40; this.h = 40;
        this.vx = 0; this.vy = 0; this.speed = 1500; this.grav = 1500;
        this.isGod = false;
    }
    update(dt) {
        if (input.left) this.vx -= this.speed * dt;
        if (input.right) this.vx += this.speed * dt;
        this.vx *= 0.8;
        this.vy += this.grav * dt;
        this.x += this.vx * dt; this.y += this.vy * dt;
        if (this.y > floorY - this.h) { this.y = floorY - this.h; this.vy = 0; }
    }
    draw() {
        ctx.fillStyle = this.isGod ? "magenta" : "#00ffcc";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Enemy {
    constructor(x) { this.x = x; this.y = floorY - 40; this.w = 40; this.h = 40; }
    update(dt) { this.x -= (200 * worldTimeScale) * dt; if(this.x < -40) this.x = canvas.width; }
    draw() { ctx.fillStyle = "red"; ctx.fillRect(this.x, this.y, this.w, this.h); }
}

const player = new Player();
let army = [new Enemy(600), new Enemy(900)];

function loop(t) {
    let dt = (t - lastTime) / 1000 || 0; lastTime = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Floor
    ctx.strokeStyle = "white"; ctx.strokeRect(0, floorY, canvas.width, 2);

    player.update(dt);
    player.draw();

    army.forEach((en, i) => {
        en.update(dt);
        en.draw();
        // Collision
        if(!player.isGod && Math.abs(player.x - en.x) < 40 && Math.abs(player.y - en.y) < 40) {
            player.x = 0;
        }
    });
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
