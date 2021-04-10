import express from 'express'
import mongoose from 'mongoose'

import { register } from './api/users'

const app = express()
const port = 5000

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Parse application/json
app.use(express.json())

// Connect to database
mongoose.connect('mongodb://localhost/task_tracker', { useNewUrlParser: true, useUnifiedTopology: true })

// Open connection to database
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected successfully to db')
})

// Routes
app.post('/register', (req: express.Request, res: express.Response) => {
  const message = register(req)
  return res.send(message)
})

app.post('/login', (req: express.Request, res: express.Response) => {
  return res.send('Received a POST HTTP method')
})

// Start service
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
