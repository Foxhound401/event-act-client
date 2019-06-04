const mongoose = require('mongoose')

const User = require('./models/User')
const Message = require('./models/Message')

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
}

const models = { User, Message }

module.exports = {
  models,
  connectDb,
}
