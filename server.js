var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
app.use(express.static('./build'));
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(process.env.PORT || 3000);
var path = __dirname+'/build/login2.html'


passport.use(new FacebookStrategy({
    clientID: '349615905514376',
    clientSecret: '749000ad8f9bc05915126a866f9fba59',
    callbackURL: "http://localhost:3000/success"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(accessToken,refreshToken, function(err, user) {
        console.log(user);
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
app.get('/',function(req,res)
{
    res.sendFile(path)
})
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/success',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login2.html' }));