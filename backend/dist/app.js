"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const katas_routes_1 = __importDefault(require("./routes/katas.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const initialSetup_1 = require("./libs/initialSetup");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//config
const app = (0, express_1.default)();
(0, initialSetup_1.createRoles)();
(0, initialSetup_1.createAdmin)();
//middleware
const corsOptions = {
    origin: "http://localhost:4000",
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.json('welcome');
});
app.use('/api/katas', katas_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
exports.default = app;
