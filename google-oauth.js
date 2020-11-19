const mongoose = require('mongoose')
const User = require('../backend/src/models/users')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser((user, done)=> {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

// Estrategia para Registrarse
passport.use("sign-in-google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:8080/auth/google/callback',
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
          done(null, profile)
        })
      }
    })
  }))

// Estrategia para Iniciar Sesion


passport.use("sign-up-google",new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:8080/auth/google/signup',
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
   // let provider_id = profile.id
    const user = await User.findOne({ 'provider_id': profile.id });
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }

  }
  )
);




