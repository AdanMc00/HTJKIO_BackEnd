const JWTstrategy = require('passport-jwt').Strategy
const passport = require('passport')
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('jwt', new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('access_token')
}, (token, done) => {
  try {
    return done(null, token)
  } catch (error) {
    done(error)
  }
}))
