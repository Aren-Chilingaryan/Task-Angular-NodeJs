const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function generateAccessToken(user, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, secret, options, async (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
}

module.exports = {
  hashPassword,
  generateAccessToken,
};
