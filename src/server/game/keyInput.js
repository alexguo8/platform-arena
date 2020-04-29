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
        // if (key === KeyEvent.VK_Q && player.getAbilityMeter() === 100) {
        //     player.ability();
        // }
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