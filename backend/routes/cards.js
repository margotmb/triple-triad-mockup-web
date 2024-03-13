const express = require('express');
const router = express.Router();

// Load Card model
const Card = require('../models/Card');

// @route GET test
// @description Get test route
// @access Public
router.get('/test', (req, res) => res.send('card route testing!'));

// @route GET cards
// @description Get all cards
// @access Public
router.get('/', (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(404).json({ nocardsfound: 'No Cards found' }));
});

// @route GET cards/:id
// @description Get single card by db_id
// @access Public
router.get('/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(404).json({ nocardfound: 'No Card found' }));
});

// @route GET cards/:card_id
// @description Get single card by card_id
// @access Public
router.get('/:card_id', (req, res) => {
    Card.findById(req.params.card_id)
      .then(card => res.json(card))
      .catch(err => res.status(404).json({ nocardfound: 'No Card found' }));
  });
  
// @route POST cards
// @description add/save card to DB
// @access Public
router.post('/', (req, res) => {
  Card.create(req.body)
    .then(card => res.json({ msg: 'Card added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this card' }));
});

// @route PUT
// @description Update book
// @access Public
// Update Card 
/*
router.put('/:id', (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body)
    .then(card => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});
*/

// @route DELETE cards/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Card entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'Card not found' }));
});

module.exports = router;