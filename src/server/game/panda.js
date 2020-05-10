//Panda character
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Player = require("./player");
const Bullet = require("./bullet");
const BambooStorm = require("./bambooStorm");
const ReflectBullet = require("./reflectBullet");

class Panda extends Player {

    update(dt) {
        super.update(dt);
                
        if (this.abilityMeter < 100) {
            this.abilityMeter += 0.05;
        }
    }

    //Method to basic shoot
    basicShoot(dir) {
        if (this.powerup === Type.NO_POWERUP) {
            this.handler.addWeapon(new Bullet(Type.BULLET, 
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2),
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED, dir, this.id, this.handler));
        } else if (this.powerup === Type.REFLECT_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2), 
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED, dir, this.id, this.handler));
        }
        this.shootCooldown -= 0.1;
    }
   
    //Method to attack using special ability
    qAbility() {
        if (this.abilityMeter < 100) {
            return;
        }
        this.abilityMeter = 0;
        this.shootCooldown += Constants.PLAYER_FIRE_COOLDOWN;

        this.handler.addWeapon(new BambooStorm(Type.BAMBOO_STORM, 0, 0, 0, 0, this.id, this.handler))
    }
}

module.exports = Panda;