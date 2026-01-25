
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
