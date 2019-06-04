const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: true,
  },

  name: {
    type: String,
  },

  role: {
    type: String,
    default: 'user', // Possible values: user | admin
  },
})

module.exports = mongoose.model('User', UserSchema)
