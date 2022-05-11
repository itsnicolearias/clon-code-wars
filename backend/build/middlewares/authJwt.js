"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isAdmin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var isDeleted, token, decoded, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isDeleted = req.params.id;
            token = req.headers["x-access-token"];
            console.log(token);

            if (token) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(403).json('No token provided'));

          case 5:
            _context.prev = 5;
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id; //req.userId

            _context.next = 10;
            return _User["default"].findById(decoded.id);

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(404).json('No user found'));

          case 13:
            next();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](5);
            res.json('unauthorized');

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 16]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); //cada user va tener un rol
//tengo que checkear si ese id esta incluido en Roles 


exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id, user, roles, i;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findById(id);

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return _Role["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 7:
            roles = _context2.sent;
            i = 0;

          case 9:
            if (!(i < roles.length)) {
              _context2.next = 16;
              break;
            }

            if (!(roles[i].name === "Admin")) {
              _context2.next = 13;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 13:
            i++;
            _context2.next = 9;
            break;

          case 16:
            return _context2.abrupt("return", res.json('UNAUTHORIZED. require Admin role'));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(500).send(_context2.t0));

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 19]]);
  }));

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;