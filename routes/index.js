import { Router } from "express";
import authRouter from "./auth.route.js";
import { ensureAuth } from "../middleware/auth.middleware.js";
const mainRouter = Router();

mainRouter.use("/", authRouter);

mainRouter.get("/user/me", ensureAuth, (req, res) => {
  res.status(200).json({isAuthenticated: true, user: req.user});
});

mainRouter.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: { message: err.message },
  });
});

export default mainRouter;
