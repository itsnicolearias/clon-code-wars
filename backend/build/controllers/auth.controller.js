"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body;

    var saltos, password, emailExist, userExist, user, roles, foundRoles, role, userDB;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            saltos = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(req.body.password, saltos);

          case 5:
            password = _context.sent;
            _context.next = 8;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 8:
            emailExist = _context.sent;

            if (!emailExist) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json("Email ya existe"));

          case 11:
            _context.next = 13;
            return _User["default"].findOne({
              username: req.body.username
            });

          case 13:
            userExist = _context.sent;

            if (!userExist) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.json("Username ya existe"));

          case 16:
            user = new _User["default"]({
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password: password,
              roles: (req === null || req === void 0 ? void 0 : (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.roles) || "User"
            }); //buscar si el usuario ya tiene un rol asignado
            //sino le asigna por defecto el rol user

            roles = req.body.roles.roles; //para asignar el rol admin => create user

            if (!roles) {
              _context.next = 25;
              break;
            }

            _context.next = 21;
            return _Role["default"].find({
              name: {
                $in: roles
              }
            });

          case 21:
            foundRoles = _context.sent;
            user.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 29;
            break;

          case 25:
            _context.next = 27;
            return _Role["default"].findOne({
              name: "User"
            });

          case 27:
            role = _context.sent;
            user.roles = [role._id];

          case 29:
            _context.prev = 29;
            _context.next = 32;
            return user.save();

          case 32:
            userDB = _context.sent;
            res.json(userDB);
            _context.next = 39;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](29);
            res.status(400).json(_context.t0);

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[29, 36]]);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userFound, validPass, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _User["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 3:
            userFound = _context2.sent;

            if (userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "User Not Found"
            }));

          case 6:
            _context2.next = 8;
            return _bcryptjs["default"].compare(req.body.password, userFound.password);

          case 8:
            validPass = _context2.sent;

            if (validPass) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.json("Credenciales invalidas"));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 10800 // 24 hours

            });
            res.json({
              token: token
            });
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;