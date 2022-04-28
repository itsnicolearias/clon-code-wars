"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRolesExisted = void 0;
const Role_1 = require("../models/Role");
const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Role_1.ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`,
                });
            }
        }
    }
    next();
};
exports.checkRolesExisted = checkRolesExisted;
