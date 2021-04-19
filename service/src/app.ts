import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './routes'
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize dotenv
dotenv.config()

// Initialize express app
const app = express()
const port = process.env.PORT

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Parse application/json
app.use(express.json())

// Enhance API's security
app.use(helmet())

// Enable CORS
app.use(cors())

// Mongoose setup
mongoose.connect('mongodb://localhost/' + process.env.DB + '?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DBUSER,
    pass: process.env.DBPASSWORD
  })
mongoose.set('useCreateIndex', true)

// Open connection to database
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected successfully to db')
})

// Add routes
routes(app)

// Start service
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})