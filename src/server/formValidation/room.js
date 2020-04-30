const isEmpty = require("is-empty");
//const getGames = require("../server");
console.log(require("../server"));
const validateRoom = (data) => {
    const errors = {};
    //const games = getGames();
    //const gameRooms = games.map(g => g.room);

    if (isEmpty(data.username.trim())) {
        errors.username = "Username is required";
    }

    if (isEmpty(data.room.trim())) {
        errors.room = "Room field is required";
    // } else if (gameRooms.includes(data.room.trim())) {
    //     errors.room = "Room is already in game";
    // }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRoom;
