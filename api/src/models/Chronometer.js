const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('chronometer', {
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
