const express = require("express");
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
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
// Sessions Middleware Configuration
const store = new MongoDBStore({
    uri: '',
    collection: 'sessions'
  });

app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: store
}));

//PORT SET
var port = 5000;
module.exports = app;

// routes
const cards = require('./routes/cards');
const users = require('./routes/users');
const sessions = require('./routes/sessions');

app.use('/cards', cards);

app.use('/users', users);

app.use('/sessions', sessions);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })







