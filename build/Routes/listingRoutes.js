"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var attachCurrentUser_1 = require("../middlewares/attachCurrentUser");
var ListingController_1 = require("../Controller/ListingController");
var routes = (0, express_1.Router)();
var listingController = new ListingController_1.ListingController();
routes.get("/listings", listingController.getListings);
routes.post("/create", isAuth_1.default, attachCurrentUser_1.authMiddleware, listingController.createListing);
routes.get("/listing/:listingId", listingController.getListing);
routes.get("/favoriteListings", isAuth_1.default, attachCurrentUser_1.authMiddleware, listingController.getFavoriteListings);
routes.get("/properties", isAuth_1.default, attachCurrentUser_1.authMiddleware, listingController.getProperties);
routes.delete("/listing/:listingId", isAuth_1.default, attachCurrentUser_1.authMiddleware, listingController.deleteListing);
routes.get("/listingSearch", listingController.searchingListing);
exports.default = routes;
