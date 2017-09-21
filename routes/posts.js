const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Post.findAll().then((posts) => {
    res.json(posts);
  });
});

router.get('/:username', (req, res) => {
  const username = req.params.username;

  models.User.findOne({
    where: { username }
  }).then(user => {
    user.getPosts().then(posts => {
      res.json({
        posts
      });
    });
  });
});

router.post('/', (req, res) => {
  const body = req.body;

  models.User.findOne({
    where: { username: body.user }
  }).then(user => {
    models.Post.create({
      title: body.title,
      content: body.content,
      UserId: user.id
    }).then((post) => {
      res.json({
        success: true,
        message: 'new post created',
        post
      });
    }).catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: 'fialed to create post',
      });
    });  
  });
});

module.exports = router;