"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _katas = require("../controllers/katas.controller");

var _authJwt = require("../middlewares/authJwt");

var router = (0, _express.Router)();
router.get('/', _katas.getAllKatas);
router.get('/:kataId', _katas.getKataById);
router.post('/', _authJwt.verifyToken, _authJwt.isAdmin, _katas.createKata);
router.put('/:kataId', _authJwt.verifyToken, _katas.updateKataById);
router["delete"]('/:kataId', _authJwt.verifyToken, _katas.deleteKataByID);
var _default = router;
exports["default"] = _default;