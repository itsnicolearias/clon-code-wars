"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _authJwt = require("../middlewares/authJwt");

var _verifySignup = require("../middlewares/verifySignup");

var router = (0, _express.Router)();
router.get('/', _authJwt.verifyToken, _authJwt.isAdmin, _user.getAllUsers);
router.get('/:userId', _authJwt.verifyToken, _authJwt.isAdmin, _user.getUserById);
router.post('/', _authJwt.verifyToken, _authJwt.isAdmin, _verifySignup.checkRolesExisted, _user.createUser);
router.put('/:userId', _authJwt.verifyToken, _authJwt.isAdmin, _user.updateUserById);
router["delete"]('/:userId', _authJwt.verifyToken, _authJwt.isAdmin, _user.deleteUserById);
var _default = router;
exports["default"] = _default;