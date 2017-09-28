const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const models = require('../models');
const multer = require('multer');
const mkdirp = require('mkdirp');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const usersDir = 'public/static/media/users';
    const userDir = path.join(usersDir, req.body.username);
    const musicDir = path.join(userDir, 'music');

    fs.exists(musicDir, exists => {
      if (exists) {
        cb(null, musicDir);
      } else {
        mkdirp(musicDir, err => {
          if (err) throw err;
          cb(null, musicDir);
        });
      }
    });
  },
  filename: (req, file, cb) => {
    const nameParts = file.originalname.split('.');
    const fileName = nameParts[0];
    const fileType = nameParts[1];
    cb(null, fileName + '-' + Date.now() + '.' + fileType);
  }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  models.Media.findAll({
    where: { fileType: { $ilike: 'audio/' + '%' } }
  }).then(music => res.json(music));
});

router.get('/:username', (req, res) => {
  const username = req.params.username;

  models.User.findOne({
    where: { username }
  }).then(user => {
    models.Media.findAll({
      where: {
        UserId: user.id,
        fileType: { $ilike: 'audio/' + '%' }
      }
    }).then(music => res.json(music));
  });
});

router.post('/', upload.single('music'), (req, res) => {
  const description = req.body.description || 'no desc';
  const title = req.body.title;
  const filePath = req.file.path.substring(7);
  const fileType = req.file.mimetype;

  models.User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    models.Media.create({
      title,
      description,
      fileType,
      filePath,
      UserId: user.id
    }).then(music => {
      res.json({
        success: true,
        message: 'music uploaded',
        music: {
          title,
          description,
          fileType,
          filePath
        }
      });
    });
  });
});

module.exports = router;
