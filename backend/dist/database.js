"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
try {
    mongoose_1.default.connect('mongodb://localhost:27017/clon-code-wars', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB connected');
}
catch (error) {
    console.log(error);
}
