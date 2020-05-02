const Constants = require("../../shared/constants");

export class InputHandler {
    constructor(room, networkHandler, canvas) {
        this.room = room;
        this.networkHandler = networkHandler;
        this.canvas = canvas;
        this.props = {
            room: this.room,
            networkHandler: this.networkHandler,
            canvas: this.canvas,
        }
        this.onClickEvent = this.onClick.bind(this.props);
        this.onKeyPressEvent = this.onKeyPress.bind(this.props);
        this.onKeyUpEvent = this.onKeyUp.bind(this.props);
    }

    onClick(e) {
        if (e.button === 0) {
            const left = this.canvas.offsetLeft + this.canvas.clientLeft;
            const top = this.canvas.offsetTop + this.canvas.clientTop;
            const resultX = (e.pageX - left) * Constants.WIDTH / this.canvas.clientWidth;
            const resultY = (e.pageY - top) * Constants.HEIGHT / this.canvas.clientHeight;
            this.networkHandler.sendClick(resultX, resultY, this.room);
        }
    }

    onKeyPress(e) {
        const keys = ["W", "A", "D", "Q"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyPress(key, this.room);
        }
    }

    onKeyUp(e) {
        const keys = ["A", "D"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyUp(key, this.room);
        }
    }

    startCapturingInput() {
        this.canvas.addEventListener("click", this.onClickEvent);
        window.addEventListener('keypress', this.onKeyPressEvent);
        window.addEventListener('keyup', this.onKeyUpEvent);
        console.log("Starting to capture input");
    }
    
    stopCapturingInput() {
        this.canvas.removeEventListener("click", this.onClickEvent);
        window.removeEventListener('keypress', this.onKeyPressEvent);
        window.removeEventListener('keyup', this.onKeyUpEvent);
        console.log("Stopping capture input");
    }
}

// function handleInput(x, y) {
//   const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
//   updateDirection(dir);
// }
