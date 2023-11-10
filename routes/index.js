import { Router } from "express";
import authRouter from "./auth.route.js";

const mainRouter = Router();

mainRouter.use("/", authRouter);
mainRouter.get("/", (req, res) => {
  console.log("svcsdc", req.session);
  res.send("Hello");
});
export default mainRouter;
