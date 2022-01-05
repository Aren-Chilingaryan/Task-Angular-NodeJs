const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function generateAccessToken(user, secret, options = {}) {
  return jwt.sign(user, secret, options);
}

async function decodeJwtToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = {
  hashPassword,
  generateAccessToken,
  decodeJwtToken,
};
