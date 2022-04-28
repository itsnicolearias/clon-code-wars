"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifySignup_1 = require("../middlewares/verifySignup");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.post('/register', verifySignup_1.checkRolesExisted, auth_controller_1.register);
router.post('/login', auth_controller_1.login);
exports.default = router;
