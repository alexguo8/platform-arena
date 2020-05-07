const Constants = require("../../shared/constants");

export class InputHandler {
    constructor(room, networkHandler, renderer, canvas) {
        this.room = room;
        this.networkHandler = networkHandler;
        this.renderer = renderer;
        this.canvas = canvas;
        this.onClickEvent = this.onClick.bind(this);
        this.onKeyPressEvent = this.onKeyPress.bind(this);
        this.onKeyUpEvent = this.onKeyUp.bind(this);
        this.sequence = 0;
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
        const keys = ["W", "A", "S", "D", "Q"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyPress(key, this.room);
            if (key === "A" || key === "D" || key === "W") {
                this.renderer.inputs.push({
                    sequence: this.sequence,
                    key: key,
                    type: 0
                });
                this.sequence++;
            }
        }
    }

    onKeyUp(e) {
        const keys = ["A", "D"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyUp(key, this.room);
            if (key === "A" || key === "D" || key === "W") {
                this.renderer.inputs.push({
                    sequence: this.sequence,
                    key: key,
                    type: 1
                });
                this.sequence++;
            }
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
