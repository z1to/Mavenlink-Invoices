import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'

import routes from './routes'

const app = express()
const port = 5000

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Parse application/json
app.use(express.json())

// Enhance API's security
app.use(helmet());

// Initialize dotenv
dotenv.config()

// TODO: Authenticate db
// Mongoose setup
mongoose.connect('mongodb://localhost/task_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
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
