import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { authMiddleware } from "../middlewares/attachCurrentUser";
import { UserController } from "../Controller/UserController";

const routes = Router();
const userController = new UserController();

routes.post("/signup", userController.signUp);
routes.post("/login", userController.login);

export default routes;