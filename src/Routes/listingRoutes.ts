import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurrentUser";
import { ListingController } from "../Controller/ListingController";

const routes = Router();
const listingController = new ListingController();

routes.get("/get", listingController.getListings);
routes.post("/create", isAuth, authMiddleware, listingController.createListing);
routes.post("/list", listingController.getListing);

export default routes;
