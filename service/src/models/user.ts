import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  salt: String,
  mavenlinkUsername: String
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  mavenlinkUsername: {
    type: String,
    unique: true,
    index: true,
    required: true
  }
});

const User: Model<IUser> = model('User', userSchema);

export { IUser, User }
