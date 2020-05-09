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
        this.keyHandler = this.keyHandler.bind(this);
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

        this.lastInputTime = Date.now();
    }

    update() {
        this.request = window.requestAnimationFrame(this.update);
        //const { me } = getCurrentPlayerState();

        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
        
        const { me, platforms } = getCurrentState();
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

        this.processInputs();

        if (Object.keys(me).length !== 0) {
            const originalX = this.handler.player.x;
            const originalY = this.handler.player.y;
            this.handler.player.x = me.x;
            this.handler.player.y = me.y;
            
            this.handler.player.velX = me.velX;
            this.handler.player.velY = me.velY;

            //Client Side Prediction
            this.pendingInputs = this.pendingInputs.filter(i => i.sequence > me.sequence);
            this.pendingInputs.forEach(i => {
                this.handler.player.applyInput(i);
            })
            this.handler.update(dt);
            this.handler.player.x = originalX + (this.handler.player.x - originalX) * 0.1;
            this.handler.player.y = originalY + (this.handler.player.y - originalY) * 0.5;
            if (originalX - this.handler.player.x !== 0 || originalY - this.handler.player.y !== 0) {
                console.log([originalX - this.handler.player.x, originalY - this.handler.player.y])
            }
        }
    
        render(this.context, me, this.handler.player);
    }

    processInputs() {
        const now = Date.now();
        const dt = (now - this.lastInputTime) / 1000;
        this.lastInputTime = now;

        const input = {};
        if (this.handler.player.lP) {
            input.dirX = -1;
        } else if (this.handler.player.rP) {
            input.dirX = 1;
        } else {
            input.dirX = 0;
        }

        if (this.handler.player.jumped) {
            input.jumped = true;
            this.handler.player.jumped = false;
        } else {
            input.jumped = false;
        }
        
        input.pressTime = dt;
        input.sequence = this.sequence;
        this.sequence++;
        this.networkHandler.sendKeyDown(input, this.room);
        //this.handler.player.applyInput(input);
        this.pendingInputs.push(input);
    }

    keyHandler(e) {
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (key === "A") {
            this.handler.player.lP = (e.type === "keydown");
        } else if (key === "D") {
            this.handler.player.rP = (e.type === "keydown");
        } else if (key === "W" && e.type === "keydown") {
            this.handler.player.jump();
        }
    }

    onKeyPress(e) {
        const keys = ["S", "Q"];
        const key = String.fromCharCode(e.keyCode).toUpperCase();
        if (keys.includes(key)) {
            this.networkHandler.sendKeyPress(key, this.room);
        }
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

    start() {
        this.request = window.requestAnimationFrame(this.update);
        this.canvas.addEventListener("click", this.onClickEvent);
        window.addEventListener('keypress', this.onKeyPressEvent);
        window.addEventListener('keydown', this.keyHandler);
        window.addEventListener('keyup', this.keyHandler);
    }

    stop() {
        window.cancelAnimationFrame(this.request);
        this.request = null;
        this.canvas.removeEventListener("click", this.onClickEvent);
        window.removeEventListener('keypress', this.onKeyPressEvent);
        window.removeEventListener('keydown', this.keyHandler);
        window.removeEventListener('keyup', this.keyHandler);
    }
}