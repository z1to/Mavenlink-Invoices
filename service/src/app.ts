import express, { json } from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { login, register } from './api/users'

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

// Mongoose setup
mongoose.connect('mongodb://localhost/task_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

// Open connection to database
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected successfully to db')
})

// TODO: Move routes to their own module

// Routes
app.post('/register', (req: express.Request, res: express.Response) => {
  register(req)
    .then((message) => {
      return res.status(200).send({ message: message })
    })
    .catch((error) => {
      return res.status(400).send({ message: error })
    })
})

app.post('/login', (req: express.Request, res: express.Response) => {
  login(req)
    .then((message) => {
      return res.status(200).send({ token: message })
    })
    .catch((error) => {
      return res.status(400).send({ message: error })
    })
})

app.get('/auth-test', (req: express.Request, res: express.Response) => {
  // TODO: move this logic to its own function
  let token = req.headers.authorization;
  if (token == null) {
    const payload = {
      'error': 'Missing token'
    }

    return res.status(400).send(payload)
  }

  // Remover 'Bearer ' from string
  token = token.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.jwtSecret);

    return res.status(200).send(token)
  } catch(err) {
    return res.status(403).send(err)
  }
});

// Start service
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
