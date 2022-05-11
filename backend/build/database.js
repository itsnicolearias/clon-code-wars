"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

try {
  _mongoose["default"].connect('mongodb://localhost:27017/clon-code-wars');

  console.log('DB connected');
} catch (error) {
  console.log(error);
}