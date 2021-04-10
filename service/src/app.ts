import express from 'express'
import mongoose from 'mongoose';
import { IUser, User } from './models/user'

const app = express()
const port = 5000

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Parse application/json
app.use(express.json())

// Connect to database
mongoose.connect('mongodb://localhost/task_tracker', {
  useNewUrlParser: true, useUnifiedTopology: true });

// Open connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected successfully to db");
});

(async function() {
  try {
    const user: IUser = await User.create({
      name: 'Bill',
    });

    console.log('Done', user.name);

    const findUser: IUser = await User.findOne({ name: 'Bill' });

    console.log('Found', findUser.name)
  }
  catch(e) {
    console.error(e);
  }
})();

// Start service
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`)
})
