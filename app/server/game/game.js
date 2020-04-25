const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const KeyInput = require("./keyInput")
const Player = require("./player")
const Platform = require("./platform");
const Powerup = require("./powerup");
const Handler = require("./handler")

class Game {            
    constructor(room) {
        this.room = room;
        this.sockets = {};
        this.handler = new Handler();
        this.keyInput = new KeyInput(this.handler);

        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        this.createStage();
        setInterval(this.update.bind(this), 1000 / 60);
    }

    createStage() {
        for (let i = 0; i < 3; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 32, 96, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - i * 32 - 64, 96, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 8; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 384, 96, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 4; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 192, 192, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 704, 192, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 5; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 32, 288, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - i * 32 - 64, 288, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 10; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 352, 320, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 12; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 320, 416, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 6; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 160, 512, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - i * 32 - 192, 512, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 96, 608, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - i * 32 - 128, 608, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 4; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 448, 544, 32, 16, true, this.handler));
        }
        for (let i = 0; i < Constants.HEIGHT; i += 32) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, 0, i, 32, 32, false, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - 32, i, 32, 32, false, this.handler));
        } 
        for (let i = 0; i < Constants.WIDTH; i += 32) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i, 0, 32, 32, false, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, i, Constants.HEIGHT - 80, 32, 70, false, this.handler));
        }

        for (let i = 0; i < 3; i++) {
            this.handler.addPowerup(new Powerup(Type.DRILL_POWERUP, 250 + i * 100, 50, 
                Constants.POWERUP_WIDTH, Constants.POWERUP_HEIGHT, this.handler));
        }
    }

    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
    
        // Generate a position to start this player at.
        const x = Constants.WIDTH * (0.25 + Math.random() * 0.5);
        const y = Constants.HEIGHT * (0.25 + Math.random() * 0.5);
        this.handler.players[socket.id] = 
            new Player(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                username, "test", this.handler);
    }
    
    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.handler.players[socket.id];
    }

    handleKeyInput(socket, key, msg_type) {
        if (this.handler.players[socket.id]) {
            if (msg_type === Constants.MSG_TYPES.KEYPRESS) {
                this.keyInput.handleKeyPress(socket, key);
            } else if (msg_type === Constants.MSG_TYPES.KEYUP) {
                this.keyInput.handleKeyUp(socket, key);
            }
        }
    }
    
    update() {
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        this.handler.update(dt);

        if (this.shouldSendUpdate) {
            for (const playerID of Object.keys(this.sockets)) {
                const socket = this.sockets[playerID];
                const player = this.handler.players[playerID];
                socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player));
            };
            this.shouldSendUpdate = false;
        } else {
            this.shouldSendUpdate = true;
        }
    }

    createUpdate(player) {
        return {
            t: Date.now(),
            me: player.serializeForUpdate(),
            others: Object.values(this.handler.players).filter(p => p !== player).map(p => p.serializeForUpdate()),
            platforms: Object.values(this.handler.platforms).map(p => p.serializeForUpdate()),
            weapons: Object.values(this.handler.weapons).map(w => w.serializeForUpdate()),
            powerups: Object.values(this.handler.powerups).map(p => p.serializeForUpdate()),
        };
    }
}

module.exports = Game;