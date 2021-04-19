import jwt from 'jsonwebtoken';
import express from 'express'
import { model, Schema, Model, Document } from 'mongoose';
import { createHmac, randomBytes } from 'crypto';

/* Resources used:
 * https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
 * https://www.loginradius.com/blog/async/password-hashing-with-nodejs/
 */

export interface IUser extends Document {
  name: String,
  address: String,
  phone: String,
  email: String,
  password: String,
  salt: String,
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
    unique: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});
export const User: Model<IUser> = model('User', userSchema);

/**
 * Generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length: number) {
  return randomBytes(Math.ceil(length / 2))
          .toString('hex')    // Convert to hexadecimal format
          .slice(0, length);  // Return required number of characters
};

/**
* hash password with sha512.
* @function
* @param {string} password - List of required fields.
* @param {string} salt - Data to be validated.
*/
function sha512(password: string, salt: string) {
  // Hashing algorithm sha512
  const hash = createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');

  return {
      salt: salt,
      passwordHash: value
  };
};

export function saltHashPassword(userpassword: string) {
  // Gives us salt of length 16
  const salt = genRandomString(16);

  return sha512(userpassword, salt);
}

/**
* Hash password received with a salt to see if it results in the expected hashed password
* @function
* @param {string} password - User password received
* @param {string} hashedPassword - Hashed password saved in db
* @param {string} salt - Salt saved in db
*/
export function isPasswordValid(password: string, hashedPassword: string, salt: string) {
  const sha = sha512(password, salt);

  return hashedPassword === sha.passwordHash;
};

/**
* Validate bearer token.
* @function
* @param {string} authorization - Received bearer authorization token
* @param {express.Response} res - Express response from API call
*/
export function validateBearerToken(authorization: string, res: express.Response) {
  if (authorization === undefined) {
    res.status(400).send({ message: 'Missing token' })
    return false;
  }

  // Remove 'Bearer ' from string
  const token = authorization.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.JWTSECRET);
  } catch(error) {
    res.status(403).send(error)
    return false;
  }
}
