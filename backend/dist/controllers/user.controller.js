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
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Role_1 = __importDefault(require("../models/Role"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, roles } = req.body;
        const rolesFound = yield Role_1.default.find({ name: { $in: roles } });
        // creating a new User
        const user = new User_1.default({
            name,
            username,
            email,
            password,
            roles: rolesFound.map((role) => role._id),
        });
        //hash password
        const saltos = yield bcryptjs_1.default.genSalt(10);
        const password2 = yield bcryptjs_1.default.hash(req.body.password, saltos);
        user.password = password2;
        // saving the new user
        const savedUser = yield user.save();
        return res.status(200).json(savedUser);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createUser = createUser;
/*const {name, username, email, password} = req.body
const newUser = new User({name, username, email, password})
const userSaved = await newUser.save()
res.json(userSaved)*/
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.json(users);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.userId);
    res.json(user);
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    });
    res.json(updatedUser);
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findByIdAndDelete(req.params.userId);
    res.status(204).json('user deleted');
});
exports.deleteUserById = deleteUserById;
