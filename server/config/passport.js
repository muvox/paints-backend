import passport from 'koa-passport'
import User from '../models/users'
import { Strategy } from 'passport-local'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, '-password')
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use('local', new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    username = username.toLowerCase().trim()
    const user = await User.findOne({ username, suspended: { $in: [null, false] } })

    // Require user AND a non-suspended account associated with the user
    if (!user) {
      console.log('Logging in failed (no user found)', username)
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
