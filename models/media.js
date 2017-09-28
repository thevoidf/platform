'use strict';

module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    filePath: { type: DataTypes.STRING, allowNull: false }
  });

  Media.associate = function(models) {
  }

  return Media;
};
