"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const kataSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    solution: String
});
exports.default = (0, mongoose_1.model)('Kata', kataSchema);
