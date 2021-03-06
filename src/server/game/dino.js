//Dino character
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Player = require("./player");
const Bullet = require("./bullet");
const FireCloud = require("./fireCloud");
const ReflectBullet = require("./reflectBullet");
const Bomb = require("./powerups/bomb");

class Dino extends Player {

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
                this.x + (this.width / 2) - (Constants.BULLET_WIDTH / 2), 
                this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2),
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED - 100, dir, this.id, this.handler));
        } else if (this.powerup === Type.REFLECT_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x + (this.width / 2) - (Constants.BULLET_WIDTH / 2), 
                this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2),
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED - 100, dir, this.id, this.handler));
        }
    }
   
    //Method to attack using special ability
    qAbility() {
        if (this.abilityMeter < 100) {
            return;
        }
        this.abilityMeter = 0;
        this.shootCooldown += Constants.PLAYER_FIRE_COOLDOWN;

        this.handler.addWeapon(new FireCloud(Type.FIRE_CLOUD, 
            this.x + (this.width / 2) - (Constants.FIRE_CLOUD_WIDTH / 2), 
            this.y + (this.height / 2) - (Constants.FIRE_CLOUD_HEIGHT / 2), 
            Constants.FIRE_CLOUD_WIDTH, Constants.FIRE_CLOUD_HEIGHT, 
            Constants.FIRE_CLOUD_SPEED, this.id, this.handler));
    }
}

module.exports = Dino;