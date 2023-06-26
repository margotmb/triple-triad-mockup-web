const express = require("express");
const cors = require('cors');
const app = express();

// routes
const cards = require('../routes/api/cards');
app.use('/api/cards', cards);

//ConnectDB
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'triple-triad',
    },
    console.log("CONNECTED")
);

app.use(cors());

//Read PUT/POST
app.use(express.json({ extended: false }));

//PORT SET
app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });


module.exports = app;
// use Routes

app.use("/", UserRouter);
/*
//Sessions
const oneDay = 1000 * 60 * 60 * 24;
express.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// cookie parser middleware
express.use(cookieParser());
// cors

express.use(express.urlencoded({ extended: true }));

//middleware
express.use(express.json());
*/







