import passport from 'koa-passport'
import User from '../models/users'
import { Strategy } from 'passport-local'
import config from '../config'
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
//
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id, '-password')
//     done(null, user)
//   } catch (err) {
//     done(err)
//   }
// })

passport.serializeUser(User.serializeUser())

passport.deserializeUser(User.deserializeUser())

passport.use('local', new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    email = email.toLowerCase().trim()
    const user = await User.findOne({ email, suspended: { $in: [null, false] } })

    // Require user AND a non-suspended account associated with the user
    if (!user) {
      console.log('Logging in failed (no user found)', email)
      return done(null, false)
    }
    try {
      const isMatch = await user.validatePassword(password)

      if (!isMatch) { return done(null, false) }

      done(null, user)
    } catch (err) {
      console.error(err)
      done(err)
    }

  } catch (err) {
    console.error(err)
    return done(err)
  }
}))

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : config.token
}

passport.use('JWT', new JWTStrategy(opts, (jwt_payload, done) => {
  console.log(jwt_payload)
  User.findById(jwt_payload.id, function(err, user) {
    if( err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
}))
