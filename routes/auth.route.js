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
    failureRedirect: "/",
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
      res.clearCookie("connect.sid", { path: "/" }); //path is the domain path at which this cookie is valid and sent alongwith the request
      res.redirect("/");
    });
  });
});

export default authRouter;
