// load .env using dotenv first
const dotenv = require('dotenv')

// include other main deps
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const { connectDb } = require('./mongoose')

dotenv.config({ silent: true })

// instantiate express
const app = express()
const PRODUCTION = process.env.NODE_ENV === 'production'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

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
