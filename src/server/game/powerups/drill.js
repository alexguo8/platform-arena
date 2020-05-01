//Drill powerup that destroys blocks and explodes on contact
const Constants = require("../../../shared/constants");
const Type = require("../../../shared/objectTypes")
const Bullet = require("../bullet");
const Explosion = require("./explosion");
const Rectangle = require("../rectangle");

class Drill extends Bullet {
    getBounds() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    //Method to check collision with platforms, players, and other weapons
    collision(dt) {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds()) && temp.id !== this.parentID) {
                    this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                        this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                        this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                        Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                    this.handler.removeWeapon(this);
                    return;
                }    
            }
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds())) {
                    if (temp.breakable) {
                        temp.disappear();
                    } else {
                        this.handler.addWeapon(new Explosion(Type.EXPLOSION, 
                            this.x - (Constants.EXPLOSION_WIDTH / 2) + (this.width / 2), 
                            this.y - (Constants.EXPLOSION_HEIGHT / 2) + (this.height / 2), 
                            Constants.EXPLOSION_WIDTH, Constants.EXPLOSION_HEIGHT, this.handler));
                        this.handler.removeWeapon(this);
                        return;
                    }
                }
            }
        }
        for (const key of Object.keys(this.handler.weapons)) {
            const temp = this.handler.weapons[key];
            
            if (temp && temp.id !== this.id) {            
                if (this.getBounds().intersects(temp.getBounds())) {
                    if (temp.type === Type.BULLET || temp.type === Type.REFLECT_BULLET) {
                        this.handler.removeWeapon(temp);
                    } else if (temp.type === Type.DRILL) {
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
    }
}

module.exports = Drill;