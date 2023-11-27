import { Router } from "express";
import authRouter from "./auth.route.js";
import { ensureAuth } from "../middleware/auth.middleware.js";
const mainRouter = Router();

mainRouter.use("/", authRouter);
mainRouter.get("/private-api", ensureAuth, (req, res) => {
  console.log("sdcv");
  res.send(`Hello ${JSON.stringify(req.user)}`);
});

mainRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke 💩");
});
export default mainRouter;
