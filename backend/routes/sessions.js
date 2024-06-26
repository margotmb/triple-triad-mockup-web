const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route LOGIN
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user == null) {
      res.send({ user: null });
    } else {
      console.log("Attempting to create session");
      //Create Session
      req.session.email = req.body.email;
      req.session.user = user.name;
      req.session.role = user.role;
      res.send({email: req.session.email, user: req.session.user});
    }
  });
});
router.get("/auth", (req, res) => {
  console.log(req.session);
  User.findOne({ email: req.session.email }).then((user) => {
    if (user == null) {
      res.send({ user: null });
    } else {
      res.send({ email: user.email, user: user.name, role: user.role });
    }
  });
  /*
  if (req.session.email == null) {
    res.send({ user: null });
  } else {
    User.findOne({ email: req.session.email }).then((user) => {
      if (user == null) {
        res.send({ user: null });
      } else {
        res.send({ email: user.email, user: user.name, role: user.role });
      }
    }); 
  }*/
});
router.get("/logout", (req, res) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.end()
})

module.exports = router;
