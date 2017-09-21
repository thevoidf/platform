'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNUll: false },
    content: { type: DataTypes.STRING, allowNUll: false }
  });

  Post.associate = function(models) {
  }

  return Post;
};