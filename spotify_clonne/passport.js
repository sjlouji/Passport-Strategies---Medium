const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new SpotifyStrategy({
  clientID: "7202ab3041ad45cabda852b0db9ca1ad",
  clientSecret: "9edeb07db0334946bbdb34659be232cb",
  callbackURL: "http://localhost:8000/auth/spotify/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));