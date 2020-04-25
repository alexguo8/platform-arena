const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config({ path: __dirname + "/./../../.env"});

const users = require("./routes/users");
const rooms = require("./routes/rooms");

const app = express();

app.use(express.urlencoded({ extended: true} ));
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection established successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/game", rooms);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
