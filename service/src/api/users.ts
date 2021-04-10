import express from 'express'

import { IUser, User, saltHashPassword, isPasswordValid } from '../models/user'

export async function register(req: express.Request): Promise<string> {
  try {
    // Parse req body
    const name: string = req.body.name;
    const address: string = req.body.address;
    const phone: string = req.body.phone;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const mavenlinkUsername: string = req.body.mavenlinkUsername;

    // Salt and hash password
    const saltHash = saltHashPassword(password)

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

export async function login(req: express.Request): Promise<string> {
  try {
    const mavenlinkUsername: string = req.body.mavenlinkUsername;
    const password: string = req.body.password;

    // Find user
    const findUser: IUser = await User.findOne({ mavenlinkUsername: mavenlinkUsername }).exec();

    if(findUser == null) {
      return 'User not found'
    }

    const hashedPassword = findUser.password.toString()
    const salt = findUser.salt.toString()

    if (isPasswordValid(password.toString(), hashedPassword, salt)) {
      // TODO: Return token
      return 'Success'
    }

    return 'Password is not valid'
  }
  catch(e) {
    throw new Error('User login could not be processed');
  }
}
