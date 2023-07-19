"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var listingRoutes_1 = __importDefault(require("./listingRoutes"));
var reservationRoutes_1 = __importDefault(require("./reservationRoutes"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(userRoutes_1.default);
app.use(listingRoutes_1.default);
app.use(reservationRoutes_1.default);
exports.default = app;
