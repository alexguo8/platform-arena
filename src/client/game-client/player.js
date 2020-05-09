//Player class that handles all actions like shooting and using special abilities
const Constants = require("../../shared/constants");

export default class Player {
    constructor(id, x, y, width, height, handler) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.handler = handler; 

        this.velX = 0;
        this.velY = 0;
        this.inAir = false;
        this.faceRight = true;
    
        this.lP = false;
        this.rP = false;
        this.jumped = false;
    } 

    update(dt) {
        //this.velY += dt * Constants.PLAYER_GRAVITY;  
        if (this.velY > 0) {
            this.inAir = true;
        }

        //this.collision(dt);
        //this.x += Math.round(dt * this.velX);
        //this.y += Math.round(dt * this.velY);
    }

    applyInput(input) {
        const originalVelX = this.velX;

        this.velX = input.dirX * Constants.PLAYER_SPEED;
        if (this.velX > 0) {
            this.faceRight = true;
        } else if (this.velX < 0) {
            this.faceRight = false;
        }

        if (input.jumped) {
            this.velY = -Constants.PLAYER_JUMP;
        }
        const displacementY = this.velY * input.pressTime + 
            (Constants.PLAYER_GRAVITY * Math.pow(input.pressTime, 2)) / 2;
        this.velY += input.pressTime * Constants.PLAYER_GRAVITY; 
        
        this.collision(input.pressTime);
        this.x += Math.round(input.pressTime * this.velX); 
        if (this.velY !== 0) {
            this.y += Math.round(displacementY);
        }
        this.velX = originalVelX;
    }

    left() {
        this.lP = true;
        this.faceRight = false; 
    }

    right() {
        this.rP = true;
        this.faceRight = true; 
    }

    stopLeft() {
        this.lP = false;
    }

    stopRight() {
        this.rP = false;
    }

    jump() {
        if (!this.inAir) {
            this.jumped = true;
            //this.velY = -Constants.PLAYER_JUMP;
            this.inAir = true;
        }
    }

    //Method to check collision with platforms and players
    collision(dt) {
        for (const key of Object.keys(this.handler.platforms)) {
            const temp = this.handler.platforms[key];

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
}