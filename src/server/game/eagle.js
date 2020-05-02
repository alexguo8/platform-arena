//Eagle character
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Player = require("./player");
const Bullet = require("./bullet");
const TeleportBullet = require("./teleportBullet");
const ReflectBullet = require("./reflectBullet");

class Eagle extends Player {
    update(dt) {
        super.update(dt);
                
        if (this.abilityMeter < 100) {
            this.abilityMeter += 0.3;
        }
    }

    //Method to basic shoot
    basicShoot(dir) {
        if (this.powerup === Type.NO_POWERUP) {
            this.handler.addWeapon(new Bullet(Type.BULLET, 
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2),
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED + 100, dir, this.id, this.handler));
        } else if (this.powerup === Type.REFLECT_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2), 
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED + 100, dir, this.id, this.handler));
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

        if (this.faceRight) {
            this.handler.addWeapon(new TeleportBullet(Type.TELEPORT_BULLET, 
                this.x, this.y + (this.height / 2) - (Constants.TELEPORT_BULLET_HEIGHT / 2), 
                Constants.TELEPORT_BULLET_WIDTH, Constants.TELEPORT_BULLET_HEIGHT,
                Constants.TELEPORT_BULLET_SPEED, Math.PI / 2, this.id, this.handler));
        } else {
            this.handler.addWeapon(new TeleportBullet(Type.TELEPORT_BULLET, 
                this.x, this.y + (this.height / 2) - (Constants.TELEPORT_BULLET_HEIGHT / 2), 
                Constants.TELEPORT_BULLET_WIDTH, Constants.TELEPORT_BULLET_HEIGHT,
                Constants.TELEPORT_BULLET_SPEED, 3 * Math.PI / 2, this.id, this.handler));
        }
    }
}

module.exports = Eagle;