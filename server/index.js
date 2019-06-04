// load .env using dotenv first
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(process.cwd(), 'server/.env'),
  silent: true,
})
// include other main deps
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const { connectDb } = require('./mongoose')
const routes = require('./routes')

// instantiate express
const app = express()
const PRODUCTION = process.env.NODE_ENV === 'production'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

app.use('/api', routes)
app.use(express.static(`${__dirname}/../dist`))
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../dist` })
})

const serverPort = process.env.PORT || 3000

connectDb().then(() => {
  app.listen(serverPort)
})
console.log(
  `Express server @ http://localhost:${serverPort} (${
    PRODUCTION ? 'production' : 'development'
  })\n`
)
