const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
opts.passReqToCallback = true;

module.exports = passport => {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(username, done) {
    User.findOne({'username': username}, function(err, user)  {
      done(err, user);
    });
  });

  passport.use(
    new JwtStrategy(opts, (req, jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((err, user) => {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        });
    })
  );
};