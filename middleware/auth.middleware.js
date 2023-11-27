export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: new Error("Unauthorised request!"),
  });
}
export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/success");
}
