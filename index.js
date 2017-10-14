const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const models = require('./models');

const app = express();

const users = require('./routes/users');
const posts = require('./routes/posts');
const photos = require('./routes/photos');
const music = require('./routes/music');
const profile = require('./routes/profile');

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(expressJWT({ secret: 'pie' }).unless({ path: ['/api/users/login'] }));

// routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/photos', photos);
app.use('/api/music', music);
app.use('/api/profile', profile);

// test route
app.get('/api/test', (req, res) => {
	res.json({message: 'proxy is ok'});
});

app.get('*', (req, res) => {
	res.sendFile('/index.html');
});

const port = process.env.PORT || 3001;

// {force: true}
models.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log('platform is running on: ' + port);
	});
});
