//Parent class for all HUD objects

class HUDObject {
    constructor(id, type, x, y, width, height) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
    }
   
    serializeForUpdate() {
        return {
            x: this.x,
            y: this.y,
        };
    }
}

module.exports = HUDObject;