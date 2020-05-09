import { setCanvasDimensions, render } from "./render";
import { getCurrentState, getCurrentPlayerState } from "./state";
import Handler from "./handler";
import Player from "./player";
import KeyInput from "./keyInput";
const Constants = require("../../shared/constants");

export class Client {
    constructor(canvas, room, networkHandler) {
        this.canvas = canvas;
        setCanvasDimensions(this.canvas);
        this.context = canvas.getContext("2d");
        this.room = room;
        this.networkHandler = networkHandler;

        //Input
        this.onClickEvent = this.onClick.bind(this);
        this.onKeyPressEvent = this.onKeyPress.bind(this);
        this.onKeyUpEvent = this.onKeyUp.bind(this);
        this.sequence = 0;

        //Game
        this.handler = new Handler();
        this.update = this.update.bind(this);
        this.request = null;

        this.playerAdded = false;
        this.keyInput = null;
        this.pendingInputs = [];
        this.lastUpdateTime = Date.now();

        this.previousFrame = null;
        this.lastServerTime = 0;
    }

    update() {
        this.request = window.requestAnimationFrame(this.update);
        const { frame, me, currTime } = getCurrentPlayerState();

        const now = Date.now();
        const secondHalf = (now - currTime) / 1000;
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        const { platforms } = getCurrentState();
        if (!me || !platforms) {
            return;
        }

        if (!this.playerAdded) {
            const player = new Player(me.id, me.x, me.y, 
                Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT, this.handler);
            this.handler.addPlatforms(platforms);
            this.handler.addPlayer(player);
            this.keyInput = new KeyInput(player);
            this.playerAdded = true;
        }

        platforms.forEach(p => {
            const pl = this.handler.platforms[p.id];
            pl.x = p.x;
            pl.y = p.y;
        });
    
        if (Object.keys(me).length !== 0 && frame !== this.previousFrame) {
            // if (Math.abs(this.handler.player.x - me.x) < 5) {
            //     this.handler.player.x = me.x;
            // } else {
            //     this.handler.player.x += Math.round((me.x - this.handler.player.x) * 0.5);
            // }

            // if (Math.abs(this.handler.player.y - me.y) < 5) {
            //     this.handler.player.y = me.y;
            // } else {
            //     this.handler.player.y += Math.round((me.y - this.handler.player.y) * 0.5);
            // }
            this.handler.player.x = me.x;
            this.handler.player.y = me.y;
            
            // this.handler.player.velX = me.velX;
            // this.handler.player.velY = me.velY;
            this.previousFrame = frame;

            //Client Side Prediction
            this.pendingInputs = this.pendingInputs.filter(i => i.sequence > me.sequence);
            this.pendingInputs.forEach(i => {
                if (i.type === 0) {
                    this.keyInput.handleKeyPress(i.key);
                } else if (i.type === 1) {
                    this.keyInput.handleKeyUp(i.key);
                }
            })
            this.handler.update(secondHalf);
            //console.log([1, this.handler.player.x - me.x, this.handler.player.y - me.y])
        } else {
            this.pendingInputs = this.pendingInputs.filter(i => i.sequence > me.sequence);
            this.pendingInputs.forEach(i => {
                if (i.type === 0) {
                    this.keyInput.handleKeyPress(i.key);
                } else if (i.type === 1) {
                    this.keyInput.handleKeyUp(i.key);
                }
            })
            this.handler.update(dt);
            //console.log([2, this.handler.player.x - me.x, this.handler.player.y - me.y])
        }
    
        

        render(this.context, this.handler.player);
    }

    start() {
        this.request = window.requestAnimationFrame(this.update);
        this.canvas.addEventListener("click", this.onClickEvent);
        window.addEventListener('keypress', this.onKeyPressEvent);
        window.addEventListener('keyup', this.onKeyUpEvent);
    }

    stop() {
        window.cancelAnimationFrame(this.request);
        this.request = null;
        this.canvas.removeEventListener("click", this.onClickEvent);
        window.removeEventListener('keypress', this.onKeyPressEvent);
        window.removeEventListener('keyup', this.onKeyUpEvent);
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
            if (key === "A" || key === "D") {
                this.pendingInputs.push({
                    sequence: this.sequence,
                    key: key,
                    type: 0
                });
                
                this.sequence++;
            }
            this.keyInput.handleKeyPress(key); 
            this.networkHandler.sendKeyPress(key, this.room);
        }
    }

    onKeyUp(e) {
        const keys = ["A", "D"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            if (key === "A" || key === "D") {
                this.pendingInputs.push({
                    sequence: this.sequence,
                    key: key,
                    type: 1
                });
                this.keyInput.handleKeyUp(key); 
                this.sequence++;
            }
            this.networkHandler.sendKeyUp(key, this.room);
        }
    }
}