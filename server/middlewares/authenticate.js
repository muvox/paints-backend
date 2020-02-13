import passport from 'koa-passport'
import jwt from 'jsonwebtoken';

export default ctx => {
  console.log(ctx.request.body)
  if (ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        {
          role: 'admin'
        },
        'YourKey'
      ), // Store this key in an environment variable
      message: 'Successful Authentication'
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed'
    };
  }
  return ctx;
};
//
// export async function authUser(ctx, next) {
//   console.log('logging in')
//   console.log(ctx)
//   return passport.authenticate('local', (err, user, info, status) => {
//     if(!user) {
//       ctx.throw(401)
//     }
//
//     const token = jwt.sign(
//       {
//         role : 'user'
//       },
//       'YourKey'
//       )
//
//
//     const response = user.toJSON()
//
//     delete response.password
//
//     ctx.body = {
//       token: jwt.sign(
//         {
//           role: 'user'
//         },
//         'YourKey'
//       ),
//       user: response
//     }
//   })(ctx, next)
//
// }
