import { updateDirection, sendKeyPress, sendKeyUp } from './networking';

// function onMouseInput(e) {
//   handleInput(e.clientX, e.clientY);
// }

// function onKeyPressWrapper() {
//     onKeyPress(e, room);
// }

function onKeyPress(e) {
    const keys = ['W', 'A', 'S', 'D'];
    const key = String.fromCharCode(e.keyCode).toUpperCase();
    if (keys.includes(key)) {
        sendKeyPress(key, this);
    }
}

function onKeyUp(e) {
    const keys = ['W', 'A', 'S', 'D'];
    const key = String.fromCharCode(e.keyCode).toUpperCase();
    if (keys.includes(key)) {
        sendKeyUp(key, this);
    }
}

// function handleInput(x, y) {
//   const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
//   updateDirection(dir);
// }

export function startCapturingInput(room) {
//   window.addEventListener('mousemove', onMouseInput);
//   window.addEventListener('click', onMouseInput);
    window.addEventListener('keypress', onKeyPress.bind(room));
    window.addEventListener('keyup', onKeyUp.bind(room));
}

export function stopCapturingInput(room) {
//   window.removeEventListener('mousemove', onMouseInput);
//   window.removeEventListener('click', onMouseInput);
    window.removeEventListener('keypress', onKeyPress);
    window.removeEventListener('keyup', onKeyUp);
}
