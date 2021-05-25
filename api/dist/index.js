"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _app = _interopRequireDefault(require("./app"));

var _db = _interopRequireDefault(require("./db.js"));

// Syncing all the models at once.
function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var createConnection, retries;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createConnection = function _createConnection() {
              _db["default"].conn.sync({
                truncate: true
              }).then(function () {
                _app["default"].listen(process.env.PORT || 3001, function () {
                  console.log("%s listening at ".concat(process.env.PORT || 3001)); // eslint-disable-line no-console
                });
              });
            };

            retries = 5;

          case 2:
            if (!retries) {
              _context.next = 18;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return new Promise(function () {
              return createConnection();
            });

          case 6:
            return _context.abrupt("break", 18);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            retries -= 1;
            console.log("retries left ".concat(retries));
            _context.next = 16;
            return new Promise(function (res) {
              return setTimeout(res, 5000);
            });

          case 16:
            _context.next = 2;
            break;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));
  return _startServer.apply(this, arguments);
}

startServer();