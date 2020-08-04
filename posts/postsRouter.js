const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/comments', (req, res) => {

});

router.get('/', (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  db.findById(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'The comments information could not be retrieved.' }));
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

module.exports = router;