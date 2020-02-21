import 'babel-polyfill';
import Router from '@koa/router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import UsersControllers from '../controllers/users';
import ProfilesControllers from '../controllers/profiles';
import * as auth from '../middlewares/auth'
import compose from 'koa-compose';

const api = 'users';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/users
router.get('/', UsersControllers.find);

// POST /api/users
// This route is protected, call POST /api/authenticate to get the token

router.post('/register', async (ctx, next) => {
  await UsersControllers.add(ctx)
  console.log('user registered')
  next()
  },
  async (ctx, next) =>{
    console.log('authing user')
    await auth.authUser(ctx, next);
    next()
  }
)

router.get('/profile', async (ctx, next) => {
  await ProfilesControllers.findProfileById(ctx, next);
  next();
})

// GET /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, UsersControllers.findById);

// PUT /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, UsersControllers.update);

// DELETE /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, UsersControllers.delete);

export default router;
