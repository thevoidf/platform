'use strict';

const bcrypt = require('bcrypt');

function hashPassword(user) {
	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false }
  });

	User.beforeCreate(hashPassword);
	User.beforeUpdate(hashPassword);

	User.associate = (models) => {
		User.hasMany(models.Post, { as: 'Posts' });
		User.hasMany(models.Media, { as: 'Photos' });
	}

	User.prototype.checkPassword = function(passwd) {
		return bcrypt.compareSync(passwd, this.password);
	}

  return User;
};
