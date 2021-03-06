import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate, processLobbyUpdate, processLobbyStart } from './state';

const Constants = require('../../shared/constants');

export class NetworkHandler {
    constructor() {
        this.socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
        this.socket = io(`${this.socketProtocol}://${window.location.host}`, { reconnection: false });
        
    }

    connectToServer = () => (
        new Promise(resolve => {
            this.socket.on('connect', () => {
                console.log('Connected to server!');
                resolve();
            });
        }).then(() => {
            let latency = 0; 
            this.socket.on("pong", ms => {
                latency = ms;
                console.log(latency)
            })
            // Register callbacks
            this.socket.on(Constants.MSG_TYPES.LOBBY_UPDATE, processLobbyUpdate);
            this.socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
            this.socket.on(Constants.MSG_TYPES.START_GAME, processLobbyStart);
            //this.socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
            this.socket.on('disconnect', () => {
                console.log('Disconnected from server.');
            });
        })
    );

    joinLobby = (username, room) => {
        this.socket.emit(Constants.MSG_TYPES.JOIN_LOBBY, username, room);
    }

    updateLobby = (character, room) => {
        this.socket.emit(Constants.MSG_TYPES.LOBBY_UPDATE, character, room);
    }

    disconnect = () => {
        this.socket.disconnect();
    }

    startGame = (room) => {
        this.socket.emit(Constants.MSG_TYPES.START_GAME, room);
    }

    sendClick = throttle(20, (x, y, room) => {
        this.socket.emit(Constants.MSG_TYPES.CLICK, x, y, room, Constants.MSG_TYPES.CLICK);
    });
    
    play = (username, room) => {
        this.socket.emit(Constants.MSG_TYPES.JOIN_GAME, username, room);
    };

    updateDirection = throttle(20, dir => {
        this.socket.emit(Constants.MSG_TYPES.INPUT, dir);
    });

    sendKeyDown = (input, room) => {
        this.socket.emit(Constants.MSG_TYPES.KEYDOWN, input, room);
    }

    sendKeyPress = throttle(20, (key, room) => {
        this.socket.emit(Constants.MSG_TYPES.KEYPRESS, key, room, Constants.MSG_TYPES.KEYPRESS);
    });

    sendKeyUp = throttle(20, (key, room) => {
        this.socket.emit(Constants.MSG_TYPES.KEYUP, key, room, Constants.MSG_TYPES.KEYUP);
    });
};

