import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'

import routes from './routes'

// Initialize dotenv
dotenv.config()

// Initialize express app
const app = express()
const port = process.env.port

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Parse application/json
app.use(express.json())

// Enhance API's security
app.use(helmet());

// Mongoose setup
mongoose.connect('mongodb://localhost/' + process.env.db + '?authSource=admin',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.dbUser,
    pass: process.env.dbPassword
  })
mongoose.set('useCreateIndex', true)

// Open connection to database
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected successfully to db')
})

// Add routes
app.use('/', routes.user)

// Start service
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
