const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:username', (req, res) => {
  const username = req.params.username;

  models.User.findOne({
    where: { username }
  }).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.json({
        success: false,
        message: 'user not found'
      });
    }
  })
});

module.exports = router;
