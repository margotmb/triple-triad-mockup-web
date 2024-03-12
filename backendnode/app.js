const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI = "", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'triple-triad',
    },
    console.log("CONNECTED")
);

//PORT SET
var port = 5000;
module.exports = app;

// routes
const cards = require('./routes/cards');
const users = require('./routes/users');
//app.options('/cards');

app.use('/cards', cards);

app.use('/users', users);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })







