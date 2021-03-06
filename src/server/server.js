const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");
const socketio = require('socket.io');
const path = require("path");

require("dotenv").config({ path: __dirname + "/./../../.env"});

const users = require("./routes/users");
const rooms = require("./routes/rooms");
const Constants = require("../shared/constants");
const Type = require("../shared/objectTypes");
const Lobby = require('./game/lobby');
const Game = require('./game/game');

const app = express();
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "../../build")));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection established successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/game", rooms);

const port = process.env.PORT || 5000;

const server = app.listen(port);
console.log(`Server is running on port: ${port}`);

// Setup socket.io
const io = socketio(server, {pingInterval: 10000});

const games = [];
const lobbies = [];

// Listen for socket.io connections
io.on('connection', socket => {
    console.log('Player connected!', socket.id);
    socket.on(Constants.MSG_TYPES.JOIN_LOBBY, joinLobby);
    socket.on(Constants.MSG_TYPES.START_GAME, startGame);
    socket.on(Constants.MSG_TYPES.LOBBY_UPDATE, updateLobby);
    socket.on(Constants.MSG_TYPES.KEYPRESS, handleKeyInput);
    socket.on(Constants.MSG_TYPES.KEYUP, handleKeyInput);
    socket.on(Constants.MSG_TYPES.KEYDOWN, handleKeyDown)
    socket.on(Constants.MSG_TYPES.CLICK, handleMouseInput);
    socket.on('disconnect', onDisconnect);
});

function joinLobby(username, room) {
    const roomNames = lobbies.map(lo => lo.room);
    const roomIndex = roomNames.indexOf(room);
    const ipAddress = this.request.headers['x-forwarded-for'] || this.request.connection.remoteAddress;
    this.join(room);
    if (roomIndex >= 0) {
        lobbies[roomIndex].addPlayer(this, username, ipAddress);
    } else {
        const lobby = new Lobby(room);
        lobby.addPlayer(this, username, ipAddress);
        lobbies.push(lobby);
    }
}

function updateLobby(character, room) {
    const roomNames = lobbies.map(lo => lo.room);
    const roomIndex = roomNames.indexOf(room);
    lobbies[roomIndex].updatePlayer(this, character);
}

function startGame(room) { 
    for (let i = 0; i < lobbies.length; i++) {
        if (lobbies[i].room === room) {
            const lobby = lobbies[i];
            for (const key of Object.keys(lobby.players)) {
                if (lobby.players[key].character === Type.NO_CHARACTER) {
                    return;
                }
            }
            const game = new Game(room);
            game.loadPlayers(lobby.sockets, lobby.players)
            games.push(game);
            lobbies.splice(i, 1);
            io.to(room).emit(Constants.MSG_TYPES.START_GAME, true)
            return;
        }
    }
}

function handleKeyDown(input, room) {
    const roomNames = games.map(g => g.room);
    const roomIndex = roomNames.indexOf(room);
    if (roomIndex >= 0) {
        games[roomIndex].handleKeyDown(this, input);
    }
}

function handleKeyInput(key, room, msg_type) {
    const roomNames = games.map(g => g.room);
    const roomIndex = roomNames.indexOf(room);
    if (roomIndex >= 0) {
        games[roomIndex].handleKeyInput(this, key, msg_type);
    }
}

function handleMouseInput(x, y, room, msg_type) {
    const roomNames = games.map(g => g.room);
    const roomIndex = roomNames.indexOf(room);
    if (roomIndex >= 0) {
        games[roomIndex].handleMouseInput(this, x, y, msg_type);
    }
}

function onDisconnect() {
    for (let i = 0; i < games.length; i++) {
        if (games[i].handler.players.hasOwnProperty(this.id)) {
            const game = games[i];
            game.removePlayer(this);
            if (Object.keys(game.handler.players).length === 0) {
                game.endGame();
                games.splice(i, 1);
            }
            return;
        }
    }
    for (let i = 0; i < lobbies.length; i++) {
        if (lobbies[i].players.hasOwnProperty(this.id)) {
            const lobby = lobbies[i];
            lobby.removePlayer(this);
            if (Object.keys(lobby.players).length === 0) {
                lobbies.splice(i, 1);
            }
            return;
        }
    }
}

module.exports = getGames = () => games;