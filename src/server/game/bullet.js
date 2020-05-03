//Basic bullet weapon that every character can shoot
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Explosion = require("./powerups/explosion");
const Rectangle = require("./rectangle");

class Bullet extends GameObject {
    constructor(type, x, y, width, height, speed, dir, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.dir = dir;
        this.velX = speed * Math.sin(dir);
        this.velY = speed * Math.cos(dir);
        this.parentID = parentID;
        this.handler = handler;
        this.character = this.handler.players[this.parentID].character;
    }

    getBounds() {
        return new Rectangle(this.x + (this.width / 2) - (this.height / 2), 
            this.y, this.height, this.height);
    }

    update(dt) {
        this.collision(dt);
        super.update(dt);
        if (this.x < 0 || this.x > Constants.WIDTH || this.y < 0 || this.y > Constants.HEIGHT) {
            this.handler.removeWeapon(this);
        }
        if (this.handler.players[this.parentID] && this.handler.players[this.parentID].character === Type.SEAL &&
            this.type === Type.BULLET) {
            this.velY += 15;
        }
    }
  
    //Method to check collision with platforms, players, and other weapons
    collision(dt) {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (!temp) { 
                continue;
            }           
            if (this.getBounds().intersects(temp.getBounds()) && temp.id !== this.parentID) {
                if (this.handler.players[this.parentID] && this.handler.players[this.parentID].character === Type.DINO) {
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                        this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                        this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                } else if (this.handler.players[this.parentID] && this.handler.players[this.parentID].character === Type.EAGLE) {
                    temp.health -= 5;
                } else {
                    temp.takeDamage(this.type);
                }
                this.handler.removeWeapon(this);
                return;
            }    
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (!temp) {
                continue;
            }            
            if (this.handler.players[this.parentID] && this.handler.players[this.parentID].character === Type.SEAL) {
                if (this.velY > 0 && 
                    temp.y > this.y && 
                    dt * this.velY > temp.y - (this.y + this.height) && 
                    this.x + this.width > temp.x && 
                    this.x < temp.x + temp.width) {
                    this.velY = -200;
                    this.y += temp.y - (this.y + this.height);
                }
            }
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
            dir: this.dir,
            character: this.character,
        };
    }
}

module.exports = Bullet;
