//Reflect bullet powerup that reflects multiple times before disappearing
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Bullet = require("./bullet");

class ReflectBullet extends Bullet {
    constructor(type, x, y, width, height, speed, dir, parentID, handler) {
        super(type, x, y, width, height, speed, dir, parentID, handler);
        
        this.cooldown = Constants.REFLECT_BULLET_COOLDOWN;
        this.bounces = Constants.REFLECT_BULLET_BOUNCES;
    }

    update(dt) {
        this.collision(dt);
        super.update(dt);

        if (this.cooldown > 0) {
            this.cooldown--;
        }
        console.log(this.bounces)
        if (this.bounces <= 0) {
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
            if (this.getBounds().intersects(temp.getBounds())) {
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
                if (temp.id !== this.parentID) {
                    temp.takeDamage(this.type);
                }
                if (temp.id !== this.parentID || this.cooldown == 0) {
                    this.handler.removeWeapon(this);
                }
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
            if (this.velX > 0 && 
                temp.x > this.x && 
                dt * this.velX > temp.x - (this.x + this.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX *= -1;
                this.dir *= -1;
                this.x += temp.x - (this.x + this.width);
                if (this.bounces > 0) {
                    this.bounces--;
                 }
            } else if (this.velX < 0 && 
                temp.x < this.x && 
                dt * Math.abs(this.velX) > this.x - (temp.x + temp.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX *= -1;
                this.dir *= -1;
                this.x -= this.x - (temp.x + temp.width);
                if (this.bounces > 0) {
                    this.bounces--;
                 }
            }
            if (this.velY > 0 && 
                temp.y > this.y && 
                dt * this.velY > temp.y - (this.y + this.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY *= -1;
                this.dir = Math.PI - this.dir;
                this.y += temp.y - (this.y + this.height);
                if (this.bounces > 0) {
                    this.bounces--;
                 }
            } else if (this.velY < 0 && 
                temp.y < this.y && 
                dt * Math.abs(this.velY) > this.y - (temp.y + temp.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY *= -1;
                this.dir = Math.PI - this.dir;
                this.y -= this.y - (temp.y + temp.height);
                if (this.bounces > 0) {
                    this.bounces--;
                 }
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
}

module.exports = ReflectBullet;