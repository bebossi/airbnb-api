import express from "express";
import "dotenv/config";
import routes from "./Routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("Server listening on port", process.env.PORT_EXPRESS);
});
