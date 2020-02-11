import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  suspended: { type: Boolean, default: false },
})

User.pre('save', function preSave(next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        return reject(err)
      }
      resolve(salt)
    })
  })
  .then(salt => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) {
        throw new Error(err)
      }

      user.password = hash

      next(null)
    })
  })
  .catch(err => next(err))
})



export default mongoose.model('User', User);
