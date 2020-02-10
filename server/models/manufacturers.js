import mongoose from 'mongoose';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('Manufacturer', manufacturerSchema);
