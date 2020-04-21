const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env"});

const validateRegistration = require("../formValidation/register");
const validateLogin = require("../formValidation/login");

const User = require("../models/user");

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            }
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        })
        .catch(err => res.status(400).json(err));

});


router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const password = req.body.password;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ emailNotFound: "Email not found" });
            } 
            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (isEqual) {
                        const payload = {
                            id: user.id,
                            name: user.username
                        };

                        jwt.sign(
                            payload,
                            process.env.secretOrKey,
                            { expiresIn: 2592000 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({ passwordIncorrect: "Password incorrect"})
                    }
                });
        })
        .catch(err => res.status(400).json(err));

});

module.exports = router;
