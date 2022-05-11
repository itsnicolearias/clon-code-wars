"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.KataLevel = void 0;

var _mongoose = require("mongoose");

//TODO rating
var KataLevel = {
  BASIC: 'Basic',
  MEDIUM: 'Medium',
  HIGH: 'High'
};
exports.KataLevel = KataLevel;
var kataSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  intents: {
    type: Number,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  creator: [{
    ref: 'Users',
    type: _mongoose.Schema.Types.ObjectId
  }],
  solution: {
    type: String,
    required: true
  },
  participants: {
    type: [],
    required: true
  }
});

var _default = (0, _mongoose.model)('Kata', kataSchema);

exports["default"] = _default;