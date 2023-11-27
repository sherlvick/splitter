import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.post(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/private-route",
    failureRedirect: "/login",
  })
);

authRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to clear session:", err);
      } else {
        console.log("Session cleared successfully");
      }
      res.redirect("/");
    });
  });
});

export default authRouter;
