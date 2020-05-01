//Panda special ability weapon
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Explosion = require("./powerups/explosion")

class Bamboo extends GameObject {
    constructor(type, x, y, width, height, speed, dir, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.dir = dir;
        this.velX = speed * Math.sin(dir);
        this.velY = speed * Math.cos(dir);
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = Constants.BAMBOO_COOLDOWN;
        this.damaged = [];
    }

    update(dt) {
        this.collision(dt);

        if (this.cooldown > 0) {
            this.cooldown--;
        } else {
            super.update(dt);
        }
        if (this.x + this.width < 0 || this.x > Constants.WIDTH || 
            this.y + this.height < 0 || this.y > Constants.HEIGHT) {
            this.handler.removeWeapon(this);
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
                temp.id !== this.parentID && !this.damaged.includes(temp.id)) {
                
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
            type: this.type,
            dir: this.dir
        };
    }
}

module.exports = Bamboo;
