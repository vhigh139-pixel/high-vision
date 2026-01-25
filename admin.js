
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
