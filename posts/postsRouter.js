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
  db.remove(req.params.id)
    .then(post => {
      if (post.length > 0) {
        res.status(204);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'The post could not be removed.' }));
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json({ message: 'The post has been updated.'});
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'The post could not be updated.' }));
});

module.exports = router;