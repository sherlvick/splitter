import { Router } from 'express';
import passport from 'passport';

const authRouter = Router();

authRouter.post(
  '/login/federated/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  process.env.GOOGLE_AUTHORISED_REDIRECT_URL,
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

export default authRouter;
