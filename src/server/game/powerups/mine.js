//Mine powerup that damages when stepped on, follows gravity
const shortid = require("shortid");
const GameObject = require("../gameObject");
const Constants = require("../../../shared/constants");
const Type = require("../../../shared/objectTypes")
const Explosion = require("./explosion");

class Mine extends GameObject {
    constructor(type, x, y, width, height, speed, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.velY = speed;
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = Constants.MINE_COOLDOWN;
    }

    update(dt) {
        this.collision(dt);
        super.update(dt);
        this.velY += 30;  
        if (this.x < 0 || this.x > Constants.WIDTH || this.y < 0 || this.y > Constants.HEIGHT) {
            this.handler.removeWeapon(this);
        }

        if (this.cooldown > 0) {
            this.cooldown--;
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
                (temp.id !== this.parentID || this.cooldown === 0)) {
                this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                    this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                    this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                    Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                this.handler.removeWeapon(this);
                return;
            }    
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];

            if (!temp) {
                continue;
            }             
            if (this.velY > 0 && 
                temp.y > this.y && 
                dt * this.velY > temp.y - (this.y + this.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY = 0;
                this.y += temp.y - (this.y + this.height);
            }           
        }
        for (const key of Object.keys(this.handler.weapons)) {
            const temp = this.handler.weapons[key];
            
            if (!temp || temp.id === this.id) {  
                continue;
            }             
            if (this.getBounds().intersects(temp.getBounds())) {
                if (temp.type === Type.BULLET || temp.type === Type.MINE ||
                    temp.type === Type.BOMB) {
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                        this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                        this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                    this.handler.removeWeapon(this);
                    return;
                }
                if (temp.type === Type.BULLET || temp.type === Type.MINE) {
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
        };
    }
}

module.exports = Mine;