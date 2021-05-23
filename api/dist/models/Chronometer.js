"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = function (sequelize) {
  sequelize.define('chronometer', {
    time: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};