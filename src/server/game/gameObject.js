//Parent class for all game objects
const Rectangle = require("./rectangle");

class GameObject {
    constructor(id, type, x, y, width, height) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.solid = false;
        this.speed = 0;
        this.dir = 0;
        this.velX = 0;
        this.velY = 0;
    }
    
    getBounds() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    update(dt) {
        this.x += dt * this.velX;
        this.y += dt * this.velY;
    }
   
    serializeForUpdate() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
        };
    }
}

module.exports = GameObject;