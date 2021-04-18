import express from 'express'
import jwt from 'jsonwebtoken'

import { IUser, User, saltHashPassword, isPasswordValid } from '../models/user'

export async function register(req: express.Request): Promise<string> {
  try {
    // Parse req body
    const name: string = req.body.name;
    const address: string = req.body.address;
    const phone: string = req.body.phone;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // Find user
    const findUser: IUser = await User.findOne({ email: email }).exec();

    // Check Mavenlink username has not been registered before
    if (findUser !== null) {
      return 'User could not be created. Mavenlink username is already in use.'
    }

    // Salt and hash password
    const saltHash = saltHashPassword(password)

    // Create user
    const user: IUser = await User.create({
      name: name,
      address: address,
      phone: phone,
      email: email,
      password: saltHash.passwordHash,
      salt: saltHash.salt
    });

    return 'Success'
  }
  catch(error) {
    throw new Error('User registration could not be processed');
  }
}

export async function login(req: express.Request): Promise<string> {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    // Find user
    const findUser: IUser = await User.findOne({ email: email }).exec();

    if (findUser == null) {
      return 'User not found';
    }

    const hashedPassword = findUser.password.toString()
    const salt = findUser.salt.toString()

    if (isPasswordValid(password.toString(), hashedPassword, salt)) {
      // Generate bearer token
      const token = jwt.sign(
                      { email: findUser.email },
                      process.env.JWTSECRET,
                      { expiresIn: '1h' },
                    );

      return token
    }

    return 'Invalid password';
  }
  catch(error) {
    throw new Error('User login could not be processed');
  }
}
