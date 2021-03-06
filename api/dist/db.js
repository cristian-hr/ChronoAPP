"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dotenv = require("dotenv");

var _sequelize = require("sequelize");

var _fs = require("fs");

var _path = require("path");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

(0, _dotenv.config)();
var _process$env = process.env,
    DB_USER = _process$env.DB_USER,
    DB_PASSWORD = _process$env.DB_PASSWORD,
    DB_HOST = _process$env.DB_HOST,
    DB_NAME = _process$env.DB_NAME,
    DB_PORT = _process$env.DB_PORT;

if (process.env.POSTGRES_PASSWORD) {
  var dbConfig = {
    user: process.env.POSTGRES_USER,
    pass: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_USER,
    host: "db"
  };
  var sequelize = new _sequelize.Sequelize("postgres://".concat(dbConfig.user, ":").concat(dbConfig.pass, "@").concat(dbConfig.host, ":/").concat(dbConfig.name), {
    logging: false,
    "native": false
  });
} else {
  var sequelize = new _sequelize.Sequelize("postgres://".concat(DB_USER, ":").concat(DB_PASSWORD, "@").concat(DB_HOST, ":").concat(DB_PORT, "/").concat(DB_NAME), {
    logging: false,
    "native": false
  });
}

var basename = (0, _path.basename)(__filename);
var modelDefiners = [];
(0, _fs.readdirSync)((0, _path.join)(__dirname, '/models')).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  modelDefiners.push(require((0, _path.join)(__dirname, '/models', file)));
});
modelDefiners.forEach(function (model) {
  return model["default"](sequelize);
});
var entries = Object.entries(sequelize.models);
var capsEntries = entries.map(function (entry) {
  return [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]];
});
sequelize.models = Object.fromEntries(capsEntries);
sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});

var _default = _objectSpread(_objectSpread({}, sequelize.models), {}, {
  conn: sequelize
});

exports["default"] = _default;