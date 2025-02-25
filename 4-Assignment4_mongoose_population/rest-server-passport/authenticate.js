// Authentication Code
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Facebook OAuth support
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user');
var config = require('./config');

// Passport config
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize and set up FacebookStrategy authentication strategy in Passport for user authentication
exports.facebook = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ OauthId: profile.id }, function(err, user) {
      if(err) {
        console.log(err); // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          username: profile.displayName
        });
        user.OauthId = profile.id;
        user.OauthToken = accessToken;
        user.save(function(err) {
          if(err) {
            console.log(err); // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));