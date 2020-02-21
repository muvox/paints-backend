import Review from '../models/reviews';

class ReviewsControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await Review.find().populate('reviewer', 'username').populate('productId')
  }

  /**
   * Find a review
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const city = await Review.findById(ctx.params.id);
      if (!review) {
        ctx.throw(404);
      }
      ctx.body = review;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a review
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      console.log(ctx.request.body)
      const review = await new Review(ctx.request.body).save();
      ctx.body = review;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a review
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const review = await Review.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!review) {
        ctx.throw(404);
      }
      ctx.body = review;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a review
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const review = await review.findByIdAndRemove(ctx.params.id);
      if (!review) {
        ctx.throw(404);
      }
      ctx.body = review;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new ReviewsControllers();
