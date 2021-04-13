import express from 'express'
import dotenv from 'dotenv'
import * as routes from './routes'

dotenv.config()
const app = express()
routes.register(app)
const port = 5000

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
