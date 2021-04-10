import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  mavenlinkUsername: String
}

const userSchema: Schema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  mavenlinkUsername: String
});

const User: Model<IUser> = model('User', userSchema);

export { IUser, User }
