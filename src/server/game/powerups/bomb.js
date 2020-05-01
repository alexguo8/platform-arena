//Bomb powerup that launches like a projectile and explodes
const shortid = require("shortid");
const GameObject = require("../gameObject");
const Constants = require("../../../shared/constants");
const Type = require("../../../shared/objectTypes")
const Explosion = require("./explosion");

class Bomb extends GameObject {
    constructor(type, x, y, width, height, speed, dir, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.velX = speed * Math.sin(dir);
        this.velY = speed * Math.cos(dir);
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = Constants.BOMB_COOLDOWN;
        this.lifetime = Constants.BOMB_LIFETIME;
    }

    update(dt) {
        super.update(dt);
        this.velY += Constants.BOMB_GRAVITY;  
        if (this.x < 0 || this.x > Constants.WIDTH || this.y < 0 || this.y > Constants.HEIGHT) {
            this.handler.removeWeapon(this);
        }

        if (this.cooldown > 0) {
            this.cooldown--;
        }
        if (this.lifetime > 0) {
            this.lifetime--;
        } else if (this.lifetime === 0) {
            this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
            this.handler.removeWeapon(this);
            return;
        }
        this.collision(dt);
        
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
            if (this.velX > 0 && 
                temp.x > this.x && 
                dt * this.velX > temp.x - (this.x + this.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX *= -1;
                this.x += temp.x - (this.x + this.width);
            } else if (this.velX < 0 && 
                temp.x < this.x && 
                dt * Math.abs(this.velX) > this.x - (temp.x + temp.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX *= -1;
                this.x -= this.x - (temp.x + temp.width);
            }
            if (this.velY > 0 && 
                temp.y > this.y && 
                dt * this.velY > temp.y - (this.y + this.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY *= -0.8;
                this.y += temp.y - (this.y + this.height);
            } else if (this.velY < 0 && 
                temp.y < this.y && 
                dt * Math.abs(this.velY) > this.y - (temp.y + temp.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY *= -1;
                this.y -= this.y - (temp.y + temp.height);
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
                }  else if (temp.type === Type.DRILL || temp.type === Type.BOMB) {
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                        this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                        this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                        temp.x - (Constants.EXPLOSION_WIDTH / 2) + (temp.width / 2), 
                        temp.y - (Constants.EXPLOSION_HEIGHT / 2) + (temp.height / 2), 
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                    this.handler.removeWeapon(temp);
                    this.handler.removeWeapon(this);
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

module.exports = Bomb;