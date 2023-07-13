import { ResevervationController } from "./../Controller/ReservationController";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurrentUser";

const routes = Router();

const resevervationController = new ResevervationController();

routes.post(
  "/reservation",
  isAuth,
  authMiddleware,
  resevervationController.createReservation
);
routes.get(
  "/reservations/:listingId",
  isAuth,
  authMiddleware,
  resevervationController.getReservations
);

export default routes;
