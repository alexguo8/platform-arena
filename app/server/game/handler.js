//Handles all ticking and rendering for game objects

class Handler {
    constructor() {
        this.players = {};
        this.platforms = {};
        this.weapons = {};
        this.powerups = {};
        this.hud = {};
    }

    update(dt) {
        for (const playerID of Object.keys(this.players)) {
            if (this.players[playerID]) {
                this.players[playerID].update(dt);
            }     
        }
        for (const platID of Object.keys(this.platforms)) {
            if (this.platforms[platID]) {
                this.platforms[platID].update(dt);
            }     
        }
        for (const weaponID of Object.keys(this.weapons)) {
            if (this.weapons[weaponID]) {
                this.weapons[weaponID].update(dt);
            }     
        }
        for (const powerupID of Object.keys(this.powerups)) {
            if (this.powerups[powerupID]) {
                this.powerups[powerupID].update(dt);
            }     
        }
    }

    addPlayer(player) {
        this.players[player.id] = player;
    }

    addPlatform(platform) {
        this.platforms[platform.id] = platform;
    }

    addWeapon(weapon) {
        this.weapons[weapon.id] = weapon;
    }

    addPowerup(powerup) {
        this.powerups[powerup.id] = powerup;
    }
 
    removePlayer(player) {
        delete this.players[player.id];
    }

    removePlatform(platform) {
        delete this.platforms[platform.id];
    }

    removeWeapon(weapon) {
        delete this.weapons[weapon.id];
    }

    removePowerup(powerup) {
        delete this.powerups[powerup.id];
    }
}

module.exports = Handler;
