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
  resevervationController.getReservationsByListing
);
routes.get(
  "/reservations",
  isAuth,
  authMiddleware,
  resevervationController.getreservationsByUser
);
routes.get(
  "/allReservations",
  isAuth,
  authMiddleware,
  resevervationController.getReservationsByAuthor
);
routes.delete(
  "/reservations/:reservationId",
  isAuth,
  authMiddleware,
  resevervationController.deletereservation
);

export default routes;
