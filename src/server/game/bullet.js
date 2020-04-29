//Basic bullet weapon that every character can shoot
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Rectangle = require("./rectangle");

class Bullet extends GameObject {
    constructor(type, x, y, width, height, speed, dir, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.dir = dir;
        this.velX = speed * Math.sin(dir);
        this.velY = speed * Math.cos(dir);
        this.parentID = parentID;
        this.handler = handler;
    }

    getBounds() {
        return new Rectangle(this.x + (this.width / 4), this.y, this.width / 2, this.height);
    }

    update(dt) {
        this.collision();
        super.update(dt);
        if (this.x < 0 || this.x > Constants.WIDTH || this.y < 0 || this.y > Constants.HEIGHT) {
            this.handler.removeWeapon(this);
        }
    }
  
    //Method to check collision with platforms, players, and other weapons
    collision() {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (!temp) { 
                continue;
            }           
            if (this.getBounds().intersects(temp.getBounds()) && temp.id !== this.parentID) {
                    // tempPlayer = temp;
                    // if (owner.getCharacter() == ID.Dino) {
                    //     handler.addObject(new Explosion(x - 32 + width/2, y - 32 + height/2, 64, 64, ID.Explosion, handler));
                    // } else {
                        // if (tempPlayer.getShielded()) {
                        // tempPlayer.setShielded(false);
                        // } else if (owner.getCharacter() == ID.Eagle) {
                        // tempPlayer.setHealth(tempPlayer.getHealth() - 5);
                        // } else {
                        // tempPlayer.setHealth(tempPlayer.getHealth() - 10);
                        // }
                    // }
                temp.takeDamage(this.type);
                this.handler.removeWeapon(this);
                return;
            }    
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (!temp) {
                continue;
            }            
            // if (owner.getCharacter() == ID.Seal) {
            //     if (velY > 0 && temp.y > y && velY > temp.y - (y+height)
            //         && x + width > temp.x && x < temp.x + temp.width) {
            //         velY = -5;
            //         y += temp.y - (y+height);
            //     }
            // }
            if (this.getBounds().intersects(temp.getBounds())) {
                this.handler.removeWeapon(this);     
                return;            
            }
        }
        for (const key of Object.keys(this.handler.weapons)) {
            const temp = this.handler.weapons[key];
            
            if (!temp || temp.id === this.id) { 
                continue;           
            }
            if (this.getBounds().intersects(temp.getBounds())) {
                if (temp.type === Type.BULLET) {
                    this.handler.removeWeapon(this);
                    this.handler.removeWeapon(temp);
                    return;
                }
            }
        }
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            type: this.type,
            dir: this.dir
        };
    }
}

module.exports = Bullet;
