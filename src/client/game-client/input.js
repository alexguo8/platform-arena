
export class InputHandler {
    constructor(room, networkHandler) {
        this.room = room;
        this.networkHandler = networkHandler;
        this.networkAndRoom = {
            room: this.room,
            networkHandler: this.networkHandler
        }
        this.onClickEvent = this.onClick.bind(this.networkAndRoom);
        this.onKeyPressEvent = this.onKeyPress.bind(this.networkAndRoom);
        this.onKeyUpEvent = this.onKeyUp.bind(this.networkAndRoom);
    }

    onClick(e) {
        this.networkHandler.sendClick(e.clientX, e.clientY, this.room);
    }

    onKeyPress(e) {
        const keys = ['W', 'A', 'S', 'D'];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyPress(key, this.room);
        }
    }

    onKeyUp(e) {
        const keys = ['W', 'A', 'S', 'D'];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyUp(key, this.room);
        }
    }

    startCapturingInput() {
        window.addEventListener("click", this.onClickEvent);
        window.addEventListener('keypress', this.onKeyPressEvent);
        window.addEventListener('keyup', this.onKeyUpEvent);
        console.log("Starting to capture input");
    }
    
    stopCapturingInput() {
        window.removeEventListener("click", this.onClickEvent);
        window.removeEventListener('keypress', this.onKeyPressEvent);
        window.removeEventListener('keyup', this.onKeyUpEvent);
        console.log("Stopping capture input");
    }
}

// function handleInput(x, y) {
//   const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
//   updateDirection(dir);
// }
