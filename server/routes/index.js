const express = require('express')
const user = require('./user')
// const items from './items'

const app = express()

user(app)
// items(app)

module.exports = app
