//Seal special ability that shoots a hitscan laser weapon with brief delay
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Explosion = require("./powerups/explosion")
const Rectangle = require("./rectangle");

class Laser extends GameObject {
    constructor(type, x, y, width, height, dir, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.dir = dir;
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = Constants.LASER_COOLDOWN;
        this.lifetime = Constants.LASER_LIFETIME;
        this.damaged = [];

        let shortestDistance = Infinity;
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (!temp) {
                continue;
            }
            if (this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                if (this.dir > 0 && this.x < temp.x) {
                    shortestDistance = Math.min(temp.x - this.x, shortestDistance);
                } else if (this.dir < 0 && this.x > temp.x + temp.width) {
                    shortestDistance = Math.min(this.x - (temp.x + temp.width), shortestDistance);
                }
            }
        }
        this.width = shortestDistance; 
    }

    getBounds() {
        if (this.dir > 0) {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }
        return new Rectangle(this.x - this.width, this.y, this.width, this.height);
    }

    update(dt) {
        this.collision(dt);

        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (this.lifetime > 0) {
            this.lifetime--;
        } else if (this.lifetime === 0) {
            this.handler.removeWeapon(this);
            return;
        }
    }
  
    //Method to check collision with platforms, players, and other weapons
    collision(dt) {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (!temp) { 
                continue;
            }           
            if (this.getBounds().intersects(temp.getBounds()) && 
                temp.id !== this.parentID && this.cooldown === 0 &&
                !this.damaged.includes(temp.id)) {
                
                temp.takeDamage(this.type);
                this.damaged.push(temp.id);
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
                    this.handler.removeWeapon(temp);
                    return;
                } else if (temp.type === Type.MINE || temp.type === Type.BOMB ||
                    temp.type === Type.DRILL) {
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION,
                        temp.x - (Constants.EXPLOSION_WIDTH / 2) + (temp.width / 2),
                        temp.y - (Constants.EXPLOSION_HEIGHT / 2) + (temp.height / 2),
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                    this.handler.removeWeapon(temp);
                }
            }
        }
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            cooldown: this.cooldown,
            width: this.width,
            type: this.type,
            dir: this.dir
        };
    }
}

module.exports = Laser;
