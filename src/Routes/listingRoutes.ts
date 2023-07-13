import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurrentUser";
import { ListingController } from "../Controller/ListingController";

const routes = Router();
const listingController = new ListingController();

routes.get("/listings", listingController.getListings);
routes.post("/create", isAuth, authMiddleware, listingController.createListing);
routes.get("/listing/:listingId", listingController.getListing);
routes.get(
  "/favoriteListings",
  isAuth,
  authMiddleware,
  listingController.getFavoriteListings
);
routes.get(
  "/properties",
  isAuth,
  authMiddleware,
  listingController.getProperties
);
routes.delete(
  "/listing/:listingId",
  isAuth,
  authMiddleware,
  listingController.deleteListing
);

export default routes;
