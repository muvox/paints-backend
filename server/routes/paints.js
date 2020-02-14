import 'babel-polyfill';
import Router from '@koa/router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import PaintsControllers from '../controllers/paints';
import passport from 'koa-passport';
import User from '../models/users';

const api = 'paints';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/paints
router.get('/', PaintsControllers.find);

// POST /api/paints
// This route is protected, call POST /api/authenticate to get the token
router.post('/', passport.authenticate('JWT') , PaintsControllers.add);

// GET /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, PaintsControllers.findById);

// PUT /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, PaintsControllers.update);

// DELETE /api/paints/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, PaintsControllers.delete);

export default router;
