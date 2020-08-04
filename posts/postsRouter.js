const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.post('/', (req, res) => {
  if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('contents')) {
    db.insert(req.body)
      .then(post => res.status(201).json(req.body))
      .catch(err => res.status(500).json({ error: 'There was an error while saving the post to the database' }));
  } else {
    res.status(400).json({ error: 'Please provide title and contents for the post.' });
  }
});

router.post('/:id/comments', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 0) {
        if (req.body.hasOwnProperty('text')) {
          db.insertComment({ ...req.body, post_id: req.params.id })
            .then(comment => res.status(201).json(req.body))
            .catch(err => res.status(500).json({ error: 'There was an error while saving the comment to the database' }));
        } else {
          res.status(400).json({ error: 'Please provide text for the comment.' });
        }
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'There was an error while saving the comment to the database' }));
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
      console.log(post);
      if (post) {
        res.status(204).end();
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
        res.status(200).json({ message: 'The post has been updated.' });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => res.status(500).json({ error: 'The post could not be updated.' }));
});

module.exports = router;