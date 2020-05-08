//Player class that handles all actions like shooting and using special abilities
const Constants = require("../../shared/constants");
const Type = require("../../shared/objectTypes")
const GameObject = require("./gameObject");
const Bullet = require("./bullet");
const ReflectBullet = require("./reflectBullet");
const Drill = require("./powerups/drill");
const Bomb = require("./powerups/bomb");
const Mine = require("./powerups/mine");
const { clamp } = require("./utils/utilFunctions");

class Player extends GameObject {
    constructor(id, type, x, y, width, height, username, character, handler) {
        super(id, type, x, y, width, height);
        this.username = username;
        this.character = character;
        this.handler = handler; 

        this.solid = true;
        this.inAir = false;
        this.faceRight = true;
        this.shielded = false;  
        this.health = 100;
        this.shootCooldown = 0;
        this.specialAmmo = 0;
        this.abilityMeter = 0;
        this.powerup = Type.NO_POWERUP;
    
        this.lP = false;
        this.rP = false;
        this.sequence = 0;
    } 

    update(dt) {
        this.velY += Constants.PLAYER_GRAVITY;  
                
        if (this.velY > 0) {
            this.inAir = true;
        }
        
        if (this.rP) {
            this.velX = Constants.PLAYER_SPEED;
        } else if (this.lP) {
            this.velX = -Constants.PLAYER_SPEED;
        } else {
            this.velX = 0;
        }

        this.collision(dt);
        super.update(dt);
        this.x = clamp(this.x, 0, Constants.WIDTH - this.width);
        this.y = clamp(this.y, 0, Constants.HEIGHT - this.height);
        
        if (this.health <= 0) {
            this.handler.removePlayer(this);
        }     

        if (this.shootCooldown > 0) {
            this.shootCooldown -= dt;
            this.shootCooldown = Math.max(0, this.shootCooldown);
        }
    }

    left() {
        this.lP = true;
        this.faceRight = false; 
        this.sequence++;
    }

    right() {
        this.rP = true;
        this.faceRight = true; 
        this.sequence++;
    }

    stopLeft() {
        this.lP = false;
        this.sequence++;
    }

    stopRight() {
        this.rP = false;
        this.sequence++;
    }

    jump() {
        if (!this.inAir) {
            this.velY = -Constants.PLAYER_JUMP;
            this.inAir = true;
        }
        // this.sequence++;
    }

    takeDamage(source) {
        if (this.shielded) {
            this.shielded = false;
        } else {
            if (source === Type.BULLET) {
                this.health -= Constants.BULLET_DAMAGE;
            } else if (source === Type.EXPLOSION) {
                this.health -= Constants.EXPLOSION_DAMAGE;
            } else if (source === Type.BAMBOO) {
                this.health -= Constants.BAMBOO_DAMAGE;
            } else if (source === Type.LASER) {
                this.health -= Constants.LASER_DAMAGE;
            } else if (source === Type.FIRE_CLOUD) {
                this.health -= Constants.FIRE_CLOUD_DAMAGE;
            } else if (source === Type.TELEPORT_BULLET) {
                this.health -= Constants.TELEPORT_BULLET_DAMAGE;
            }
        }
    }
    
    onDealtDamage() {
        this.abilityMeter += 1;
    }

    //Method to check collision with platforms and players
    collision(dt) {
        const solid = Object.keys(this.handler.platforms).concat(Object.keys(this.handler.players));
        for (const key of solid) {
            const temp = this.handler.platforms[key] || this.handler.players[key];

            if (!temp) {
                continue;
            }              
            if (this.velX > 0 && 
                temp.x > this.x && 
                dt * this.velX > temp.x - (this.x + this.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX = 0;
                this.x += temp.x - (this.x + this.width);
            } else if (this.velX < 0 && 
                temp.x < this.x && 
                dt * Math.abs(this.velX) > this.x - (temp.x + temp.width) && 
                this.y + this.height > temp.y && 
                this.y < temp.y + temp.height) {
                this.velX = 0;
                this.x -= this.x - (temp.x + temp.width);
            }
            if (this.velY > 0 && 
                temp.y > this.y && 
                dt * this.velY > temp.y - (this.y + this.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY = 0;
                this.y += temp.y - (this.y + this.height);
                this.inAir = false;
            } else if (this.velY < 0 && 
                temp.y < this.y && 
                dt * Math.abs(this.velY) > this.y - (temp.y + temp.height) && 
                this.x + this.width > temp.x && 
                this.x < temp.x + temp.width) {
                this.velY = 0;
                this.y -= this.y - (temp.y + temp.height);
            }           
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
    }

    //Method to attack corresponding to shoot button
    shoot(dir) {
        if (this.shootCooldown > 0) {
            return;
        }
        this.shootCooldown += Constants.PLAYER_FIRE_COOLDOWN;

        if (this.powerup === Type.NO_POWERUP || this.powerup === Type.REFLECT_POWERUP) {
            this.basicShoot(dir);
        } else if (this.powerup === Type.DRILL_POWERUP) {
            this.handler.addWeapon(new Drill(Type.DRILL,
                this.x, this.y + (this.height / 2) - (Constants.DRILL_HEIGHT / 2), 
                Constants.DRILL_WIDTH, Constants.DRILL_HEIGHT, 
                Constants.DRILL_SPEED, dir, this.id, this.handler));
        } else if (this.powerup === Type.BOMB_POWERUP) {
            this.handler.addWeapon(new Bomb(Type.BOMB,
                this.x, this.y + (this.height / 2) - (Constants.BOMB_HEIGHT / 2), 
                Constants.BOMB_WIDTH, Constants.BOMB_HEIGHT, 
                Constants.BOMB_SPEED, dir, this.id, this.handler));
        } else if (this.powerup === Type.MINE_POWERUP) {
            this.handler.addWeapon(new Mine(Type.MINE, 
                this.x, this.y + this.height - Constants.MINE_HEIGHT,
                Constants.MINE_WIDTH, Constants.MINE_HEIGHT,
                Constants.MINE_SPEED, this.id, this.handler));
        }
        if (this.specialAmmo > 1) {
            this.specialAmmo--;
        } else if (this.powerup !== Type.NO_POWERUP) {
            this.powerup = Type.NO_POWERUP;
        }
    }

    serializeForUpdate() {
        return {
            ...super.serializeForUpdate(),
            velX: this.velX,
            velY: this.velY,
            health: this.health,
            username: this.username,
            powerup: this.powerup,
            specialAmmo: this.specialAmmo,
            faceRight: this.faceRight,
            character: this.character,
            abilityMeter: this.abilityMeter,
            shielded: this.shielded,
            sequence: this.sequence,
        };
    }
}

module.exports = Player;