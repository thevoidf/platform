const assert = require('assert');
const models = require('../models');

describe('User', () => {
	beforeEach((done) => {
		models.sequelize.sync({force: true}).then(() => {
			models.User.create({
				username: 'mike',
				email: 'mike@gmail.com',
				password: 'apple'
			}).then(() => {
				done(null);
			}).catch((err) => {
				done(err);
			});
		}).catch((err) => {
			done(err);
		});
	});

	it('has username', () => {
		models.User.findOne({
			where: { username: 'mike' }
		}).then((user) => {
			assert.equal('mike', user.username);
		});
	});

	it('has email', () => {
		models.User.findOne({
			where: { email: 'mike@gmail.com' }
		}).then((user) => {
			assert.equal('mike@gmail.com', user.email);
		});
	});

	it('should hash password when create or update', () => {
		assert.equal(typeof models.User, 'function');
	});
});
