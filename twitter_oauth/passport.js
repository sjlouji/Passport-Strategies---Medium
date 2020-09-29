const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitterStrategy({
  consumerKey: "xwFUVlq5dcfuTMIMuCSjLSlMb",
  consumerSecret: "3mRHtg6QZyfQ1O2HjbNVQVHgtIciSJdUOB7x4jeZwgAXrL1f9h",
  callbackURL: "http://www.localhost:8000/auth/twitter/callback",
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));