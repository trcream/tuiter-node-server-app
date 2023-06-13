import express from "express";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";

const app = express();
app.use(
  session({
    secret: "any string",
    resave: false,
    // saveUninitialized: true,
    saveUninitialized: false,
    store: new session.MemoryStore(),
  })
);

app.use(
  cors({
    credentials: true,
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "https://a5--celebrated-zabaione-204450.netlify.app",
    ],
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(express.json());

TuitController(app);
HelloController(app);
UserController(app);
AuthController(app);

// app.listen(4000);
app.listen(process.env.PORT || 4000);
