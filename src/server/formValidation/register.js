const Validator = require("validator");
const isEmpty = require("is-empty");

const validateRegistration = (data) => {
    const errors = {};

    if (isEmpty(data.username.trim())) {
        errors.username = "Username field is required";
    } else if (!Validator.isLength(data.username, { min: 3, max: 10 })) {
        errors.username = "Username must be between 3 and 10 characters";
    }

    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email field is invalid";
    }

    if (isEmpty(data.password) || isEmpty(data.password2)) {
        if (isEmpty(data.password)) {
            errors.password = "Password field is required";
        }
        if (isEmpty(data.password2)) {
            errors.password2 = "Confirm password field is required";
        }
    } else {
        if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
            errors.password = "Password must be at least 6 characters";
        }
        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Passwords must match"
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegistration;
