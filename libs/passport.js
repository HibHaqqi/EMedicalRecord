const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { Admin } = require("../models");

const authenticate = (email, password, done) => {
 Admin.findOne({ where: { email: email } }).then((admin) => {
    if (!admin) {
      return done(null, false, { message: "Incorrect email" });
    }

    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, admin);
    });
  });
};
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    authenticate
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
 Admin.findByPk(id)
      .then((admin) => {
        done(null, admin);
      })
      .catch((error) => {
        done(error, null);
      });
  });


module.exports = passport;
