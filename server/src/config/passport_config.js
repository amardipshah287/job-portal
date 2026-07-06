const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/user_model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleEmail = profile.emails[0].value;
        let userExist = await User.findOne({ userEmail: googleEmail });

        if (!userExist) {
          userExist = await User.create({
            userName: profile.displayName,
            userEmail: googleEmail,
            userContact: "9898989898",
            userPassword: bcrypt.hashSync(
              "googleAuthPassword",
              Number(process.env.HASH_SALT)
            ),
            role: "Seeker",
          });
        }

        if (!userExist.approved) {
          return done(null, {
            status: "Error",
          });
        }

        const loggedInToken = jwt.sign(
          { id: userExist._id },
          process.env.JWT_KEY,
          {
            expiresIn: 60 * 60 * 8,
          }
        );
        return done(null, {
          status: "Success",
          role: userExist.role,
          loggedInToken,
          userExist,
        });
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});
