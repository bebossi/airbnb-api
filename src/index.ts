import express from "express";
import "dotenv/config";
import routes from "./Routes";
import cors from "cors";

const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5174",
//       "https://airbnnbclone.onrender.com",
//       "https://airbnnbcloneapi.onrender.com",
//     ],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5174",
    "https://airbnnbclone.onrender.com",
    "https://airbnnbcloneapi.onrender.com",
  ];

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT_EXPRESS, () => {
  console.log("Server listening on port", process.env.PORT_EXPRESS);
});
