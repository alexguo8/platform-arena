//Seal character
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Player = require("./player");
const Bullet = require("./bullet");
const ReflectBullet = require("./reflectBullet");
const Drill = require("./powerups/drill");
const Laser = require("./laser");

class Seal extends Player {

    update(dt) {
        super.update(dt);
                
        if (this.abilityMeter < 100) {
            this.abilityMeter += 0.1;
        }
    }

    //Method to basic shoot
    basicShoot(dir) {
        if (this.powerup === Type.NO_POWERUP) {
            this.handler.addWeapon(new Bullet(Type.BULLET, 
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2),
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED - 200, dir, this.id, this.handler));
        } else if (this.powerup === Type.REFLECT_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2), 
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED - 200, dir, this.id, this.handler));
        }
        this.shootCooldown += 0.2;
    }
   
    //Method to attack using special ability
    qAbility() {
        if (this.abilityMeter < 100) {
            return;
        }
        this.abilityMeter = 0;
        this.shootCooldown += Constants.PLAYER_FIRE_COOLDOWN;

        if (this.faceRight) {
            this.handler.addWeapon(new Laser(Type.LASER, this.x + this.width, this.y, 0, Constants.LASER_HEIGHT,
                1, this.id, this.handler));
        } else {
            this.handler.addWeapon(new Laser(Type.LASER, this.x, this.y, 0, Constants.LASER_HEIGHT,
                -1, this.id, this.handler));
        }
    }
}

module.exports = Seal;