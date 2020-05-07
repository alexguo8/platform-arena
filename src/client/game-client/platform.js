//Basic platform that is solid for every player and many weapons
const Constants = require("../../shared/constants");

export default class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.originalX = x;
        this.originalY = y;
        this.respawnTimer = 0;
    } 
   
    update(dt) {
        if (this.respawnTimer > 0) {
            this.respawnTimer--;
        } else if (this.x != this.originalX) {
            this.reappear();
        }
    }
   
    disappear() {
        this.respawnTimer = 1000;
        this.x = Constants.WIDTH;
        this.y = Constants.HEIGHT;
    }
   
    reappear() {
        this.x = this.originalX;
        this.y = this.originalY;
    } 
}