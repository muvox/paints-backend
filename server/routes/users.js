import 'babel-polyfill';
import Router from 'koa-router';
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

const addUser = async (ctx, next) => {
  UsersControllers.add
  await next();
}

const authUser = async (ctx, next) => {
  auth.authUser
  await next();
}

// POST /api/cities
// This route is protected, call POST /api/authenticate to get the token
/*router.post('/', UsersControllers.add);*/


router.post('/',
  addUser,
  authUser
);


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
