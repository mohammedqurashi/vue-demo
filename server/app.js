const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use('/api', api)
app.use(express.static('static'))

app.use(morgan('dev'))

app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  res.json(err)
})

const mongoose = require('mongoose')
mongoose.connect('mongodb://sa:Passw0rd@cluster0-shard-00-00-xf9j8.azure.mongodb.net:27017,cluster0-shard-00-01-xf9j8.azure.mongodb.net:27017,cluster0-shard-00-02-xf9j8.azure.mongodb.net:27017/vue-demo-db?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')

  app.listen(app.get('port'), function () {
    console.log('API Server Listening on port: ' + app.get('port') + '!')
  })
})
