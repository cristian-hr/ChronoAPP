"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dbTest = _interopRequireDefault(require("../db-test.js"));

var _appTest = _interopRequireDefault(require("../app-test.js"));

var _supertest = _interopRequireDefault(require("supertest"));

describe("Route testing", function () {
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
  test("GET should bring all the times", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var res;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:02:22"
            });

          case 2:
            _context2.next = 4;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:01:11"
            });

          case 4:
            _context2.next = 6;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:03:33"
            });

          case 6:
            _context2.next = 8;
            return (0, _supertest["default"])(_appTest["default"]).get("/");

          case 8:
            res = _context2.sent;
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBe(3);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test("POST showld make a new time", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var res;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:01:99"
            });

          case 2:
            res = _context3.sent;
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("time");

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test("DELETE should delete an specific time if an ID is sended", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var res, time;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:05:10"
            });

          case 2:
            _context4.next = 4;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:07:10"
            });

          case 4:
            _context4.next = 6;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "00:09:10"
            });

          case 6:
            _context4.next = 8;
            return (0, _supertest["default"])(_appTest["default"])["delete"]("/").send({
              id: 2
            });

          case 8:
            _context4.next = 10;
            return (0, _supertest["default"])(_appTest["default"]).get("/");

          case 10:
            res = _context4.sent;
            time = res.body.find(function (time) {
              return time.id === 2;
            });
            expect(res.statusCode).toEqual(200);
            expect(time).toBe(undefined);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test("DELETE should delete all times if nothing is sended", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var res;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "11:11:11"
            });

          case 2:
            _context5.next = 4;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "22:22:22"
            });

          case 4:
            _context5.next = 6;
            return (0, _supertest["default"])(_appTest["default"]).post("/").send({
              time: "33:33:33"
            });

          case 6:
            _context5.next = 8;
            return (0, _supertest["default"])(_appTest["default"])["delete"]("/");

          case 8:
            _context5.next = 10;
            return (0, _supertest["default"])(_appTest["default"]).get("/");

          case 10:
            res = _context5.sent;
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBe(0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  afterAll( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _dbTest["default"].conn.close();

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});