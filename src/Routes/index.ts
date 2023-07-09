import bodyparser from "body-parser";
import userRoutes from "./userRoutes";
import listingRoutes from "./listingRoutes";
import express from "express";

const app = express();

app.use(bodyparser.json());
app.use(userRoutes);
app.use(listingRoutes);

export default app;
