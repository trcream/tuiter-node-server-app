import express from "express";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";

import mongoose from "mongoose";
// Connect to the database tuiter
//mongoose.connect("mongodb://localhost:27017/tuiter");
// const connectionString =
//   process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/tuiter";
const connectionString =
  "mongodb+srv://trentoncreamer:supersecretpassword@cluster0.pgpdswc.mongodb.net/";
console.log(connectionString + " is the connection string");
mongoose.connect(connectionString);

mongoose.connection.once("connected", () => {
  console.log("MongoDB connected successfully!");
});

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "https://a5--celebrated-zabaione-204450.netlify.app",
      "https://a6--celebrated-zabaione-204450.netlify.app",
      "https://trcream-tuiter-node-server-app.herokuapp.com/",
    ],
  })
);

app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(express.json());

TuitController(app);
HelloController(app);
UserController(app);
AuthController(app);

// app.listen(4000);
app.listen(process.env.PORT || 4000);
