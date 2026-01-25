
const Admin = {
    toggleGod() {
        player.isGod = !player.isGod;
        document.getElementById('god-status').innerText = player.isGod ? "ON" : "OFF";
        console.log("Admin: God Mode Toggled");
    },

    toggleFreeze() {
        worldTimeScale = worldTimeScale === 0 ? 1.0 : 0;
        const btn = document.getElementById('freeze-btn');
        btn.innerText = worldTimeScale === 0 ? "FREEZE ARMY: ACTIVE" : "FREEZE ARMY: OFF";
        btn.style.background = worldTimeScale === 0 ? "red" : "#111";
    },

    massErase() {
        army = [];
        console.warn("Admin: Army Deleted.");
    },

    spawnEnemy() {
        army.push(new Enemy(canvas.width + 50));
    }
};// Add these to the existing Admin object in admin.js
const Admin = {
    // ... your existing functions ...

    isNoclip: false,

    toggleNoclip() {
        this.isNoclip = !this.isNoclip;
        // When noclip is on, gravity stops for the player
        player.grav = this.isNoclip ? 0 : 1500;
        player.vy = 0; // Stop any current falling
        this.log(`NOCLIP: ${this.isNoclip ? "ENABLED" : "DISABLED"}`);
    },

    log(message) {
        const logEl = document.getElementById('admin-log');
        const entry = document.createElement('div');
        entry.innerText = `> ${message}`;
        logEl.prepend(entry);
        // Keep only the last 5 logs
        if (logEl.children.length > 5) logEl.lastChild.remove();
    }
};
// Add to the top of admin.js
const platforms = []; // This will hold your custom world

// Add these functions to your Admin object
const Admin = {
    // ... existing functions ...
    
    isEditorMode: false,

    toggleEditor() {
        this.isEditorMode = !this.isEditorMode;
        this.log(`EDITOR: ${this.isEditorMode ? "ON - CLICK TO BUILD" : "OFF"}`);
    },

    spawnPlatform(mouseX, mouseY) {
        // Snap to a 40px grid for professional alignment
        const snapX = Math.floor(mouseX / 40) * 40;
        const snapY = Math.floor(mouseY / 40) * 40;
        
        platforms.push({ x: snapX, y: snapY, w: 80, h: 20 });
        this.log(`PLATFORM CREATED AT ${snapX}, ${snapY}`);
    }
};

// Listen for clicks on the canvas
canvas.addEventListener('mousedown', (e) => {
    if (Admin.isEditorMode) {
        Admin.spawnPlatform(e.clientX, e.clientY);
    }
});
// Add these functions to your Admin object in admin.js
const Admin = {
    // ... existing functions ...

    saveToBrowser() {
        localStorage.setItem('highVisionLevel', JSON.stringify(platforms));
        this.log("LEVEL SAVED TO BROWSER");
    },

    loadFromBrowser() {
        const saved = localStorage.getItem('highVisionLevel');
        if (saved) {
            platforms.length = 0;
            platforms.push(...JSON.parse(saved));
            this.log("LEVEL LOADED");
        }
    },

    exportToConsole() {
        const data = JSON.stringify(platforms);
        console.log("%c --- LEVEL DATA EXPORT ---", "color: #00ffcc; font-weight: bold;");
        console.log(data);
        this.log("DATA SENT TO CONSOLE (F12)");
        alert("Check your browser console (F12) to copy your level code!");
    }
};

// Auto-load on startup
window.onload = () => { Admin.loadFromBrowser(); };
// Add this to the top of admin.js with your other arrays
const gravityZones = []; 

// Add these to your Admin object
const Admin = {
    // ... existing functions ...
    brushType: 'PLATFORM', // Can be 'PLATFORM' or 'GRAVITY'

    toggleBrush() {
        this.brushType = (this.brushType === 'PLATFORM') ? 'GRAVITY' : 'PLATFORM';
        this.log(`BRUSH: ${this.brushType}`);
    },

    spawnGravityZone(mouseX, mouseY) {
        gravityZones.push({ x: mouseX - 50, y: mouseY - 50, w: 100, h: 100, strength: 200 });
        this.log("GRAVITY ZONE CREATED");
    }
};

// Update your existing mousedown listener in admin.js
canvas.addEventListener('mousedown', (e) => {
    if (Admin.isEditorMode) {
        if (Admin.brushType === 'PLATFORM') {
            Admin.spawnPlatform(e.clientX, e.clientY);
        } else {
            Admin.spawnGravityZone(e.clientX, e.clientY);
        }
    }
});
// Add these to your Admin object in admin.js
const Admin = {
    // ... existing functions ...
    aiState: 'PATROL', // Options: 'PATROL', 'CHASE', 'STAY'

    setArmyBehavior(newState) {
        this.aiState = newState;
        this.log(`ARMY BEHAVIOR: ${newState}`);
        
        // Visual feedback on the buttons
        document.querySelectorAll('.ai-btn').forEach(btn => {
            btn.style.borderColor = (btn.innerText.includes(newState)) ? '#00ffcc' : '#333';
        });
    }
};
