//Handles all key input for each player

export default class KeyInput {
    constructor(player) {
        this.player = player;
    }

    handleKeyPress(key) {
        if (key === "W") {
            this.player.jump();
        }
        if (key === "D") {
            this.player.right();
        }          
        if (key === "A") {
            this.player.left();
        }
    }
 
    handleKeyUp(key) {
        if (key === "D") {
            this.player.stopRight();
        }          
        if (key === "A") {
            this.player.stopLeft();
        }
    }
}
