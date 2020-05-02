const router = require("express").Router();
require("dotenv").config({ path: __dirname + "/./../../../.env"});

const validateRoom = require("../formValidation/room");

const User = require("../models/user");

router.post("/join", (req, res) => {
    const { errors, isValid } = validateRoom(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(400).json({ username: "Username already exists" });
            }
            res.json("Join successful");
        })
        .catch(err => res.status(400).json(err));

});

module.exports = router;
