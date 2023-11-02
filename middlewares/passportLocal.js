const { Strategy } = require("passport-local");
const { comparePasswords } = require("../utils/bcrypt");
const passport = require("passport");
const UserModel = require("../models/users");

// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Set method to deserialize data stored in cookie and attach to req.user
passport.deserializeUser((id, done) => {
  done(null, { id });
});

passport.use(
  "Local-Strategy",
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOneByEmail(email);
        if (!user) return done(null, false);
        const isValid = await comparePasswords(password, user.password);
        if (isValid) {
          done(null, user);
        } else {
          done(null, null);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
