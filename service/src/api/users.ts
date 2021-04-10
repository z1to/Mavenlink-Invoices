import express from 'express'

import { IUser, User } from '../models/user'

export async function register(req: express.Request) {
  try {
    const name: String = req.body.name;
    const address: String = req.body.address;
    const phone: String = req.body.phone;
    const email: String = req.body.email;
    const password: String = req.body.password;
    const mavenlinkUsername: String = req.body.mavenlinkUsername;

    const user: IUser = await User.create({
      name: name,
      address: address,
      phone: phone,
      email: email,
      password: password,
      mavenlinkUsername: mavenlinkUsername
    });
  }
  catch(e) {
    console.error(e);
  }
}

export async function login(req) {
  const findUser: IUser = await User.findOne({ name: 'Bill' });
}
