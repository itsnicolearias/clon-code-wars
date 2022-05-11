"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.deleteUserById = exports.createUser = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, username, emai, password, roles, rolesFound, user, saltos, password2, savedUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            name = req.body.name;
            username = req.body.username;
            emai = req.body.email;
            password = req.body.password;
            roles = (req === null || req === void 0 ? void 0 : (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.roles) || "User";
            _context.next = 8;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 8:
            rolesFound = _context.sent;
            // creating a new User
            user = new _User["default"]({
              name: name,
              username: username,
              email: email,
              password: password,
              roles: rolesFound.map(function (role) {
                return role._id;
              })
            }); //hash password

            _context.next = 12;
            return _bcryptjs["default"].genSalt(10);

          case 12:
            saltos = _context.sent;
            _context.next = 15;
            return _bcryptjs["default"].hash(req.body.password, saltos);

          case 15:
            password2 = _context.sent;
            user.password = password2; // saving the new user

            _context.next = 19;
            return user.save();

          case 19:
            savedUser = _context.sent;
            return _context.abrupt("return", res.status(200).json(savedUser));

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getAllUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].find();

          case 2:
            users = _context2.sent;
            res.json(users);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllUsers = getAllUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _User["default"].findById(req.params.userId);

          case 2:
            user = _context3.sent;
            res.json(user);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserById = getUserById;

var updateUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].findByIdAndUpdate(req.params.userId, req.body, {
              "new": true
            });

          case 2:
            updatedUser = _context4.sent;
            res.json(updatedUser);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUserById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUserById = updateUserById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _User["default"].findByIdAndDelete(req.params.userId);

          case 2:
            res.status(204).json('user deleted');

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;