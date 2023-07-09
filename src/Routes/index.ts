import bodyparser from "body-parser";
import userRoutes from "./userRoutes";
import listingRoutes from "./listingRoutes";
import reservationRoutes from "./reservationRoutes";
import express from "express";

const app = express();

app.use(bodyparser.json());
app.use(userRoutes);
app.use(listingRoutes);
app.use(reservationRoutes);
export default app;
