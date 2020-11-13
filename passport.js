const mongoose = require('mongoose')
const User = require('../backend/src/models/users')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser((user, done)=> {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:8080/users/auth/google/callback',
    scope: ['profile', 'email']
  },
  function (accessToken, refreshToken, profile, done) {
  console.log(profile)
    User.findOne({ 'provider_id': profile.id }, function (err, user) {
      if (err) throw(err)
      if (!err && user != null) return done(null, user)
      else {
       let user = new User({
          provider_id: profile.id,
          password: profile.password,
          provider: profile.provider,
          name: profile.displayName,
          photo: profile.photos[0].value,
          email: profile.emails[0].value,
          createdAt: profile.createdAt,
        })
        user.save(function (err) {
          if (err) throw err
          done(null, user)
        })
      }
    })
  }))
module.exports = passport

