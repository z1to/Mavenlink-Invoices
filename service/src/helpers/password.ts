import { createHmac, randomBytes } from 'crypto'

// Resource: https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

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

function saltHashPassword(userpassword: string) {
  // Gives us salt of length 16
  const salt = genRandomString(16);

  return sha512(userpassword, salt);
}

export default saltHashPassword;
