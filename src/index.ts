import express from "express";
import "dotenv/config";
import routes from "./Routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://airbnnbclone.onrender.com/"],
  })
);
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("Server listening on port", process.env.PORT_EXPRESS);
});
