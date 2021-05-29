"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dbTest = _interopRequireDefault(require("../db-test.js"));

describe("Model testing", function () {
  beforeAll( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _dbTest["default"].conn.sync({
              force: true
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('time record', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var time1, time2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            expect.assertions(2);
            _context2.next = 3;
            return _dbTest["default"].Chronometer.create({
              time: "00:01:67"
            });

          case 3:
            time1 = _context2.sent;
            _context2.next = 6;
            return _dbTest["default"].Chronometer.create({
              time: "05:02:98"
            });

          case 6:
            time2 = _context2.sent;
            expect(time1.time).toEqual("00:01:67");
            expect(time2.time).toEqual("05:02:98");

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('get times', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var times;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            expect.assertions(1);
            _context3.next = 3;
            return _dbTest["default"].Chronometer.findAll();

          case 3:
            times = _context3.sent;
            expect(times.length).toEqual(2);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('delete time', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var time;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expect.assertions(1);
            _context4.next = 3;
            return _dbTest["default"].Chronometer.destroy({
              where: {
                id: 1
              }
            });

          case 3:
            _context4.next = 5;
            return _dbTest["default"].Chronometer.findByPk(1);

          case 5:
            time = _context4.sent;
            expect(time).toBeNull();

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  afterAll( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _dbTest["default"].conn.close();

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
});