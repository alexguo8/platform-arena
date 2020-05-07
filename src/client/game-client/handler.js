//Handles all ticking and rendering for game objects
import Platform from "./platform";
const Constants = require("../../shared/constants");

export default class Handler {
    constructor() {
        this.player = null;
        this.platforms = [];
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
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].update(dt);    
        }
    }

    addPlayer(player) {
        this.player = player;
    }

    addPlatform(platform) {
        this.platforms.push(platform);
    }
 
    // removePlayer(player) {
    //     delete this.players[player.id];
    // }

    // removePlatform(platform) {
    //     delete this.platforms[platform.id];
    // }

    initializePlatforms() {
        for (let i = 0; i < 3; i++) {
            this.addPlatform(new Platform(i * 32 + 32, 96, 32, 16));
            this.addPlatform(new Platform(Constants.WIDTH - i * 32 - 64, 96, 32, 16));
        }
        for (let i = 0; i < 8; i++) {
            this.addPlatform(new Platform(i * 32 + 384, 96, 32, 16));
        }
        for (let i = 0; i < 4; i++) {
            this.addPlatform(new Platform(i * 32 + 192, 192, 32, 16));
            this.addPlatform(new Platform(i * 32 + 704, 192, 32, 16));
        }
        for (let i = 0; i < 6; i++) {
            this.addPlatform(new Platform(i * 32 + 32, 288, 32, 16));
            this.addPlatform(new Platform(Constants.WIDTH - i * 32 - 64, 288, 32, 16));
        }
        for (let i = 0; i < 8; i++) {
            this.addPlatform(new Platform(i * 32 + 384, 320, 32, 16));
        }
        for (let i = 0; i < 12; i++) {
            this.addPlatform(new Platform(i * 32 + 320, 416, 32, 16));
        }
        for (let i = 0; i < 6; i++) {
            this.addPlatform(new Platform(i * 32 + 160, 512, 32, 16));
            this.addPlatform(new Platform(Constants.WIDTH - i * 32 - 192, 512, 32, 16));
            this.addPlatform(new Platform(i * 32 + 96, 608, 32, 16));
            this.addPlatform(new Platform(Constants.WIDTH - i * 32 - 128, 608, 32, 16));
        }
        for (let i = 0; i < 4; i++) {
            this.addPlatform(new Platform(i * 32 + 448, 544, 32, 16));
        }
        for (let i = 0; i < Constants.HEIGHT; i += 32) {
            this.addPlatform(new Platform(0, i, 32, 32));
            this.addPlatform(new Platform(Constants.WIDTH - 32, i, 32, 32));
        } 
        for (let i = 0; i < Constants.WIDTH; i += 32) {
            this.addPlatform(new Platform(i, 0, 32, 32));
            this.addPlatform(new Platform(i, Constants.HEIGHT - 32, 32, 32));
        }
    }
}
