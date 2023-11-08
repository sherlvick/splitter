import express from "express";
import session from "express-session";
import { sessionStore } from "./db.js";
import "./db.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "splitter",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(passport.authenticate("session"));

/*  PASSPORT SETUP  */
// const passport = require("passport");
import passport from "passport";
import passportConfig from "./config/passport.config.js";
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

/*  ROUTES  */
import mainRouter from "./routes/index.js";
app.use(mainRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
