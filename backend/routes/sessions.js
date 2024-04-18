const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route LOGIN
router.post('/login', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user==null){
            res.send({"user": null})
        }
        else{
            //Create Session 
            req.session.email = req.body.email;
            req.session.user = user.name
            req.session.save(err => {
                if(err){
                    res.send(err);
                } else {
                    res.send("OK")
                }})
            //console.log(user)
            //console.log(req.session.email)
            //res.send("OK")
        }

    })
  })
router.get('/auth', (req,res) => {
    if (req.session.email == null){
        res.send("Error");
    }
    else{
        res.json({email: req.session.email, user: req.session.user})
    }
})
module.exports = router;