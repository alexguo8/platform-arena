const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRoom = (data) => {
    const errors = {};
    const getGames = require("../server");
    const games = getGames();
    const gameRooms = games.map(g => g.room);

    if (isEmpty(data.username.trim())) {
        errors.username = "Username is required";
    } else if (!Validator.isLength(data.username, { min: 3, max: 10 })) {
        errors.username = "Username must be between 3 and 10 characters";
    }

    if (isEmpty(data.room.trim())) {
        errors.room = "Room field is required";
    } else if (gameRooms.includes(data.room.trim())) {
        errors.room = "Room is already in game";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRoom;
