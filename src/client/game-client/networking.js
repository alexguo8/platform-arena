import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://localhost:5000`, { reconnection: false });
const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connectToServer = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
    });
  })
);

export const play = (username, room) => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username, room);
};

export const updateDirection = throttle(20, dir => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
});

export const sendKeyPress = throttle(20, (key, room) => {
    socket.emit(Constants.MSG_TYPES.KEYPRESS, key, room, Constants.MSG_TYPES.KEYPRESS);
});

export const sendKeyUp = throttle(20, (key, room) => {
    socket.emit(Constants.MSG_TYPES.KEYUP, key, room, Constants.MSG_TYPES.KEYUP);
});

