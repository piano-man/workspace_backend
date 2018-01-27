var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require("cookie-parser");
var http = require('http').createServer(app);
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session')
app.use(express.static('./build'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true,resave:false,saveUninitialized:false }));
app.use(session({secret:'rogerfederer'}));
app.use(passport.initialize());
app.use(passport.session())


http.listen(process.env.PORT || 3000);
var path = __dirname+'/build/login2.html'


passport.serializeUser(function(user,done)
{
    done(null,user);
})
passport.deserializeUser(function(user,done){
    done(null,user);

})
passport.use(new FacebookStrategy({
    clientID: '349615905514376',
    clientSecret: '749000ad8f9bc05915126a866f9fba59',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email']},
  function(accessToken, refreshToken, profile, done) {
        //console.log(profile);
      return done(null, profile);
   
  }
));
app.get('/login2',function(req,res){
    res.send("<h1>Failure</h1>")
})
app.get('/success',function(req,res){
    console.log(req.user)
     res.send("<h1>Success</h1>")
})
app.get('/test',function(req,res)
{
    console.log(req.user)
    res.send("<h1>Testing</h1>")
})
app.get('/',function(req,res)
{
    res.sendFile(path)
})
app.get('/auth/facebook',
  passport.authenticate('facebook',{scope:['email']}))
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/login2' }));