"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _katas = _interopRequireDefault(require("./routes/katas.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _initialSetup = require("./libs/initialSetup");

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//config
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
(0, _initialSetup.createAdmin)(); //middleware

var corsOptions = {//origin: "http://localhost:3000",
};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.json('welcome');
});
app.use('/api/katas', _katas["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/users', _user["default"]);
var _default = app;
exports["default"] = _default;