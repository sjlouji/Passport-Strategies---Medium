const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: "f065fd2ae08c4c017dc6",
    clientSecret: "414567fc51a95e578f9b91278e2971d766a283bf",
    callbackURL: "http://localhost:8000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
    }
));