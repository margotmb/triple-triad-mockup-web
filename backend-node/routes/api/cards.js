const express = require('express');
const router = express.Router();

// Load Card model
const Card = require('../../models/Card');

// @route GET api/books
// @description Get all books
// @access Public
router.get('/cards', (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(404).json({ nocardsfound: 'No Cards found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/cards/:id', (req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(404).json({ nocardfound: 'No Card found' }));
});

router.get('/cards/:card_id', (req, res) => {
    Card.findById(req.params.card_id)
      .then(card => res.json(card))
      .catch(err => res.status(404).json({ nocardfound: 'No Card found' }));
  });
  

// @route GET api/books
// @description add/save book
// @access Public
router.post('/cards', (req, res) => {
  Card.create(req.body)
    .then(card => res.json({ msg: 'Card added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this card' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/cards/:id', (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body)
    .then(card => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/cards/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;