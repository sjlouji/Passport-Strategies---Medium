const passport = require('passport');
const AmazonStrategy = require('passport-amazon').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new AmazonStrategy({
  clientID: "amzn1.application-oa2-client.e7e35648b96d4be1baee600b90900076",
  clientSecret: "5077b0abad7dd29aa24833394665ff126823ebb5459b0667b3c4e02484c11d4e",
  callbackURL: "http://localhost:8000/auth/amazon/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));