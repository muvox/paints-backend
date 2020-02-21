import 'babel-polyfill';
import Router from '@koa/router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import ReviewsControllers from '../controllers/reviews';
import passport from 'koa-passport';
import Review from '../models/reviews';

const api = 'review';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/paints
router.get('/', ReviewsControllers.find);

// POST /api/paints
// This route is protected, call POST /api/authenticate to get the token
router.post('/', passport.authenticate('JWT') , ReviewsControllers.add);

// GET /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, ReviewsControllers.findById);

// PUT /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, ReviewsControllers.update);

// DELETE /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, ReviewsControllers.delete);

export default router;
