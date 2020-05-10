//Powerup that randomly spawns and gives player's special weapons
const shortid = require("shortid");
const GameObject = require("../gameObject");
const Constants = require("../../../shared/constants");
const Type = require("../../../shared/objectTypes");
const Rectangle = require("../rectangle");

class Powerup extends GameObject {
    constructor(type, x, y, width, height, handler) {
        super(shortid(), type, x, y, width, height);
        this.handler = handler;

        this.cooldown = 0;
    }

    getBounds() {
        return new Rectangle(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
    }
   
    update(dt) {
        this.collision();
        if (this.cooldown > 0) {
            this.cooldown--;
        } else {
            this.spawn();
        }  
    }
   
   //Method to check collision with platforms and players
    collision() {
        for (const key of Object.keys(this.handler.players)) {
            const temp = this.handler.players[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds())) {
                    if (this.type === Type.SHIELD_POWERUP) {
                        temp.shielded = true;
                    } else {
                        temp.powerup = this.type;
                        switch(this.type) {
                            case Type.DRILL_POWERUP:
                                temp.specialAmmo = 1;
                                break;
                            case Type.BOMB_POWERUP:
                                temp.specialAmmo = 2;
                                break;
                            case Type.MINE_POWERUP:
                                temp.specialAmmo = 2;
                                break;
                            case Type.REFLECT_POWERUP:
                                temp.specialAmmo = 5;
                                break;
                            default:
                                break;
                        }
                    }
                    this.cooldown = 100;
                    this.x = Constants.WIDTH + 100;
                    this.y = Constants.HEIGHT + 100;   
                }    
            }
        }
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];
            
            if (temp) {            
                if (this.getBounds().intersects(temp.getBounds())) {
                    this.spawn();            
                }
            }
        }
   }
   
    //Method to randomize spawn location and type
    spawn() {
        this.x = Math.random() * (Constants.WIDTH - 32);
        this.y = Math.random() * (Constants.HEIGHT - 55);
        this.cooldown = 2000;
        const choices = [Type.SHIELD_POWERUP, Type.DRILL_POWERUP, Type.BOMB_POWERUP, 
            Type.MINE_POWERUP, Type.REFLECT_POWERUP];
        const choice = Math.floor(Math.random() * choices.length);
        this.type = choices[choice];
    }

    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            type: this.type,
        };
    }
}

module.exports = Powerup;