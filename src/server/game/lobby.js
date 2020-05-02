const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")

class Lobby {            
    constructor(room) {
        this.room = room;
        this.sockets = {};
        this.players = {};
    }

    updatePlayer(socket, character) {
        this.players[socket.id].character = character;
        this.update();
    }

    addPlayer(socket, username, ip) {
        this.sockets[socket.id] = socket;
        this.players[socket.id] = {
            username: username,
            character: Type.NO_CHARACTER,
            ip: ip,
        }
        this.update();
    }
    
    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }

    update() {
        for (const playerID of Object.keys(this.sockets)) {
            const socket = this.sockets[playerID];
            socket.emit(Constants.MSG_TYPES.LOBBY_UPDATE, this.players);
        };
    }
}

module.exports = Lobby;