"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ReservationController_1 = require("./../Controller/ReservationController");
var express_1 = require("express");
var isAuth_1 = __importDefault(require("../middlewares/isAuth"));
var attachCurrentUser_1 = require("../middlewares/attachCurrentUser");
var routes = (0, express_1.Router)();
var resevervationController = new ReservationController_1.ResevervationController();
routes.post("/reservation", isAuth_1.default, attachCurrentUser_1.authMiddleware, resevervationController.createReservation);
routes.get("/reservations/:listingId", isAuth_1.default, attachCurrentUser_1.authMiddleware, resevervationController.getReservationsByListing);
routes.get("/reservations", isAuth_1.default, attachCurrentUser_1.authMiddleware, resevervationController.getreservationsByUser);
routes.get("/allReservations", isAuth_1.default, attachCurrentUser_1.authMiddleware, resevervationController.getReservationsByAuthor);
routes.delete("/reservations/:reservationId", isAuth_1.default, attachCurrentUser_1.authMiddleware, resevervationController.deletereservation);
exports.default = routes;
