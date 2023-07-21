"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var Routes_1 = __importDefault(require("./Routes"));
var app = (0, express_1.default)();
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5174",
//       "https://airbnnbclone.onrender.com",
//       "https://airbnnbcloneapi.onrender.com",
//     ],
//     credentials: true,
//   })
// );
app.use(function (req, res, next) {
    var allowedOrigins = [
        "http://localhost:5174",
        "https://airbnnbclone.onrender.com",
        "https://airbnnbcloneapi.onrender.com",
    ];
    var origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express_1.default.json());
app.use(Routes_1.default);
app.listen(process.env.PORT_EXPRESS, function () {
    console.log("Server listening on port", process.env.PORT_EXPRESS);
});
