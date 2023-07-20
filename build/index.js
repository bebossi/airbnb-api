"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var Routes_1 = __importDefault(require("./Routes"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://airbnnbclone.onrender.com"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(Routes_1.default);
app.listen(process.env.PORT_EXPRESS, function () {
    console.log("Server listening on port", process.env.PORT_EXPRESS);
});
