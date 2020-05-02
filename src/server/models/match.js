const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    ipAddress: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    character: {
        type: String,
        required: true,
    },
})

const matchSchema = new Schema({
    players: [playerSchema],
    gameStart: {
        type: Date,
    },
    gameOver: {
        type: Date,
    },
    gameLeft: {
        type: Date,
    },
    gameLength: {
        type: Number,
    },
    ipWinner: {
        type: String
    },
    room: {
        type: String,
    }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;