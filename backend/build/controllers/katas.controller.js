"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateKataById = exports.getKataById = exports.getAllKatas = exports.deleteKataByID = exports.createKata = void 0;

var _Katas = _interopRequireWildcard(require("../models/Katas"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createKata = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, _req$body2, _req$body3, _req$body4, _req$body5, _req$body6, _req$body7, _req$body8;

    var name, description, level, intents, stars, creator, solution, participants, newKata, kataSaved;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = req === null || req === void 0 ? void 0 : (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.name;
            description = (req === null || req === void 0 ? void 0 : (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.description) || 'Default description';
            level = (req === null || req === void 0 ? void 0 : (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.level) || _Katas.KataLevel.BASIC;
            intents = (req === null || req === void 0 ? void 0 : (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.intents) || 0;
            stars = (req === null || req === void 0 ? void 0 : (_req$body5 = req.body) === null || _req$body5 === void 0 ? void 0 : _req$body5.stars) || 0;
            creator = req === null || req === void 0 ? void 0 : (_req$body6 = req.body) === null || _req$body6 === void 0 ? void 0 : _req$body6.creator;
            solution = (req === null || req === void 0 ? void 0 : (_req$body7 = req.body) === null || _req$body7 === void 0 ? void 0 : _req$body7.solution) || 'Default Solution';
            participants = (req === null || req === void 0 ? void 0 : (_req$body8 = req.body) === null || _req$body8 === void 0 ? void 0 : _req$body8.participants) || [];
            /* const kataSent: IKata = {
               name: name,
               description: description,
               level: level,
               intents: intents,
               stars: stars,
               creator: creator,
               solution: solution,
               participants: participants
             }*/

            newKata = new _Katas["default"]({
              name: name,
              description: description,
              level: level,
              intents: intents,
              stars: stars,
              creator: creator,
              solution: solution,
              participants: participants
            });
            _context.next = 11;
            return newKata.save();

          case 11:
            kataSaved = _context.sent;
            res.json(kataSaved);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createKata(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createKata = createKata;

var getAllKatas = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var kata;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Katas["default"].find();

          case 2:
            kata = _context2.sent;
            res.json(kata);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllKatas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllKatas = getAllKatas;

var getKataById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var kata;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Katas["default"].findById(req.params.kataId);

          case 2:
            kata = _context3.sent;
            res.json(kata);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getKataById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getKataById = getKataById;

var updateKataById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedKata;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Katas["default"].findByIdAndUpdate(req.params.kataId, req.body, {
              "new": true
            });

          case 2:
            updatedKata = _context4.sent;
            res.json(updatedKata);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateKataById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateKataById = updateKataById;

var deleteKataByID = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Katas["default"].findByIdAndDelete(req.params.kataId);

          case 2:
            res.status(204).json('kata deleted');

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteKataByID(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteKataByID = deleteKataByID;