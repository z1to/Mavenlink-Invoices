import express from 'express'

const app = express()
const port = 5000

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
