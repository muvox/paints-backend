import mongoose from 'mongoose';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const paintSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  colorId:{
    type: String,
    required: false
  },
  manufacturer:{
    type: Schema.Types.ObjectId,
    ref: 'Manufacturer'
  },
  productCode:{
    type: String,
    required: false
  },
  reviews:{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }
});

export default mongoose.model('Paint', paintSchema);
