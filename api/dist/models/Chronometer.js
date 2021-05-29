"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var chrono = function chrono(sequelize) {
  return sequelize.define('chronometer', {
    time: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    }
  });
};

var _default = chrono;
exports["default"] = _default;