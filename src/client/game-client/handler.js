//Handles all ticking and rendering for game objects

export default class Handler {
    constructor() {
        this.player = null;
        this.platforms = {};
    }

    update(dt) {
        // for (const playerID of Object.keys(this.players)) {
        //     if (this.players[playerID]) {
        //         this.players[playerID].update(dt);
        //     }     
        // }
        if (this.player) {
            this.player.update(dt);
        }
    }

    addPlayer(player) {
        this.player = player;
    }

    addPlatform(platform) {
        this.platforms[platform.id] = platform;
    }

    addPlatforms(platforms) {
        platforms.forEach(p => {
            this.addPlatform(p);
        });
    }
 
    removePlayer(player) {
        delete this.players[player.id];
    }

    removePlatform(platform) {
        delete this.platforms[platform.id];
    }
}
