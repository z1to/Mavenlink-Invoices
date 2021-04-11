import express from 'express'
import jwt from 'jsonwebtoken'

import { login, register } from '../api/users'

const router = express.Router();

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

router.get('/auth-test', (req: express.Request, res: express.Response) => {
  // TODO: move this logic to its own function
  let token = req.headers.authorization;
  if (token == null) {
    const payload = {
      'error': 'Missing token'
    }

    return res.status(400).send(payload)
  }

  // Remove 'Bearer ' from string
  token = token.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.jwtSecret);

    return res.status(200).send(token)
  } catch(err) {
    return res.status(403).send(err)
  }
});

export default router;
