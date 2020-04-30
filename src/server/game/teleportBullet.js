//Eagle special ability that teleports it to a wall or on top of a player it hits, dodges most other special weapons
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Bullet = require("./bullet");

class TeleportBullet extends Bullet {
    //Method to check collision with platforms, players, and other weapons
    collision(dt) {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (!temp) { 
                continue;
            }           
            if (this.getBounds().intersects(temp.getBounds()) &&
                temp.id !== this.parentID) {
                const owner = this.handler.players[this.parentID];
                owner.x = temp.x;
                owner.y = temp.y - temp.height;
                this.handler.removeWeapon(this); 
            }
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (!temp) {
                continue;
            }            
            if (this.getBounds().intersects(temp.getBounds())) {
                const owner = this.handler.players[this.parentID];
                if (this.velX > 0) {
                    owner.x = temp.x - owner.width;
                } else {
                    owner.x = temp.x + temp.width;
                }
                owner.y = this.y - owner.height / 2 + 5;
                this.handler.removeWeapon(this); 
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
                    return;
                }
            }
        }
    }
}

module.exports = TeleportBullet;