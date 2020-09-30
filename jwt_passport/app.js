const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./Models/User')
const jwt = require('jsonwebtoken');
const passport = require('passport')
require('./passport')
const app = express()
genToken = user => {
  return jwt.sign({
    iss: 'Joan_Louji',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}
app.use(bodyParser.json())
app.get('/',(req,res)=>{
  res.send('Hello world')
})
app.get('/secret', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    res.json("Secret Data")
})

app.post('/register', async function (req, res, next) {
  const { email, password } = req.body;
  
  //Check If User Exists
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use'});
  }
 
  const newUser = new User({ email, password})
  await newUser.save()
  // Generate JWT token
  const token = genToken(newUser)
  res.status(200).json({token})
});
mongoose.connect("mongodb://localhost/louji", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open',function(){
  console.log('Connected to Mongo');
}).on('error',function(err){
  console.log('Mongo Error', err);
})
app.listen(8000,()=>{
  console.log('Serve is up and running at the port 8000')
})