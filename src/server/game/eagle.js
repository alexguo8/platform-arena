//Eagle character
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Player = require("./player");
const Bullet = require("./bullet");
const ReflectBullet = require("./reflectBullet");

class Eagle extends Player {
    //Method to basic shoot
    basicShoot(dir) {
        if (this.powerup === Type.NO_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2), 
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED, dir, this.id, this.handler));
        } else if (this.powerup === Type.REFLECT_POWERUP) {
            this.handler.addWeapon(new ReflectBullet(Type.BULLET,
                this.x, this.y + (this.height / 2) - (Constants.BULLET_HEIGHT / 2), 
                Constants.BULLET_WIDTH, Constants.BULLET_HEIGHT, 
                Constants.BULLET_SPEED, dir, this.id, this.handler));
        }
    }
   
   //Method to attack using special ability
   qAbility() {
    //   if (character == ID.Panda) {
    //      handler.addObject(new BambooStorm(0, 0, 0, 0, this, ID.BambooStorm, handler));
    //   } else if (character == ID.Eagle) {
    //      if (faceRight) {
    //         handler.addObject(new Laser(x + width, y + height/2 - 12, 
    //               24, faceRight, this, ID.Laser, handler));
    //      } else {
    //         handler.addObject(new Laser(x, y + height/2 - 12, 
    //               24, faceRight, this, ID.Laser, handler));
    //      }
    //   } else if (character == ID.Eagle) {
    //      handler.addObject(new FireCloud(x + width/2 - 150, y + height/2 - 150, 
    //            300, 300, this, ID.FireCloud, handler));
    //   } else if (character == ID.Eagle) {
    //      if (faceRight) {
    //         handler.addObject(new TeleportBullet(x + width, y + height/2 - 5, 
    //               32, 10, 25, this, ID.TeleportBullet, handler));
    //      } else {
    //         handler.addObject(new TeleportBullet(x - 32, y + height/2 - 5, 
    //               32, 10, -25, this, ID.TeleportBullet, handler));         
    //      }
    //   }
    //   shootCooldown += 25;
    //   abilityMeter = 0;
   }
}

module.exports = Eagle;