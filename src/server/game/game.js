const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const KeyInput = require("./keyInput")
const MouseInput = require("./mouseInput")
const Panda = require("./panda")
const Seal = require("./seal")
const Dino = require("./dino")
const Eagle = require("./eagle")
const Platform = require("./platform");
const Powerup = require("./powerups/powerup");
const Handler = require("./handler")
const Match = require("../models/match");

class Game {            
    constructor(room) {
        this.room = room;
        this.sockets = {};
        this.handler = new Handler();
        this.keyInput = new KeyInput(this.handler);
        this.mouseInput = new MouseInput(this.handler);

        this.matchPlayers = [];
        this.gameStart = Date.now();
        this.gameOver = Date.now();
        this.gameLeft = Date.now();
        this.ipWinner = "";
        this.usernameWinner = "";

        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        this.createStage();
        this.updateInterval = setInterval(this.update.bind(this), 1000 / 60);
    }

    endGame() {
        this.matchPlayers.map(p => {
            (({ ipAddress, username, character }) => ({ ipAddress, username, character}))(p);
        });
        const newMatch = new Match({
            players: this.matchPlayers,
            gameStart: this.gameStart,
            gameOver: this.gameOver,
            gameLeft: Date.now(),
            gameLength: Math.abs(this.gameOver - this.gameStart) / 1000,
            ipWinner: this.ipWinner,
            usernameWinner: this.usernameWinner,
            room: this.room,
        })
        newMatch.save()
            .then(() => console.log("Added match to history"))
            .catch(err => console.log(err));
        clearInterval(this.updateInterval);
    }

    loadPlayers(sockets, players) {
        for (const key of Object.keys(players)) {
            const socket = sockets[key];
            const player = players[key];
            this.addPlayer(socket, player.username, player.character);
            this.matchPlayers.push({
                ipAddress: player.ip,
                username: player.username,
                character: player.character,
                id: key, 
            });
        }
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
        for (let i = 0; i < 6; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 32, 288, 32, 16, true, this.handler));
            this.handler.addPlatform(new Platform(Type.PLATFORM, Constants.WIDTH - i * 32 - 64, 288, 32, 16, true, this.handler));
        }
        for (let i = 0; i < 8; i++) {
            this.handler.addPlatform(new Platform(Type.PLATFORM, i * 32 + 384, 320, 32, 16, true, this.handler));
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
            this.handler.addPlatform(new Platform(Type.PLATFORM, i, Constants.HEIGHT - 32, 32, 32, false, this.handler));
        }

        for (let i = 0; i < 3; i++) {
            this.handler.addPowerup(new Powerup(Type.DRILL_POWERUP, 250 + i * 100, 50, 
                Constants.POWERUP_WIDTH, Constants.POWERUP_HEIGHT, this.handler));
        }
    }

    addPlayer(socket, username, character) {
        this.sockets[socket.id] = socket;

        // Generate a position to start this player at.
        const x = Constants.WIDTH * (0.25 + Math.random() * 0.5);
        const y = Constants.HEIGHT * (0.25 + Math.random() * 0.5);
        if (character === Type.PANDA) {
            this.handler.players[socket.id] = 
                new Panda(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                    username, character, this.handler);
        } else if (character === Type.SEAL) {
            this.handler.players[socket.id] = 
                new Seal(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                    username, character, this.handler);
        } else if (character === Type.DINO) {
            this.handler.players[socket.id] = 
                new Dino(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                    username, character, this.handler);
        } else if (character === Type.EAGLE) {
            this.handler.players[socket.id] = 
                new Eagle(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                    username, character, this.handler);
        } else {
            this.handler.players[socket.id] = 
                new Panda(socket.id, Type.PLAYER, x, y, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, 
                    username, character, this.handler);
        }
    }
    
    removePlayer(socket) {
        if (Object.keys(this.handler.players).length === 1) {
            this.gameOver = Date.now();
            for (const key of Object.keys(this.handler.players)) {
                const winner = this.matchPlayers.find(e => e.id === key);
                this.ipWinner = winner.ipAddress;
                this.usernameWinner = winner.username;
            }
        }
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

    handleMouseInput(socket, x, y, msg_type) {
        if (this.handler.players[socket.id]) {
            if (msg_type === Constants.MSG_TYPES.CLICK) {
                this.mouseInput.handleClick(socket, x, y);
            } else if (msg_type === Constants.MSG_TYPES.KEYUP) {
                this.mouseInput.handleClick(socket, x, y);
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
        let serializedPlayer = {};
        if (player) {
            serializedPlayer = player.serializeForUpdate();
        } 

        return {
            t: Date.now(),
            me: serializedPlayer,
            others: Object.values(this.handler.players).filter(p => p !== player).map(p => p.serializeForUpdate()),
            platforms: Object.values(this.handler.platforms).filter(p => p.x === Constants.WIDTH).map(p => p.serializeForUpdate()),
            weapons: Object.values(this.handler.weapons).map(w => w.serializeForUpdate()),
            powerups: Object.values(this.handler.powerups).map(p => p.serializeForUpdate()),
        };
    }
}

module.exports = Game;