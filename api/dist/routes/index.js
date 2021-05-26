"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _db = _interopRequireDefault(require("../db.js"));

// "use strict";
// import "babel-core/register";
// import "babel-polyfill";
var router = (0, _express.Router)();
router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var records;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _db["default"].Chronometer.findAll({});

          case 3:
            records = _context.sent;
            res.json(records);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var time, newTime;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            time = req.body.time;
            _context2.prev = 1;
            _context2.next = 4;
            return _db["default"].Chronometer.create({
              time: time
            });

          case 4:
            newTime = _context2.sent;
            res.json(newTime);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router["delete"]("/", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, deleteTime;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.body.id;
            _context3.prev = 1;

            if (!(typeof id === "number")) {
              _context3.next = 9;
              break;
            }

            _context3.next = 5;
            return _db["default"].Chronometer.destroy({
              where: {
                id: id
              }
            });

          case 5:
            deleteTime = _context3.sent;
            res.json(deleteTime);
            _context3.next = 12;
            break;

          case 9:
            _context3.next = 11;
            return _db["default"].Chronometer.destroy({
              where: {},
              truncate: true
            });

          case 11:
            res.json({
              msg: "All times where deleted"
            });

          case 12:
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 14]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;