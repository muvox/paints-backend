import passport from 'koa-passport';
import User from '../models/users';

export async function authUser(ctx, next) {

  console.log('Logging in')

  return passport.authenticate('local', (err, user, info, status) => {
    console.log(ctx.request.body)
    if (!user) {
      ctx.throw(401)
    }

    const token = user.generateToken()

    const response = user.toJSON()

    delete response.password

    ctx.body = {
      token,
      user: response,
      // ownedAccounts: ownership
    }
  })(ctx, next)
}
