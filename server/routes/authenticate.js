import 'babel-polyfill';
import Router from '@koa/router';
import { baseApi } from '../config';
import authenticate from '../middlewares/authenticate';
import * as auth from '../middlewares/auth';

const api = 'authenticate'

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// POST /api/authenticate
router.post('/', authenticate);

router.post('/login', auth.authUser)

export default router;
