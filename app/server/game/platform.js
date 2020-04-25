//Basic platform that is solid for every player and many weapons
const shortid = require("shortid");
const Constants = require("../../shared/constants");
const GameObject = require("./gameObject");

class Platform extends GameObject {
    constructor(type, x, y, width, height, breakable, handler) {
        super(shortid(), type, x, y, width, height);
        this.breakable = breakable;
        this.handler = handler;

        this.solid = true;
        this.originalX = x;
        this.originalY = y;
        this.respawnTimer = 0;
    } 
   
    update(dt) {
        if (this.respawnTimer > 0) {
            this.respawnTimer--;
        } else if (this.x != this.originalX) {
            this.reappear();
        }
    }
   
    disappear() {
        this.respawnTimer = 1000;
        this.x = Constants.WIDTH;
        this.y = Constants.HEIGHT;
    }
   
    reappear() {
        this.x = this.originalX;
        this.y = this.originalY;
    } 

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            width: this.width,
            height: this.height
        };
    }
}

module.exports = Platform;