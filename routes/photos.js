const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const usersDir = 'public/static/media/users';
    const userDir = path.join(usersDir, req.body.username);

    fs.exists(usersDir, (exists) => {
      if (!exists) {
        fs.mkdir(usersDir, (err) => {
          if (err) throw err;
          fs.exists(userDir, (exists) => {
            if (!exists) {
              fs.mkdir(userDir, (err) => {
                if (err) throw err;
                cb(null, userDir);
              });
            } else {
              cb(null, userDir);
            }
          });
        });
      } else {
        fs.exists(userDir, (exists) => {
          if (!exists) {
            fs.mkdir(userDir, (err) => {
              if (err) throw err;
              cb(null, userDir);
            });
          } else {
            cb(null, userDir);
          }
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
const models = require('../models');

router.get('/', (req, res) => {
  models.Media.findAll().then(photos => {
    res.json(photos);
  });
});

router.get('/:username', (req, res) => {
  const username = req.params.username;

  models.User.findOne({
    where: { username }
  }).then(user => {
    models.Media.findAll({
      where: { fileType: { $ilike: 'image/' + '%' } }
    }).then(photos => res.json(photos));
  });
});

router.post('/', upload.single('photo'), (req, res) => {
  const title = req.body.title;
  const description = req.body.description || 'no desc';
  const filePath = req.file.path.substring(7);
  const fileType = req.file.mimetype;

  models.User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    models.Media.create({
      title,
      description,
      filePath,
      fileType,
      UserId: user.id
    }).then(photo => {
      res.json({
        success: true,
        message: 'photo uploaded',
        photo: {
          title,
          description,
          filePath
        }
      });
    });
  });
});

router.get('/download/:id', (req, res, next) => {
  const id = req.params.id;
  models.Media
    .findOne({ where: { id } })
    .then(photo => {
      const filePath = path.join(__dirname, '../public', photo.filePath);
      res.download(filePath, err => {
        if (!err) return;
        if (err && err.status !== 404) return next(err);
        res.statusCode = 404;
        res.send('File not found');
      });
    });
});

module.exports = router;
