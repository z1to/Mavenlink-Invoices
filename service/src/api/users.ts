import express from 'express'

import { IUser, User } from '../models/user'

import saltHashPassword from '../helpers/password'

export async function register(req: express.Request): Promise<String> {
  try {
    // Parse req body
    const name: String = req.body.name;
    const address: String = req.body.address;
    const phone: String = req.body.phone;
    const email: String = req.body.email;
    const password: String = req.body.password;
    const mavenlinkUsername: String = req.body.mavenlinkUsername;

    // Salt and hash password
    const saltHash = saltHashPassword(password.toString())

    // Create user
    const user: IUser = await User.create({
      name: name,
      address: address,
      phone: phone,
      email: email,
      password: saltHash.passwordHash,
      salt: saltHash.salt,
      mavenlinkUsername: mavenlinkUsername
    });

    return 'Success'
  }
  catch(e) {
    throw new Error('User registration could not be processed');
  }
}

export async function login(req) {
  const findUser: IUser = await User.findOne({ name: 'Bill' });
}
