import 'babel-polyfill';
import Router from '@koa/router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import UsersControllers from '../controllers/users';
import * as auth from '../middlewares/auth'
import compose from 'koa-compose';

const api = 'users';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/cities
router.get('/', UsersControllers.find);

// POST /api/cities
// This route is protected, call POST /api/authenticate to get the token
/*router.post('/', UsersControllers.add);*/


router.post('/', async (ctx, next) => {
  await UsersControllers.add(ctx);
  next();
},
  async (ctx, next) =>{
    await auth.authUser(ctx, next);
    next();
  });


// router.get('/users/:id', (ctx, next) => {
//     return User.findOne(ctx.params.id).then(function(user) {
//       ctx.user = user;
//       next();
//       });
//     },
//   ctx => {
//     console.log(ctx.user);
//     // => { id: 17, name: "Alex" }
//   }
// );

// GET /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, UsersControllers.findById);

// PUT /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, UsersControllers.update);

// DELETE /api/cities/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, UsersControllers.delete);

export default router;
