//Imports
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  sameSite: "none",
};
app.use(cors(corsOptions));

//ConnectDB mongoose
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "tripletriad",
  },
  console.log("CONNECTED"),
);

// Express-Session Config
// set cookie secure true for prod/https
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge:31536000 },
  }),
);

// PORT SET
var port = process.env.PORT;
module.exports = app;

// Routes w/ Express Routers
const cards = require("./routes/cards");
const users = require("./routes/users");
const sessions = require("./routes/sessions");

app.use("/cards", cards);
app.use("/users", users);
app.use("/sessions", sessions);

app.get("/", (req, res) => {
  res.send("HomeRoute");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
