//Dino special ability that blocks weapons and damages over time
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Explosion = require("./powerups/explosion")
const Rectangle = require("./rectangle");

class FireCloud extends GameObject {
    constructor(type, x, y, width, height, speed, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.speed = speed;
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = Constants.FIRE_CLOUD_COOLDOWN;
        this.lifetime = Constants.FIRE_CLOUD_LIFETIME;
        this.damaged = [];
    }

    getBounds() {
        const innerWidth = this.width / Math.SQRT2;
        const margin = (this.width - innerWidth) / 2;
        return new Rectangle(this.x + margin, this.y + margin, innerWidth, innerWidth);
    }

    update(dt) {
        this.collision(dt);
        if (this.width < Constants.FIRE_CLOUD_MAX_WIDTH) {
            this.x -= dt * this.speed;
            this.y -= dt * this.speed;
            this.width += dt * this.speed * 2;
            this.height += dt * this.speed * 2;
        }
        if (this.cooldown > 0) {
            this.cooldown--;
        } else {
            this.cooldown = 50;
            this.damaged = [];
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
                if (temp.type === Type.BULLET || temp.type === Type.BAMBOO) {
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
            type: this.type,
            width: this.width,
            height: this.height,
        };
    }
}

module.exports = FireCloud;
