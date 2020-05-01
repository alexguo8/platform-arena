//Handles all mouse input for each player

class MouseInput {
    constructor(handler) {
        this.handler = handler;
    }

    handleClick(socket, x, y) {
        const player = this.handler.players[socket.id];
        const dir = Math.atan2(x - (player.x + (player.width / 2)), y - (player.y + (player.height / 2)));
        player.shoot(dir);
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

module.exports = MouseInput;