//Handles all key input for each player

class KeyInput {
    constructor(handler) {
        this.handler = handler;
    }

    handleKeyPress(socket, key) {
        const player = this.handler.players[socket.id];
        if (key === "W") {
            player.jump();
        }
        if (key === "D") {
            player.right();
        }          
        if (key === "A") {
            player.left();
        }
        if (key === "S") {
            if (player.faceRight) {
                player.shoot(Math.PI / 2);
            } else {
                player.shoot(3 * Math.PI / 2);
            }
        }
        if (key === "Q") {
            player.qAbility();
        }
    }
 
    handleKeyUp(socket, key) {
        const player = this.handler.players[socket.id];
        if (key === "D") {
            player.stopRight();
        }          
        if (key === "A") {
            player.stopLeft();
        }
    }
}

module.exports = KeyInput;