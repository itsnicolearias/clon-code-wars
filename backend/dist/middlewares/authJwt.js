"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token)
        return res.status(403).json('No token provided');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        req.userId = decoded.id;
        const user = yield User_1.default.findById(decoded.id);
        if (!user)
            return res.satus(404).json('No user found');
        next();
    }
    catch (error) {
        res.json('unauthorized');
    }
});
exports.verifyToken = verifyToken;
//cada user va tener un rol
//tengo que checkear si ese id esta incluido en Roles 
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        const roles = yield Role_1.default.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Admin") {
                next();
                return;
            }
        }
        return res.json('UNAUTHORIZED. require Admin role');
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.isAdmin = isAdmin;
