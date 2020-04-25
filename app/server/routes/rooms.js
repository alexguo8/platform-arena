const router = require("express").Router();
require("dotenv").config({ path: __dirname + "/./../../../.env"});

const validateRoom = require("../formValidation/room");

router.post("/join", (req, res) => {
    const { errors, isValid } = validateRoom(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (user) {
    //             return res.status(400).json({ email: "Email already exists" });
    //         }
    //         const newUser = new User({
    //             username: req.body.username,
    //             email: req.body.email,
    //             password: req.body.password
    //         });
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 newUser.password = hash;
    //                 newUser.save()
    //                     .then(user => res.json(user))
    //                     .catch(err => console.log(err));
    //             })
    //         })
    //     })
    //     .catch(err => res.status(400).json(err));
    res.json("join");

});

module.exports = router;
