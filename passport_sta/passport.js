const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "428787689175-01cdpen6t6t1mr85tn35hq6iinq7atis.apps.googleusercontent.com",
    clientSecret: "513zslXOqq4B6sIFb0_It1XU",
    callbackURL: "http://localhost:8000/api/account/google"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));