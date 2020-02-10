import Paint from '../models/paints';

class PaintsControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await Paint.find();
  }

  /**
   * Find a paint
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const city = await Paint.findById(ctx.params.id);
      if (!paint) {
        ctx.throw(404);
      }
      ctx.body = paint;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a paint
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const paint = await new City(ctx.request.body).save();
      ctx.body = paint;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a paint
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const paint = await Paint.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!paint) {
        ctx.throw(404);
      }
      ctx.body = paint;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a paint
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const paint = await paint.findByIdAndRemove(ctx.params.id);
      if (!paint) {
        ctx.throw(404);
      }
      ctx.body = paint;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new PaintsControllers();
