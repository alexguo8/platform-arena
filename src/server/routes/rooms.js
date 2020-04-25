const router = require("express").Router();
require("dotenv").config({ path: __dirname + "/./../../../.env"});

const validateRoom = require("../formValidation/room");

router.post("/join", (req, res) => {
    const { errors, isValid } = validateRoom(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    res.json("Join successful");
});

module.exports = router;
