//Explosion object for bombs and drills that deals damage in an area and breaks platforms
const shortid = require("shortid");
const GameObject = require("./gameObject");

class Explosion extends GameObject {
    constructor(type, x, y, width, height, handler) {
        super(shortid(), type, x, y, width, height);
        this.handler = handler;

        this.lifetime = 10;
        this.damaged = [];
    } 

    update(dt) {      
        if (this.lifetime > 0) {
            this.lifetime--;
        } else {
            this.handler.removeWeapon(this);
        }
        this.collision();
    }
   
    //Method to check collision with platforms, players
    collision() {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds()) && !this.damaged.includes(temp.id)) {
                    temp.takeDamage(this.type);
                    this.damaged.push(temp.id);
                }    
            }
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds())) {
                    if (temp.breakable) {
                        temp.disappear();
                    }
                }
            }
        }
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            type: this.type,
        };
    }
}

module.exports = Explosion;