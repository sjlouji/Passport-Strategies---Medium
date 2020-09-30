const express = require('express')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./Models/User')
const passportJWT = require("passport-jwt");
const app = express()
require('./passport')

signToken = user => {
    return jwt.sign({
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, 'joanlouji');
  }


mongoose.connect("mongodb://localhost/louji", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
    console.log('Connected to Mongo');
}).on('error',function(err){
    console.log('Mongo Error', err);
})

app.use(bodyParser.json())
app.get('/',(req,res)=>{
  res.send('Hello world')
})
app.post('/register', async function (req, res, next) {
    const { email, password } = req.body;
    
    let foundUser = await User.findOne({ email });
    if (foundUser) { 
        return res.status(403).json({ error: 'Email is already in use'});
    }
    
    const newUser = new User({ email, password})
    await newUser.save()

    const token = signToken(newUser)
    res.status(200).json({token})
});

app.get('/secret', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    res.json("Secret Data")
})

app.listen(8000,()=>{
  console.log('Serve is up and running at the port 8000')
})