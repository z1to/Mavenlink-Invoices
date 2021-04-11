import express from 'express'
import dotenv from 'dotenv'
import bodyparser from 'body-parser'
import * as routes from './routes'

dotenv.config()
const app = express()
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
// Add headers
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

routes.register(app);
const port = 5000

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})