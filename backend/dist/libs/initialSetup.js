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
exports.createAdmin = exports.createRoles = void 0;
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Count Documents
        const count = yield Role_1.default.estimatedDocumentCount();
        // check for existing roles
        if (count > 0)
            return;
        // Create default Roles
        const values = yield Promise.all([
            new Role_1.default({ name: "user" }).save(),
            new Role_1.default({ name: "admin" }).save(),
        ]);
        console.log(values);
    }
    catch (error) {
        console.error(error);
    }
});
exports.createRoles = createRoles;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    // check for an existing admin user
    const user = yield User_1.default.findOne({ email: "admin@localhost" });
    // get roles _id
    const roles = yield Role_1.default.find({ name: { $in: ["Admin"] } });
    if (!user) {
        // create a new admin user
        yield User_1.default.create({
            name: "administrador",
            username: "admin",
            email: "admin@localhost",
            password: yield bcryptjs_1.default.hash("admin", 10),
            roles: roles.map((role) => role._id),
        });
        console.log('Admin User Created!');
    }
});
exports.createAdmin = createAdmin;
