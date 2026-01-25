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
}// Inside player.update(dt) in game.js
update(dt) {
    if (input.left) this.vx -= this.speed * dt;
    if (input.right) this.vx += this.speed * dt;
    
    // FLYING LOGIC (Noclip)
    if (Admin.isNoclip) {
        if (input.up) this.y -= this.speed * 0.5 * dt;
        // Using a "Down" key check (we can use ArrowDown)
        if (input.down) this.y += this.speed * 0.5 * dt;
        this.vy = 0;
    } else {
        // NORMAL GRAVITY
        this.vy += this.grav * dt;
        if (input.up && this.y >= floorY - this.h) { this.vy = -750; }
    }

    this.vx *= 0.8;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Only stay on floor if NOT in noclip
    if (!Admin.isNoclip && this.y > floorY - this.h) { 
        this.y = floorY - this.h; 
        this.vy = 0; 
    }
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
// Inside your loop(t) function in game.js
function loop(t) {
    // ... (clear screen and draw floor) ...

    // DRAW & HANDLE PLATFORMS
    ctx.fillStyle = "#444";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.w, p.h);

        // Physical Collision (Only if not in Noclip)
        if (!Admin.isNoclip && 
            player.x < p.x + p.w &&
            player.x + player.w > p.x &&
            player.y + player.h > p.y &&
            player.y + player.h < p.y + p.h + 10 &&
            player.vy >= 0) {
                player.y = p.y - player.h;
                player.vy = 0;
        }
    });

    player.update(dt);
    player.draw();
    // ... (rest of loop) ...
}// Inside your loop(t) in game.js, before drawing platforms
if (Admin.isEditorMode) {
    ctx.strokeStyle = "rgba(0, 255, 204, 0.1)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
}
// Inside your loop(t) in game.js
function loop(t) {
    // ... (clear screen) ...

    // Reset gravity to normal every frame
    if (!Admin.isNoclip) player.grav = 1500;

    // DRAW & APPLY GRAVITY ZONES
    gravityZones.forEach(z => {
        ctx.fillStyle = "rgba(0, 255, 204, 0.2)"; // Transparent teal
        ctx.fillRect(z.x, z.y, z.w, z.h);
        ctx.strokeStyle = "#00ffcc";
        ctx.strokeRect(z.x, z.y, z.w, z.h);

        // Check if player is inside the zone
        if (player.x < z.x + z.w && player.x + player.w > z.x &&
            player.y < z.y + z.h && player.y + player.h > z.y) {
                player.grav = z.strength; // Admin Override: Low Gravity!
                ctx.fillStyle = "white";
                ctx.fillText("LOW-G ZONE", player.x, player.y - 10);
        }
    });

    // ... (rest of your drawing code for platforms and player) ...
}
