const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const passport = require("passport");
const socketio = require('socket.io');

require("dotenv").config({ path: __dirname + "/./../../.env"});

const users = require("./routes/users");
const rooms = require("./routes/rooms");
const Constants = require("../shared/constants");
const Game = require('./game/game');

const app = express();
app.use(express.static('public'));

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
const io = socketio(server);

const games = [];

// Listen for socket.io connections
io.on('connection', socket => {
    console.log('Player connected!', socket.id);
    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.KEYPRESS, handleKeyInput);
    socket.on(Constants.MSG_TYPES.KEYUP, handleKeyInput);
    socket.on('disconnect', onDisconnect);
});

function joinGame(username, room) {
    const roomNames = games.map(g => g.room);
    const roomIndex = roomNames.indexOf(room);
    this.join(room);
    if (roomIndex >= 0) {
        games[roomIndex].addPlayer(this, username);
    } else {
        const game = new Game(room);
        game.addPlayer(this, username);
        games.push(game);
    }
}

function handleKeyInput(key, room, msg_type) {
    const roomNames = games.map(g => g.room);
    const roomIndex = roomNames.indexOf(room);
    if (roomIndex >= 0) {
        games[roomIndex].handleKeyInput(this, key, msg_type);
    }
}

function onDisconnect() {
    for (let i = 0; i < games.length; i++) {
        if (games[i].handler.players.hasOwnProperty(this.id)) {
            game = games[i];
            game.removePlayer(this);
            if (Object.keys(game.handler.players).length === 0) {
                game.endGame();
                games.splice(i, 1);
            }
            return;
        }
    }
}
