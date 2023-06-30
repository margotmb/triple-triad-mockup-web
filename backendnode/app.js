const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser")
const app = express();


//Sessions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// cookie parser middleware
app.use(cors({
    origin: ['https://tripletriadgame.onrender.com',
    'https://tripletriadgame.onrender.com/register', 
    'https://tripletriadgame.onrender.com/home', 
    'https://tripletriadgame.onrender.com/game', 
    'https://tripletriadgame.onrender.com/account' ],
    credentials: true,
    }))
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
app.options('/api/cards', cors({
    origin: ['https://tripletriadgame.onrender.com',
    'https://tripletriadgame.onrender.com/register', 
    'https://tripletriadgame.onrender.com/home', 
    'https://tripletriadgame.onrender.com/game', 
    'https://tripletriadgame.onrender.com/account' ],
    credentials: true}));

app.use('/api/cards', cards, cors({
    origin: ['https://tripletriadgame.onrender.com',
    'https://tripletriadgame.onrender.com/register', 
    'https://tripletriadgame.onrender.com/home',
     'https://tripletriadgame.onrender.com/game', 
     'https://tripletriadgame.onrender.com/account' ],
     credentials: true}));

app.options('/api/users', cors({
    origin: ['https://tripletriadgame.onrender.com',
    'https://tripletriadgame.onrender.com/register', 
    'https://tripletriadgame.onrender.com/home', 
    'https://tripletriadgame.onrender.com/game', 
    'https://tripletriadgame.onrender.com/account' ],
    credentials: true}));

app.use('/api/users', users, cors({
    origin: ['https://tripletriadgame.onrender.com',
    'https://tripletriadgame.onrender.com/register', 
    'https://tripletriadgame.onrender.com/home', 
    'https://tripletriadgame.onrender.com/game', 
    'https://tripletriadgame.onrender.com/account' ],
    credentials: true}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })







