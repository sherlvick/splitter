export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  const authError = new Error("Unauthorised request!");
  authError.status = 401;
  next(authError);
}

export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/success");
}
