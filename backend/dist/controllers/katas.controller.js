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
exports.deleteKataByID = exports.updateKataById = exports.getKataById = exports.getAllKatas = exports.createKata = void 0;
const Katas_1 = __importDefault(require("../models/Katas"));
const createKata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, solution } = req.body;
    const newKata = new Katas_1.default({
        name,
        description,
        solution
    });
    const kataSaved = yield newKata.save();
    res.json(kataSaved);
});
exports.createKata = createKata;
const getAllKatas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const katas = yield Katas_1.default.find();
    res.json(katas);
});
exports.getAllKatas = getAllKatas;
const getKataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kata = yield Katas_1.default.findById(req.params.kataId);
    res.json(kata);
});
exports.getKataById = getKataById;
const updateKataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedKata = yield Katas_1.default.findByIdAndUpdate(req.params.kataId, req.body, {
        new: true
    });
    res.json(updatedKata);
});
exports.updateKataById = updateKataById;
const deleteKataByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Katas_1.default.findByIdAndDelete(req.params.kataId);
    res.status(204).json('kata deleted');
});
exports.deleteKataByID = deleteKataByID;
