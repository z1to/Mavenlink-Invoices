import express from 'express'

import { login, register } from '../api/users'

const router = express.Router()

router.post('/register', (req: express.Request, res: express.Response) => {
  register(req)
    .then((message) => {
      return res.status(200).send({ message: message })
    })
    .catch((error) => {
      return res.status(400).send({ message: error })
    })
})

router.post('/login', (req: express.Request, res: express.Response) => {
  login(req)
    .then((message) => {
      return res.status(200).send({ message: message })
    })
    .catch((error) => {
      return res.status(400).send({ message: error })
    })
})

export default router
