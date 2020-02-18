import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import config from '../config'
import jwt from 'jsonwebtoken';
let passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: false, default: 'noname'},
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  suspended: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user'},
  verification: { type: String },
  verified: { type: Boolean, default: false },
  country: { type: String }
},
{
  versionKey: false,
  timestamps: true
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


  User.methods.generateToken = function generateToken() {
    const user = this
    return jwt.sign({ id: user.id }, config.token)
  }

  User.methods.validatePassword = function validatePassword(password) {
  const user = this

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return reject(err)
      }

      resolve(isMatch)
    })
  })

}

User.plugin(passportLocalMongoose)

export default mongoose.model('User', User);
