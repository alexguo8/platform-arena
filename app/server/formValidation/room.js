const isEmpty = require("is-empty");

const validateRoom = (data) => {
    const errors = {};

    if (isEmpty(data.username)) {
        errors.username = "Username is required";
    }

    if (isEmpty(data.room)) {
        errors.room = "Room field is required";
    } 
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRoom;
