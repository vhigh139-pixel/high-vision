
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
};
