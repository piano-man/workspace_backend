var express = require("express");
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser");
var passport = require("passport");
var facebookStrategy = require("passport-facebook").Strategy;
var request = require("request");
var session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({extended:false})); //urlencoded data
app.use(bodyParser.json()); // json data
app.use(cookieParser());
app.use(session({secret:'elonmusk',resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.listen(3000);


var FACEBOOK_APP_ID='349615905514376';
var FACEBOOK_APP_SECRET='749000ad8f9bc05915126a866f9fba59';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new facebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email']},
    (access_token, refresh_token, profile, done)=>{
        done(null,profile);
    }
));

var path = __dirname+'/build/login2.html'
app.get('/',function(req,res)
{
    res.sendFile(path)
})
app.get('/auth/facebook',
  passport.authenticate('facebook',{scope:['email']}))

app.get('/login2',function(req,res){
    res.send("<h1>Failure</h1>")
})
app.get('/success',function(req,res){
     res.send("<h1>Success</h1>")
})
app.get('/auth/facebook/callback',
   passport.authenticate('facebook',{failureRedirect:'/login2'}),
   function(req,res){
    res.redirect("/success");
   }
);







