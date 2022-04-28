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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const Role_1 = __importDefault(require("../models/Role"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //hash password
    const saltos = yield bcryptjs_1.default.genSalt(10);
    const password = yield bcryptjs_1.default.hash(req.body.password, saltos);
    const emailExist = yield User_1.default.findOne({ email: req.body.email });
    if (emailExist)
        return res.json("Email ya existe");
    const userExist = yield User_1.default.findOne({ username: req.body.username });
    if (userExist)
        return res.json("Username ya existe");
    const user = new User_1.default({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: password,
    });
    //buscar si el usuario ya tiene un rol asignado
    //sino le asigna por defecto el rol user
    /*
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }*/
    const { roles } = req.body.roles;
    //TODO no se puede asignar el rol de admin
    if (roles) {
        const foundRoles = yield Role_1.default.find({ name: { $in: roles } });
        user.roles = foundRoles.map((role) => role._id);
    }
    else {
        const role = yield Role_1.default.findOne({ name: "User" });
        user.roles = [role._id];
    }
    try {
        const userDB = yield user.save();
        res.json(userDB);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Request body email can be an email or username
        const userFound = yield User_1.default.findOne({ email: req.body.email }).populate("roles");
        if (!userFound)
            return res.status(400).json({ message: "User Not Found" });
        //comprobar contraseña
        const validPass = yield bcryptjs_1.default.compare(req.body.password, userFound.password);
        if (!validPass)
            return res.json("Credenciales invalidas");
        const token = jsonwebtoken_1.default.sign({ id: userFound._id }, config_1.default.SECRET, {
            expiresIn: 10800, // 24 hours
        });
        res.json({ token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
