import User from '../models/users';
import passport from 'koa-passport';
import * as auth from '../middlewares/auth';

class UsersControllers{
  /* eslint-disable no-param-reassign */

  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    const users = await User.find()
    const user = JSON.parse(JSON.stringify(users));

    for(var i = 0; i < user.length; i++){
      delete user[i].password
    }
    ctx.body = user;
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id);
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

  /**
   * Add a user
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const user = await new User(ctx.request.body).save();
      const userData = user.toJSON();
      delete userData.password
      console.log(userData)

      let test = auth.authUser(ctx)


      console.log("testi")
      console.log(test)

      ctx.body = userData;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a user
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a user
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const user = await user.findByIdAndRemove(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }


  /* eslint-enable no-param-reassign */
}

export default new UsersControllers();
