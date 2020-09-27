const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new SlackStrategy({
  clientID: "349752025155.1402816763361",
  clientSecret: "7f694e1eccda1b92237af2ecd92dcdea",
  callbackURL: "http://localhost:8000/auth/slack/callback",
  skipUserProfile: false, 
  scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'] // default
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));