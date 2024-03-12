const express = require("express");
const cors = require('cors');
// const cookieParser = require("cookie-parser")
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser())
app.use(cors())
//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI = "", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'tripletriad',
    },
    console.log("CONNECTED")
);

app.use(express.json({ extended: false }));

//PORT SET

var port = 5000;
module.exports = app;

// routes
const cards = require('./routes/api/cards');
const users = require('./routes/api/users');
app.options('/api/cards');

app.use('/api/cards', cards);

app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })







