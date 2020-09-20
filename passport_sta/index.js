const express = require('express')
const app = express()
const passport = require('passport');
require('./passport');
const cookieSession = require('cookie-session')
const isLoggedIn = require('./Middleware/auth')

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/api/account/google', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req, res) {
    res.redirect('/');
  }
);
app.get('/', isLoggedIn,(req, res) => res.send(`Welcome ${req.user.displayName}! \n ${req.user.photos['value']}`))
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.listen(8000,()=>{
  console.log('Serve is up and running at the port 8000')
})