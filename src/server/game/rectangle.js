//Bounding object for game objects

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    intersects(r) {
        return (this.x < r.x + r.width &&
            this.x + this.width > r.x &&
            this.y < r.y + r.height &&
            this.y + this.height > r.y);
    } 
}

module.exports = Rectangle;
