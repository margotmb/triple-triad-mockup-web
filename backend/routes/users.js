const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route GET all users
// @description Get all users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No Users found' }));
});


//CREATE
// @route POST users
// @description add/save user
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

//READ
// @route GET users/:id
// @description Get single user by id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found' }));
});

// @route GET user_email/:email
// @description Get single user by id
router.get('/:email', (req, res) => {
  User.findOne({email: req.params.email})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No User found with email' }));
  });

//UPDATE
// @route users/:id
// @description Update user
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//DELETE
// @route DELETE users/:id
// @description Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'User entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

module.exports = router;