const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")

class Lobby {            
    constructor(room) {
        this.room = room;
        this.players = {};
    }

    updatePlayer(socket, character) {
        this.players[socket.id].character = character;
        // this.update();
    }

    addPlayer(socket, username) {
        this.players[socket.id] = {
            socket: socket,
            username: username,
            character: Type.NO_CHARACTER
        }
    }
    
    removePlayer(socket) {
        delete this.players[socket.id];
    }

    update() {
        for (const playerID of Object.keys(this.players)) {
            const socket = this.players[playerID].socket;
            socket.emit(Constants.MSG_TYPES.LOBBY_UPDATE, this.players);
        };
    }
}

module.exports = Lobby;