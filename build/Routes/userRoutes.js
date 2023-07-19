"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var attachCurrentUser_1 = require("../middlewares/attachCurrentUser");
var UserController_1 = require("../Controller/UserController");
var routes = (0, express_1.Router)();
var userController = new UserController_1.UserController();
routes.post("/signup", userController.signUp);
routes.post("/login", userController.login);
routes.post("/favorites/:listingId", isAuth_1.default, attachCurrentUser_1.authMiddleware, userController.addFavoriteIds);
routes.delete("/favorites/:listingId", isAuth_1.default, attachCurrentUser_1.authMiddleware, userController.deleteFavoriteId);
routes.get("/user", isAuth_1.default, attachCurrentUser_1.authMiddleware, userController.getCurrentUser);
exports.default = routes;
