import { Router } from "express";
import authRouter from "./auth.route.js";

const mainRouter = Router();

mainRouter.use("/", authRouter);

export default mainRouter;
