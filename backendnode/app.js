const express = require("express");
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();


//Sessions
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay},
    resave: false 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());
app.use(cors({origin: 'https://tripletriadgame.onrender.com'}))
//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI = "mongodb+srv://margotmb:yWJNohfPTApjKxkO@tripletriad.6dyldmh.mongodb.net/", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'tripletriad',
    },
    console.log("CONNECTED")
);

//Read PUT/POST
app.use(express.json({ extended: false }));

//PORT SET

var port = 5000;
module.exports = app;

// routes
const cards = require('./routes/api/cards');
const users = require('./routes/api/users');
app.options('/api/cards', cors({origin: 'https://tripletriadgame.onrender.com'}));
app.use('/api/cards', cards, cors({origin: 'https://tripletriadgame.onrender.com'}));
app.options('/api/users', cors({origin: 'https://tripletriadgame.onrender.com'}));
app.use('/api/users', users, cors({origin: 'https://tripletriadgame.onrender.com'}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







