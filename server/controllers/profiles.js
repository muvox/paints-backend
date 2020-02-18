import User from '../models/users';
import passport from 'koa-passport';
import * as auth from '../middlewares/auth';

class ProfilesControllers{

  async findProfileById(ctx) {
    try {
      const user = await User.findById(ctx.params.id, '-_id -updatedAt -createdAt');
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = {
        user: user
      }
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }



  async updateProfile(ctx){

  }
}
