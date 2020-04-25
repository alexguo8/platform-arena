const Validator = require("validator");
const isEmpty = require("is-empty");

const validateLogin = (data) => {
    const errors = {};

    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email field is invalid";
    }

    if (isEmpty(data.password)) {
        errors.password = "Password field is required";
    } 
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLogin;
