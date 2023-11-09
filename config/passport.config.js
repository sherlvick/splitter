/*  Google AUTH  */
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getUserByGoogleId, createUser } from "../services/users.service.js";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTHORISED_REDIRECT_URL,
} = process.env;

export default function passportConfig(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_AUTHORISED_REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        // get the user data from google
        const userProfile = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          // find the user in our database
          let user = await getUserByGoogleId(profile.id);

          if (user) {
            // If user present in our database.
            return done(null, user);
          }
          // if user is not preset in our database save user data to database.
          user = await createUser(userProfile);
          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err, null);
        }
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    getUserByGoogleId(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        // Error occurred
        done(error, null);
        console.error(error);
      });
  });
}
