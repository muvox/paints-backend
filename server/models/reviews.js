import mongoose from 'mongoose';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId:{
    type: Schema.Types.ObjectId,
    ref: 'Paint',
    required: true
  },
  comment:{
    type: String,
    required: false
  }
});

export default mongoose.model('Review', reviewSchema);
