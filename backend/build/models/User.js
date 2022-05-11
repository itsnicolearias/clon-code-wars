"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

//TODO relacionar katas con user
var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  katas: [{
    ref: 'Katas',
    type: _mongoose.Schema.Types.ObjectId
  }],
  roles: [{
    ref: 'Role',
    type: _mongoose.Schema.Types.ObjectId
  }]
});

var _default = (0, _mongoose.model)('User', userSchema); //esto es un arreglo de objetos en el cual cada objeto va a tener una relacion


exports["default"] = _default;