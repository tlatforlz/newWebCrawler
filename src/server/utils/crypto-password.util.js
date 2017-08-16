'use strict';
var crypto = require('crypto');
const salt = 'secret';

module.exports = {
  cryptoPassword: saltHashPassword,
  verifyPassword: isPasswordCorrect
};

function saltHashPassword(password) {
  var salt = genRandomString(16);
  var iterations = 10000;
  var hash = crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512');

  return {
    salt: salt,
    hash: hash.toString('hex')
  };
}

function isPasswordCorrect(savedHash, savedSalt, passwordAttempt) {
  return savedHash === crypto.pbkdf2Sync(passwordAttempt, savedSalt, 100000, 512, 'sha512').toString('hex');
}
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
