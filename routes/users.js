const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
	models.User.findAll().then((users) => {
		res.json(users);
	});
});

router.post('/', (req, res) => {
	const body = req.body;

	models.User.findOne({
		where: {
			$or: [
				{
					email: {
						$eq: body.email
					},
				},
				{
					username: {
						$eq: body.username
					}
				}
			]
		}
	}).then(user => {
		let errors = [];

		if (!body.username)
			errors.push('username is required');
		if (!body.email)
			errors.push('email is required');
		if (!body.password)
			errors.push('password is required');

		if (user) {
			if (user.username === body.username)
				errors.push('username already registered');
			if (user.email === body.email)
				errors.push('email already registered');

			res.json({
				success: false,
				errors
			});
		} else {
			if (errors.length > 0) {
				res.json({
					success: false,
					errors
				});
			} else {
				models.User.create({
					username: body.username,
					email: body.email,
					password: body.password
				}).then(user => {
					const token = jwt.sign({ email: body.email }, 'pie');
					res.json({
						success: true,
						message: 'user created',
						username: user.username,
						token
					});
				});	
			}
		}
	});
});

router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	models.User.findOne({
		where: { email: email }
	}).then((user) => {
		let errors = [];

		if (!email)
			errors.push('email is required');
		if (!password)
			errors.push('password is required');
		
		if (user) {
			if (user.checkPassword(password)) {
				const token = jwt.sign({ email }, 'pie');
				res.json({
					success: true,
					username: user.username,
					token
				});
			} else {
				errors.push('incorrect password');
				res.json({
					success: false,
					errors
				});
			}	
		} else {
			if (email) errors.push('email not registered');
			res.json({
				success: false,
				errors
			});
		}
	});
});

module.exports = router;
