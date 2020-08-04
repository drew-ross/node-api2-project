const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();
const port = 5000;
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).send('API running.');
});

server.use('/api/posts', postsRouter);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});