const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/users");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Parivesh",
};

passport.use(
  new JWTstrategy(options, function (jwtpayload, done) {
    User.findById(jwtpayload._id, function (err, user) {
      if (err) {
        console.log("id is none");
        console.log(err, "jwt");
        return;
      }
      if (user) {
        console.log("user found", user);
        return done(null, user);
      } else {
        console.log("user not found");
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
