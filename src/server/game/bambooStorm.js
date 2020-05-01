//Panda special ability that spawns bamboo objects
const shortid = require("shortid");
const GameObject = require("./gameObject");
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const Bamboo = require("./bamboo");
const Explosion = require("./powerups/explosion")
const Rectangle = require("./rectangle");

class BambooStorm extends GameObject {
    constructor(type, x, y, width, height, parentID, handler) {
        super(shortid(), type, x, y, width, height);
        this.parentID = parentID;
        this.handler = handler;

        this.cooldown = 0;
        this.times = Constants.BAMBOO_STORM_TIMES;
    }

    update(dt) {
        if (this.cooldown > 0) {
            this.cooldown--;
        } else {
            const direction = Math.floor(Math.random() * 4);
            const amountShowing = (Constants.BAMBOO_WIDTH) / 4;
            const innerWidthRand = Math.random() * 
                (Constants.WIDTH - 2 * Constants.PLATFORM_WIDTH - Constants.BAMBOO_HEIGHT) + Constants.PLATFORM_WIDTH;
            const innerHeightRand = Math.random() * 
                (Constants.HEIGHT - 2 * Constants.PLATFORM_HEIGHT - Constants.BAMBOO_HEIGHT) + Constants.PLATFORM_HEIGHT;
            if (direction === 0) {
                this.handler.addWeapon(new Bamboo(Type.BAMBOO, 
                    -Constants.BAMBOO_WIDTH + amountShowing, innerHeightRand, 
                    Constants.BAMBOO_WIDTH, Constants.BAMBOO_HEIGHT, 
                    Constants.BAMBOO_SPEED, Math.PI / 2, this.parentID, this.handler));
            } else if (direction === 1) {
                this.handler.addWeapon(new Bamboo(Type.BAMBOO, 
                    Constants.WIDTH - amountShowing, innerHeightRand, 
                    Constants.BAMBOO_WIDTH, Constants.BAMBOO_HEIGHT, 
                    Constants.BAMBOO_SPEED, 3 * Math.PI / 2, this.parentID, this.handler));
            } else if (direction === 2) {
                this.handler.addWeapon(new Bamboo(Type.BAMBOO, 
                    innerWidthRand, -Constants.BAMBOO_WIDTH + amountShowing, 
                    Constants.BAMBOO_HEIGHT, Constants.BAMBOO_WIDTH, 
                    Constants.BAMBOO_SPEED, 0, this.parentID, this.handler));
            } else if (direction === 3) {
                this.handler.addWeapon(new Bamboo(Type.BAMBOO, 
                    innerWidthRand, Constants.HEIGHT - amountShowing, 
                    Constants.BAMBOO_HEIGHT, Constants.BAMBOO_WIDTH, 
                    Constants.BAMBOO_SPEED, Math.PI, this.parentID, this.handler));
            }

            this.cooldown += Constants.BAMBOO_STORM_COOLDOWN;
            if (this.times > 0) {
                this.times--;
            } else if (this.times === 0) {
                this.handler.removeWeapon(this);
            }
        }
    }
}

module.exports = BambooStorm;
